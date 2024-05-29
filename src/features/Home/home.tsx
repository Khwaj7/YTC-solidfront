import { Resource } from "solid-js";
import { IUser } from "../../modules/models/IUser";
import Dashboard from "../Dashboard/dashboard";

interface IParams {
    user: Resource<IUser>;
    apiKey: string;
}

export const Home = (props: IParams) => {
    return (
        <Dashboard user={props.user} apiKey={props.apiKey}></Dashboard>
    );
}