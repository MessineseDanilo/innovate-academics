import { useEffect, useState } from "react";
import { ExternalLink, FileText, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  categories: string[];
  ssrnLink?: string;
  journalLink?: string;
  status?: string;
  abstract?: string;
}

interface PublicationsProps {
  activeFilter?: string | null;
  onClearFilter?: () => void;
}

const publications: Publication[] = [
  {
    title: "Design- and Theory-Based Approaches to Strategic Decisions",
    authors: "Gambardella, A., Messinese, D.",
    journal: "Organization Science",
    year: "2025",
    categories: ["decisions"],
    journalLink: "https://doi.org/10.1287/orsc.2023.18245",
    status: "Best Paper, AOM 2022, TIM Division",
    abstract:
      "We develop a unified framework to examine the implications of two primary approaches to strategic decision making under uncertainty: designing and shaping future scenarios vis-à-vis testing theories about future scenarios. We conducted a three-arm randomized controlled trial involving 308 early stage entrepreneurs, dividing them into three groups—design-based training, theory-based training, and a control group—and tracked them over approximately 1.5 years. Our findings reveal that both approaches reduce the need for information in decision making and lead to higher commitment rates. The design-based approach encourages action despite negative beliefs, resulting in less frequent and later project termination. In contrast, the theory-based approach promotes a more conservative termination rule, leading to earlier and more frequent project abandonment. Although the theory-based approach is associated with higher average performance upon survival, the design-based approach fosters breakthroughs for decision makers. In sum, the design-based approach is well-suited for innovative ventures that gather information to shape their environment, whereas the theory-based approach is optimal for pursuing high performance under lower degrees of uncertainty.",
  },
  {
    title: "A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension",
    authors: "Camuffo, A., Gambardella, A., Messinese, D., Novelli, E., Paolucci, E., & Spina, C.",
    journal: "Strategic Management Journal",
    year: "2024",
    categories: ["decisions"],
    journalLink: "https://doi.org/10.1002/smj.3580",
    status: "Best Experimental Paper, 2024 IGL Research Prize",
    abstract:
      "This article runs a large-scale replication of Camuffo and colleagues in 2020, involving 759 firms in four randomized control trials. The larger sample generates novel and more precise insights about the teachability and implications of a scientific approach in entrepreneurship. We observe a positive impact on idea termination and results that are consistent with a nonlinear effect on radical pivots, with treated firms running few over no or repeated pivots. We provide a theoretical interpretation of the empirical results: the scientific approach enhances entrepreneurs' efficiency in searching for viable ideas and raises their methodic doubt because, like scientists, they realize that there may alternative scenarios from the ones that they theorize.",
  },
];

const workingPapers: Publication[] = [
  {
    title: "The Selective Tailwind Effect of A.I. on Startups: Predictions and Anomalies",
    authors: "Conti, A. & Messinese, D.",
    journal: "Under Review",
    year: "2025",
    categories: ["ai", "entrepreneurship", "decisions"],
    ssrnLink: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4958898",
    abstract:
      "What role does predictive artificial intelligence (A.I.) play in entrepreneurial decision-making? We explore this question using a comprehensive dataset of U.S. software startups and their time-varying adoption of A.I. We find that A.I. adoption significantly reshapes startups' technology portfolios and enhances customer acquisition, with performance gains concentrated in the upper tail of the treatment effect distribution. These effects are strongest among startups led by highly skilled founders. Complementary survey evidence and an ad hoc experiment shed light on the underlying mechanism: beyond extrapolating from past trends, A.I. detects unexpected patterns–anomalies–in data, signaling novel opportunities and enabling breakthrough innovation. To capitalize on these anomalies, however, entrepreneurs must embed them within causal theories that guide the development of actionable strategies.",
  },
  {
    title: "Entrepreneurial Responses to New Information under Different Reasoning Logics",
    authors: "Camuffo, A., Gambardella, A., & Messinese, D.",
    journal: "Under Review",
    year: "2025",
    categories: ["decisions", "entrepreneurship"],
    abstract:
      "The way entrepreneurs process information shapes how they strategize, and innovate. We study this mechanism through a randomized controlled trial in Italy involving early-stage entrepreneurs randomly assigned to one of two training conditions: Theorists, trained to reason through explicit causal models and interpret information against structured hypotheses, and Designers, trained to adapt opportunistically through action and treat new signals as cues for reshaping their environment. Over eighteen months, we tracked how entrepreneurs' expectations about their venture's value evolved in response to new information—both endogenous feedback and exogenous shocks. Two main results emerge. First, Theorists hold expectations approximately 2.3 times higher than those of Designers, yet their forecast errors, when benchmarked against realized revenues, are about 10% lower. Second, Theorists update more conservatively: their responsiveness to comparable informational shifts, including exogenous shocks, is about 50% lower than that of Designers. However, when confronted with major, theory-violating surprises, they react sharply—becoming roughly 20% more likely to revise their business model than Designers. Together, the findings reveal a fundamental trade-off in entrepreneurial cognition: the theory-based logic fosters well-calibrated yet rigid expectations, whereas the design-based logic promotes flexibility at the cost of greater volatility.",
  },
];

