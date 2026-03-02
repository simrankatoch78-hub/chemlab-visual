import type { Reaction } from '../backend';
import ChemicalEquation from './ChemicalEquation';
import { FlaskConical, Zap, Package, BookOpen } from 'lucide-react';

interface EducationalPanelProps {
  reaction: Reaction;
  reactionName: string;
}

const TYPE_COLORS: Record<string, string> = {
  'Acid-Base':           'bg-lab-cyan/10 text-lab-cyan border-lab-cyan/30',
  'Combustion':          'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'Decomposition':       'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'Organic':             'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'Oxidation-Reduction': 'bg-red-500/10 text-red-400 border-red-500/30',
  'Precipitation':       'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Single Displacement': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Synthesis':           'bg-lab-green/10 text-lab-green border-lab-green/30',
  'Double Displacement/Precipitation': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
};

export default function EducationalPanel({ reaction, reactionName }: EducationalPanelProps) {
  const typeColor = TYPE_COLORS[reaction.reactionType] ?? 'bg-lab-muted/10 text-lab-muted border-lab-muted/30';

  return (
    <div className="bg-lab-surface border border-lab-border rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-lab-text">{reactionName}</h3>
          <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${typeColor}`}>
            <Zap className="w-3 h-3" />
            {reaction.reactionType}
          </span>
        </div>
        <FlaskConical className="w-6 h-6 text-lab-cyan flex-shrink-0 mt-1" />
      </div>

      {/* Equation */}
      <div className="bg-lab-bg rounded-lg p-4 border border-lab-border">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-lab-muted uppercase tracking-widest">Equation</span>
        </div>
        <div className="text-lab-text text-base leading-relaxed">
          <ChemicalEquation equation={reaction.equation} className="text-lab-text" />
        </div>
      </div>

      {/* Reactants & Products */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-lab-cyan" />
            <span className="text-xs font-mono text-lab-muted uppercase tracking-widest">Reactants</span>
          </div>
          <ul className="space-y-1">
            {reaction.reactants.map((r, i) => (
              <li key={i} className="text-sm text-lab-text bg-lab-cyan/5 border border-lab-cyan/10 rounded-md px-2 py-1 font-mono">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-lab-green" />
            <span className="text-xs font-mono text-lab-muted uppercase tracking-widest">Products</span>
          </div>
          <ul className="space-y-1">
            {reaction.products.map((p, i) => (
              <li key={i} className="text-sm text-lab-text bg-lab-green/5 border border-lab-green/10 rounded-md px-2 py-1 font-mono">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-lab-muted" />
          <span className="text-xs font-mono text-lab-muted uppercase tracking-widest">Explanation</span>
        </div>
        <p className="text-sm text-lab-muted leading-relaxed">{reaction.description}</p>
      </div>

      {/* Visual Effect Badge */}
      <div className="flex items-center gap-2 pt-1 border-t border-lab-border">
        <Package className="w-3.5 h-3.5 text-lab-muted" />
        <span className="text-xs text-lab-muted">Visual Effect:</span>
        <span className="text-xs font-mono text-lab-cyan">{reaction.visualEffect}</span>
      </div>
    </div>
  );
}
