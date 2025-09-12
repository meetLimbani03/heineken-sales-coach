import type { Handler } from '@netlify/functions';
import { GoogleGenAI, Type } from '@google/genai';

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  return new GoogleGenAI({ apiKey });
};

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
    const body = JSON.parse(event.body || '{}');
    const { action, payload } = body as { action: string; payload: any };
    const ai = getClient();

    if (action === 'generateCoachInsights') {
      const { salesData } = payload as { salesData: any[] };
      const model = 'gemini-2.5-flash';
      const salesDataSummary = (salesData || []).slice(0, 20)
        .map((r: any) => `Account: ${r.account_name}, Brand: ${r.Brand}, Quantity: ${r['Qty in HLs']} HLs`)
        .join('\n');

      const prompt = `Based on the following recent sales data, generate 3-5 concise coaching insights for a Heineken sales representative. For each insight, provide a type, a short title, a one-sentence description, and a prompt for the user to ask for more details.\n\nSales Data:\n${salesDataSummary}\n\nThe insight 'type' must be one of: 'Upsell', 'Risk', 'Promotion', 'Performance', 'Opportunity'.\nThe 'title' should be a catchy headline.\nThe 'description' should be a single, actionable sentence.\nThe 'prompt' should be a question the sales rep can ask the AI to elaborate on the insight.\n\nReturn the response as a JSON array.`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                prompt: { type: Type.STRING }
              },
              required: ['type', 'title', 'description', 'prompt']
            }
          }
        }
      });
      return { statusCode: 200, body: JSON.stringify({ data: JSON.parse(response.text) }) };
    }

    if (action === 'continueChat') {
      const { messages, salesData } = payload as { messages: any[]; salesData: any[] };
      const model = 'gemini-2.5-flash';
      const salesDataSummary = 'Here is a summary of the sales data for context:\n' +
        (salesData || []).slice(0, 30).map((r: any) => `- Account: ${r.account_name}, Brand: ${r.Brand}, Quantity: ${r['Qty in HLs']} HLs, Date: ${r['Trans Date']}`).join('\n');
      const systemInstruction = `You are an expert AI Sales Coach for Heineken sales representatives. Your goal is to help them analyze their sales data, prepare for meetings, and improve their sales strategy. Be concise, insightful, and always professional. Use the provided sales data to answer questions.\n${salesDataSummary}`;
      const contents = (messages || []).map((m: any) => ({ role: m.role, parts: [{ text: m.text }] }));

      const response = await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction }
      });
      return { statusCode: 200, body: JSON.stringify({ data: response.text }) };
    }

    if (action === 'generateMeetingPrep') {
      const { meeting, salesData } = payload as { meeting: any; salesData: any[] };
      const model = 'gemini-2.5-flash';
      const accountSalesData = (salesData || []).filter((r: any) => r.account_name === meeting.accountName);
      const salesSummary = accountSalesData.length > 0
        ? 'Recent sales data for this account:\n' + accountSalesData.map((r: any) => `- ${r['Trans Date']}: ${r.Brand} - ${r['Qty in HLs']} HLs`).join('\n')
        : 'No recent sales data found for this account.';
      const prompt = `I am a Heineken sales representative preparing for a meeting with "${meeting.accountName}".\nMy objective is: "${meeting.objective}".\nKnown issues are: "${(meeting.currentIssues || []).join(', ')}".\n\nHere is the recent sales data for this account:\n${salesSummary}\n\nPlease generate preparation notes for the following four sections:\n1.  **Customer Info**\n2.  **Analyze Performance**\n3.  **Set Objectives**\n4.  **Prepare Materials**\n\nFor each section, provide a concise summary as a single string, using bullet points with markdown ('•').`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              customerInfo: { type: Type.STRING },
              analyzePerformance: { type: Type.STRING },
              setObjectives: { type: Type.STRING },
              prepareMaterials: { type: Type.STRING }
            },
            required: ['customerInfo', 'analyzePerformance', 'setObjectives', 'prepareMaterials']
          }
        }
      });
      return { statusCode: 200, body: JSON.stringify({ data: JSON.parse(response.text) }) };
    }

    return { statusCode: 400, body: 'Unknown action' };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e?.message || 'Server error' }) };
  }
};

export default handler;


