import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// ── Tools the AI agent can select ───────────────────────────────
const TOOLS = [
  {
    name: "search_health_knowledge",
    description: "ค้นหาข้อมูลสุขภาพจากฐานความรู้ (RAG)",
    keywords: ["สุขภาพ", "โรค", "อาการ", "ยา", "ออกกำลังกาย", "อาหาร", "health", "exercise", "diet", "bmi", "น้ำหนัก", "ความดัน", "เบาหวาน"],
  },
  {
    name: "lookup_privileges",
    description: "ค้นหาสิทธิพิเศษและโปรโมชั่น",
    keywords: ["สิทธิ", "โปรโมชั่น", "ส่วนลด", "คูปอง", "privilege", "discount", "coupon", "ของรางวัล", "แลก"],
  },
  {
    name: "find_nearby_shops",
    description: "ค้นหาร้านค้าหรือสถานที่ใกล้เคียง",
    keywords: ["ร้าน", "ร้านค้า", "สถานที่", "ใกล้", "shop", "store", "nearby", "แผนที่", "map"],
  },
  {
    name: "check_profile_rank",
    description: "ตรวจสอบข้อมูลโปรไฟล์และอันดับ",
    keywords: ["โปรไฟล์", "อันดับ", "แต้ม", "คะแนน", "rank", "point", "profile", "ระดับ", "level"],
  },
  {
    name: "scan_product_info",
    description: "ค้นหาข้อมูลสินค้าจากการสแกน",
    keywords: ["สแกน", "สินค้า", "บาร์โค้ด", "scan", "product", "barcode", "qr"],
  },
];

// ── Mock RAG knowledge base ─────────────────────────────────────
const KNOWLEDGE_BASE: Record<string, string[]> = {
  search_health_knowledge: [
    "การออกกำลังกาย 150 นาทีต่อสัปดาห์ช่วยลดความเสี่ยงโรคหัวใจได้ 30%",
    "ดื่มน้ำอย่างน้อย 8 แก้วต่อวันเพื่อสุขภาพที่ดี",
    "การนอนหลับ 7-9 ชั่วโมงต่อคืนช่วยเสริมระบบภูมิคุ้มกัน",
    "ค่า BMI ปกติอยู่ระหว่าง 18.5-24.9",
    "ผักและผลไม้ 5 สีช่วยให้ได้รับสารอาหารครบถ้วน",
    "ความดันโลหิตปกติควรอยู่ที่ 120/80 mmHg",
    "การเดิน 10,000 ก้าวต่อวันช่วยรักษาสุขภาพหัวใจ",
    "ข้อมูลสุขภาพวันนี้: ก้าวเดิน 8,247 ก้าว, แคลอรี่ 1,840 kcal, หัวใจเต้น 72 bpm, นอน 7.2 ชม., BMI 22.4, ความดัน 118/76, ออกซิเจน 98%",
  ],
  lookup_privileges: [
    "คูปองส่วนลด 20% ร้านอาหารสุขภาพ (หมดเขต 30 เม.ย. 2026)",
    "แลก 500 แต้มรับฟรีตรวจสุขภาพประจำปี",
    "สิทธิพิเศษสมาชิก Gold: ส่วนลด 15% ร้านยา",
    "โปรโมชั่นใหม่: สะสมแต้มx2 เมื่อเดินครบ 8,000 ก้าว/วัน",
    "คะแนนสะสมปัจจุบัน: 275 คะแนน",
  ],
  find_nearby_shops: [
    "ร้านยา Pharma Plus - ห่าง 0.3 กม. (เปิด 08:00-22:00)",
    "คลินิกสุขภาพดี - ห่าง 0.5 กม. (เปิด 09:00-20:00)",
    "ร้านอาหารคลีน GreenEat - ห่าง 0.8 กม. (เปิด 10:00-21:00)",
    "ฟิตเนส FitLife - ห่าง 1.2 กม. (เปิด 06:00-23:00)",
  ],
  check_profile_rank: [
    "อันดับปัจจุบัน: Gold (แต้มสะสม 2,450)",
    "ต้องการอีก 550 แต้มเพื่อเลื่อนเป็น Platinum",
    "เดือนนี้เดินเฉลี่ย 7,200 ก้าว/วัน",
    "Badge ที่ได้รับ: นักเดิน, สายสุขภาพ, Early Bird",
    "สุขภาพโดยรวม: 92/100, การออกกำลังกาย: 78/100, กลุ่มกิจกรรม: 65/100",
  ],
  scan_product_info: [
    "สแกน QR Code เพื่อดูข้อมูลโภชนาการของสินค้า",
    "สินค้าล่าสุดที่สแกน: นมอัลมอนด์ (แคลอรี 30 kcal/100ml)",
    "สแกนใบเสร็จเพื่อสะสมแต้มอัตโนมัติ",
  ],
};

