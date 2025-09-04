import Link from "next/link";

const About = () => {
  return (
    <>
      <section className="mt-14">
        <h2 className="text-lg font-semibold flex items-center">Why I Build</h2>
        <p className="text-[16px] text-white/80 mt-1.5">
          {`I’m Parbhat, a startup engineer and full-stack developer who turns ideas into fast, dependable app. I thrive at the intersection of web, backend, and AI building tools that help founders go from concept to launch in weeks, not months. Outside of commits, I push myself with side projects and new tech, keeping my approach adaptive and my execution sharp.`}
        </p>
      </section>
      <Present />
    </>
  );
};

export default About;

const Present = () => {
  return (
    <section className="mt-10">
      <h2 className="text-lg flex items-center font-semibold ">Present{""}</h2>
      <p className="text-[16px] mt-1.5 text-white/80">
        {`
        Right now, I’m building AI-powered applications designed to be practical, impactful, and built to last. My focus is simple: ship fast, own the work, and deliver products that unlock growth. If you are a founder looking for someone who can take an idea from zero to live without hand-holding, let’s talk.`}
      </p>
    </section>
  );
};
