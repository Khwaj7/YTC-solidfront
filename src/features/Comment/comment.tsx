import { IComment } from "../../modules/models/IComment";

interface IParams {
    comment: IComment;
}

export const Comment = (props: IParams) => {
    return (
        <>
            <h1>Category</h1>
            <h3>Author</h3>
            <span>Comment</span>
            <div>BUTTONS AREA</div>
        </>
    );
};