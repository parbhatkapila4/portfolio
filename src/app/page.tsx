import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BookFloatingBar from "@/components/BookFloatingBar";
import SectionRail from "@/components/SectionRail";
import { Grain } from "@/components/Grain";

export default function Home() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <Grain />
      <SectionRail />
      <Header />
      <Hero />
      <Marquee />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Contact />
      <BookFloatingBar />
    </>
  );
}
