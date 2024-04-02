import { For } from "solid-js";
import { useChannel } from "./useChannel";
import { ChannelCard } from "./components/ChannelCard";

interface IParams {
    apiKey: string;
    userId: number;
}

export default (props: IParams) => {
    const {
        channels,
        getChannelsByUserId
    } = useChannel({ apiKey: props.apiKey, userId: props.userId });

    return (
        <>
            <span>{JSON.stringify(channels())}</span>
            <For each={channels()} fallback={<div>Loading...</div>}>
                {(item) => <ChannelCard channel={item}></ChannelCard>}
            </For>
        </>

    )
}