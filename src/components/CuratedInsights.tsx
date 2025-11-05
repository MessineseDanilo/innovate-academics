import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, FileText, Newspaper, Filter, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CuratedInsights = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<number>>(new Set());
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const insights = [
    {
      type: "podcast",
      icon: Podcast,
      title: "Cursor CEO: Going Beyond Code, Superintelligent AI Agents And Why Taste Still Matters",
      description: "Michael Truell discusses building Cursor, reinventing software development, and why he's betting on a future beyond code where AI could eventually replace programming.",
      abstract: "Michael Truell, co-founder and CEO of Anysphere, the company behind Cursor, joins Garry to talk about building one of the fastest-growing startups of all time—and why he's betting on a future beyond code. He walks through the early insights that led his team to leave a promising AI-powered CAD project and instead chase a bigger dream: reinventing how software is written. From years of false starts and rewrites to Cursor's breakthrough moment, Michael explains what it takes to build a tool that could eventually replace programming as we know it. He also reflects on their first 10 hires, why taste still matters and how the decade ahead will unlock a new kind of creativity for builders everywhere.",
      author: "Michael Truell, Y Combinator Startup Podcast",
      date: new Date("2025-06-11"),
      link: "https://open.spotify.com/episode/0L59200BXdjwEHjXteAUPj?si=c9356eecd5c542f8",
      color: "text-purple-600",
      badge: "Podcast",
      source: "Spotify",
      topics: ["AI", "Innovation", "Entrepreneurship"],
    },
    {
      type: "podcast",
      icon: Podcast,
      title: "Fei-Fei Li: Spatial Intelligence is the Next Frontier in AI",
      description: "The godmother of AI recounts ImageNet's creation, the deep learning revolution, and why modeling the 3D world is essential for AGI—potentially more difficult than language.",
      abstract: "A fireside with Dr. Fei-Fei Li at AI Startup School in San Francisco. Dr. Fei-Fei Li is often called the godmother of AI—and for good reason. Before the world had AI as we know it, she was helping build the foundation. In this fireside, she recounts the creation of ImageNet, a project that helped ignite the deep learning revolution by providing the data backbone modern computer vision needed. She walks through the early belief in data-driven methods, the shock of seeing convolutional networks outperform expectations in 2012, and how those breakthroughs led to captioning, storytelling, and ultimately, generative models. Now, she's taking on one of AI's hardest frontiers: spatial intelligence. Fei-Fei shares why modeling the 3D world is essential for AGI—and why it may be even more difficult than language.",
      author: "Dr. Fei-Fei Li, Y Combinator Startup Podcast",
      date: new Date("2025-07-01"),
      link: "https://open.spotify.com/episode/73f4TiGhDcqRRms87aA560?si=49618cba6f714820",
      color: "text-purple-600",
      badge: "Podcast",
      source: "Spotify",
      topics: ["AI", "Innovation"],
    },
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
      source: "Apple Podcasts",
      topics: ["AI", "Psychology"],
    },
    {
      type: "podcast",
      icon: Podcast,
      title: "Start Small, Think Big: Making AI Stick",
      description: "Explores how AI transformation focuses on strategic wins that build momentum and deliver real business value, not flashy tools.",
      abstract: "AI transformation isn't about flashy tools — it's about strategic wins that build momentum and deliver real business value. Vivian Sun, Senior Director of Data & AI at Jabil Incorporated, shares how her company scaled AI across its global operations by starting with tangible use cases that delivered measurable impact. Jabil's journey began with AI-powered computer vision, replacing tedious and error-prone visual inspections, then moved into machine learning for color calibration in manufacturing, and layered in generative AI to enhance compliance with trade regulations. Sun emphasizes that successful AI adoption demands more than tech — it needs executive buy-in, change management, and a relentless focus on business value.",
      author: "Peter Cappelli & Vivian Sun, Where AI Works Podcast",
      date: new Date("2024-09-18"),
      link: "https://podcasts.apple.com/gb/podcast/start-small-think-big-making-ai-stick/id1801560422?i=1000727312539",
      color: "text-purple-600",
      badge: "Podcast",
      source: "Apple Podcasts",
      topics: ["AI", "Innovation", "Entrepreneurship"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "When causal inference meets deep learning",
      description: "Explores how Bayesian networks can capture causal relations, and how recent work has made it possible to approximate the NP-hard problem of learning such networks as a continuous optimization task.",
      abstract: "Learning causal relations, rather than correlations, is a fundamental problem in both statistical machine learning and computer sciences. Bayesian networks encode the conditional independencies between variables using directed acyclic graphs (DAGs). Exact inference of the DAG structure is computationally intractable due to combinatorial explosion in the search space. Recent work has transformed the discrete DAG constraints into a smooth function, which quantifies the 'DAG-ness' of the adjacency matrix of a graph, replacing combinatorial acyclic constraints with continuous equality constraints. This breakthrough makes it possible to approximate this problem as a continuous optimization task that can be solved efficiently with well-established numerical techniques, opening new possibilities for causal discovery in machine learning.",
      author: "Yunan Luo, Jian Peng & Jianzhu Ma, Nature Machine Intelligence",
      date: new Date("2020-08-12"),
      link: "https://www.nature.com/articles/s42256-020-0218-x",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["AI", "Mathematics"],
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
      topics: ["AI", "Innovation", "Economics"],
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
      topics: ["AI", "Psychology"],
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
      topics: ["AI", "Economics"],
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Artificial intelligence learns to reason",
      description: "Examines how large language models like GPT-4 struggle with reasoning tasks, despite their impressive capabilities, and explores the limitations and potential improvements for AI reasoning.",
      abstract: "Solving puzzles requires a bit of thinking and reasoning, a central feature of human intelligence that large language models (LLMs) like GPT-4, for all their impressive behavior, struggle with. The article explores how GPT-4 and similar models lack abilities for robust reasoning, limiting their usefulness in many domains. Studies have shown systematic failures in reasoning tasks, such as the classic puzzle about Julia and Martin's sisters. While prompting tricks like adding 'Let's think step by step' can improve LLMs' problem-solving abilities in some cases, such tricks haven't worked well enough to turn these systems into robust reasoners.",
      author: "Melanie Mitchell, Science",
      date: new Date("2025-03-20"),
      link: "https://www.science.org/doi/10.1126/science.adw5211",
      color: "text-emerald-600",
      badge: "Practitioner-oriented article",
      topics: ["AI", "Innovation"],
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Research: Executives Who Used Gen AI Made Worse Predictions",
      description: "An experiment with 300 executives reveals that using GenAI for business predictions can lead to overconfidence and worse forecasting accuracy.",
      abstract: "In a recent experiment, nearly 300 executives and managers were shown recent stock prices for the chip-maker Nvidia and then asked to predict the stock's price in a month's time. Then, half the group was given the opportunity to ask questions of ChatGPT while the other half were allowed to consult with their peers about Nvidia's stock. The executives who used ChatGPT became significantly more optimistic, confident, and produced worse forecasts than the group who discussed with their peers. This is likely because the authoritative voice of the AI—and the level of detail it gave in its answer—produced a strong sense of assurance, unchecked by the social regulation, emotional responsiveness, and useful skepticism that caused the peer-discussion group to become more conservative in their predictions. In order to harness the benefits of AI, executives need to understand the ways it can bias their own critical thinking.",
      author: "José Parra-Moyano, Patrick Reinmoeller & Karl Schmedders, Harvard Business Review",
      date: new Date("2025-07-01"),
      link: "https://hbr.org/2025/07/research-executives-who-used-gen-ai-made-worse-predictions",
      color: "text-emerald-600",
      badge: "Practitioner-oriented article",
      topics: ["AI"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Hypotheses devised by AI could find 'blind spots' in research",
      description: "Explores how AI systems can generate novel scientific hypotheses and identify overlooked patterns in research, potentially revolutionizing scientific discovery.",
      abstract: "Scientists are exploring the use of AI systems to automatically generate scientific hypotheses, potentially identifying overlooked patterns and 'blind spots' in research. These AI tools analyze vast amounts of scientific literature and data to propose novel hypotheses that human researchers might miss, offering a new approach to accelerate scientific discovery and address biases in research focus.",
      author: "Matthew Hutson, Nature",
      date: new Date("2024-01-15"),
      link: "#",
      color: "text-primary",
      badge: "Research Paper",
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
      topics: ["Decision Theory", "Economics"],
    },
    {
      type: "podcast",
      icon: Podcast,
      title: "Thomas Kuhn's Structure of Scientific Revolutions",
      description: "Eric Hsu and Louis Everuss discuss Thomas Kuhn's provocative theory of how scientific knowledge develops through paradigm shifts and revolutionary changes.",
      abstract: "In this episode, Eric Hsu and Louis Everuss discuss Thomas Kuhn's noted work, the Structure of Scientific Revolutions. Kuhn puts forward a provocative theory of how scientific knowledge develops. While Eric and Louis ditch their old cheaply assembled recording setup for new microphones and an upgraded soundmixer, they try to preserve the essence of their sociology podcast by laughing too hard at their own jokes and and by continuing to do bad celebrity impersonations.",
      author: "Eric Hsu & Louis Everuss, The Sociology of Everything Podcast",
      date: new Date("2022-08-15"),
      link: "https://open.spotify.com/episode/3rhR9IE0mShiXxJNWez0r3?si=6016df05159642c0",
      color: "text-purple-600",
      badge: "Podcast",
      source: "Spotify",
      topics: ["Philosophy of Science", "Innovation"],
    },
  ];

  const types = [
    { value: "paper", label: "Research Paper", icon: FileText },
    { value: "podcast", label: "Podcast", icon: Podcast },
    { value: "article", label: "Practitioner-oriented article", icon: Newspaper },
  ];

  const topics = ["AI", "Decision Theory", "Economics", "Entrepreneurship", "Innovation", "Mathematics", "Philosophy of Science", "Psychology"];

  const filteredInsights = insights
    .filter((insight) => {
      const typeMatch = !selectedType || insight.type === selectedType;
      const topicMatch = !selectedTopic || insight.topics.includes(selectedTopic);
      return typeMatch && topicMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.date.getTime() - a.date.getTime();
      } else {
        return a.date.getTime() - b.date.getTime();
      }
    });

  return (
    <section id="curated-insights" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-foreground mb-2 sm:mb-4">
            Curated Insights
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground italic">
            A personal selection of ideas and papers outside my primary field that I've found inspiring.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8 space-y-3 sm:space-y-4 animate-fade-in">
          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Filter size={16} className="text-muted-foreground hidden sm:block" />
            <Filter size={14} className="text-muted-foreground sm:hidden" />
            <span className="text-xs sm:text-sm font-medium text-foreground">Type:</span>
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
              className="h-7 sm:h-8 text-xs px-2 sm:px-3"
            >
              All
            </Button>
            {types.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className="gap-1 sm:gap-2 h-7 sm:h-8 text-xs px-2 sm:px-3"
              >
                <type.icon size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">{type.label}</span>
                <span className="sm:hidden">{type.value === "paper" ? "Paper" : type.value === "podcast" ? "Podcast" : "Article"}</span>
              </Button>
            ))}
          </div>

          {/* Topic Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground hidden sm:block" />
            <Filter size={14} className="text-muted-foreground sm:hidden" />
            <span className="text-xs sm:text-sm font-medium text-foreground">Topic:</span>
            <Select
              value={selectedTopic || "all"}
              onValueChange={(value) => setSelectedTopic(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[180px] h-7 sm:h-8 text-xs sm:text-sm bg-background">
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">All topics</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order Filter */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Calendar size={16} className="text-muted-foreground hidden sm:block" />
            <Calendar size={14} className="text-muted-foreground sm:hidden" />
            <span className="text-xs sm:text-sm font-medium text-foreground">Sort by:</span>
            <Button
              variant={sortOrder === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortOrder("newest")}
              className="h-7 sm:h-8 text-xs px-2 sm:px-3"
            >
              Newest
            </Button>
            <Button
              variant={sortOrder === "oldest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortOrder("oldest")}
              className="h-7 sm:h-8 text-xs px-2 sm:px-3"
            >
              Oldest
            </Button>
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
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                      {item.source && (
                        <Badge variant="outline" className="text-xs">
                          {item.source}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-semibold text-foreground leading-tight group-hover:text-primary transition-smooth">
                      {item.title}
                    </h3>
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