const workInProgress: Publication[] = [
  {
    title: "Theorizing with Machines: From Causal Explanation of Anomalies to Generating New Hypotheses",
    authors: "Messinese, D.",
    journal: "Work in Progress",
    year: "2025",
    categories: ["ai", "entrepreneurship"],
    abstract:
      "Artificial intelligence (AI) is transforming how social scientists discover, interpret, and explain empirical phenomena. Beyond prediction and optimization, advances in machine learning (ML), causal discovery, and large language models (LLMs) open new possibilities for theory generation. This paper proposes a framework in which AI acts as an epistemic partner in abductive theorizing—the process of generating explanations for unexpected empirical patterns that violate established causal explanations. We show how AI can augment key stages of theorizing: detecting theory violations in the data, tracing their causal structure, and assisting researchers in formulating plausible explanatory mechanisms. In addition to purely inductive uses of ML, our approach emphasizes explanation: helping scholars understand why models fail and how conceptual innovation can emerge from such failures. We demonstrate the approach through classic economic and organizational settings, illustrating how systematic discrepancies between predicted and observed outcomes reveal hidden pathways and latent heterogeneity. More broadly, the paper argues that computational methods can make theorizing more systematic, transparent, and cumulative across the social sciences, positioning AI not as a tool of prediction, but as a collaborator in the creation of new theoretical insight.",
  },
  {
    title: "Unsupervised Discovery of Causal Mechanisms for Management Research",
    authors: "Messinese, D. & Barbero Mota, M.",
    journal: "Work in Progress",
    year: "2025",
    categories: ["ai"],
    abstract:
      "We explore the potential of independence-based causal machine learning to identify unobserved predictive causal sources in longitudinal business data. This causal inference approach does not require the full discovery of the data generating process graph or defining treatment groups. In particular, we adapt the pipeline in Lasko et al. (2025), which discovers probabilistically independent latent sources and their interpretable signatures directly from observational data. We apply this method to a large-scale panel of U.S. software startups. We benchmark this approach against standard difference-in-differences (DiD) estimates of the exogenous release of AI tools and show that causal machine learning not only replicates average treatment effects but also reveals multiple latent drivers, can clusters firms by their causal profiles, and estimates heterogeneous causal effects at the firm-time level. Our contribution is to demonstrate the multiple advantages of this approach to management research and decision making and to highlight its value as a flexible complement to established econometric inference.",
  },
  {
    title: "Bounded Machine Creativity and Human Judgment: Evidence from Chess",
    authors: "Messinese, D.",
    journal: "Work in Progress",
    year: "2025",
    categories: ["ai", "entrepreneurship"],
  },
];

const categoryLabels: Record<string, string> = {
  ai: "Artificial Intelligence",
  decisions: "Entrepreneurial Strategy",
  entrepreneurship: "Innovation",
};

