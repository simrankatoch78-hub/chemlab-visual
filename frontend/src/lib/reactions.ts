import type { Reaction } from '../backend';

// Extended local reaction data — 40+ distinct reactions covering synthesis,
// decomposition, organic, acid-base, redox, combustion, precipitation, and more.
export const LOCAL_REACTIONS: Record<string, Reaction> = {
  // ── SYNTHESIS / COMBINATION ──────────────────────────────────────────────
  "Water Formation": {
    reactants: ["Hydrogen (H₂)", "Oxygen (O₂)"],
    products: ["Water (H₂O)"],
    equation: "2H₂ + O₂ → 2H₂O",
    reactionType: "Synthesis",
    visualEffect: "steam",
    description: "Hydrogen gas reacts with oxygen gas in a highly exothermic reaction to produce water. This reaction releases a large amount of energy and is used in rocket propulsion.",
  },
  "Sodium Chloride Formation": {
    reactants: ["Sodium (Na)", "Chlorine (Cl₂)"],
    products: ["Sodium Chloride (NaCl)"],
    equation: "2Na + Cl₂ → 2NaCl",
    reactionType: "Synthesis",
    visualEffect: "fire",
    description: "Sodium metal reacts vigorously with chlorine gas to form sodium chloride (table salt). The reaction produces a bright yellow flame and white crystalline salt.",
  },
  "Magnesium Oxide Formation": {
    reactants: ["Magnesium (Mg)", "Oxygen (O₂)"],
    products: ["Magnesium Oxide (MgO)"],
    equation: "2Mg + O₂ → 2MgO",
    reactionType: "Synthesis",
    visualEffect: "fire",
    description: "Magnesium burns brilliantly in oxygen with an intense white flame to produce magnesium oxide. This reaction is used in flares and fireworks.",
  },
  "Iron Sulfide Formation": {
    reactants: ["Iron (Fe)", "Sulfur (S)"],
    products: ["Iron Sulfide (FeS)"],
    equation: "Fe + S → FeS",
    reactionType: "Synthesis",
    visualEffect: "color_change",
    description: "Iron and sulfur combine when heated to form iron(II) sulfide. The mixture changes from a grey-yellow blend to a uniform dark grey-black solid.",
  },
  "Ammonia Synthesis": {
    reactants: ["Nitrogen (N₂)", "Hydrogen (H₂)"],
    products: ["Ammonia (NH₃)"],
    equation: "N₂ + 3H₂ ⇌ 2NH₃",
    reactionType: "Synthesis",
    visualEffect: "gas",
    description: "The Haber-Bosch process combines nitrogen and hydrogen under high pressure and temperature with an iron catalyst to produce ammonia. This industrial reaction is essential for fertilizer production.",
  },
  "Carbon Dioxide Formation": {
    reactants: ["Carbon (C)", "Oxygen (O₂)"],
    products: ["Carbon Dioxide (CO₂)"],
    equation: "C + O₂ → CO₂",
    reactionType: "Synthesis",
    visualEffect: "gas",
    description: "Carbon burns completely in excess oxygen to form carbon dioxide. This reaction occurs in combustion engines and is a key step in the carbon cycle.",
  },

  // ── DECOMPOSITION ────────────────────────────────────────────────────────
  "Hydrogen Peroxide Decomposition": {
    reactants: ["Hydrogen Peroxide (H₂O₂)", "Manganese Dioxide (MnO₂)"],
    products: ["Water (H₂O)", "Oxygen (O₂)"],
    equation: "2H₂O₂ → 2H₂O + O₂↑",
    reactionType: "Decomposition",
    visualEffect: "foam",
    description: "Manganese dioxide acts as a catalyst to rapidly decompose hydrogen peroxide into water and oxygen gas. The reaction produces a dramatic foam as oxygen bubbles are released rapidly.",
  },
  "Calcium Carbonate Decomposition": {
    reactants: ["Calcium Carbonate (CaCO₃)"],
    products: ["Calcium Oxide (CaO)", "Carbon Dioxide (CO₂)"],
    equation: "CaCO₃ → CaO + CO₂↑",
    reactionType: "Decomposition",
    visualEffect: "gas",
    description: "Heating limestone (calcium carbonate) above 840°C causes it to decompose into quicklime (calcium oxide) and carbon dioxide. This is the basis of the lime industry.",
  },
  "Water Electrolysis": {
    reactants: ["Water (H₂O)"],
    products: ["Hydrogen (H₂)", "Oxygen (O₂)"],
    equation: "2H₂O → 2H₂↑ + O₂↑",
    reactionType: "Decomposition",
    visualEffect: "bubbles",
    description: "Passing an electric current through water splits it into hydrogen and oxygen gases. Hydrogen forms at the cathode and oxygen at the anode in a 2:1 volume ratio.",
  },
  "Potassium Chlorate Decomposition": {
    reactants: ["Potassium Chlorate (KClO₃)", "Manganese Dioxide (MnO₂)"],
    products: ["Potassium Chloride (KCl)", "Oxygen (O₂)"],
    equation: "2KClO₃ → 2KCl + 3O₂↑",
    reactionType: "Decomposition",
    visualEffect: "gas",
    description: "Potassium chlorate decomposes when heated, especially in the presence of manganese dioxide catalyst, releasing oxygen gas. This is a laboratory method for generating pure oxygen.",
  },
  "Mercury Oxide Decomposition": {
    reactants: ["Mercury Oxide (HgO)"],
    products: ["Mercury (Hg)", "Oxygen (O₂)"],
    equation: "2HgO → 2Hg + O₂↑",
    reactionType: "Decomposition",
    visualEffect: "color_change",
    description: "Heating red mercury(II) oxide produces liquid mercury droplets and oxygen gas. This historic experiment by Lavoisier helped establish the law of conservation of mass.",
  },

  // ── ACID-BASE ────────────────────────────────────────────────────────────
  "Acid-Base Neutralization": {
    reactants: ["Hydrochloric Acid (HCl)", "Sodium Hydroxide (NaOH)"],
    products: ["Sodium Chloride (NaCl)", "Water (H₂O)"],
    equation: "HCl + NaOH → NaCl + H₂O",
    reactionType: "Acid-Base",
    visualEffect: "color_change",
    description: "A strong acid reacts with a strong base in a neutralization reaction. The solution heats up and the pH changes from acidic to neutral, producing common table salt and water.",
  },
  "Baking Soda + Vinegar": {
    reactants: ["Sodium Bicarbonate (NaHCO₃)", "Acetic Acid (CH₃COOH)"],
    products: ["Sodium Acetate (CH₃COONa)", "Water (H₂O)", "Carbon Dioxide (CO₂)"],
    equation: "NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑",
    reactionType: "Acid-Base",
    visualEffect: "foam",
    description: "Baking soda (sodium bicarbonate) reacts with vinegar (acetic acid) in a classic acid-base reaction. The reaction produces carbon dioxide gas, causing vigorous fizzing and foam formation.",
  },
  "Calcium Carbonate + Hydrochloric Acid": {
    reactants: ["Calcium Carbonate (CaCO₃)", "Hydrochloric Acid (HCl)"],
    products: ["Calcium Chloride (CaCl₂)", "Water (H₂O)", "Carbon Dioxide (CO₂)"],
    equation: "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑",
    reactionType: "Acid-Base",
    visualEffect: "bubbles",
    description: "Calcium carbonate (limestone/chalk) dissolves in hydrochloric acid with vigorous effervescence as carbon dioxide gas is released. This reaction explains how acid rain erodes limestone buildings.",
  },
  "Sulfuric Acid + Sodium Hydroxide": {
    reactants: ["Sulfuric Acid (H₂SO₄)", "Sodium Hydroxide (NaOH)"],
    products: ["Sodium Sulfate (Na₂SO₄)", "Water (H₂O)"],
    equation: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    reactionType: "Acid-Base",
    visualEffect: "color_change",
    description: "Sulfuric acid reacts with sodium hydroxide in a strongly exothermic neutralization. The resulting sodium sulfate solution is neutral and the temperature rises noticeably.",
  },
  "Citric Acid + Sodium Bicarbonate": {
    reactants: ["Citric Acid (C₆H₈O₇)", "Sodium Bicarbonate (NaHCO₃)"],
    products: ["Sodium Citrate (Na₃C₆H₅O₇)", "Water (H₂O)", "Carbon Dioxide (CO₂)"],
    equation: "C₆H₈O₇ + 3NaHCO₃ → Na₃C₆H₅O₇ + 3H₂O + 3CO₂↑",
    reactionType: "Acid-Base",
    visualEffect: "foam",
    description: "Citric acid reacts with sodium bicarbonate to produce sodium citrate, water, and carbon dioxide. This is the reaction behind effervescent tablets and bath bombs.",
  },

  // ── COMBUSTION ───────────────────────────────────────────────────────────
  "Combustion of Methane": {
    reactants: ["Methane (CH₄)", "Oxygen (O₂)"],
    products: ["Carbon Dioxide (CO₂)", "Water (H₂O)"],
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    reactionType: "Combustion",
    visualEffect: "fire",
    description: "Methane, the primary component of natural gas, burns in oxygen to produce carbon dioxide and water vapor. This is the reaction that occurs in gas stoves and furnaces.",
  },
  "Combustion of Ethanol": {
    reactants: ["Ethanol (C₂H₅OH)", "Oxygen (O₂)"],
    products: ["Carbon Dioxide (CO₂)", "Water (H₂O)"],
    equation: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
    reactionType: "Combustion",
    visualEffect: "fire",
    description: "Ethanol burns in oxygen with a pale blue flame to produce carbon dioxide and water. This combustion reaction is the basis for alcohol-based fuels and hand sanitizers.",
  },
  "Combustion of Propane": {
    reactants: ["Propane (C₃H₈)", "Oxygen (O₂)"],
    products: ["Carbon Dioxide (CO₂)", "Water (H₂O)"],
    equation: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    reactionType: "Combustion",
    visualEffect: "fire",
    description: "Propane burns completely in oxygen to produce carbon dioxide and water. Propane is widely used as a fuel for heating, cooking, and portable stoves.",
  },
  "Combustion of Glucose": {
    reactants: ["Glucose (C₆H₁₂O₆)", "Oxygen (O₂)"],
    products: ["Carbon Dioxide (CO₂)", "Water (H₂O)"],
    equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    reactionType: "Combustion",
    visualEffect: "fire",
    description: "Glucose undergoes complete combustion in oxygen, releasing energy. This is essentially the reverse of photosynthesis and represents cellular respiration in living organisms.",
  },

  // ── OXIDATION-REDUCTION (REDOX) ──────────────────────────────────────────
  "Iron + Copper Sulfate": {
    reactants: ["Iron (Fe)", "Copper Sulfate (CuSO₄)"],
    products: ["Iron Sulfate (FeSO₄)", "Copper (Cu)"],
    equation: "Fe + CuSO₄ → FeSO₄ + Cu",
    reactionType: "Oxidation-Reduction",
    visualEffect: "color_change",
    description: "Iron displaces copper from copper sulfate solution. The blue solution turns pale green as iron(II) sulfate forms, and reddish copper metal deposits on the iron surface.",
  },
  "Copper + Nitric Acid": {
    reactants: ["Copper (Cu)", "Nitric Acid (HNO₃)"],
    products: ["Copper Nitrate (Cu(NO₃)₂)", "Nitrogen Dioxide (NO₂)", "Water (H₂O)"],
    equation: "Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O",
    reactionType: "Oxidation-Reduction",
    visualEffect: "gas",
    description: "Copper dissolves in concentrated nitric acid, producing a blue-green solution of copper nitrate and releasing brown nitrogen dioxide gas. This is a dramatic redox reaction.",
  },
  "Potassium Permanganate + Hydrogen Peroxide": {
    reactants: ["Potassium Permanganate (KMnO₄)", "Hydrogen Peroxide (H₂O₂)"],
    products: ["Manganese Dioxide (MnO₂)", "Potassium Hydroxide (KOH)", "Oxygen (O₂)"],
    equation: "2KMnO₄ + 3H₂O₂ → 2MnO₂ + 2KOH + 3O₂↑ + 2H₂O",
    reactionType: "Oxidation-Reduction",
    visualEffect: "bubbles",
    description: "The deep purple permanganate solution reacts with hydrogen peroxide, rapidly decolorizing as manganese dioxide precipitates and oxygen gas is vigorously released.",
  },
  "Thermite Reaction": {
    reactants: ["Aluminum (Al)", "Iron Oxide (Fe₂O₃)"],
    products: ["Aluminum Oxide (Al₂O₃)", "Iron (Fe)"],
    equation: "2Al + Fe₂O₃ → Al₂O₃ + 2Fe",
    reactionType: "Oxidation-Reduction",
    visualEffect: "fire",
    description: "Aluminum reduces iron oxide in an extremely exothermic reaction that produces molten iron and aluminum oxide slag. The reaction burns at over 2500°C and is used in welding.",
  },
  "Rusting of Iron": {
    reactants: ["Iron (Fe)", "Oxygen (O₂)", "Water (H₂O)"],
    products: ["Iron Oxide (Fe₂O₃)"],
    equation: "4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → 2Fe₂O₃·3H₂O",
    reactionType: "Oxidation-Reduction",
    visualEffect: "color_change",
    description: "Iron slowly oxidizes in the presence of oxygen and water to form hydrated iron(III) oxide (rust). This electrochemical process causes the characteristic reddish-brown discoloration.",
  },
  "Bleaching with Chlorine": {
    reactants: ["Chlorine (Cl₂)", "Water (H₂O)"],
    products: ["Hypochlorous Acid (HClO)", "Hydrochloric Acid (HCl)"],
    equation: "Cl₂ + H₂O → HClO + HCl",
    reactionType: "Oxidation-Reduction",
    visualEffect: "color_change",
    description: "Chlorine dissolves in water to form hypochlorous acid, a powerful oxidizing agent used in water treatment and bleaching. The hypochlorous acid destroys color-causing compounds.",
  },

  // ── SINGLE DISPLACEMENT ──────────────────────────────────────────────────
  "Zinc + Hydrochloric Acid": {
    reactants: ["Zinc (Zn)", "Hydrochloric Acid (HCl)"],
    products: ["Zinc Chloride (ZnCl₂)", "Hydrogen Gas (H₂)"],
    equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
    reactionType: "Single Displacement",
    visualEffect: "bubbles",
    description: "Zinc metal reacts with hydrochloric acid to produce zinc chloride and hydrogen gas. Vigorous bubbling is observed as hydrogen gas is released from the solution.",
  },
  "Sodium + Water": {
    reactants: ["Sodium (Na)", "Water (H₂O)"],
    products: ["Sodium Hydroxide (NaOH)", "Hydrogen Gas (H₂)"],
    equation: "2Na + 2H₂O → 2NaOH + H₂↑",
    reactionType: "Single Displacement",
    visualEffect: "fire",
    description: "Sodium metal reacts violently with water, skittering across the surface while producing hydrogen gas that ignites. The solution becomes strongly alkaline as sodium hydroxide forms.",
  },
  "Magnesium + Hydrochloric Acid": {
    reactants: ["Magnesium (Mg)", "Hydrochloric Acid (HCl)"],
    products: ["Magnesium Chloride (MgCl₂)", "Hydrogen Gas (H₂)"],
    equation: "Mg + 2HCl → MgCl₂ + H₂↑",
    reactionType: "Single Displacement",
    visualEffect: "bubbles",
    description: "Magnesium dissolves rapidly in hydrochloric acid, producing magnesium chloride and hydrogen gas. The reaction is faster than zinc and the solution warms noticeably.",
  },
  "Copper + Silver Nitrate": {
    reactants: ["Copper (Cu)", "Silver Nitrate (AgNO₃)"],
    products: ["Copper Nitrate (Cu(NO₃)₂)", "Silver (Ag)"],
    equation: "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag",
    reactionType: "Single Displacement",
    visualEffect: "color_change",
    description: "Copper wire placed in silver nitrate solution slowly becomes coated with shiny silver crystals while the solution turns blue as copper(II) nitrate forms.",
  },

  // ── DOUBLE DISPLACEMENT / PRECIPITATION ──────────────────────────────────
  "Silver Nitrate + Sodium Chloride": {
    reactants: ["Silver Nitrate (AgNO₃)", "Sodium Chloride (NaCl)"],
    products: ["Silver Chloride (AgCl)", "Sodium Nitrate (NaNO₃)"],
    equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
    reactionType: "Precipitation",
    visualEffect: "precipitate",
    description: "When silver nitrate solution is mixed with sodium chloride solution, a white precipitate of silver chloride forms immediately. This is a classic precipitation reaction used in qualitative analysis.",
  },
  "Lead Nitrate + Potassium Iodide": {
    reactants: ["Lead Nitrate (Pb(NO₃)₂)", "Potassium Iodide (KI)"],
    products: ["Lead Iodide (PbI₂)", "Potassium Nitrate (KNO₃)"],
    equation: "Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃",
    reactionType: "Precipitation",
    visualEffect: "precipitate",
    description: "Mixing lead nitrate and potassium iodide solutions produces a brilliant yellow precipitate of lead iodide. This striking precipitation reaction is often called 'golden rain'.",
  },
  "Barium Chloride + Sodium Sulfate": {
    reactants: ["Barium Chloride (BaCl₂)", "Sodium Sulfate (Na₂SO₄)"],
    products: ["Barium Sulfate (BaSO₄)", "Sodium Chloride (NaCl)"],
    equation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
    reactionType: "Precipitation",
    visualEffect: "precipitate",
    description: "Barium chloride reacts with sodium sulfate to form an insoluble white precipitate of barium sulfate. This reaction is used to test for sulfate ions in solution.",
  },
  "Copper Sulfate + Sodium Hydroxide": {
    reactants: ["Copper Sulfate (CuSO₄)", "Sodium Hydroxide (NaOH)"],
    products: ["Copper Hydroxide (Cu(OH)₂)", "Sodium Sulfate (Na₂SO₄)"],
    equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄",
    reactionType: "Precipitation",
    visualEffect: "precipitate",
    description: "Adding sodium hydroxide to copper sulfate solution produces a pale blue gelatinous precipitate of copper(II) hydroxide. This is a classic test for copper ions in solution.",
  },
  "Iron Chloride + Sodium Hydroxide": {
    reactants: ["Iron Chloride (FeCl₃)", "Sodium Hydroxide (NaOH)"],
    products: ["Iron Hydroxide (Fe(OH)₃)", "Sodium Chloride (NaCl)"],
    equation: "FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl",
    reactionType: "Precipitation",
    visualEffect: "precipitate",
    description: "Iron(III) chloride reacts with sodium hydroxide to form a rust-brown precipitate of iron(III) hydroxide. This reaction is used to test for iron(III) ions in solution.",
  },

  // ── ORGANIC CHEMISTRY ────────────────────────────────────────────────────
  "Esterification (Ethyl Acetate)": {
    reactants: ["Ethanol (C₂H₅OH)", "Acetic Acid (CH₃COOH)"],
    products: ["Ethyl Acetate (CH₃COOC₂H₅)", "Water (H₂O)"],
    equation: "C₂H₅OH + CH₃COOH ⇌ CH₃COOC₂H₅ + H₂O",
    reactionType: "Organic",
    visualEffect: "steam",
    description: "Ethanol reacts with acetic acid in the presence of an acid catalyst to form ethyl acetate (a fruity-smelling ester) and water. Esterification is a reversible reaction used to make fragrances and flavors.",
  },
  "Saponification": {
    reactants: ["Ethyl Acetate (CH₃COOC₂H₅)", "Sodium Hydroxide (NaOH)"],
    products: ["Sodium Acetate (CH₃COONa)", "Ethanol (C₂H₅OH)"],
    equation: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
    reactionType: "Organic",
    visualEffect: "color_change",
    description: "Saponification is the hydrolysis of an ester with a base. Ethyl acetate reacts with sodium hydroxide to form sodium acetate and ethanol. This is the chemical basis of soap-making from fats and oils.",
  },
  "Fermentation of Glucose": {
    reactants: ["Glucose (C₆H₁₂O₆)"],
    products: ["Ethanol (C₂H₅OH)", "Carbon Dioxide (CO₂)"],
    equation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑",
    reactionType: "Organic",
    visualEffect: "bubbles",
    description: "Yeast enzymes convert glucose into ethanol and carbon dioxide in the absence of oxygen. This anaerobic fermentation process is the basis of brewing, winemaking, and bread-making.",
  },
  "Photosynthesis": {
    reactants: ["Carbon Dioxide (CO₂)", "Water (H₂O)"],
    products: ["Glucose (C₆H₁₂O₆)", "Oxygen (O₂)"],
    equation: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
    reactionType: "Organic",
    visualEffect: "bubbles",
    description: "Plants use sunlight, carbon dioxide, and water to synthesize glucose and release oxygen. Photosynthesis is the foundation of almost all food chains on Earth.",
  },
  "Methanol Oxidation": {
    reactants: ["Methanol (CH₃OH)", "Oxygen (O₂)"],
    products: ["Formaldehyde (HCHO)", "Water (H₂O)"],
    equation: "2CH₃OH + O₂ → 2HCHO + 2H₂O",
    reactionType: "Organic",
    visualEffect: "color_change",
    description: "Methanol is oxidized to formaldehyde over a copper or silver catalyst. This industrial process is used to produce formaldehyde for resins, plastics, and disinfectants.",
  },
  "Acetone Formation": {
    reactants: ["Isopropanol (C₃H₇OH)", "Oxygen (O₂)"],
    products: ["Acetone (CH₃COCH₃)", "Water (H₂O)"],
    equation: "2C₃H₇OH + O₂ → 2CH₃COCH₃ + 2H₂O",
    reactionType: "Organic",
    visualEffect: "steam",
    description: "Isopropanol (rubbing alcohol) is oxidized to acetone over a catalyst. Acetone is a widely used solvent in nail polish remover, paints, and laboratory work.",
  },
  "Ethylene Polymerization": {
    reactants: ["Ethylene (C₂H₄)"],
    products: ["Polyethylene (-(C₂H₄)ₙ-)"],
    equation: "nC₂H₄ → -(CH₂-CH₂)ₙ-",
    reactionType: "Organic",
    visualEffect: "color_change",
    description: "Ethylene monomers link together under heat, pressure, and a catalyst to form polyethylene, one of the most common plastics. This addition polymerization reaction is the basis of the plastics industry.",
  },
  "Nylon Formation": {
    reactants: ["Hexamethylenediamine (H₂N(CH₂)₆NH₂)", "Adipic Acid (HOOC(CH₂)₄COOH)"],
    products: ["Nylon-6,6 (polymer)", "Water (H₂O)"],
    equation: "H₂N(CH₂)₆NH₂ + HOOC(CH₂)₄COOH → Nylon-6,6 + H₂O",
    reactionType: "Organic",
    visualEffect: "color_change",
    description: "Hexamethylenediamine and adipic acid undergo condensation polymerization to form nylon-6,6. This synthetic polymer is used in textiles, ropes, and engineering plastics.",
  },

  // ── ADDITIONAL REACTIONS ─────────────────────────────────────────────────
  "Sodium Bicarbonate Decomposition": {
    reactants: ["Sodium Bicarbonate (NaHCO₃)"],
    products: ["Sodium Carbonate (Na₂CO₃)", "Water (H₂O)", "Carbon Dioxide (CO₂)"],
    equation: "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑",
    reactionType: "Decomposition",
    visualEffect: "gas",
    description: "Heating baking soda causes it to decompose into sodium carbonate, water, and carbon dioxide. This is why baked goods rise when heated — the CO₂ bubbles expand the dough.",
  },
  "Iodine Clock Reaction": {
    reactants: ["Potassium Iodate (KIO₃)", "Sodium Thiosulfate (Na₂S₂O₃)"],
    products: ["Iodine (I₂)", "Sodium Sulfate (Na₂SO₄)"],
    equation: "IO₃⁻ + 3S₂O₃²⁻ → I⁻ + 3S₄O₆²⁻ (then I₂ forms)",
    reactionType: "Oxidation-Reduction",
    visualEffect: "color_change",
    description: "The iodine clock reaction is a dramatic demonstration where a colorless solution suddenly turns deep blue-black when iodine is produced and reacts with starch. It illustrates reaction kinetics and rate control.",
  },
  "Copper Electroplating": {
    reactants: ["Copper Sulfate (CuSO₄)", "Sulfuric Acid (H₂SO₄)"],
    products: ["Copper (Cu)", "Oxygen (O₂)"],
    equation: "Cu²⁺ + 2e⁻ → Cu (cathode); H₂O → O₂ + 4H⁺ + 4e⁻ (anode)",
    reactionType: "Oxidation-Reduction",
    visualEffect: "color_change",
    description: "In copper electroplating, copper ions from the electrolyte are reduced and deposited as metallic copper on the cathode. This process is used to coat objects with a thin layer of copper.",
  },
  "Limewater + Carbon Dioxide": {
    reactants: ["Calcium Hydroxide (Ca(OH)₂)", "Carbon Dioxide (CO₂)"],
    products: ["Calcium Carbonate (CaCO₃)", "Water (H₂O)"],
    equation: "Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O",
    reactionType: "Precipitation",
    visualEffect: "precipitate",
    description: "Bubbling carbon dioxide through limewater (calcium hydroxide solution) turns it milky white as insoluble calcium carbonate precipitates. This is the standard test for carbon dioxide gas.",
  },
};

