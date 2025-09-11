import About from "@/components/About";
import Experience from "@/components/Experience";
import SocialFooters from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <SocialFooters />
    </>
  );
}
