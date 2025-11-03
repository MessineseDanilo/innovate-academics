import { ExternalLink, FileText, X, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import paperDesignTheory from "@/assets/paper-design-theory.jpg";
import paperScientificApproach from "@/assets/paper-scientific-approach.jpg";
import paperAiStartups from "@/assets/paper-ai-startups.jpg";
import paperCausalAi from "@/assets/paper-causal-ai.jpg";
import paperUnsupervisedCausal from "@/assets/paper-unsupervised-causal.jpg";
import paperBoundedCreativity from "@/assets/paper-bounded-creativity.jpg";
import paperSerendipityMachines from "@/assets/paper-serendipity-machines.jpg";
import paperReasoningLogics from "@/assets/paper-reasoning-logics.jpg";
import paper1 from "@/assets/paper1.jpg";
import paper2 from "@/assets/paper2.jpg";
import paper3 from "@/assets/paper3.jpg";
import { useEffect, useState } from "react";
import PaperChatDialog from "@/components/PaperChatDialog";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  image: string;
  categories: string[];
  ssrnLink?: string;
  journalLink?: string;
  status?: string;
  abstract?: string;
  hideAiChat?: boolean;
}

interface PublicationsProps {
  activeFilter: string | null;
  onClearFilter: () => void;
}

const Publications = ({ activeFilter, onClearFilter }: PublicationsProps) => {
  const [activeTab, setActiveTab] = useState("publications");
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());

  const toggleAbstract = (title: string) => {
    setExpandedAbstracts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (activeFilter) {
      // Auto-switch to the tab that has papers with this filter
      const hasInPublications = publications.some(p => p.categories.includes(activeFilter));
      const hasInWorking = workingPapers.some(p => p.categories.includes(activeFilter));
      const hasInNew = newProjects.some(p => p.categories.includes(activeFilter));
      
      if (hasInPublications) setActiveTab("publications");
      else if (hasInWorking) setActiveTab("working");
      else if (hasInNew) setActiveTab("new");
    }
  }, [activeFilter]);
  const publications: Publication[] = [
    {
      title: "Design- and Theory-Based Approaches to Strategic Decisions",
      authors: "Gambardella, A., Messinese, D.",
      journal: "Organization Science",
      year: "2025",
      image: paperDesignTheory,
      categories: ["decisions"],
      journalLink: "https://doi.org/10.1287/orsc.2023.18245",
      status: "Best Paper, AOM 2022, TIM Division",
      abstract: "We develop a unified framework to examine the implications of two primary approaches to strategic decision making under uncertainty: designing and shaping future scenarios vis-à-vis testing theories about future scenarios. We conducted a three-arm randomized controlled trial involving 308 early stage entrepreneurs, dividing them into three groups—design-based training, theory-based training, and a control group—and tracked them over approximately 1.5 years. Our findings reveal that both approaches reduce the need for information in decision making and lead to higher commitment rates. The design-based approach encourages action despite negative beliefs, resulting in less frequent and later project termination. In contrast, the theory-based approach promotes a more conservative termination rule, leading to earlier and more frequent project abandonment. Although the theory-based approach is associated with higher average performance upon survival, the design-based approach fosters breakthroughs for decision makers. In sum, the design-based approach is well-suited for innovative ventures that gather information to shape their environment, whereas the theory-based approach is optimal for pursuing high performance under lower degrees of uncertainty.",
    },
    {
      title: "A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension",
      authors: "Camuffo, A., Gambardella, A., Messinese, D., Novelli, E., Paolucci, E., & Spina, C.",
      journal: "Strategic Management Journal",
      year: "2024",
      image: paperScientificApproach,
      categories: ["entrepreneurship", "decisions"],
      journalLink: "https://doi.org/10.1002/smj.3580",
      status: "Best Experimental Paper, 2024 IGL Research Prize",
      abstract: "This article runs a large-scale replication of Camuffo and colleagues in 2020, involving 759 firms in four randomized control trials. The larger sample generates novel and more precise insights about the teachability and implications of a scientific approach in entrepreneurship. We observe a positive impact on idea termination and results that are consistent with a nonlinear effect on radical pivots, with treated firms running few over no or repeated pivots. We provide a theoretical interpretation of the empirical results: the scientific approach enhances entrepreneurs' efficiency in searching for viable ideas and raises their methodic doubt because, like scientists, they realize that there may be alternative scenarios from the ones that they theorize.",
    },
  ];

  const workingPapers: Publication[] = [
    {
      title: "The Selective Tailwind Effect of A.I. on Startups: Predictions and Anomalies",
      authors: "Conti, A. & Messinese, D.",
      journal: "Under Review",
      year: "2025",
      image: paperAiStartups,
      categories: ["ai", "entrepreneurship", "decisions"],
      ssrnLink: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4958898",
      abstract: "What role does predictive artificial intelligence (A.I.) play in entrepreneurial decision-making? We explore this question using a comprehensive dataset of U.S. software startups and their time-varying adoption of A.I. We find that A.I. adoption significantly reshapes startups' technology portfolios and enhances customer acquisition, with performance gains concentrated in the upper tail of the treatment effect distribution. These effects are strongest among startups led by highly skilled founders. Complementary survey evidence and an ad hoc experiment shed light on the underlying mechanism: beyond extrapolating from past trends, A.I. detects unexpected patterns–anomalies–in data, signaling novel opportunities and enabling breakthrough innovation. To capitalize on these anomalies, however, entrepreneurs must embed them within causal theories that guide the development of actionable strategies.",
    },
    {
      title: "How Entrepreneurs Respond to New Information under Different Reasoning Logics",
      authors: "Camuffo, A., Gambardella, A., & Messinese, D.",
      journal: "Under Review",
      year: "2025",
      image: paperReasoningLogics,
      categories: ["entrepreneurship", "decisions"],
      abstract: "The way entrepreneurs process information shapes how they strategize, and innovate. We study this mechanism through a randomized controlled trial in Italy involving early-stage entrepreneurs randomly assigned to one of two training conditions: Theorists, trained to reason through explicit causal models and interpret information against structured hypotheses, and Designers, trained to adapt opportunistically through action and treat new signals as cues for reshaping their environment. Over eighteen months, we tracked how entrepreneurs' expectations about their venture's value evolved in response to new information—both endogenous feedback and exogenous shocks. Two main results emerge. First, Theorists hold expectations approximately 2.3 times higher than those of Designers, yet their forecast errors, when benchmarked against realized revenues, are about 10% lower. Second, Theorists update more conservatively: their responsiveness to comparable informational shifts, including exogenous shocks, is about 50% lower than that of Designers. However, when confronted with major, theory-violating surprises, they react sharply—becoming roughly 20% more likely to revise their business model than Designers. Together, the findings reveal a fundamental trade-off in entrepreneurial cognition: the theory-based logic fosters well-calibrated yet rigid expectations, whereas the design-based logic promotes flexibility at the cost of greater volatility.",
    },
  ];

  const newProjects: Publication[] = [
    {
      title: "Serendipity Machines: Evidence from Alphafold2",
      authors: "Messinese, D. & Tranchero, M.",
      journal: "Work in Progress",
      year: "2025",
      image: paperSerendipityMachines,
      categories: ["ai", "decisions"],
      hideAiChat: true,
    },
    {
      title: "Causal Explanations and Theory Generation with AI",
      authors: "Messinese, D.",
      journal: "Work in Progress",
      year: "2025",
      image: paperCausalAi,
      categories: ["ai", "decisions"],
      hideAiChat: true,
      abstract: "Artificial intelligence (AI) is transforming how social scientists discover, interpret, and explain empirical phenomena. Beyond prediction and optimization, advances in machine learning (ML), causal discovery, and large language models (LLMs) open new possibilities for theory generation. This paper proposes a framework in which AI acts as an epistemic partner in abductive theorizing—the process of generating explanations for unexpected empirical patterns that violate established causal explanations. We show how AI can augment key stages of theorizing: detecting theory violations in the data, tracing their causal structure, and assisting researchers in formulating plausible explanatory mechanisms. In addition to purely inductive uses of ML, our approach emphasizes explanation: helping scholars understand why models fail and how conceptual innovation can emerge from such failures. We demonstrate the approach through classic economic and organizational settings, illustrating how systematic discrepancies between predicted and observed outcomes reveal hidden pathways and latent heterogeneity. More broadly, the paper argues that computational methods can make theorizing more systematic, transparent, and cumulative across the social sciences, positioning AI not as a tool of prediction, but as a collaborator in the creation of new theoretical insight.",
    },
    {
      title: "Unsupervised Discovery of Causal Mechanisms for Management Research",
      authors: "Messinese, D. & Barbero Mota, M.",
      journal: "Work in Progress",
      year: "2025",
      image: paperUnsupervisedCausal,
      categories: ["ai", "decisions"],
      hideAiChat: true,
      abstract: "We explore the potential of independence-based causal machine learning to identify unobserved predictive causal sources in longitudinal business data. This causal inference approach does not require the full discovery of the data generating process graph or defining treatment groups. In particular, we adapt the pipeline in Lasko et al. (2025), which discovers probabilistically independent latent sources and their interpretable signatures directly from observational data. We apply this method to a large-scale panel of U.S. software startups. We benchmark this approach against standard difference-in-differences (DiD) estimates of the exogenous release of AI tools and show that causal machine learning not only replicates average treatment effects but also reveals multiple latent drivers, can clusters firms by their causal profiles, and estimates heterogeneous causal effects at the firm-time level. Our contribution is to demonstrate the multiple advantages of this approach to management research and decision making and to highlight its value as a flexible complement to established econometric inference.",
    },
    {
      title: "Bounded Machine Creativity and Human Judgment: Evidence from Chess",
      authors: "Messinese, D.",
      journal: "Work in Progress",
      year: "2025",
      image: paperBoundedCreativity,
      categories: ["ai", "decisions"],
      hideAiChat: true,
    },
  ];

  const categoryLabels: Record<string, { label: string; variant: "default" | "secondary" }> = {
    ai: { label: "Artificial Intelligence", variant: "default" },
    decisions: { label: "Strategic Decisions", variant: "secondary" },
    entrepreneurship: { label: "Entrepreneurship", variant: "default" },
  };

  const filterPublications = (pubs: Publication[]) => {
    if (!activeFilter) return pubs;
    return pubs.filter(pub => pub.categories.includes(activeFilter));
  };

  const renderPublicationCard = (pub: Publication, index: number) => (
    <Card
      key={pub.title}
      className="overflow-hidden hover:shadow-hover transition-smooth animate-slide-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={pub.image}
            alt={pub.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3 space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {pub.status && (
                <Badge variant="outline">{pub.status}</Badge>
              )}
              {pub.categories.map(cat => (
                <Badge 
                  key={cat} 
                  variant={categoryLabels[cat]?.variant || "default"}
                  className="text-xs"
                >
                  {categoryLabels[cat]?.label || cat}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-serif font-semibold">{pub.title}</h3>
            <p className="text-sm text-muted-foreground">{pub.authors}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">{pub.journal}</p>
            <p className="text-sm text-muted-foreground">{pub.year}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {pub.abstract && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toggleAbstract(pub.title)}
                className="flex items-center gap-2"
              >
                <FileText size={16} />
                {expandedAbstracts.has(pub.title) ? "Hide Abstract" : "View Abstract"}
              </Button>
            )}
            {!pub.hideAiChat && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setSelectedPaper(pub)}
                className="flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Ask AI about this paper
              </Button>
            )}
            {pub.ssrnLink && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a
                  href={pub.ssrnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileText size={16} />
                  SSRN
                  <ExternalLink size={14} />
                </a>
              </Button>
            )}
            {pub.journalLink && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a
                  href={pub.journalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Journal
                  <ExternalLink size={14} />
                </a>
              </Button>
            )}
          </div>
          {pub.abstract && expandedAbstracts.has(pub.title) && (
            <div className="mt-4 pt-4 border-t border-border animate-fade-in">
              <h4 className="font-semibold mb-2 text-sm">Abstract</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pub.abstract}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  const filteredPublications = filterPublications(publications);
  const filteredWorking = filterPublications(workingPapers);
  const filteredNew = filterPublications(newProjects);

  return (
    <section id="publications" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Publications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Peer-reviewed research and ongoing projects
            </p>
          </div>

          {activeFilter && (
            <div className="flex items-center justify-center gap-3 animate-fade-in">
              <Badge variant="default" className="text-sm py-2 px-4">
                Filtering by: {categoryLabels[activeFilter]?.label || activeFilter}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilter}
                className="h-8"
              >
                <X size={16} className="mr-1" />
                Clear Filter
              </Button>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="publications" className="text-[10px] sm:text-sm px-1.5 py-3 sm:px-3 sm:py-2.5 h-auto whitespace-normal leading-tight">
                Peer-Reviewed Publications {activeFilter && `(${filteredPublications.length})`}
              </TabsTrigger>
              <TabsTrigger value="working" className="text-[10px] sm:text-sm px-1.5 py-3 sm:px-3 sm:py-2.5 h-auto whitespace-normal leading-tight">
                Working Papers {activeFilter && `(${filteredWorking.length})`}
              </TabsTrigger>
              <TabsTrigger value="new" className="text-[10px] sm:text-sm px-1.5 py-3 sm:px-3 sm:py-2.5 h-auto whitespace-normal leading-tight">
                Work in Progress {activeFilter && `(${filteredNew.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="space-y-6">
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub, index) => renderPublicationCard(pub, index))
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No publications found for this research area.
                </p>
              )}
            </TabsContent>

            <TabsContent value="working" className="space-y-6">
              {filteredWorking.length > 0 ? (
                filteredWorking.map((pub, index) => renderPublicationCard(pub, index))
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No working papers found for this research area.
                </p>
              )}
            </TabsContent>

            <TabsContent value="new" className="space-y-6">
              {filteredNew.length > 0 ? (
                filteredNew.map((pub, index) => renderPublicationCard(pub, index))
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No new projects found for this research area.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {selectedPaper && (
        <PaperChatDialog
          paper={selectedPaper}
          isOpen={!!selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}
    </section>
  );
};

export default Publications;
