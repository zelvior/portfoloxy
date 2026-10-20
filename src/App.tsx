import { useState, useEffect, useRef, useCallback } from 'react';
import { projects, socialLinks, techStack, aiTools, npmPackages } from './data/projects';

// ═══════════════════════════════════════════════════
// CURSOR GLOW COMPONENT
// ═══════════════════════════════════════════════════
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(229,138,43,0.06) 0%, transparent 70%)',
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════
// NAVIGATION DOT COMPONENT
// ═══════════════════════════════════════════════════
function NavDots({ activeSection, totalSections }: { activeSection: number; totalSections: number }) {
  const sectionNames = ['Home', 'About', 'Projects', 'Tools', 'Contact'];
  return (
    <div className="nav-vertical hidden md:flex">
      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          className="group relative flex items-center"
          onClick={() => {
            const container = document.querySelector('.horizontal-scroll');
            if (container) {
              container.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' });
            }
          }}
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-text-muted whitespace-nowrap">
            {sectionNames[i]}
          </span>
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            activeSection === i 
              ? 'bg-gold scale-125 shadow-[0_0_10px_rgba(229,138,43,0.5)]' 
              : 'bg-text-dim hover:bg-gold-dim'
          }`} />
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// FANCY BUTTON COMPONENT
// ═══════════════════════════════════════════════════
function FancyButton({ text, href }: { text: string; href: string }) {
  return (
    <a className="fancy-btn" href={href}>
      <span className="top-key"></span>
      <span className="btn-text">{text}</span>
      <span className="bottom-key-1"></span>
      <span className="bottom-key-2"></span>
    </a>
  );
}

// ═══════════════════════════════════════════════════
// TERMINAL COMPONENT
// ═══════════════════════════════════════════════════
function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: 'whoami', output: 'zelvior — Vibe Coder & Systems Architect' },
    { cmd: 'cat philosophy.txt', output: 'Build fast. Ship light. Zero dependencies. Maximum impact.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    let output = '';
    const trimmed = cmd.trim().toLowerCase();
    
    switch (trimmed) {
      case 'help':
        output = 'Available commands: whoami, projects, contact, skills, clear, help';
        break;
      case 'whoami':
        output = 'zelvior — Vibe Coder & Systems Architect\nBuilding ultra-lightweight, zero-dependency tools.';
        break;
      case 'projects':
        output = `${projects.length} projects shipped → Scroll right to explore →`;
        break;
      case 'contact':
        output = '📧 zelvior@proton.me\n🔗 github.com/zelvior';
        break;
      case 'skills':
        output = techStack.join(' • ');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    setHistory(prev => [...prev, { cmd, output }]);
    setInput('');
  };

  return (
    <div className="terminal w-full max-w-lg">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="ml-3 text-xs text-text-muted font-mono">zelvior@portfolio:~</span>
      </div>
      <div className="p-4 max-h-48 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-gold font-mono text-sm">$</span>
              <span className="text-text-primary font-mono text-sm">{item.cmd}</span>
            </div>
            <pre className="text-text-muted font-mono text-xs mt-1 whitespace-pre-wrap pl-4">{item.output}</pre>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gold font-mono text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            className="bg-transparent border-none outline-none text-text-primary font-mono text-sm flex-1"
            placeholder="type 'help'..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PROJECT CARD COMPONENT
// ═══════════════════════════════════════════════════
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="project-card project-scroll-item group">
      {/* Hover URL reveal */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-text-primary group-hover:text-gold transition-colors">{project.title}</h3>
          <span className="text-text-dim text-xs font-mono">{project.category}</span>
        </div>
        <span className={project.type === 'os' ? 'badge-os' : 'badge-cs'}>
          {project.type === 'os' ? 'OS' : 'CS'}
        </span>
      </div>
      <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.map((tech, i) => (
          <span key={i} className="tech-pill">{tech}</span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-bright text-sm font-medium transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live
        </a>
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary text-sm font-medium transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// COPY COMMAND COMPONENT
// ═══════════════════════════════════════════════════
function CopyCommand({ cmd, name, description }: { cmd: string; name: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gold font-bold font-mono">{name}</span>
        <span className="text-text-dim text-xs">— {description}</span>
      </div>
      <div className="copy-cmd" onClick={handleCopy}>
        <span className="prompt">$</span>
        <span className="flex-1">{cmd}</span>
        <span className={`text-xs transition-colors ${copied ? 'text-green-400' : 'text-text-dim'}`}>
          {copied ? '✓ Copied!' : '⧉ Click to copy'}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════
export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const sectionWidth = window.innerWidth;
    const newSection = Math.round(scrollLeft / sectionWidth);
    setActiveSection(newSection);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = scrollRef.current;
      if (!container) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        container.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        container.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Convert vertical scroll to horizontal on desktop
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY * 2, behavior: 'auto' });
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const totalSections = 5;

  return (
    <div className="w-full h-full bg-obsidian grid-bg">
      <CursorGlow />
      <div className="noise-overlay" />
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      <NavDots activeSection={activeSection} totalSections={totalSections} />
      
      <div ref={scrollRef} className="horizontal-scroll">
        
        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 1: HERO */}
        {/* ═══════════════════════════════════════════ */}
        <section className="section">
          {/* Background gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 px-8 lg:px-20 max-w-7xl mx-auto w-full">
            {/* Left: Text Content */}
            <div className="flex-1 space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
                <div className="status-dot"></div>
                <span className="text-xs font-mono text-text-muted">Available for projects</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="text-text-primary">Vibe Coder</span>
                <br />
                <span className="gradient-text">crafting performance-first</span>
                <br />
                <span className="text-text-primary">web systems.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-text-muted text-lg max-w-lg leading-relaxed">
                Building ultra-lightweight, zero-dependency tools and high-performance web applications optimized for speed and low-spec hardware.
              </p>

              {/* AI Tools Used */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-text-dim text-sm">Vibe coding with:</span>
                {aiTools.map((tool) => (
                  <span key={tool} className="tech-pill">{tool}</span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <FancyButton text="View Projects" href="#projects" />
                <a href="#contact" className="text-gold hover:text-gold-bright font-medium transition-colors text-sm border border-gold/30 px-5 py-3 hover:border-gold/60">
                  Get in Touch →
                </a>
              </div>
            </div>

            {/* Right: Terminal + Monogram */}
            <div className="flex-1 max-w-lg w-full space-y-6">
              {/* Z Monogram */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-surface border border-gold/20 flex items-center justify-center animate-pulse-glow">
                    <span className="text-4xl font-black gradient-text">Z</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-obsidian"></div>
                </div>
              </div>
              <Terminal />
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-dim text-xs font-mono animate-pulse">
            <span className="hidden md:inline">Scroll →</span>
            <span className="md:hidden">Scroll ↓</span>
            <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <svg className="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 2: ABOUT */}
        {/* ═══════════════════════════════════════════ */}
        <section className="section">
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 px-8 lg:px-20 max-w-7xl mx-auto w-full">
            {/* Left: About Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-gold"></div>
                <span className="text-gold font-mono text-sm">002 / ABOUT</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary">
                The <span className="gradient-text">Zero-Dependency</span> Philosophy
              </h2>

              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  I'm <span className="text-text-primary font-semibold">Faizan Raza</span>, known as <span className="text-gold font-semibold">Zelvior</span> — a systems architect who believes the best code is the code you don't write. Every dependency is a liability. Every abstraction is a potential bottleneck.
                </p>
                <p>
                  My approach: <span className="text-text-primary">vibe code</span> with AI assistants (Claude, Z.ai, Gemini, Qwen) to rapidly prototype, then strip everything down to raw performance. I build tools that run on any hardware — from a Raspberry Pi to a cloud server.
                </p>
                <p>
                  Based on Q4OS Linux, developing in Termux, deploying on Vercel & Cloudflare. The entire workflow is optimized for minimal resource usage.
                </p>
              </div>

              {/* Tech Stack Grid */}
              <div className="pt-4">
                <h3 className="text-sm font-mono text-text-dim mb-3">TECH ARSENAL</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span key={tech} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Stats & Info Cards */}
            <div className="flex-1 grid grid-cols-2 gap-4 max-w-md">
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black gradient-text">{projects.length}+</div>
                <div className="text-text-muted text-xs mt-1 font-mono">Projects Shipped</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black gradient-text">{projects.filter(p => p.type === 'os').length}</div>
                <div className="text-text-muted text-xs mt-1 font-mono">Open Source</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black gradient-text">0</div>
                <div className="text-text-muted text-xs mt-1 font-mono">Dependencies Needed</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black gradient-text">∞</div>
                <div className="text-text-muted text-xs mt-1 font-mono">Performance First</div>
              </div>
              
              {/* Dev Environment Card */}
              <div className="glass-card p-5 col-span-2">
                <h4 className="text-gold font-mono text-xs mb-2">// DEV ENVIRONMENT</h4>
                <div className="space-y-1.5 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">OS</span>
                    <span className="text-text-primary">Q4OS Linux</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Terminal</span>
                    <span className="text-text-primary">Termux</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Deploy</span>
                    <span className="text-text-primary">Vercel / Cloudflare</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">AI Assist</span>
                    <span className="text-text-primary">Claude, Z.ai, Gemini, Qwen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 3: PROJECTS */}
        {/* ═══════════════════════════════════════════ */}
        <section className="section section-wide" id="projects">
          <div className="absolute inset-0 flex flex-col px-8 lg:px-16 py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-gold"></div>
                <span className="text-gold font-mono text-sm">003 / PROJECTS</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-dim text-xs font-mono">
                  {projects.filter(p => p.type === 'os').length} OS • {projects.filter(p => p.type === 'cs').length} CS
                </span>
                <span className="text-text-dim text-xs font-mono">← drag to scroll →</span>
              </div>
            </div>

            {/* Projects Grid - Scrollable */}
            <div className="flex-1 flex items-center overflow-hidden">
              <div className="projects-scroll w-full h-full items-center py-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {/* Spacer for "add more" indication */}
                <div className="project-scroll-item min-w-[200px] flex items-center justify-center glass-card border-dashed border-2 border-gold/20">
                  <div className="text-center p-4">
                    <div className="text-gold text-3xl mb-2">+</div>
                    <div className="text-text-muted text-xs font-mono">More coming soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 4: TOOLS / PACKAGES */}
        {/* ═══════════════════════════════════════════ */}
        <section className="section">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-10 px-8 lg:px-20 max-w-5xl mx-auto w-full">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-0.5 bg-gold"></div>
                <span className="text-gold font-mono text-sm">004 / OPEN SOURCE TOOLS</span>
                <div className="w-10 h-0.5 bg-gold"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary">
                Install & <span className="gradient-text">Ship Fast</span>
              </h2>
              <p className="text-text-muted max-w-md mx-auto">
                Zero-dependency npm packages built for performance. One command to integrate.
              </p>
            </div>

            {/* NPM Packages */}
            <div className="w-full max-w-2xl space-y-4">
              {npmPackages.map((pkg) => (
                <CopyCommand key={pkg.name} {...pkg} />
              ))}
            </div>

            {/* Featured Open Source */}
            <div className="w-full">
              <h3 className="text-sm font-mono text-text-dim mb-4 text-center">// FEATURED OPEN SOURCE</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.filter(p => p.type === 'os' && p.featured).slice(0, 3).map((project) => (
                  <div key={project.id} className="glass-card p-4 text-center">
                    <h4 className="text-gold font-bold text-sm mb-1">{project.title}</h4>
                    <p className="text-text-muted text-xs mb-3">{project.description}</p>
                    <a href={project.githubUrl || project.liveUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-xs text-text-dim hover:text-gold transition-colors font-mono">
                      View on GitHub →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 5: CONTACT */}
        {/* ═══════════════════════════════════════════ */}
        <section className="section">
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 px-8 lg:px-20 max-w-6xl mx-auto w-full">
            {/* Left: Contact Info */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-gold"></div>
                <span className="text-gold font-mono text-sm">005 / CONTACT</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary">
                Let's <span className="gradient-text">Build</span> Together
              </h2>

              <p className="text-text-muted text-lg max-w-md leading-relaxed">
                Got a project idea? Need a performance-first web system? Let's connect and make it happen.
              </p>

              {/* Email */}
              <a href="mailto:zelvior@proton.me" className="inline-flex items-center gap-3 glass-card px-5 py-3 group hover:border-gold/40">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-text-primary font-mono text-sm group-hover:text-gold transition-colors">zelvior@proton.me</span>
              </a>

              {/* Social Links Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 max-w-sm">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card px-4 py-3 flex items-center gap-2 hover:border-gold/40 group"
                  >
                    <SocialIcon name={link.icon} />
                    <span className="text-text-muted text-xs font-mono group-hover:text-text-primary transition-colors">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="flex-1 w-full max-w-md">
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-bold text-text-primary mb-2">Send a Message</h3>
                <form action="mailto:zelvior@proton.me" method="POST" className="space-y-4">
                  <div>
                    <label className="text-text-muted text-xs font-mono block mb-1">NAME</label>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full bg-obsidian border border-gold/20 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-gold/60 transition-colors font-mono"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-mono block mb-1">EMAIL</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full bg-obsidian border border-gold/20 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-gold/60 transition-colors font-mono"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-mono block mb-1">MESSAGE</label>
                    <textarea 
                      name="message"
                      rows={4}
                      className="w-full bg-obsidian border border-gold/20 rounded-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-gold/60 transition-colors font-mono resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <FancyButton text="Send Message" href="mailto:zelvior@proton.me" />
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 text-text-dim text-xs font-mono">
            <span>© 2025 Zelvior</span>
            <span>•</span>
            <span>Built with vibes & zero dependencies</span>
          </div>
        </section>

      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-surface z-50">
        <div 
          className="h-full bg-gradient-to-r from-gold to-gold-bright transition-all duration-300"
          style={{ width: `${((activeSection + 1) / totalSections) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// SOCIAL ICON COMPONENT
// ═══════════════════════════════════════════════════
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    github: (
      <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    youtube: (
      <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    npm: (
      <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
      </svg>
    ),
    orcid: (
      <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.326 2.812h.643v7.106H7.043V7.19zm3.982 0h2.468c2.817 0 4.053 1.845 4.053 3.553 0 1.844-1.391 3.553-4.034 3.553h-2.487V7.19zm.643.576v5.957h1.743c2.322 0 3.488-1.391 3.488-2.978 0-1.707-1.166-2.979-3.488-2.979h-1.743z"/>
      </svg>
    ),
    linktree: (
      <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.102 5.548a.6.6 0 0 1 .6-.6h.002a.6.6 0 0 1 .6.6v5.4a.6.6 0 0 1-.6.6h-.002a.6.6 0 0 1-.6-.6v-5.4zm0 8.104a.6.6 0 0 1 .6-.6h.002a.6.6 0 0 1 .6.6v1.8a.6.6 0 0 1-.6.6h-.002a.6.6 0 0 1-.6-.6v-1.8z"/>
      </svg>
    ),
    blog: (
      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    discord: (
      <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
      </svg>
    ),
    email: (
      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[name] || icons.email;
}
