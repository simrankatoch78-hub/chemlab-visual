# Specification

## Summary
**Goal:** Expand the ChemLab Visual reaction library with more reaction types (including synthesis/organic), grow the reagent shelf, and add a safety filter that blocks harmful/illegal chemistry content.

**Planned changes:**
- Expand the reaction library to at least 40 distinct reactions covering acid-base, redox, precipitation, combustion, synthesis/combination, decomposition, single replacement, double replacement, and organic reactions — each with reactants, products, balanced equation, type, description, and visual effect
- Add a safety filter (frontend and backend) with a blocklist of harmful/illegal substances (explosives, chemical weapons, nerve agents, WMD-related compounds) that blocks search and simulation queries and displays a clear refusal/warning message when triggered
- Add at least 15 reagents to the reagent shelf including organic compounds (ethanol, acetic acid, glucose, benzene, citric acid, etc.), with a scrollable or paginated layout to handle the expanded set
- Ensure selecting two reagents with a defined synthesis reaction displays the correct result and animation

**User-visible outcome:** Users can browse, search, and simulate a much larger set of chemical reactions including organic and synthesis types, while any attempt to look up or simulate dangerous/illegal chemistry is blocked with a clear safety warning.
