import { type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getMessages(sessionId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  generateBotResponse(userMessage: string): Promise<string>;
}

export class MemStorage implements IStorage {
  private messages: Map<string, Message>;

  constructor() {
    this.messages = new Map();
  }

  async getMessages(sessionId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      id,
      content: insertMessage.content,
      isUser: insertMessage.isUser,
      sessionId: insertMessage.sessionId,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async generateBotResponse(userMessage: string): Promise<string> {
    // Simple AI-like responses for the prototype
    const responses = [
      "I understand your request. As your SynapseOps assistant, I'm here to help you navigate and optimize your workflows.",
      "That's an interesting point. Let me process that information and provide you with the most relevant insights.",
      "Based on your input, I can see you're looking for intelligent automation solutions. SynapseOps specializes in exactly that.",
      "Excellent question! Our neural network architecture is designed to adapt and learn from your specific use cases.",
      "I'm analyzing your requirements through our advanced AI models. This will help me provide more targeted assistance.",
      "Your request has been processed through our intelligent systems. Let me break down the optimal approach for you."
    ];
    
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('help')) {
      return "I'm here to assist you! SynapseOps provides intelligent automation and AI-driven solutions. What specific area would you like to explore?";
    }
    if (lowerMessage.includes('synapse') || lowerMessage.includes('company')) {
      return "SynapseOps is your intelligent operations partner. We leverage cutting-edge AI to streamline workflows and enhance decision-making processes.";
    }
    if (lowerMessage.includes('ai') || lowerMessage.includes('intelligence')) {
      return "Our AI systems are built on advanced neural networks that continuously learn and adapt. We focus on practical intelligence that drives real business value.";
    }
    
    // Random response for other messages
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const storage = new MemStorage();
