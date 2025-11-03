import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const InteractiveResearchAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('research-assistant', {
        body: { 
          message: userMessage,
          conversationHistory: messages
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response 
      }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What are your main research areas?",
    "How does AI impact entrepreneurial decisions?",
    "Tell me about your work on strategic decision-making",
    "What is the connection between AI and innovation?"
  ];

  return (
    <section id="research-assistant" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-serif font-bold text-foreground">
                Interactive Research Assistant
              </h2>
            </div>
            <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
              This interactive tool uses AI to summarize and connect ideas from my research.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-elegant">
            <CardContent className="p-6 space-y-6">
              {/* Messages */}
              <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 pr-2">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[400px] space-y-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">
                        Ask me anything about the research areas:
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        AI • Decision-Making • Entrepreneurship • Innovation
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                      {suggestedQuestions.map((question, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(question)}
                          className="p-3 text-sm text-left border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-smooth"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground border border-border"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="max-w-[80%] p-4 rounded-lg bg-secondary border border-border">
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my research..."
                  className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-[60px] px-6"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center">
                Responses are generated by AI based on research themes and may not reflect exact paper content.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveResearchAssistant;
