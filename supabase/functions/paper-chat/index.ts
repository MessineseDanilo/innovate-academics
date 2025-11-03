import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, paper, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Create paper-specific context
    const paperContext = `
You are an AI research assistant helping users understand a specific academic paper.

Paper Details:
Title: ${paper.title}
Authors: ${paper.authors}
Journal/Status: ${paper.journal}
Year: ${paper.year}
Research Areas: ${paper.categories.join(", ")}
${paper.status ? `Status: ${paper.status}` : ''}

Your role:
- Answer questions about this specific paper concisely
- Keep responses SHORT and TO THE POINT (maximum 3-4 sentences or 1 short paragraph)
- Be clear and direct - avoid lengthy explanations
- If asked about specific findings or data you don't have, briefly acknowledge that the full paper would need to be consulted
- Use bullet points for multiple points when appropriate

Research Context:
${paper.categories.includes("ai") ? "This paper explores artificial intelligence applications in business and organizational contexts." : ""}
${paper.categories.includes("decisions") ? "This paper examines strategic decision-making processes and organizational behavior." : ""}
${paper.categories.includes("entrepreneurship") ? "This paper investigates entrepreneurship, innovation, and venture creation." : ""}

IMPORTANT: Keep all responses brief and focused. No long paragraphs.
`;

    const messages = [
      { role: "system", content: paperContext },
      ...(conversationHistory || []),
      { role: "user", content: message }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in paper-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
