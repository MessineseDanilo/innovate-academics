import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ResearchAgenda from "@/components/ResearchAgenda";
import Publications from "@/components/Publications";
import Teaching from "@/components/Teaching";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveFilter(category);
  };

  const handleClearFilter = () => {
    setActiveFilter(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <ResearchAgenda onCategoryClick={handleCategoryClick} />
        <Publications activeFilter={activeFilter} onClearFilter={handleClearFilter} />
        <Teaching />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
