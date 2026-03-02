import { useState, useEffect, useMemo } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useAllReactions } from '../hooks/useQueries';
import ReagentShelf from '../components/ReagentShelf';
import ReactionAnimation from '../components/ReactionAnimation';
import EducationalPanel from '../components/EducationalPanel';
import type { Reaction } from '../backend';
import { isContentBlocked, SAFETY_WARNING_MESSAGE } from '../lib/safetyFilter';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FlaskConical, RotateCcw, Play, BookOpen, ChevronRight, ShieldAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Curated reagent list for the shelf — 20 distinct reagents covering organic, inorganic, and synthesis
const SHELF_REAGENTS = [
  "Hydrogen (H₂)",
  "Oxygen (O₂)",
  "Hydrochloric Acid (HCl)",
  "Sodium Hydroxide (NaOH)",
  "Sodium Bicarbonate (NaHCO₃)",
  "Acetic Acid (CH₃COOH)",
  "Ethanol (C₂H₅OH)",
  "Citric Acid (C₆H₈O₇)",
  "Sulfuric Acid (H₂SO₄)",
  "Copper Sulfate (CuSO₄)",
  "Zinc (Zn)",
  "Iron (Fe)",
  "Calcium Carbonate (CaCO₃)",
  "Hydrogen Peroxide (H₂O₂)",
  "Manganese Dioxide (MnO₂)",
  "Silver Nitrate (AgNO₃)",
  "Sodium Chloride (NaCl)",
  "Glucose (C₆H₁₂O₆)",
  "Methane (CH₄)",
  "Potassium Permanganate (KMnO₄)",
];

