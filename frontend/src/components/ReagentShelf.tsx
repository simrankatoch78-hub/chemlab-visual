import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FlaskConical } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ReagentShelfProps {
  chemicals: string[];
  selectedChemicals: string[];
  onSelect: (chemical: string) => void;
  maxSelections?: number;
}

const CHEMICAL_COLORS: Record<string, string> = {
  'Hydrogen': '#22d3ee',
  'Oxygen': '#86efac',
  'Hydrochloric': '#f87171',
  'Sodium': '#fbbf24',
  'Methane': '#fb923c',
  'Silver': '#94a3b8',
  'Iron': '#a78bfa',
  'Zinc': '#6ee7b7',
  'Sodium Bicarbonate': '#67e8f9',
  'Acetic': '#86efac',
  'Copper': '#f97316',
  'Potassium': '#c084fc',
  'Aluminum': '#94a3b8',
  'Calcium': '#fde68a',
  'Lead': '#cbd5e1',
  'Hydrogen Peroxide': '#a5f3fc',
  'Manganese': '#d8b4fe',
  'Ethanol': '#fb923c',
  'Baking': '#67e8f9',
  'Vinegar': '#86efac',
  'Ethyl': '#34d399',
  'Glucose': '#fde68a',
  'Citric': '#facc15',
  'Sulfuric': '#f87171',
  'Magnesium': '#e2e8f0',
  'Nitrogen': '#7dd3fc',
  'Chlorine': '#bef264',
  'Carbon': '#94a3b8',
  'Propane': '#fdba74',
  'Acetone': '#c4b5fd',
  'Isopropanol': '#c4b5fd',
  'Methanol': '#fb923c',
  'Barium': '#86efac',
  'Ammonia': '#7dd3fc',
  'Sulfur': '#fde68a',
};

function getChemicalColor(name: string): string {
  for (const [key, color] of Object.entries(CHEMICAL_COLORS)) {
    if (name.includes(key)) return color;
  }
  return '#64748b';
}

function getChemicalSymbol(name: string): string {
  const match = name.match(/\(([^)]+)\)/);
  if (match) return match[1].slice(0, 4);
  return name.slice(0, 3).toUpperCase();
}

export default function ReagentShelf({ chemicals, selectedChemicals, onSelect, maxSelections = 2 }: ReagentShelfProps) {
  return (
    <TooltipProvider>
      <div className="bg-lab-surface border border-lab-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <FlaskConical className="w-4 h-4 text-lab-cyan" />
          <h3 className="font-display font-semibold text-lab-text text-sm">Reagent Shelf</h3>
          <span className="ml-auto text-xs text-lab-muted font-mono">
            {selectedChemicals.length}/{maxSelections} selected
          </span>
        </div>
        <ScrollArea className="h-72 pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {chemicals.map((chemical) => {
              const isSelected = selectedChemicals.includes(chemical);
              const isDisabled = !isSelected && selectedChemicals.length >= maxSelections;
              const color = getChemicalColor(chemical);
              const symbol = getChemicalSymbol(chemical);

              return (
                <Tooltip key={chemical}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => !isDisabled && onSelect(chemical)}
                      disabled={isDisabled}
                      className={`
                        relative flex flex-col items-center gap-1.5 p-2.5 rounded-lg border text-xs font-mono
                        transition-all duration-200 cursor-pointer select-none
                        ${isSelected
                          ? 'border-opacity-60 scale-95 shadow-inner'
                          : isDisabled
                          ? 'opacity-30 cursor-not-allowed border-lab-border'
                          : 'border-lab-border hover:border-opacity-50 hover:scale-105 hover:shadow-lg'
                        }
                      `}
                      style={{
                        borderColor: isSelected ? color : undefined,
                        backgroundColor: isSelected ? color + '22' : 'transparent',
                        boxShadow: isSelected ? `0 0 12px ${color}33` : undefined,
                      }}
                    >
                      {/* Vial icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: color + '33', color }}
                      >
                        {symbol}
                      </div>
                      <span
                        className="text-center leading-tight text-lab-muted"
                        style={{ color: isSelected ? color : undefined }}
                      >
                        {chemical.split(' (')[0].split(' ').slice(0, 2).join(' ')}
                      </span>
                      {isSelected && (
                        <div
                          className="absolute top-1 right-1 w-3 h-3 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: color, fontSize: '8px' }}
                        >
                          ✓
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-lab-surface border-lab-border text-lab-text text-xs">
                    {chemical}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}
