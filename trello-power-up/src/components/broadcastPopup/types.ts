export type EpisodeBroadcast = {
    readonly number: number;
    readonly type: 'frontend' | 'backend';
    readonly date: Date;
    readonly streamUrl: string;
};
