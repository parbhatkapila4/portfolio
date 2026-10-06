import { HomeHero } from "@/components/home/HomeHero";
import { HomeNav } from "@/components/home/HomeNav";
import { HomeRoot } from "@/components/home/HomeRoot";
import { HomeSections } from "@/components/home/HomeSections";

export default function Home() {
  return (
    <HomeRoot>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <HomeNav />
      <HomeHero />
      <HomeSections />
    </HomeRoot>
  );
}
