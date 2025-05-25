import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request submission endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      console.log("Received data:", req.body);
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validatedData);
      
      res.json({ 
        success: true, 
        message: "Đăng ký demo thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.",
        id: demoRequest.id 
      });
    } catch (error) {
      console.log("Validation error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Lỗi hệ thống, vui lòng thử lại sau"
        });
      }
    }
  });

  // Get all demo requests (for admin)
  app.get("/api/demo-requests", async (req, res) => {
    try {
      const requests = await storage.getDemoRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi hệ thống"
      });
    }
  });

    // Generate Facebook content using Gemini AI
  app.post("/api/generate-content", async (req, res) => {
    try {
      const { topic, tone, date, time } = req.body;
      
      if (!topic || !tone) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp đầy đủ thông tin chủ đề và tone"
        });
      }
      const prompt = `Tạo một bài đăng Facebook chuyên nghiệp cho trang Auto Marketing - AMK (lĩnh vực auto marketing) về chủ đề "${topic}" với tone ${tone}. 
      
Yêu cầu:
- Viết bằng tiếng Việt
- Không sử dụng định dạng markdown hoặc in đậm; văn bản thuần
- Độ dài khoảng 100-200 từ
- Sử dụng emoji phù hợp
- Có call-to-action rõ ràng
- Phù hợp cho fanpage của trường đại học/doanh nghiệp
- Kết thúc với hashtag phù hợp
- Tone: ${tone}
Hãy tạo nội dung hấp dẫn, tự nhiên và thu hút người đọc.`;
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });
      if (!geminiResponse.ok) {
        throw new Error(`Gemini API error: ${geminiResponse.status}`);
      }
      const geminiData = await geminiResponse.json();
      const generatedContent = geminiData.candidates[0].content.parts[0].text;
      res.json({
        success: true,
        content: generatedContent,
        metadata: {
          topic,
          tone,
          date,
          time,
          generatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({
        success: false,
        message: "Không thể tạo nội dung. Vui lòng thử lại sau."
      });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
