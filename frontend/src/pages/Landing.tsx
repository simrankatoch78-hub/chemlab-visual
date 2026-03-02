import { useNavigate } from '@tanstack/react-router';
import { FlaskConical, BookOpen, Zap, Eye, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAllReactions } from '../hooks/useQueries';

const FEATURE_CARDS = [
  {
    icon: FlaskConical,
    title: 'Virtual Lab',
    description: 'Mix chemicals in a virtual beaker and watch reactions unfold with stunning animations.',
    color: '#22d3ee',
  },
  {
    icon: BookOpen,
    title: 'Reaction Library',
    description: 'Browse 15+ curated chemical reactions across all major reaction types.',
    color: '#86efac',
  },
  {
    icon: Eye,
    title: 'Visual Effects',
    description: 'See bubbling, precipitates, flames, and color changes rendered in real time.',
    color: '#a78bfa',
  },
  {
    icon: Zap,
    title: 'Learn by Doing',
    description: 'Educational panels explain the chemistry behind every reaction you perform.',
    color: '#fbbf24',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { data: reactions } = useAllReactions();
  const reactionCount = reactions ? Object.keys(reactions).length : 0;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[420px] flex items-center">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/generated/chemistry-lab-hero.dim_1400x500.png)' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-lab-bg/95 via-lab-bg/80 to-lab-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-lab-bg via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lab-cyan/10 border border-lab-cyan/30 text-lab-cyan text-xs font-mono font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lab-cyan animate-pulse" />
              Interactive Chemistry Lab
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-lab-text leading-tight mb-4">
              Chemistry{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lab-cyan to-lab-green">
                Comes Alive
              </span>
            </h1>

            <p className="text-lab-muted text-lg leading-relaxed mb-8 max-w-xl">
              Perform virtual experiments, observe stunning reaction animations, and learn the science behind every chemical interaction.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => navigate({ to: '/simulator' })}
                className="bg-lab-cyan text-lab-bg hover:bg-lab-cyan/90 font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-lab-cyan/20 transition-all hover:shadow-lab-cyan/40 hover:scale-105"
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                Start Experimenting
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/library' })}
                className="border-lab-border text-lab-text hover:bg-lab-surface2 hover:border-lab-cyan/40 px-6 py-2.5 rounded-lg"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Reactions
              </Button>
            </div>

            {reactionCount > 0 && (
              <p className="mt-4 text-xs text-lab-muted font-mono">
                ⚗ {reactionCount} reactions available in the library
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-lab-text mb-3">
            Your Virtual Chemistry Lab
          </h2>
          <p className="text-lab-muted max-w-xl mx-auto">
            Everything you need to explore chemical reactions safely and interactively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-lab-surface border border-lab-border rounded-xl p-5 hover:border-opacity-50 transition-all duration-200 group"
              style={{ '--card-color': card.color } as React.CSSProperties}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{ backgroundColor: card.color + '22' }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <h3 className="font-display font-semibold text-lab-text mb-2">{card.title}</h3>
              <p className="text-sm text-lab-muted leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lab-surface border-y border-lab-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-lab-text mb-3">
            Ready to experiment?
          </h2>
          <p className="text-lab-muted mb-6">
            Choose a reaction from the library or mix chemicals freely in the simulator.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => navigate({ to: '/library' })}
              className="bg-lab-green text-lab-bg hover:bg-lab-green/90 font-semibold px-6 rounded-lg shadow-lg shadow-lab-green/20"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Reaction Library
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/simulator' })}
              className="border-lab-border text-lab-text hover:bg-lab-surface2 hover:border-lab-cyan/40 px-6 rounded-lg"
            >
              <FlaskConical className="w-4 h-4 mr-2" />
              Open Simulator
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
