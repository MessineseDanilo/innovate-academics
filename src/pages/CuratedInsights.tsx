import Navigation from "@/components/Navigation";
import CuratedInsights from "@/components/CuratedInsights";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const CuratedInsightsPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Curated Insights — Danilo Messinese</title>
        <meta
          name="description"
          content="Curated collection of articles, research papers, and podcasts on AI, innovation, and strategic decision-making."
        />
        <meta property="og:title" content="Curated Insights — Danilo Messinese" />
        <meta
          property="og:description"
          content="Curated collection of articles, research papers, and podcasts on AI, innovation, and strategic decision-making."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://0789a398-84ad-4457-b74a-6cc9c0f36ebb.lovableproject.com/insights" />
        <meta property="og:image" content="https://0789a398-84ad-4457-b74a-6cc9c0f36ebb.lovableproject.com/opengraph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Curated Insights — Danilo Messinese" />
        <meta
          name="twitter:description"
          content="Curated collection of articles, research papers, and podcasts on AI, innovation, and strategic decision-making."
        />
        <meta name="twitter:image" content="https://0789a398-84ad-4457-b74a-6cc9c0f36ebb.lovableproject.com/opengraph.png" />
      </Helmet>
      <Navigation />
      <main className="pt-20">
        <CuratedInsights />
      </main>
      <Footer />
    </div>
  );
};

export default CuratedInsightsPage;