const Publications = ({ activeFilter = null, onClearFilter }: PublicationsProps = {}) => {
  const [activeTab, setActiveTab] = useState("publications");
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!activeFilter) return;
    if (publications.some((paper) => paper.categories.includes(activeFilter))) setActiveTab("publications");
    else if (workingPapers.some((paper) => paper.categories.includes(activeFilter))) setActiveTab("working");
    else if (workInProgress.some((paper) => paper.categories.includes(activeFilter))) setActiveTab("progress");
  }, [activeFilter]);

  const toggleAbstract = (title: string) => {
    setExpandedAbstracts((current) => {
      const next = new Set(current);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const filterPublications = (items: Publication[]) => {
    if (!activeFilter) return items;
    return items.filter((paper) => paper.categories.includes(activeFilter));
  };

  const renderPublication = (paper: Publication) => (
    <article key={paper.title} className="border-b border-border py-4 last:border-b-0 md:py-5">
      <div className="grid gap-1.5 md:grid-cols-[88px_1fr] md:gap-2">
        <div className="text-[12.5px] font-medium text-muted-foreground">{paper.year}</div>
        <div className="space-y-2 md:space-y-2.5">
          <div>
            <h3 className="text-[15px] font-semibold leading-[1.45] text-foreground md:text-[15.5px] md:leading-6">{paper.title}</h3>
            <p className="mt-1 text-[12.5px] leading-5 text-muted-foreground md:mt-1.5">{paper.authors}</p>
            <p className="mt-0.5 text-[12.5px] font-semibold leading-5 text-foreground">{paper.journal}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {paper.status && <Badge variant="outline">{paper.status}</Badge>}
            {paper.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {categoryLabels[category] || category}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {paper.abstract && (
              <Button variant="ghost" size="sm" onClick={() => toggleAbstract(paper.title)} className="h-8 px-0">
                <FileText className="mr-2 h-4 w-4" />
                {expandedAbstracts.has(paper.title) ? "Hide abstract" : "Abstract"}
              </Button>
            )}
            {paper.ssrnLink && (
              <Button variant="ghost" size="sm" asChild className="h-8 px-0">
                <a href={paper.ssrnLink} target="_blank" rel="noopener noreferrer">
                  SSRN
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {paper.journalLink && (
              <Button variant="ghost" size="sm" asChild className="h-8 px-0">
                <a href={paper.journalLink} target="_blank" rel="noopener noreferrer">
                  Journal
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>

          {paper.abstract && expandedAbstracts.has(paper.title) && (
            <p className="max-w-[820px] text-[12.75px] leading-5 text-foreground/75 md:text-[13px] md:leading-6">{paper.abstract}</p>
          )}
        </div>
      </div>
    </article>
  );

  const filteredPublications = filterPublications(publications);
  const filteredWorking = filterPublications(workingPapers);
  const filteredProgress = filterPublications(workInProgress);

  return (
    <section id="research" className="px-4 py-8 md:px-6 md:py-12 scroll-mt-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="space-y-7">
          <div className="max-w-[780px]">
            <h2 className="text-[19px] font-semibold text-foreground">Research</h2>
            <p className="mt-2.5 text-[12.5px] leading-5 text-muted-foreground md:text-[13px]">
              Peer-reviewed articles, working papers, and selected projects.
            </p>
            <p className="mt-2 text-[11.5px] leading-5 text-muted-foreground">
              Unless otherwise noted, authors are listed alphabetically.
            </p>
          </div>

          <div className="space-y-4 md:space-y-5">
            {activeFilter && onClearFilter && (
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Filtered by {categoryLabels[activeFilter] || activeFilter}</Badge>
                <Button variant="ghost" size="sm" onClick={onClearFilter}>
                  <X className="mr-1 h-4 w-4" />
                  Clear
                </Button>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-sm bg-muted p-1">
                <TabsTrigger value="publications" className="px-2 py-1.5 text-[11.5px] leading-tight sm:text-[12px]">
                  Peer-Reviewed
                </TabsTrigger>
                <TabsTrigger value="working" className="px-2 py-1.5 text-[11.5px] leading-tight sm:text-[12px]">
                  Working Papers
                </TabsTrigger>
                <TabsTrigger value="progress" className="px-2 py-1.5 text-[11.5px] leading-tight sm:text-[12px]">
                  Work in Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="publications" className="mt-2">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map(renderPublication)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">No publications found for this research area.</p>
                )}
              </TabsContent>
              <TabsContent value="working" className="mt-2">
                {filteredWorking.length > 0 ? (
                  filteredWorking.map(renderPublication)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">No working papers found for this research area.</p>
                )}
              </TabsContent>
              <TabsContent value="progress" className="mt-2">
                {filteredProgress.length > 0 ? (
                  filteredProgress.map(renderPublication)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">No projects found for this research area.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
