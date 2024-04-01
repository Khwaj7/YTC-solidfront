import { createResource, createSignal } from "solid-js";
import { IChannel } from "../../models/IChannel";

interface IProps {
  apiKey: string;
  userId: number;
}

export const useChannel = (props: IProps) => {
  const fetchChannelsByUserId = async () =>
    (
      await fetch(`http://localhost:1234/channels?userId=${props.userId}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": props.apiKey,
        },
      })
    ).json();

    const getChannelsByUserId = async () => {
        const channelsResponse = await fetchChannelsByUserId();
        return channelsResponse as IChannel[];
    }

    const [channels] = createResource(props.userId, getChannelsByUserId);

  return {
    channels,
    getChannelsByUserId,
  };
};
