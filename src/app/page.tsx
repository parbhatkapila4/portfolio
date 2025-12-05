// Component imports
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GithubContributions from "@/components/GithubContributions";
import SocialFooters from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GithubContributions />
      <SocialFooters />
    </>
  );
}
