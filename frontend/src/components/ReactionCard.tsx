import type { Reaction } from '../backend';
import ChemicalEquation from './ChemicalEquation';
import { ArrowRight, Zap } from 'lucide-react';

interface ReactionCardProps {
  name: string;
  reaction: Reaction;
  onClick: () => void;
}

const TYPE_BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Acid-Base':          { bg: 'rgba(34,211,238,0.1)',   text: '#22d3ee', border: 'rgba(34,211,238,0.3)' },
  'Combustion':         { bg: 'rgba(249,115,22,0.1)',   text: '#fb923c', border: 'rgba(249,115,22,0.3)' },
  'Decomposition':      { bg: 'rgba(167,139,250,0.1)',  text: '#a78bfa', border: 'rgba(167,139,250,0.3)' },
  'Organic':            { bg: 'rgba(52,211,153,0.1)',   text: '#34d399', border: 'rgba(52,211,153,0.3)' },
  'Oxidation-Reduction':{ bg: 'rgba(248,113,113,0.1)',  text: '#f87171', border: 'rgba(248,113,113,0.3)' },
  'Precipitation':      { bg: 'rgba(251,191,36,0.1)',   text: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  'Single Displacement':{ bg: 'rgba(96,165,250,0.1)',   text: '#60a5fa', border: 'rgba(96,165,250,0.3)' },
  'Synthesis':          { bg: 'rgba(134,239,172,0.1)',  text: '#86efac', border: 'rgba(134,239,172,0.3)' },
  // Backend may return slightly different casing
  'Double Displacement/Precipitation': { bg: 'rgba(251,191,36,0.1)', text: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
};

const EFFECT_ICONS: Record<string, string> = {
  bubbles: '🫧',
  color_change: '🎨',
  precipitate: '⬇️',
  fire: '🔥',
  foam: '🫧',
  gas: '💨',
  steam: '♨️',
  'No visible effect': '⚗️',
};

export default function ReactionCard({ name, reaction, onClick }: ReactionCardProps) {
  const colors = TYPE_BADGE_COLORS[reaction.reactionType] ?? {
    bg: 'rgba(100,116,139,0.1)',
    text: '#94a3b8',
    border: 'rgba(100,116,139,0.3)',
  };
  const effectIcon = EFFECT_ICONS[reaction.visualEffect] ?? '⚗️';

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-lab-surface border border-lab-border rounded-xl p-4 hover:border-lab-cyan/40 hover:bg-lab-surface2 transition-all duration-200 hover:shadow-lg hover:shadow-lab-cyan/5"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-display font-semibold text-lab-text text-sm leading-tight group-hover:text-lab-cyan transition-colors">
          {name}
        </h3>
        <ArrowRight className="w-4 h-4 text-lab-muted group-hover:text-lab-cyan group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
        >
          <Zap className="w-2.5 h-2.5" />
          {reaction.reactionType}
        </span>
        <span className="text-sm">{effectIcon}</span>
      </div>

      <div className="bg-lab-bg rounded-md px-3 py-2 border border-lab-border/50 mb-3">
        <div className="text-xs font-mono text-lab-muted truncate">
          <ChemicalEquation equation={reaction.equation} className="text-lab-muted text-xs" />
        </div>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {reaction.reactants.map((r, i) => (
          <span key={i} className="text-xs bg-lab-cyan/5 border border-lab-cyan/10 text-lab-cyan/70 rounded px-1.5 py-0.5 font-mono">
            {r.split(' (')[0]}
          </span>
        ))}
        <span className="text-xs text-lab-muted">→</span>
        {reaction.products.slice(0, 2).map((p, i) => (
          <span key={i} className="text-xs bg-lab-green/5 border border-lab-green/10 text-lab-green/70 rounded px-1.5 py-0.5 font-mono">
            {p.split(' (')[0]}
          </span>
        ))}
        {reaction.products.length > 2 && (
          <span className="text-xs text-lab-muted">+{reaction.products.length - 2} more</span>
        )}
      </div>
    </button>
  );
}
