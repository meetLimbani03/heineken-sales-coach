import type { Handler } from '@netlify/functions';
import { AzureOpenAI } from 'openai';

const getClient = () => {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview';

  if (!apiKey) throw new Error('AZURE_OPENAI_API_KEY is not set');
  if (!endpoint) throw new Error('AZURE_OPENAI_ENDPOINT is not set');

  return new AzureOpenAI({
    apiKey,
    endpoint,
    apiVersion,
  });
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
      const deploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;
      if (!deploymentName) throw new Error('AZURE_OPENAI_CHAT_DEPLOYMENT_NAME is not set');

      const salesDataSummary = (salesData || []).slice(0, 20)
        .map((r: any) => `Account: ${r.account_name}, Brand: ${r.Brand}, Quantity: ${r['Qty in HLs']} HLs`)
        .join('\n');

      const prompt = `Based on the following recent sales data, generate 3-5 concise coaching insights for a Heineken sales representative. For each insight, provide a type, a short title, a one-sentence description, and a prompt for the user to ask for more details.

Sales Data:
${salesDataSummary}

The insight 'type' must be one of: 'Upsell', 'Risk', 'Promotion', 'Performance', 'Opportunity'.
The 'title' should be a catchy headline.
The 'description' should be a single, actionable sentence.
The 'prompt' should be a question the sales rep can ask the AI to elaborate on the insight.

You must return a valid JSON object with an "insights" property containing an array. Use this exact structure:
{
  "insights": [
    {
      "type": "Upsell",
      "title": "Example Title",
      "description": "Example description.",
      "prompt": "Example question?"
    }
  ]
}`;

      const response = await ai.chat.completions.create({
        model: deploymentName,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || '{"insights": []}';
      console.log('Azure OpenAI Response:', content);

      const parsedContent = JSON.parse(content);
      const data = parsedContent.insights || parsedContent.data || [];
      return { statusCode: 200, body: JSON.stringify({ data }) };
    }

    if (action === 'continueChat') {
      const { messages, salesData } = payload as { messages: any[]; salesData: any[] };
      const deploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;
      if (!deploymentName) throw new Error('AZURE_OPENAI_CHAT_DEPLOYMENT_NAME is not set');

      const salesDataSummary = 'Here is a summary of the sales data for context:\n' +
        (salesData || []).slice(0, 30).map((r: any) => `- Account: ${r.account_name}, Brand: ${r.Brand}, Quantity: ${r['Qty in HLs']} HLs, Date: ${r['Trans Date']}`).join('\n');
      const systemInstruction = `You are an expert AI Sales Coach for Heineken sales representatives. Your goal is to help them analyze their sales data, prepare for meetings, and improve their sales strategy. Be concise, insightful, and always professional. Use the provided sales data to answer questions.\n${salesDataSummary}`;

      const chatMessages = [
        { role: 'system' as const, content: systemInstruction },
        ...(messages || []).map((m: any) => ({
          role: m.role === 'model' ? 'assistant' as const : m.role as 'user' | 'assistant',
          content: m.text
        }))
      ];

      const response = await ai.chat.completions.create({
        model: deploymentName,
        messages: chatMessages,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      return { statusCode: 200, body: JSON.stringify({ data: content }) };
    }

    if (action === 'generateMeetingPrep') {
      const { meeting, salesData } = payload as { meeting: any; salesData: any[] };
      const deploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;
      if (!deploymentName) throw new Error('AZURE_OPENAI_CHAT_DEPLOYMENT_NAME is not set');

      const accountSalesData = (salesData || []).filter((r: any) => r.account_name === meeting.accountName);
      const salesSummary = accountSalesData.length > 0
        ? 'Recent sales data for this account:\n' + accountSalesData.map((r: any) => `- ${r['Trans Date']}: ${r.Brand} - ${r['Qty in HLs']} HLs`).join('\n')
        : 'No recent sales data found for this account.';
      const prompt = `I am a Heineken sales representative preparing for a meeting with "${meeting.accountName}".\nMy objective is: "${meeting.objective}".\nKnown issues are: "${(meeting.currentIssues || []).join(', ')}".\n\nHere is the recent sales data for this account:\n${salesSummary}\n\nPlease generate preparation notes for the following four sections:\n1.  **Customer Info**\n2.  **Analyze Performance**\n3.  **Set Objectives**\n4.  **Prepare Materials**\n\nFor each section, provide a concise summary as a single string, using bullet points with markdown ('•').\n\nReturn the response as a JSON object with the following structure:\n{\n  "customerInfo": "string with bullet points",\n  "analyzePerformance": "string with bullet points",\n  "setObjectives": "string with bullet points",\n  "prepareMaterials": "string with bullet points"\n}`;

      const response = await ai.chat.completions.create({
        model: deploymentName,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || '{}';
      const data = JSON.parse(content);
      return { statusCode: 200, body: JSON.stringify({ data }) };
    }

    return { statusCode: 400, body: 'Unknown action' };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e?.message || 'Server error' }) };
  }
};

export default handler;