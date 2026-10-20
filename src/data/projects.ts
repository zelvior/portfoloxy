export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  type: 'os' | 'cs';
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Audityxe",
    description: "Web auditing platform & CLI utility ecosystem for performance analysis and site optimization.",
    techStack: ["Next.js", "TypeScript", "CLI", "Node.js"],
    liveUrl: "https://audityxe.xyz",
    featured: true,
    type: "cs",
    category: "Platform"
  },
  {
    id: 2,
    title: "Compile",
    description: "Web-based code snippet sharing platform with real-time collaboration and syntax highlighting.",
    techStack: ["Next.js", "Firebase", "React", "Tailwind"],
    liveUrl: "https://compilefordevs.vercel.app",
    featured: true,
    type: "cs",
    category: "Developer Tool"
  },
  {
    id: 3,
    title: "Z-TempMail",
    description: "Fast, serverless temporary email service with instant inbox and auto-expiry.",
    techStack: ["Next.js", "Serverless", "API"],
    liveUrl: "https://zelviortempmail.vercel.app",
    featured: true,
    type: "cs",
    category: "Utility"
  },
  {
    id: 4,
    title: "ZUi PRO Studio",
    description: "Professional UI component studio and design system toolkit for rapid prototyping.",
    techStack: ["React", "TypeScript", "CSS"],
    liveUrl: "https://project-eyq40.vercel.app",
    featured: false,
    type: "cs",
    category: "Design Tool"
  },
  {
    id: 5,
    title: "Veil",
    description: "Lightweight web proxy for anonymous browsing with encrypted tunneling.",
    techStack: ["Next.js", "Node.js", "Proxy"],
    liveUrl: "https://veil-olive-nine.vercel.app",
    featured: true,
    type: "cs",
    category: "Privacy"
  },
  {
    id: 6,
    title: "DropText",
    description: "Minimalist text sharing platform — paste, share, and expire text snippets instantly.",
    techStack: ["Next.js", "Serverless"],
    liveUrl: "https://freedroptext.vercel.app",
    featured: false,
    type: "cs",
    category: "Utility"
  },
  {
    id: 7,
    title: "ZRepeater",
    description: "Automated task repeater and scheduling utility for recurring workflows.",
    techStack: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://zelvior.github.io/ZRepeater",
    featured: false,
    type: "cs",
    category: "Automation"
  },
  {
    id: 8,
    title: "ZFrames",
    description: "CSS frame generator and layout prototyping tool for modern web designs.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://zelvior.github.io/ZFrames",
    featured: false,
    type: "cs",
    category: "Design Tool"
  },
  {
    id: 9,
    title: "Lensyxe",
    description: "Image analysis and visual inspection tool powered by modern web APIs.",
    techStack: ["Next.js", "React", "Web APIs"],
    liveUrl: "https://lensyxe.vercel.app",
    featured: true,
    type: "os",
    category: "Tool"
  },
  {
    id: 10,
    title: "Zelvior Runtime",
    description: "Lightweight performance runtime published on npm — zero-dependency, optimized for speed.",
    techStack: ["JavaScript", "npm", "Runtime"],
    liveUrl: "https://github.com/zelvior/zelvior-runtime",
    githubUrl: "https://github.com/zelvior/zelvior-runtime",
    featured: true,
    type: "os",
    category: "Package"
  },
  {
    id: 11,
    title: "MafiaNoir",
    description: "Themed web experience with dark aesthetic design and immersive storytelling elements.",
    techStack: ["Next.js", "React", "CSS"],
    liveUrl: "https://mafianoir.vercel.app",
    featured: false,
    type: "cs",
    category: "Experience"
  },
  {
    id: 12,
    title: "ZelviorQRlite",
    description: "Ultra-lightweight QR code generator — zero dependencies, pure JavaScript.",
    techStack: ["JavaScript", "QR", "Zero-dep"],
    liveUrl: "https://github.com/zelvior/zelvior-qrlite",
    githubUrl: "https://github.com/zelvior/zelvior-qrlite",
    featured: false,
    type: "os",
    category: "Package"
  },
  {
    id: 13,
    title: "BDY",
    description: "Minimalist body/density calculator with clean interface and instant results.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://zelvior.github.io/bdy",
    featured: false,
    type: "os",
    category: "Health"
  },
  {
    id: 14,
    title: "GreyRoom",
    description: "Anonymous encrypted chat room with end-to-end security and ephemeral messaging.",
    techStack: ["JavaScript", "WebSocket", "Crypto"],
    liveUrl: "https://zelvior.github.io/greyroom",
    githubUrl: "https://github.com/zelvior/greyroom",
    featured: true,
    type: "os",
    category: "Communication"
  },
  {
    id: 15,
    title: "Mndr",
    description: "Mind mapping and note organization tool for visual thinkers and planners.",
    techStack: ["React", "Canvas", "JavaScript"],
    liveUrl: "https://zelvior.github.io/Mndr",
    githubUrl: "https://github.com/zelvior/Mndr",
    featured: false,
    type: "os",
    category: "Productivity"
  },
  {
    id: 16,
    title: "Lovr",
    description: "Love letter generator and romantic message crafting tool with beautiful typography.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://zelvior.github.io/lovr",
    githubUrl: "https://github.com/zelvior/lovr",
    featured: false,
    type: "os",
    category: "Creative"
  },
  {
    id: 17,
    title: "Tesseract",
    description: "OCR and text extraction tool running entirely in the browser with no server dependency.",
    techStack: ["JavaScript", "OCR", "Web APIs"],
    liveUrl: "https://zelvior.github.io/Tesseract",
    githubUrl: "https://github.com/zelvior/Tesseract",
    featured: false,
    type: "os",
    category: "Tool"
  },
  {
    id: 18,
    title: "Calculator",
    description: "Scientific calculator with clean UI, history tracking, and keyboard shortcuts.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://zelvior.github.io/Calculator",
    githubUrl: "https://github.com/zelvior/Calculator",
    featured: false,
    type: "os",
    category: "Utility"
  },
  {
    id: 19,
    title: "StudyHubPro",
    description: "All-in-one study platform with flashcards, timers, and progress tracking.",
    techStack: ["React", "JavaScript", "LocalStorage"],
    liveUrl: "https://zelvior.github.io/StudyHubPro",
    githubUrl: "https://github.com/zelvior/StudyHubPro",
    featured: false,
    type: "os",
    category: "Education"
  },
  {
    id: 20,
    title: "ZBadgeGenerator",
    description: "Custom badge and shield generator for README files and documentation.",
    techStack: ["Next.js", "SVG", "React"],
    liveUrl: "https://zbadgegen.vercel.app",
    featured: false,
    type: "cs",
    category: "Developer Tool"
  },
  // ═══════════════════════════════════════════════════
  // ADD MORE PROJECTS BELOW — Just add new objects
  // ═══════════════════════════════════════════════════
  // {
  //   id: 21,
  //   title: "Your Project Name",
  //   description: "Description of your project.",
  //   techStack: ["Tech1", "Tech2"],
  //   liveUrl: "https://your-project-url.com",
  //   githubUrl: "https://github.com/zelvior/your-repo",
  //   featured: false,
  //   type: "os", // or "cs"
  //   category: "Category"
  // },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/zelvior", icon: "github" },
  { name: "YouTube", url: "https://youtube.com/@zelviorhere", icon: "youtube" },
  { name: "NPM", url: "https://www.npmjs.com/~zelnpm", icon: "npm" },
  { name: "ORCID", url: "https://orcid.org/0009-0009-2376-367X", icon: "orcid" },
  { name: "Linktree", url: "https://linktr.ee/zelvior", icon: "linktree" },
  { name: "Blog", url: "https://zelvior.blogspot.com", icon: "blog" },
  { name: "Discord", url: "https://discord.gg/UQfzQzymc", icon: "discord" },
  { name: "Email", url: "mailto:zelvior@proton.me", icon: "email" },
];

export const techStack = [
  "Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", 
  "Python", "Node.js", "Tailwind CSS", "Vercel", "Cloudflare",
  "Firebase", "Redis", "npm"
];

export const aiTools = ["Claude", "Z.ai", "Gemini", "Qwen"];

export const npmPackages = [
  { name: "zelvior-runtime", cmd: "npm i zelvior-runtime", description: "Lightweight performance runtime" },
  { name: "audityxe-cli", cmd: "npm i audityxe-cli", description: "Web auditing CLI utility" },
];
