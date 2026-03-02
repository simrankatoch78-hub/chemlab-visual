import { Link, useRouter } from '@tanstack/react-router';
import { FlaskConical, BookOpen, Beaker, Github } from 'lucide-react';

interface LabLayoutProps {
  children: React.ReactNode;
}

export default function LabLayout({ children }: LabLayoutProps) {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-lab-bg text-lab-text">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-lab-border bg-lab-surface/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/assets/generated/beaker-icon.dim_128x128.png"
                  alt="ChemLab Visual"
                  className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-all duration-300"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-lab-cyan tracking-wide">ChemLab</span>
                <span className="font-mono text-xs text-lab-muted tracking-widest uppercase">Visual</span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPath === '/'
                    ? 'bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30'
                    : 'text-lab-muted hover:text-lab-text hover:bg-lab-surface2'
                }`}
              >
                <Beaker className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/library"
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPath === '/library'
                    ? 'bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30'
                    : 'text-lab-muted hover:text-lab-text hover:bg-lab-surface2'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Reactions</span>
              </Link>
              <Link
                to="/simulator"
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPath === '/simulator'
                    ? 'bg-lab-green/10 text-lab-green border border-lab-green/30'
                    : 'text-lab-muted hover:text-lab-text hover:bg-lab-surface2'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                <span className="hidden sm:inline">Simulator</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-lab-border bg-lab-surface/50 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-lab-muted text-sm">
              <FlaskConical className="w-4 h-4 text-lab-cyan" />
              <span>ChemLab Visual — Interactive Chemistry for Students</span>
            </div>
            <div className="flex items-center gap-1 text-lab-muted text-sm">
              <span>© {new Date().getFullYear()} Built with</span>
              <span className="text-lab-green">♥</span>
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'chemlab-visual')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lab-cyan hover:text-lab-cyan/80 font-medium transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
