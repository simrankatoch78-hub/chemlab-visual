import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reaction {
    description: string;
    reactionType: string;
    visualEffect: string;
    products: Array<string>;
    equation: string;
    reactants: Array<string>;
}
export interface backendInterface {
    getAllReactions(): Promise<Array<Reaction>>;
    getReactionByName(name: string): Promise<{
        __kind__: "ok";
        ok: Reaction | null;
    } | {
        __kind__: "contentBlocked";
        contentBlocked: string | null;
    }>;
    searchReactions(searchTerm: string): Promise<Array<Reaction>>;
}
