import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
