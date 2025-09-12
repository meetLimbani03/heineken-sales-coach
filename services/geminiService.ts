// FIX: Implementing the Gemini API service to power AI features.
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SalesRecord, ChatMessage, CoachInsight, Meeting, MeetingNotes } from '../types';

// Initialize the GoogleGenAI client lazily and read the key via Vite envs.
// In production on Netlify, missing envs must not crash the app at import time.
let ai: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI | null => {
  if (ai) return ai;
  const apiKey = import.meta?.env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    // Do not throw here; return null so callers can handle gracefully
    console.warn("Gemini API key is missing. Set VITE_GEMINI_API_KEY in your environment.");
    return null;
  }
  ai = new GoogleGenAI({ apiKey });
  return ai;
};

export const generateCoachInsights = async (salesData: SalesRecord[]): Promise<CoachInsight[]> => {
  const model = "gemini-2.5-flash";
  const salesDataSummary = salesData.slice(0, 20).map(r => `Account: ${r.account_name}, Brand: ${r.Brand}, Quantity: ${r['Qty in HLs']} HLs`).join('\n');
  
  const prompt = `Based on the following recent sales data, generate 3-5 concise coaching insights for a Heineken sales representative. For each insight, provide a type, a short title, a one-sentence description, and a prompt for the user to ask for more details.

Sales Data:
${salesDataSummary}

The insight 'type' must be one of: 'Upsell', 'Risk', 'Promotion', 'Performance', 'Opportunity'.
The 'title' should be a catchy headline.
The 'description' should be a single, actionable sentence.
The 'prompt' should be a question the sales rep can ask the AI to elaborate on the insight.

Return the response as a JSON array.`;

  try {
    const client = getAiClient();
    if (!client) {
      return [{
        type: 'Risk',
        title: 'AI is not configured',
        description: 'Set VITE_GEMINI_API_KEY to enable coach insights.',
        prompt: 'How do I configure the AI key?'
      }];
    }

    const response = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                enum: ['Upsell', 'Risk', 'Promotion', 'Performance', 'Opportunity'],
                description: 'The category of the insight.'
              },
              title: {
                type: Type.STRING,
                description: 'A short, catchy title for the insight.'
              },
              description: {
                type: Type.STRING,
                description: 'A one-sentence description of the insight.'
              },
              prompt: {
                type: Type.STRING,
                description: 'A question a user can ask to get more details.'
              }
            },
            required: ['type', 'title', 'description', 'prompt']
          }
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CoachInsight[];
  } catch (error) {
    console.error("Error generating coach insights:", error);
    // Return a default error insight
    return [{
      type: 'Risk',
      title: 'Failed to Generate Insights',
      description: 'There was an issue connecting to the AI coach. Please try again later.',
      prompt: 'Why did my insights fail to load?',
    }];
  }
};

export const continueChat = async (messages: ChatMessage[], salesData: SalesRecord[]): Promise<AsyncGenerator<GenerateContentResponse>> => {
  const model = "gemini-2.5-flash";

  const salesDataSummary = "Here is a summary of the sales data for context:\n" +
    salesData.slice(0, 30).map(r =>
      `- Account: ${r.account_name}, Brand: ${r.Brand}, Quantity: ${r['Qty in HLs']} HLs, Date: ${r['Trans Date']}`
    ).join('\n');

  const systemInstruction = `You are an expert AI Sales Coach for Heineken sales representatives. Your goal is to help them analyze their sales data, prepare for meetings, and improve their sales strategy. Be concise, insightful, and always professional. Use the provided sales data to answer questions.
${salesDataSummary}`;
  
  const contents = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
  }));

  const client = getAiClient();
  if (!client) {
    throw new Error("Gemini API key missing");
  }

  const stream = await client.models.generateContentStream({
    model,
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return stream;
};

export const generateMeetingPrep = async (meeting: Meeting, salesData: SalesRecord[]): Promise<MeetingNotes> => {
    const model = "gemini-2.5-flash";

    const accountSalesData = salesData.filter(r => r.account_name === meeting.accountName);
    const salesSummary = accountSalesData.length > 0
        ? "Recent sales data for this account:\n" + accountSalesData.map(r => `- ${r['Trans Date']}: ${r.Brand} - ${r['Qty in HLs']} HLs`).join('\n')
        : "No recent sales data found for this account.";

    const prompt = `
I am a Heineken sales representative preparing for a meeting with "${meeting.accountName}".
My objective is: "${meeting.objective}".
Known issues are: "${meeting.currentIssues.join(', ')}".

Here is the recent sales data for this account:
${salesSummary}

Please generate preparation notes for the following four sections:
1.  **Customer Info**: Key contact person, outlet tier, contractual terms, customer persona.
2.  **Analyze Performance**: Summary of historical sales, competition analysis, and key takeaways from past visits.
3.  **Set Objectives**: Suggest 2-3 clear, achievable goals for this specific meeting.
4.  **Prepare Materials**: List necessary documents, selling stories, and merchandising materials to bring.

For each section, provide a concise summary as a single string, using bullet points with markdown ('•').
`;

    const client = getAiClient();
    if (!client) {
      return {
        customerInfo: "AI key missing. Configure VITE_GEMINI_API_KEY to enable meeting prep.",
        analyzePerformance: "",
        setObjectives: "",
        prepareMaterials: ""
      };
    }

    const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    customerInfo: { type: Type.STRING, description: "Details about the customer, contact person, and outlet." },
                    analyzePerformance: { type: Type.STRING, description: "Analysis of sales performance and competition." },
                    setObjectives: { type: Type.STRING, description: "Specific objectives for the meeting." },
                    prepareMaterials: { type: Type.STRING, description: "List of materials to prepare for the meeting." }
                },
                required: ["customerInfo", "analyzePerformance", "setObjectives", "prepareMaterials"]
            }
        }
    });
    
    return JSON.parse(response.text) as MeetingNotes;
};
