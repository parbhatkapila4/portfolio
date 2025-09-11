import { Github, Linkedin, Mail, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialMedia = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/parbhat-kapila/",
    icon: Linkedin,
  },
  {
    name: "X",
    url: "https://x.com/Devcodies",
    icon: X,
  },
  {
    name: "Github",
    url: "https://github.com/parbhatkapila4",
    icon: Github,
  },
  {
    name: "Email",
    url: "mailto:parbhatkapila4@gmail.com",
    icon: Mail,
  },
];

const SocialFooters = () => {
  return (
    <nav className="fixed bottom-10 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center  backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-6">
          {socialMedia.map((social, index) => (
            <a
              href={social.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 cursor-pointer hover:text-white transition-all duration-300 hover:scale-110"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
          <div className="bg-white/20 w-px h-6 mx-1"></div>
          <Link href="/" className="cursor-pointer">
            <Image
              src="/parbhat.png"
              alt="Profile Picture"
              width={32}
              height={32}
              className="rounded-2xl border-2 border-black hover:border-yellow-400/50 transition-colors duration-500 object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SocialFooters;
