// Azure OpenAI API service to power AI features.
import { SalesRecord, ChatMessage, CoachInsight, Meeting, MeetingNotes } from '../types';

// Frontend now calls a Netlify Function to keep AZURE_OPENAI_API_KEY server-side.
const API_BASE = "/.netlify/functions/azure-openai"; // works locally with `netlify dev` and in production

export const generateCoachInsights = async (salesData: SalesRecord[]): Promise<CoachInsight[]> => {
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

// Simple response interface for chat continuations
export interface ChatResponse {
  text: string;
}

export const continueChat = async (messages: ChatMessage[], salesData: SalesRecord[]): Promise<AsyncGenerator<ChatResponse>> => {
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
    yield { text: json.data } as ChatResponse;
  }
  return generator();
};

export const generateMeetingPrep = async (meeting: Meeting, salesData: SalesRecord[]): Promise<MeetingNotes> => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generateMeetingPrep', payload: { meeting, salesData } })
    });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    return json.data as MeetingNotes;
};