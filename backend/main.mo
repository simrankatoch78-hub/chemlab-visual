import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Migration "migration"; // Import migration module

(with migration = Migration.run)
actor {
  type Reaction = {
    reactants : [Text];
    products : [Text];
    equation : Text;
    reactionType : Text;
    visualEffect : Text;
    description : Text;
  };

  let safeReactions = Map.fromIter<Text, Reaction>(
    [
      (
        "Water Formation",
        {
          reactants = ["Hydrogen (H₂)", "Oxygen (O₂)"];
          products = ["Water (H₂O)"];
          equation = "2H₂ + O₂ → 2H₂O";
          reactionType = "Synthesis";
          visualEffect = "No visible effect";
          description = "Hydrogen reacts with oxygen to form water in an exothermic reaction.";
        },
      ),
      (
        "Sodium Chloride Formation",
        {
          reactants = ["Sodium (Na)", "Chlorine (Cl₂)"];
          products = ["Sodium chloride (NaCl)", "Sodium ions (Na⁺)", "Chloride ions (Cl⁻)"];
          equation = "2Na + Cl₂ → 2NaCl";
          reactionType = "Synthesis";
          visualEffect = "Bright flash during sodium-chlorine bond formation";
          description = "Sodium and chlorine combine to form salt (sodium chloride).";
        },
      ),
      (
        "Acid-Base Neutralization",
        {
          reactants = ["Hydrochloric Acid (HCl)", "Sodium Hydroxide (NaOH)"];
          products = ["Sodium Chloride (NaCl)", "Water (H₂O)"];
          equation = "HCl + NaOH → NaCl + H₂O";
          reactionType = "Acid-Base";
          visualEffect = "Temperature rise, pH change to neutral";
          description = "Acid-base neutralization forming water and salt.";
        },
      ),
      (
        "Complete Combustion",
        {
          reactants = ["Methane (CH₄)", "Oxygen (O₂)"];
          products = ["Carbon Dioxide (CO₂)", "Water (H₂O)"];
          equation = "CH₄ + 2O₂ → CO₂ + 2H₂O";
          reactionType = "Combustion";
          visualEffect = "Blue flame, heat, water vapor";
          description = "Hydrocarbon combustion producing carbon dioxide and water.";
        },
      ),
      (
        "Precipitation Reaction",
        {
          reactants = ["Silver Nitrate (AgNO₃)", "Sodium Chloride (NaCl)"];
          products = ["Silver Chloride (AgCl)", "Sodium Nitrate (NaNO₃)"];
          equation = "AgNO₃ + NaCl → AgCl (s) + NaNO₃";
          reactionType = "Double Displacement/Precipitation";
          visualEffect = "White precipitate formation";
          description = "Double displacement reaction, forms insoluble AgCl.";
        },
      ),
    ].values(),
  );

  let blockedReactions = Map.fromIter(
    [
      ("Explosives", "Content restricted: Explosive compound synthesis is not permitted."),
      (
        "Chemical Weapons",
        "Content restricted: Information on toxic gases weaponized for harm is not available.",
      ),
    ].values(),
  );

  public query ({ caller }) func getAllReactions() : async [Reaction] {
    safeReactions.values().toArray();
  };

  public query ({ caller }) func getReactionByName(name : Text) : async {
    #ok : ?Reaction;
    #contentBlocked : ?Text;
  } {
    switch (blockedReactions.get(name)) {
      case (?contentBlocked) { #contentBlocked(?contentBlocked) };
      case (null) { #ok(safeReactions.get(name)) };
    };
  };

  public query ({ caller }) func searchReactions(searchTerm : Text) : async [Reaction] {
    safeReactions.values().toArray().filter(
      func(reaction) {
        reaction.equation.contains(#text searchTerm) or
        reaction.description.contains(#text searchTerm) or
        reaction.reactionType.contains(#text searchTerm);
      }
    );
  };
};
