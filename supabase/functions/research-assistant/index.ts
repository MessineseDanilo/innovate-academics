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
    const { message, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Research context based on publications
    const researchContext = `
You are an AI research assistant for an academic researcher specializing in:
- Artificial Intelligence and Machine Learning applications in business
- Strategic Decision-Making and Organizational Behavior
- Entrepreneurship and Innovation

Published Research Areas:
1. AI-Augmented Decision-Making in Strategic Management (Strategic Management Journal, 2024)
2. Machine Learning and Entrepreneurial Decision Quality (Organization Science, 2023)
3. Deep Learning Applications in Venture Capital Decision-Making (Under Review, 2024)
4. Cognitive Biases in AI-Assisted Strategic Planning (Under Review, 2024)
5. Neural Networks and Entrepreneurial Pattern Recognition (R&R, 2024)
6. Strategic Decision-Making in AI-Enabled Organizations (Under Review, 2024)

Your role:
- Summarize research themes and connections
- Answer questions about AI, decision-making, and entrepreneurship
- Explain how different research areas intersect
- Provide insights based on the published work
- Keep responses clear, academic, and concise (2-3 paragraphs max)
- If asked about specific papers, provide summaries based on their titles and themes
- Always ground responses in the research areas listed above

Be professional, knowledgeable, and helpful. Avoid making claims about specific findings unless they can be inferred from the paper titles and themes.
`;

    const messages = [
      { role: "system", content: researchContext },
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
    console.error('Error in research-assistant function:', error);
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