// ── Select tools based on user message ──────────────────────────
function selectTools(message: string): string[] {
  const lowerMsg = message.toLowerCase();
  const selected: string[] = [];

  for (const tool of TOOLS) {
    if (tool.keywords.some((kw) => lowerMsg.includes(kw.toLowerCase()))) {
      selected.push(tool.name);
    }
  }

  if (selected.length === 0) {
    selected.push("search_health_knowledge");
  }

  return selected;
}

// ── Retrieve mock RAG context ───────────────────────────────────
function retrieveContext(toolNames: string[]): string[] {
  const docs: string[] = [];
  for (const name of toolNames) {
    const entries = KNOWLEDGE_BASE[name];
    if (entries) {
      const shuffled = [...entries].sort(() => Math.random() - 0.5);
      docs.push(...shuffled.slice(0, 3));
    }
  }
  return docs;
}

// ── Build system prompt ─────────────────────────────────────────
function buildSystemPrompt(toolNames: string[], context: string[]): string {
  const toolList = toolNames
    .map((name) => {
      const tool = TOOLS.find((t) => t.name === name);
      return tool ? `- ${tool.name}: ${tool.description}` : "";
    })
    .filter(Boolean)
    .join("\n");

  const contextStr = context.map((c) => `- ${c}`).join("\n");

  return `คุณคือ "Health Hub AI Assistant" ผู้ช่วยด้านสุขภาพอัจฉริยะในแอปพลิเคชัน Health Hub (รวมสุข)
คุณเป็น AI Agent ที่สามารถเลือกใช้เครื่องมือต่างๆ เพื่อตอบคำถามผู้ใช้

## เครื่องมือที่เลือกใช้สำหรับคำถามนี้:
${toolList}

## ข้อมูลที่ดึงมาจากฐานข้อมูล (RAG Context):
${contextStr}

## กฎการตอบ:
- ตอบเป็นภาษาไทยเสมอ
- ใช้ข้อมูลจาก RAG Context ด้านบนเป็นหลักในการตอบ
- ตอบกระชับ ตรงประเด็น ไม่เกิน 3-4 ประโยค
- ใส่ emoji เล็กน้อยเพื่อความเป็นกันเอง
- หากไม่มีข้อมูลเพียงพอ ให้แนะนำให้ผู้ใช้ปรึกษาแพทย์
- อย่าแต่งข้อมูลที่ไม่มีใน context`;
}

// ── POST handler ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Step 1: Agent selects tools
    const selectedTools = selectTools(message);

    // Step 2: RAG retrieval
    const context = retrieveContext(selectedTools);

    // Step 3: Build messages for LLM
    const systemPrompt = buildSystemPrompt(selectedTools, context);

    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(history)
        ? history.slice(-10).map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          }))
        : []),
      { role: "user", content: message },
    ];

    // Step 4: Call OpenRouter API (or fallback to mock)
    let reply: string;

    if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "your-openrouter-api-key-here") {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: chatMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouter error:", response.status, errorText);
        reply = "ขออภัยค่ะ ระบบ AI ขัดข้อง กรุณาลองใหม่อีกครั้ง 🙏";
      } else {
        const data = await response.json();
        reply = data.choices?.[0]?.message?.content ?? "ขออภัยค่ะ ไม่สามารถประมวลผลได้ 🙏";
      }
    } else {
      // Fallback: mock response when no API key
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800));
      const contextStr = context.map((c) => `• ${c}`).join("\n");
      reply = `จากการค้นหาข้อมูลให้คุณ ฉันพบข้อมูลที่เกี่ยวข้องดังนี้:\n\n${contextStr}\n\nหากต้องการข้อมูลเพิ่มเติม สามารถถามได้เลยค่ะ 😊\n\n⚠️ (Mock mode — ใส่ OPENROUTER_API_KEY ใน .env.local เพื่อเชื่อมต่อ AI จริง)`;
    }

    return NextResponse.json({
      reply,
      agent: {
        tools_used: selectedTools.map((name) => {
          const tool = TOOLS.find((t) => t.name === name);
          return { name, description: tool?.description ?? "" };
        }),
        rag_documents: context,
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
