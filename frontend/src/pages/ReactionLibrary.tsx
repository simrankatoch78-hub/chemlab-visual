import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAllReactions } from '../hooks/useQueries';
import ReactionCard from '../components/ReactionCard';
import { REACTION_TYPES } from '../lib/reactions';
import { isContentBlocked, SAFETY_WARNING_MESSAGE } from '../lib/safetyFilter';
import { BookOpen, Search, FlaskConical, ShieldAlert, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ReactionLibrary() {
  const navigate = useNavigate();
  const { data: reactions, isLoading } = useAllReactions();
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [safetyDismissed, setSafetyDismissed] = useState(false);

  const isBlocked = useMemo(() => {
    if (!searchQuery) return false;
    return isContentBlocked(searchQuery);
  }, [searchQuery]);

  // Reset dismiss state when query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSafetyDismissed(false);
  };

  const filteredReactions = useMemo(() => {
    if (!reactions || isBlocked) return [];
    return Object.entries(reactions).filter(([name, reaction]) => {
      const matchesType = selectedType === 'All' || reaction.reactionType === selectedType;
      const matchesSearch =
        !searchQuery ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reaction.reactants.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
        reaction.products.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [reactions, selectedType, searchQuery, isBlocked]);

  const handleReactionClick = (name: string) => {
    navigate({ to: '/simulator', search: { reaction: name } as Record<string, string> });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-lab-cyan/10 border border-lab-cyan/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-lab-cyan" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-lab-text">Reaction Library</h1>
            <p className="text-lab-muted text-sm">
              {reactions ? Object.keys(reactions).length : 0} reactions available
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lab-muted" />
          <Input
            placeholder="Search reactions, chemicals..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-lab-surface border-lab-border text-lab-text placeholder:text-lab-muted focus:border-lab-cyan/50 rounded-lg"
          />
        </div>
      </div>

      {/* Safety Warning */}
      {isBlocked && !safetyDismissed && (
        <Alert className="mb-6 border-red-500/40 bg-red-500/10 text-red-300">
          <ShieldAlert className="h-4 w-4 text-red-400" />
          <AlertTitle className="text-red-300 font-semibold flex items-center justify-between">
            <span>Content Restricted</span>
            <button
              onClick={() => setSafetyDismissed(true)}
              className="ml-auto p-0.5 rounded hover:bg-red-500/20 transition-colors"
              aria-label="Dismiss warning"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </AlertTitle>
          <AlertDescription className="text-red-300/80 text-sm mt-1">
            {SAFETY_WARNING_MESSAGE}
          </AlertDescription>
        </Alert>
      )}

      {/* Type Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {REACTION_TYPES.map((type) => {
          const count =
            type === 'All'
              ? reactions ? Object.keys(reactions).length : 0
              : reactions ? Object.values(reactions).filter((r) => r.reactionType === type).length : 0;

          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                selectedType === type
                  ? 'bg-lab-cyan/10 text-lab-cyan border-lab-cyan/40 shadow-sm shadow-lab-cyan/10'
                  : 'bg-lab-surface border-lab-border text-lab-muted hover:text-lab-text hover:border-lab-border/80'
              }`}
            >
              {type}
              {count > 0 && (
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                    selectedType === type ? 'bg-lab-cyan/20 text-lab-cyan' : 'bg-lab-surface2 text-lab-muted'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reactions Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl bg-lab-surface" />
          ))}
        </div>
      ) : isBlocked && !safetyDismissed ? (
        <div className="text-center py-16">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4 opacity-70" />
          <p className="text-red-400 font-mono font-semibold">Search blocked for safety</p>
          <p className="text-lab-muted/60 text-sm mt-1">
            Modify your search to explore our educational chemistry library.
          </p>
        </div>
      ) : filteredReactions.length === 0 ? (
        <div className="text-center py-16">
          <FlaskConical className="w-12 h-12 text-lab-muted mx-auto mb-4 opacity-50" />
          <p className="text-lab-muted font-mono">No reactions found</p>
          <p className="text-lab-muted/60 text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReactions.map(([name, reaction]) => (
            <ReactionCard
              key={name}
              name={name}
              reaction={reaction}
              onClick={() => handleReactionClick(name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
