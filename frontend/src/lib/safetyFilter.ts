/**
 * Safety filter module for ChemLab Visual.
 * Blocks queries related to explosive compounds, chemical weapons,
 * nerve agents, and substances used as weapons of mass destruction.
 */

const BLOCKED_TERMS: string[] = [
  // Explosives
  'tatp', 'triacetone triperoxide', 'rdx', 'cyclonite', 'hexogen',
  'nitroglycerin', 'nitroglycerine', 'tnt', 'trinitrotoluene',
  'petn', 'pentaerythritol tetranitrate', 'hmx', 'octogen',
  'anfo', 'ammonium nitrate fuel oil', 'semtex', 'c4', 'c-4',
  'picric acid', 'trinitrophenol', 'tetryl', 'nitrocellulose',
  'gun cotton', 'guncotton', 'black powder synthesis', 'flash powder',
  'thermite bomb', 'pipe bomb', 'ied', 'improvised explosive',
  'detonator', 'blasting cap', 'det cord', 'detonating cord',
  'nitrogen triiodide', 'acetone peroxide', 'diacetone diperoxide',
  'hexamethylene triperoxide diamine', 'hmtd',
  'ammonium nitrate explosive', 'fertilizer bomb',
  'nitric acid bomb', 'peroxide explosive',

  // Chemical weapons / nerve agents
  'sarin', 'gb agent', 'vx nerve', 'vx agent', 'novichok',
  'tabun', 'soman', 'cyclosarin', 'nerve agent', 'nerve gas',
  'mustard gas', 'sulfur mustard', 'lewisite', 'phosgene weapon',
  'hydrogen cyanide weapon', 'cyanide gas weapon', 'chlorine gas weapon',
  'blister agent', 'choking agent', 'blood agent',
  'organophosphate weapon', 'chemical weapon', 'chemical warfare',
  'weaponized', 'weaponise', 'weaponize',
  'binary chemical', 'binary nerve',

  // Biological / radiological (out of scope but block anyway)
  'ricin synthesis', 'botulinum synthesis', 'anthrax synthesis',
  'radiological weapon', 'dirty bomb', 'nuclear weapon synthesis',

  // General harmful intent keywords
  'poison gas synthesis', 'toxic gas weapon', 'mass casualty',
  'kill people', 'harm humans', 'attack people',
];

/**
 * Returns true if the given text contains any blocked term.
 * Case-insensitive, partial-match check.
 */
export function isContentBlocked(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return BLOCKED_TERMS.some((term) => lower.includes(term));
}

export const SAFETY_WARNING_MESSAGE =
  '⚠️ This content is restricted for safety reasons. ChemLab Visual does not provide information on explosive compounds, chemical weapons, nerve agents, or any substance that could be used to harm people. Please explore our library of safe, educational chemistry reactions instead.';
