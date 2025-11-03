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

    // Create paper-specific context with real paper details
    const paperDetails: Record<string, string> = {
      "Design- and Theory-Based Approaches to Strategic Decisions": `
PAPER DETAILS:
- Authors: Alfonso Gambardella (Bocconi University), Danilo Messinese (IE University)
- Journal: Organization Science, 2025, Vol. 36(4):1271-1287
- Award: Best Paper, AOM 2022, TIM Division

METHODOLOGY:
- Three-arm randomized controlled trial (RCT) with 308 early-stage entrepreneurs in Italy (2020-2022)
- Three groups: Design-based Experimentation (DbE), Theory-based Experimentation (TbE), and Natural Heuristic control (NH)
- Tracked over approximately 1.5 years

KEY CONCEPTS:
1. Design-based Experimentation (DbE): Focus on shaping and designing an environment favorable to entrepreneur's goals. Entrepreneurs actively co-create with stakeholders to transform the environment. Similar to Airbnb's approach - going door-to-door, implementing actions that shape odds of success.

2. Theory-based Experimentation (TbE): Predictive forward-looking perspective using scientific experimentation of business theories. Testing future scenarios through hypothesis testing. Similar to Dropbox's approach - testing MVP, collecting data, iterating based on feedback.

MAIN FINDINGS:
- Both approaches reduce information needs and increase commitment rates vs. control
- DbE: Encourages action despite negative beliefs, results in LESS frequent and LATER termination
- TbE: More conservative, leads to EARLIER and MORE frequent termination
- TbE: Higher average performance upon survival
- DbE: Fosters BREAKTHROUGHS - better for innovative, patent-based ventures
- DbE suited for innovative ventures gathering info to shape environment
- TbE optimal for high performance under lower uncertainty

PRACTICAL IMPLICATIONS:
- Policy: TbE for fewer but more successful initiatives; DbE for larger ecosystems and breakthrough ideas
- VC/Corporations: TbE is conservative high-performing; DbE captures innovative outliers`,

      "A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension": `
PAPER DETAILS:
- Authors: Camuffo, Gambardella, Messinese, Novelli, Paolucci, Spina
- Journal: Strategic Management Journal, 2024, Vol. 45:1209-1237
- Award: Best Experimental Paper, 2024 IGL Research Prize

METHODOLOGY:
- Large-scale replication combining FOUR RCTs with 759 firms (11,463 data points)
- RCT1: Milan 2016 (original Camuffo et al. 2020)
- RCT2: Milan 2017
- RCT3: Turin 2018 (tech hub)
- RCT4: London 2019 (broader population)

KEY CONCEPTS:
Scientific Approach = entrepreneurs behave like scientists:
1. Develop theories about future state space
2. Form hypotheses logically flowing from theory
3. Test predictions rigorously
4. Update beliefs based on evidence

TWO MECHANISMS IDENTIFIED:
1. Efficient Search: Higher efficiency in scanning possible solutions, prioritizing ideas more likely to succeed
2. Methodic Doubt: Heightened awareness of contingencies that could make ideas fail. Ideas only valuable with thorough reasoning and consistent evidence.

MAIN FINDINGS (vs original small study):
- POSITIVE effect on idea TERMINATION (consistent across all 3 new RCTs)
- NONLINEAR effect on radical pivots: Treatment increases likelihood of pivoting 1-2 times, but DECREASES likelihood of zero pivots or many pivots (>2)
- Result: More "FOCUSED" pivoting - scientific approach leads to thoughtful strategic changes vs. no changes or constant changes
- Higher PERFORMANCE for firms using scientific approach
- Methodic doubt mechanism DOMINATES efficient search → raises terminations
- Efficient search → more focused pivots (pivot once/twice vs. no/many pivots)

PRACTICAL IMPLICATIONS:
- Scientific approach CAN BE TAUGHT to entrepreneurs
- Improves termination of non-promising projects
- Leads to focused strategic pivoting
- Results in higher performance
- Entrepreneurs learn to combine cognition with action under uncertainty`
    };

    const paperContext = paperDetails[paper.title] || "";

    const systemPrompt = `
You are an AI research assistant helping users understand a specific academic paper.

${paperContext}

CRITICAL INSTRUCTIONS:
- Keep responses VERY SHORT and DIRECT (maximum 3-4 sentences)
- Use bullet points for listing multiple items
- Answer based on the specific details provided above
- If asked about details not in the summary, say "The full paper would provide more details on this"
- Be precise about numbers, methodology, and findings
- Cite specific results when relevant

Paper being discussed:
Title: ${paper.title}
Authors: ${paper.authors}
Journal: ${paper.journal}
Year: ${paper.year}
`;

    const messages = [
      { role: "system", content: systemPrompt },
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
