import { users, demoRequests, type User, type InsertUser, type DemoRequest, type InsertDemoRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private demoRequests: Map<number, DemoRequest>;
  private currentUserId: number;
  private currentDemoRequestId: number;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
    this.currentUserId = 1;
    this.currentDemoRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const id = this.currentDemoRequestId++;
    const demoRequest: DemoRequest = { 
      ...insertRequest, 
      email: insertRequest.email || null,
      requirements: insertRequest.requirements || null,
      id,
      createdAt: new Date()
    };
    this.demoRequests.set(id, demoRequest);
    
    // Send to webhook - this must succeed for the request to be considered successful
    const webhookData = {
      fullName: insertRequest.fullName,
      phone: insertRequest.phone,
      email: insertRequest.email || "",
      requirements: insertRequest.requirements || "",
      timestamp: new Date().toISOString()
    };

    // Set environment variable to ignore SSL certificate errors
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
      const response = await fetch("http://n8n.tr1nh.net/webhook-test/c589f124-73e3-4998-a9e1-6edcadd3a16b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      // Reset the environment variable
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

      if (!response.ok) {
        console.error("Webhook failed:", response.status, response.statusText);
        throw new Error(`Webhook failed with status: ${response.status}`);
      } else {
        console.log("Webhook sent successfully:", response.status);
      }
    } catch (error) {
      console.error("Error sending to webhook:", error);
      // Reset the environment variable even if there's an error
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
      // Re-throw the error so the API returns an error response
      throw new Error("Không thể gửi thông tin đến hệ thống. Vui lòng thử lại sau.");
    }
    
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
