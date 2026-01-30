import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
