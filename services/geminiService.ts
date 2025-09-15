// FIX: Implementing the Gemini API service to power AI features.
import {  GenerateContentResponse } from "@google/genai";
import { SalesRecord, ChatMessage, CoachInsight, Meeting, MeetingNotes } from '../types';

// Frontend now calls a Netlify Function to keep GEMINI_API_KEY server-side.
const API_BASE = "/.netlify/functions/gemini"; // works locally with `netlify dev` and in production

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
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generateCoachInsights', payload: { salesData } })
    });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    return json.data as CoachInsight[];
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

  // Replace streaming with single-response via function for simplicity
  async function* generator() {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'continueChat', payload: { messages, salesData } })
    });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    // Emit one chunk compatible with existing consumer (using text field)
    yield { text: json.data } as unknown as GenerateContentResponse;
  }
  return generator();
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

    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generateMeetingPrep', payload: { meeting, salesData } })
    });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    return json.data as MeetingNotes;
};
