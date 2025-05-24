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

  const httpServer = createServer(app);
  return httpServer;
}