export default function ExperimentSimulator() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string>;
  const preloadedReaction = search?.reaction as string | undefined;

  const { data: reactions, isLoading } = useAllReactions();

  const [selectedChemicals, setSelectedChemicals] = useState<string[]>([]);
  const [isReacting, setIsReacting] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<{ name: string; reaction: Reaction } | null>(null);
  const [hasReacted, setHasReacted] = useState(false);
  const [noReactionFound, setNoReactionFound] = useState(false);
  const [safetyBlocked, setSafetyBlocked] = useState(false);

  // Pre-load reaction from URL param
  useEffect(() => {
    if (preloadedReaction && reactions) {
      // Safety check on the preloaded reaction name
      if (isContentBlocked(preloadedReaction)) {
        setSafetyBlocked(true);
        return;
      }
      const reaction = reactions[preloadedReaction];
      if (reaction) {
        setSelectedChemicals(reaction.reactants.slice(0, 2));
        setCurrentReaction({ name: preloadedReaction, reaction });
        setIsReacting(true);
        setHasReacted(true);
        setNoReactionFound(false);
        setSafetyBlocked(false);
      }
    }
  }, [preloadedReaction, reactions]);

  const handleChemicalSelect = (chemical: string) => {
    setSelectedChemicals((prev) => {
      if (prev.includes(chemical)) {
        return prev.filter((c) => c !== chemical);
      }
      if (prev.length >= 2) return prev;
      return [...prev, chemical];
    });
    setIsReacting(false);
    setHasReacted(false);
    setCurrentReaction(null);
    setNoReactionFound(false);
    setSafetyBlocked(false);
  };

  const findReaction = (chemicals: string[]): { name: string; reaction: Reaction } | null => {
    if (!reactions) return null;
    for (const [name, reaction] of Object.entries(reactions)) {
      const reactantSet = new Set(reaction.reactants);
      const selectedSet = new Set(chemicals);
      const matches =
        chemicals.every((c) => reactantSet.has(c)) &&
        reaction.reactants.every((r) => selectedSet.has(r));
      if (matches) return { name, reaction };
    }
    // Partial match — at least one reactant matches
    for (const [name, reaction] of Object.entries(reactions)) {
      if (chemicals.some((c) => reaction.reactants.includes(c))) {
        return { name, reaction };
      }
    }
    return null;
  };

  const handleMix = () => {
    if (selectedChemicals.length < 2) return;

    // Safety check on selected chemical names
    const combinedText = selectedChemicals.join(' ');
    if (isContentBlocked(combinedText)) {
      setSafetyBlocked(true);
      setIsReacting(false);
      setHasReacted(false);
      setCurrentReaction(null);
      return;
    }

    const found = findReaction(selectedChemicals);

    if (found) {
      // Safety check on the reaction result
      const reactionText = `${found.name} ${found.reaction.equation} ${found.reaction.products.join(' ')}`;
      if (isContentBlocked(reactionText)) {
        setSafetyBlocked(true);
        setIsReacting(false);
        setHasReacted(false);
        setCurrentReaction(null);
        return;
      }
      setCurrentReaction(found);
      setIsReacting(true);
      setHasReacted(true);
      setNoReactionFound(false);
      setSafetyBlocked(false);
    } else {
      setNoReactionFound(true);
      setIsReacting(false);
      setHasReacted(false);
      setCurrentReaction(null);
      setSafetyBlocked(false);
    }
  };

  const handleReset = () => {
    setSelectedChemicals([]);
    setIsReacting(false);
    setHasReacted(false);
    setCurrentReaction(null);
    setNoReactionFound(false);
    setSafetyBlocked(false);
    if (preloadedReaction) {
      navigate({ to: '/simulator' });
    }
  };

  // Quick-try suggestions from the reaction library
  const quickTrySuggestions = useMemo(() => {
    if (!reactions) return [];
    return Object.keys(reactions).slice(0, 5);
  }, [reactions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-lab-green/10 border border-lab-green/20 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-lab-green" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-lab-text">Experiment Simulator</h1>
            <p className="text-lab-muted text-sm">Select two chemicals and mix them to observe the reaction</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate({ to: '/library' })}
          className="hidden sm:flex border-lab-border text-lab-muted hover:text-lab-text hover:border-lab-cyan/50 gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Reaction Library
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-xl bg-lab-surface" />
          <Skeleton className="h-80 rounded-xl bg-lab-surface" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Reagent shelf + controls */}
          <div className="space-y-4">
            <ReagentShelf
              chemicals={SHELF_REAGENTS}
              selectedChemicals={selectedChemicals}
              onSelect={handleChemicalSelect}
            />

            {/* Selected chemicals display */}
            {selectedChemicals.length > 0 && (
              <div className="bg-lab-surface border border-lab-border rounded-xl p-4">
                <p className="text-xs font-mono text-lab-muted uppercase tracking-widest mb-3">
                  Selected Reagents
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedChemicals.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-lab-cyan/10 border border-lab-cyan/20 text-lab-cyan text-sm font-mono"
                    >
                      {c}
                    </span>
                  ))}
                  {selectedChemicals.length === 1 && (
                    <span className="text-lab-muted text-sm font-mono">+ select one more</span>
                  )}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleMix}
                disabled={selectedChemicals.length < 2}
                className="flex-1 bg-lab-green/20 hover:bg-lab-green/30 text-lab-green border border-lab-green/30 hover:border-lab-green/50 gap-2 font-semibold"
                variant="outline"
              >
                <Play className="w-4 h-4" />
                Mix Chemicals
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-lab-border text-lab-muted hover:text-lab-text hover:border-lab-border/80 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>

            {/* Quick-try suggestions */}
            {!hasReacted && !safetyBlocked && quickTrySuggestions.length > 0 && (
              <div className="bg-lab-surface border border-lab-border rounded-xl p-4">
                <p className="text-xs font-mono text-lab-muted uppercase tracking-widest mb-3">
                  Quick Try
                </p>
                <div className="flex flex-col gap-1.5">
                  {quickTrySuggestions.map((name) => (
                    <button
                      key={name}
                      onClick={() =>
                        navigate({ to: '/simulator', search: { reaction: name } as Record<string, string> })
                      }
                      className="flex items-center gap-2 text-left text-sm text-lab-muted hover:text-lab-cyan transition-colors group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Animation + results */}
          <div className="space-y-4">
            {/* Safety warning */}
            {safetyBlocked && (
              <Alert className="border-red-500/40 bg-red-500/10 text-red-300">
                <ShieldAlert className="h-4 w-4 text-red-400" />
                <AlertTitle className="text-red-300 font-semibold">Content Restricted</AlertTitle>
                <AlertDescription className="text-red-300/80 text-sm mt-1">
                  {SAFETY_WARNING_MESSAGE}
                </AlertDescription>
              </Alert>
            )}

            {/* Reaction animation — uses isActive prop (not isReacting) */}
            <ReactionAnimation
              isActive={isReacting && !safetyBlocked}
              visualEffect={currentReaction?.reaction.visualEffect ?? 'gas'}
            />

            {/* No reaction found */}
            {noReactionFound && !safetyBlocked && (
              <div className="bg-lab-surface border border-lab-border rounded-xl p-4 text-center">
                <FlaskConical className="w-8 h-8 text-lab-muted mx-auto mb-2 opacity-50" />
                <p className="text-lab-muted font-mono text-sm">No reaction found for these chemicals</p>
                <p className="text-lab-muted/60 text-xs mt-1">
                  Try a different combination or browse the{' '}
                  <button
                    onClick={() => navigate({ to: '/library' })}
                    className="text-lab-cyan hover:underline"
                  >
                    Reaction Library
                  </button>
                </p>
              </div>
            )}

            {/* Educational panel */}
            {currentReaction && hasReacted && !safetyBlocked && (
              <EducationalPanel
                reaction={currentReaction.reaction}
                reactionName={currentReaction.name}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
