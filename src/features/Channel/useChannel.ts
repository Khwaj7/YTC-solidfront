import {createSignal} from "solid-js";
import {IChannel} from "~/models/IChannel";

export const useChannel = () => {
    const [channels, setChannels] = createSignal<IChannel[]>([]);
    const fetchChannels = async (userId: number) => {
        const channelsResponse = (await fetch(`http://localhost:1234/channels?apikey=${userId}`)).json();
    }

    return {
        channels, fetchChannels
    };
}