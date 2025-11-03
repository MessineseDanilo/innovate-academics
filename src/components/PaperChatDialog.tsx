import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  categories: string[];
  status?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PaperChatDialogProps {
  paper: Publication;
  isOpen: boolean;
  onClose: () => void;
}

const PaperChatDialog = ({ paper, isOpen, onClose }: PaperChatDialogProps) => {
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

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setInput("");
    }
  }, [isOpen, paper]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('paper-chat', {
        body: { 
          message: userMessage,
          paper: {
            title: paper.title,
            authors: paper.authors,
            journal: paper.journal,
            year: paper.year,
            categories: paper.categories,
            status: paper.status
          },
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
    "What is this paper about?",
    "What are the main contributions?",
    "How does this relate to other work?",
    "What are the practical implications?"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif pr-8">
            {paper.title}
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p className="text-sm">{paper.authors}</p>
            <div className="flex flex-wrap gap-2">
              {paper.status && (
                <Badge variant="outline" className="text-xs">
                  {paper.status}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {paper.journal}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {paper.year}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 min-h-[300px]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-8">
              <p className="text-muted-foreground text-center">
                Ask me anything about this paper
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                {suggestedQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(question)}
                    className="p-2 text-xs text-left border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-smooth"
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
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground border border-border"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[85%] p-3 rounded-lg bg-secondary border border-border">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this paper..."
            className="flex-1 min-h-[50px] max-h-[100px] resize-none text-sm"
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
            size="sm"
            className="h-[50px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center pt-2">
          AI responses are based on paper metadata and research themes
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default PaperChatDialog;
