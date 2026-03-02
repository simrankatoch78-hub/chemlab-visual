import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type Reaction = {
    reactants : [Text];
    products : [Text];
    equation : Text;
    reactionType : Text;
    visualEffect : Text;
    description : Text;
  };

  type OldActor = {
    reactions : Map.Map<Text, Reaction>;
  };

  type NewActor = {
    safeReactions : Map.Map<Text, Reaction>;
    blockedReactions : Map.Map<Text, Text>;
  };

  public func run(old : OldActor) : NewActor {
    let emptySafeReactions = Map.empty<Text, Reaction>();
    let emptyBlockedReactions = Map.empty<Text, Text>();
    { safeReactions = emptySafeReactions; blockedReactions = emptyBlockedReactions };
  };
};