export const REACTION_TYPES = [
  "All",
  "Acid-Base",
  "Combustion",
  "Decomposition",
  "Organic",
  "Oxidation-Reduction",
  "Precipitation",
  "Single Displacement",
  "Synthesis",
];

export const VISUAL_EFFECT_COLORS: Record<string, { bg: string; particle: string; label: string }> = {
  bubbles: { bg: "#22d3ee", particle: "#67e8f9", label: "Bubbling" },
  color_change: { bg: "#a78bfa", particle: "#c4b5fd", label: "Color Change" },
  precipitate: { bg: "#fbbf24", particle: "#fde68a", label: "Precipitate" },
  fire: { bg: "#f97316", particle: "#fed7aa", label: "Fire/Flame" },
  foam: { bg: "#86efac", particle: "#bbf7d0", label: "Foam" },
  gas: { bg: "#94a3b8", particle: "#cbd5e1", label: "Gas Release" },
  steam: { bg: "#e2e8f0", particle: "#f8fafc", label: "Steam" },
  "No visible effect": { bg: "#64748b", particle: "#94a3b8", label: "No Effect" },
};

export function getReactionColor(visualEffect: string): string {
  return VISUAL_EFFECT_COLORS[visualEffect]?.bg ?? "#64748b";
}

export function mergeWithLocalReactions(backendReactions: Reaction[]): Record<string, Reaction> {
  const merged = { ...LOCAL_REACTIONS };
  backendReactions.forEach((r) => {
    const existingKey = Object.keys(LOCAL_REACTIONS).find(
      (k) => LOCAL_REACTIONS[k].equation === r.equation
    );
    if (!existingKey) {
      merged[`Backend: ${r.equation}`] = r;
    }
  });
  return merged;
}
