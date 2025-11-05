import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, FileText, Newspaper, Filter, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from "date-fns";

const CuratedInsights = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<number>>(new Set());

  const insights = [
    {
      type: "podcast",
      icon: Podcast,
      title: "Humans&: Bridging IQ and EQ in Machine Learning with Eric Zelikman",
      description: "Explores the opportunity to shift AI development focus from pure IQ to emotional intelligence, discussing how to build machine learning systems that bridge both dimensions.",
      abstract: "The AI industry is obsessed with making models smarter. But what if they're building the wrong kind of intelligence? In launching his new venture, humans&, Eric Zelikman sees an opportunity to shift the focus from pure IQ to emotional intelligence in machine learning. This conversation explores how bridging IQ and EQ can create more effective AI systems that better understand and interact with humans, challenging the conventional wisdom about what makes AI truly intelligent.",
      author: "Eric Zelikman, No Priors Podcast",
      date: new Date("2024-10-09"),
      link: "https://podcasts.apple.com/es/podcast/humans-bridging-iq-and-eq-in-machine-learning-with/id1668002688?i=1000730965998",
      color: "text-purple-600",
      badge: "Podcast",
      topics: ["AI", "Innovation"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Generating Creative Chess Puzzles",
      description: "Presents a reinforcement learning framework for generating creative, counter-intuitive chess puzzles using AI, achieving results that surpass existing datasets and are acknowledged by world-renowned experts.",
      abstract: "While Generative AI rapidly advances in various domains, generating truly creative, aesthetic, and counter-intuitive outputs remains a challenge. This paper presents an approach to tackle these difficulties in the domain of chess puzzles using an RL framework with novel rewards based on chess engine search statistics. The rewards enhance a puzzle's uniqueness, counter-intuitiveness, diversity, and realism. The approach dramatically increases counter-intuitive puzzle generation by 10x, from 0.22% to 2.5%, surpassing existing dataset rates and producing puzzles rated by human experts as more creative, enjoyable, and counter-intuitive than composed book puzzles.",
      author: "Xidong Feng et al., Google DeepMind",
      date: new Date("2025-10-27"),
      link: "https://arxiv.org/pdf/2510.23881",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["AI", "Innovation"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Science in the Age of Algorithms",
      description: "Explores how algorithms will fundamentally reorganize scientific practice, formalizing off-screen processes like idea generation and enabling new modes of theorizing, especially in patchwork sciences.",
      abstract: "Algorithms will not simply contribute to science; they will reorganize it. We sketch how science will look in the near future. Notably, algorithms will formalize crucial parts of science that currently happen off screen — such as new idea generation or intuitions about what theories matter. They will enable fundamentally different modes of theorizing. These changes will most affect what we call the 'patchwork sciences,' which includes fields such as economics, chemistry, biology, medicine and psychology. In short, we argue that the methods of science will look very different in a world where algorithms can process data, reason and form their own models of the world.",
      author: "Sendhil Mullainathan & Ashesh Rambachan, MIT & NBER",
      date: new Date("2025-10-10"),
      link: "https://www.nber.org/system/files/chapters/c15321/c15321.pdf",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["AI", "Innovation"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Aligning generalization between humans and machines",
      description: "Identifies key commonalities and differences in how humans and machines generalize, proposing interdisciplinary challenges for effective alignment in human-AI teaming scenarios.",
      abstract: "Recent advances in artificial intelligence (AI)—including generative approaches—have resulted in technology that can support humans in scientific discovery and forming decisions. A crucial yet often overlooked aspect of human-AI interactions is the different ways in which humans and machines generalize. In cognitive science, human generalization commonly involves abstraction and concept learning. By contrast, AI generalization encompasses out-of-domain generalization in machine learning, rule-based reasoning in symbolic AI, and abstraction in neurosymbolic AI. This paper combines insights from AI and cognitive science to identify key commonalities and differences across three dimensions: notions of, methods for, and evaluation of generalization, mapping different conceptualizations and considering their role for alignment in human-AI teaming.",
      author: "Filip Ilievski et al., Nature Machine Intelligence",
      date: new Date("2025-09-15"),
      link: "https://media.licdn.com/dms/document/media/v2/D4D1FAQFA_wTO97jSHw/feedshare-document-pdf-analyzed/B4DZmlCv85IEAY-/0/1759410589502",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["AI", "Innovation"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "From Predictive Algorithms to Automatic Generation of Anomalies",
      description: "Explores how to extract theoretical insights from machine learning black boxes using constructed anomalies that highlight flaws in existing theories and spur new developments.",
      abstract: "Machine learning algorithms can find predictive signals that researchers fail to notice; yet they are notoriously hard-to-interpret. How can we extract theoretical insights from these black boxes? History provides a clue. Facing a similar problem – how to extract theoretical insights from their intuitions – researchers often turned to 'anomalies:' constructed examples that highlight flaws in an existing theory and spur the development of new ones. This paper develops a framework for automatically generating anomalies from predictive algorithms to bridge the gap between machine learning's predictive power and theoretical understanding.",
      author: "Sendhil Mullainathan et al., NBER",
      date: new Date("2024-05-01"),
      link: "https://www.nber.org/system/files/working_papers/w32422/w32422.pdf",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["AI", "Innovation"],
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Hypotheses devised by AI could find 'blind spots' in research",
      description: "Explores how AI systems can generate novel scientific hypotheses and identify overlooked patterns in research, potentially revolutionizing scientific discovery.",
      abstract: "Scientists are exploring the use of AI systems to automatically generate scientific hypotheses, potentially identifying overlooked patterns and 'blind spots' in research. These AI tools analyze vast amounts of scientific literature and data to propose novel hypotheses that human researchers might miss, offering a new approach to accelerate scientific discovery and address biases in research focus.",
      author: "Matthew Hutson, Nature",
      date: new Date("2024-01-15"),
      link: "#",
      color: "text-emerald-600",
      badge: "Practitioner-oriented article",
      topics: ["AI", "Innovation"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Modeling the Change of Paradigm: Non-Bayesian Reactions to Unexpected News",
      description: "Examines how individuals update their beliefs when confronted with unexpected information, proposing a model of non-Bayesian learning that captures paradigm shifts in thinking.",
      abstract: "This paper proposes a model of non-Bayesian learning to capture how individuals update their beliefs when confronted with unexpected information. The model shows that individuals may exhibit paradigm shifts in their thinking, radically changing their beliefs in response to surprising evidence. This framework provides insights into phenomena such as scientific revolutions, political realignments, and market crashes, where conventional Bayesian updating fails to explain observed behavior.",
      author: "Pietro Ortoleva, AER 2012",
      date: new Date("2012-06-01"),
      link: "#",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["Innovation", "Entrepreneurship"],
    },
  ];

  const types = [
    { value: "paper", label: "Research Paper", icon: FileText },
    { value: "podcast", label: "Podcast", icon: Podcast },
    { value: "article", label: "Practitioner-oriented article", icon: Newspaper },
  ];

  const topics = ["AI", "Entrepreneurship", "Innovation"];

  const filteredInsights = insights.filter((insight) => {
    const typeMatch = !selectedType || insight.type === selectedType;
    const topicMatch = !selectedTopic || insight.topics.includes(selectedTopic);
    return typeMatch && topicMatch;
  });

  return (
    <section id="curated-insights" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Curated Insights
          </h2>
          <p className="text-lg text-muted-foreground italic">
            A personal selection of ideas, papers, and conversations outside my field that I've found inspiring.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4 animate-fade-in">
          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Type:</span>
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All
            </Button>
            {types.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className="gap-2"
              >
                <type.icon size={14} />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Topic Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Topic:</span>
            <Button
              variant={selectedTopic === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTopic(null)}
            >
              All
            </Button>
            {topics.map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((item, index) => {
            const isExpanded = expandedAbstracts.has(index);
            
            return (
              <Card
                key={index}
                className="group hover:shadow-elegant transition-smooth border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-2 rounded-lg bg-background ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-semibold text-foreground leading-tight group-hover:text-primary transition-smooth">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <Collapsible open={isExpanded} onOpenChange={(open) => {
                    setExpandedAbstracts(prev => {
                      const newSet = new Set(prev);
                      if (open) {
                        newSet.add(index);
                      } else {
                        newSet.delete(index);
                      }
                      return newSet;
                    });
                  }}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between text-xs"
                      >
                        <span>{isExpanded ? "Hide" : "Show"} Abstract</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-3 rounded-md">
                        {item.abstract}
                      </p>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {format(item.date, "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground font-medium">
                        {item.author}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => window.open(item.link, '_blank')}
                      >
                        <ExternalLink 
                          size={16} 
                          className="text-muted-foreground group-hover:text-primary transition-smooth" 
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuratedInsights;
