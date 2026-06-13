import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
