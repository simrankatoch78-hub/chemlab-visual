interface ChemicalEquationProps {
  equation: string;
  className?: string;
}

// Parse chemical equation and render with proper subscripts/superscripts
export default function ChemicalEquation({ equation, className = '' }: ChemicalEquationProps) {
  // Replace subscript numbers after chemical symbols
  const renderEquation = (eq: string) => {
    const parts: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < eq.length) {
      const char = eq[i];

      // Handle arrow
      if (eq.slice(i, i + 2) === '→' || eq.slice(i, i + 3) === '->') {
        const arrowLen = eq[i] === '→' ? 1 : 2;
        parts.push(
          <span key={key++} className="text-lab-cyan mx-1 font-bold">
            →
          </span>
        );
        i += arrowLen;
        continue;
      }

      // Handle subscript digits (after letters or closing parens)
      if (/\d/.test(char) && i > 0 && /[a-zA-Z\)₀-₉]/.test(eq[i - 1])) {
        // Collect consecutive digits
        let digits = '';
        while (i < eq.length && /\d/.test(eq[i])) {
          digits += eq[i];
          i++;
        }
        parts.push(<sub key={key++} className="text-xs">{digits}</sub>);
        continue;
      }

      // Handle superscript charge indicators like ↑ or ↓
      if (char === '↑') {
        parts.push(
          <span key={key++} className="text-lab-green text-xs align-super ml-0.5">↑</span>
        );
        i++;
        continue;
      }
      if (char === '↓') {
        parts.push(
          <span key={key++} className="text-lab-yellow text-xs align-super ml-0.5">↓</span>
        );
        i++;
        continue;
      }

      // Handle + sign
      if (char === '+') {
        parts.push(
          <span key={key++} className="text-lab-muted mx-1">+</span>
        );
        i++;
        continue;
      }

      // Regular character
      parts.push(<span key={key++}>{char}</span>);
      i++;
    }

    return parts;
  };

  return (
    <span className={`font-mono ${className}`}>
      {renderEquation(equation)}
    </span>
  );
}
