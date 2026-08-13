import { 
  userProfile, 
  currentPlan, 
  billingOverview, 
  receiptComparison, 
  planBenefits, 
  chatHistory, 
  initialMessages 
} from '../data/mockData';

/**
 * Movistar AI Billing Agent Service Layer
 * Clean interfaces ready for future Supabase / n8n / Gemini AI integration.
 */

// Simulated async delay helper
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserProfile = async () => {
  await delay(200);
  return userProfile;
};

export const getCurrentPlan = async () => {
  await delay(200);
  return currentPlan;
};

export const getBillingOverview = async () => {
  await delay(300);
  return billingOverview;
};

export const getReceiptComparison = async () => {
  await delay(300);
  return receiptComparison;
};

export const getPlanBenefits = async () => {
  await delay(300);
  return planBenefits;
};

export const getChatHistory = async () => {
  await delay(200);
  return chatHistory;
};

export const getInitialMessages = async () => {
  await delay(300);
  return initialMessages;
};

import { sendMessage as chatServiceSendMessage } from './chatService';

/**
 * Send user prompt to Lucía AI (delegates to chatService -> n8n Webhook)
 */
export const sendMessageToLuciaAI = async (userPrompt) => {
  return await chatServiceSendMessage(userPrompt);
};

