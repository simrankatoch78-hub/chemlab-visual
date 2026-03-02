import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Reaction } from '../backend';
import { mergeWithLocalReactions } from '../lib/reactions';
import { isContentBlocked, SAFETY_WARNING_MESSAGE } from '../lib/safetyFilter';

export function useAllReactions() {
  const { actor, isFetching } = useActor();

  return useQuery<Record<string, Reaction>>({
    queryKey: ['reactions'],
    queryFn: async () => {
      if (!actor) return mergeWithLocalReactions([]);
      try {
        const backendReactions = await actor.getAllReactions();
        return mergeWithLocalReactions(backendReactions);
      } catch {
        return mergeWithLocalReactions([]);
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export type ReactionByNameResult =
  | { status: 'ok'; reaction: Reaction | null }
  | { status: 'blocked'; message: string };

export function useReactionByName(name: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<ReactionByNameResult>({
    queryKey: ['reaction', name],
    queryFn: async (): Promise<ReactionByNameResult> => {
      if (!name) return { status: 'ok', reaction: null };

      // Client-side safety check on the name itself
      if (isContentBlocked(name)) {
        return { status: 'blocked', message: SAFETY_WARNING_MESSAGE };
      }

      if (!actor) return { status: 'ok', reaction: null };

      try {
        const result = await actor.getReactionByName(name);
        if (result.__kind__ === 'contentBlocked') {
          return {
            status: 'blocked',
            message: result.contentBlocked ?? SAFETY_WARNING_MESSAGE,
          };
        }
        // result.__kind__ === 'ok'
        const reaction = result.ok ?? null;
        if (reaction && isContentBlocked(reaction.equation)) {
          return { status: 'blocked', message: SAFETY_WARNING_MESSAGE };
        }
        return { status: 'ok', reaction };
      } catch {
        return { status: 'ok', reaction: null };
      }
    },
    enabled: !!actor && !isFetching && !!name,
  });
}
