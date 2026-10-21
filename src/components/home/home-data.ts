import {
  CAL_LINK,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
  X_URL,
  projects,
} from "@/lib/site-content";

export const profile = {
  name: "Parbhat Kapila",
  role: "AI Systems Engineer · Bengaluru",
  status: "Open to work",
};

export const aboutCopy = [
  "I build AI systems that know when not to act. Most of my work is RAG and LLM infrastructure - retrieval, vector storage, and model routing. I own the whole thing: decisions, features, deploys, monitoring, and the stuff that breaks after launch.",
  "Right now I run five AI products in production, with no team behind them: Sentinel, Cutline, RepoDoc, VectorMail and Visura. I built every layer of every one, and I'm the only person on call for them. Cutline has been running since March: **85** signups, all inbound, and a first paying customer in September, with no ads run.",
  "I'm looking for a full-time role at an early-stage startup where I own real systems and deliver without hand-holding: remote on US/EU hours, in-office in Bengaluru, or relocating to Germany. Hand me the problem and the constraints, and I'll take it from design through deploy and on-call. I reply within 24 hours to anything real.",
];

export const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "walkthroughs", label: "Walkthroughs" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Experience" },
];

export const socials = [
  { id: "github", label: "GitHub", href: GITHUB_URL },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { id: "x", label: "X", href: X_URL },
  { id: "email", label: "Email", href: `mailto:${EMAIL}` },
] as const;

export const SHOT = { width: 2880, height: 1800 };
export const shotPath = (id: string, n = 1) => `/showcase/systems/${id}${n > 1 ? `-${n}` : ""}.png`;

const SHOT_ALTS: Record<string, string[]> = {
  sentinel: [
    "Sentinel's dashboard in demo mode, headed: Five deals are slipping.",
    "Sentinel's Intelligence desk answering a question about the week's missed signals: three deals went silent.",
    "Sentinel's attention list, headed: Deals demanding a second look. Five sample deals follow.",
    "Sentinel's Analytics page, headed: Read the desk's appetite. Under it, total pipeline and average deal.",
  ],
  cutline: [
    "Cutline's name over a painting of a film crew shooting by a mountain lake.",
    "Cutline's Create a video form, filled in: what the video is about, the platform, the aspect ratio and the length.",
    "Cutline's finished-video screen, headed: Your video is ready. Under it the video and a Download MP4 button.",
    "A finished video on its own page in Cutline, with the prompt it was made from, its date and length, and Download MP4 and Copy link buttons.",
  ],
  repodoc: [
    "RepoDoc's dashboard for a repository while it is being indexed: the indexing meter part-way, then the repo's stars, forks, watchers, issues and description.",
    "RepoDoc's Chat with Code: a question about an unfamiliar repository, and the answer walking through what the repo holds, directory by directory.",
    "RepoDoc's Architecture map: the repository's files as a grid, one selected, with its path, what it does and an excerpt of its JSON alongside.",
    "RepoDoc's Drift page, Changes Since Indexed: tracking the repository since it was last read, and reporting that nothing has changed.",
  ],
  visura: [
    "Visura's summary of a document, The Ruby Programming Language: key highlights, then the executive summary section by section, with the document's tools down the right: Ask AI, Processing insights, AI Insights, Sections, Knowledge graph.",
    "Visura's Processing insights for that document: status, creation time, chunk count and duration, then the processing timeline from upload to reuse calculation.",
    "Visura's AI insights for the document: a key insight with its page and confidence, and the start of the risks.",
    "Visura's Knowledge graph for the document: its topics and entities as lists, under the node and edge count.",
  ],
  vectormail: [
    "VectorMail's Autopilot panel set to Suggest: follow-ups waiting on you, each with the rule that picked it and an Approve & send button.",
    "The demo inbox with Inbox brain open, answering: What needs my attention today?",
    "The Autopilot panel set to Auto-send: the two high-confidence follow-ups marked Auto-sent, the third still asking.",
    "Today's Brief: the threads that need a reply, each with why and how urgent.",
  ],
};

export type SystemCard = {
  id: string;
  name: string;
  line?: string;
  description?: string;
  metrics: { value: string; label: string }[];
  url: string;
  github: string;
  writeup?: string;
  shots: { src: string; alt: string }[];
};

export const systems: SystemCard[] = [
  ...projects.map((p) => ({
    id: p.id,
    name: p.name,
    line: p.category,
    description: p.description,
    metrics: p.metrics,
    url: p.url,
    github: p.github,
    writeup: p.writeup,
  })),
  {
    id: "visura",
    name: "Visura",
    line: "Document Versions · Hashes Decide, LLM Explains",
    description:
      "Shows what changed between two versions of a document, in your browser, with no upload and no model. Passage boundaries come from each sentence's own hash, so an edit near the top doesn't shift the rest, and a re-upload re-summarizes only what changed. The LLM only explains changes the hashes found, and drops any explanation it can't quote from the document.",
    metrics: [
      { value: "19 of 20", label: "reused after a one-line edit" },
      { value: "12 re-exports", label: "all read as zero changes" },
      { value: "No upload", label: "and no model to compare" },
      { value: "Verbatim quote", label: "or the explanation is dropped" },
    ],
    url: "https://visura.parbhat.dev/compare",
    github: "https://github.com/parbhatkapila4/Visura",
  },
].map((s) => ({
  ...s,
  shots: (SHOT_ALTS[s.id] ?? [""]).map((alt, i) => ({ src: shotPath(s.id, i + 1), alt })),
}));

export const walkthroughs = projects.map((p) => ({
  id: p.id,
  name: p.name,
  blurb: p.description.slice(0, p.description.indexOf(". ") + 1) || p.description,
  src: p.video,
  poster: `/covers/${p.id}.jpg`,
}));

export const caseStudies = [
  {
    slug: "sentinel",
    title: "Sentinel: CRM is the permission layer",
    tagline:
      "Revenue-intelligence runs on the most sensitive data a company holds. So the first question isn't \"what model scores the deal\" - it's \"what are we even allowed to read?\"",
  },
  {
    slug: "cutline",
    title: "CUTLINE: a director, not a template engine",
    tagline:
      "One sentence in, one finished MP4 out - directed by a pipeline of up to 12 stages per slideshow, not a template engine. The pipeline commits the editorial decisions before it touches a frame.",
  },
  {
    slug: "repodoc",
    title: "RepoDoc: codebase RAG built as infrastructure",
    tagline:
      "Retrieval runs over what each file means, indexing is a durable Postgres lease queue, and each answer's estimated model cost is recorded per project.",
  },
  {
    slug: "vectormail",
    title: "VectorMail: rules decide, the LLM only drafts",
    tagline:
      "Reads the inbox, drafts follow-ups, and sends them. Deterministic rules decide, the LLM only drafts.",
  },
];

export const closing = {
  note: "Thanks for scrolling all the way down here. I'm open to full-time roles at early-stage, AI-first startups: remote, in-office in Bengaluru, or relocating to Germany. If that's you, let's work together.",
  call: { lead: "Rather talk it through?", label: "Book a 10-min call", href: CAL_LINK },
};

export const closingLinks = [
  { id: "github", label: "GitHub", href: GITHUB_URL },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { id: "x", label: "Twitter/X", href: X_URL },
  { id: "email", label: "Email", href: `mailto:${EMAIL}` },
  { id: "resume", label: "Résumé", href: RESUME_URL },
] as const;
