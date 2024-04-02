export interface IComment {
    id: string;
    commenter: string;
    comment: string;
    date: string;
    relevance_order: number;
    like_count: number;
    reply_count: number;
    gpt: string;
    unwanted: boolean;
    question: boolean;
    feedback: boolean;
    idea: boolean;
    collaboration: boolean;
    video_id: string;
}