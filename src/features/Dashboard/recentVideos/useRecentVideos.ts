import { createResource, createSignal } from "solid-js";
import { fetchVideosByChannelId } from "../../../modules/apis/video.api";
import { fetchChannelsByUserId } from "../../../modules/apis/channel.api";

interface IProps {
  userId: number;
}

export const useRecentVideos = (props: IProps) => {
  console.log("userId", props.userId);
  const getChannel = async (id: number) => {
    if (id > 0) {
      const channelResponse = await fetchChannelsByUserId(id);
      return channelResponse;
    }
  }
  
  getChannel(props.userId);

  const getVideos = async (id: string) => {
    const channels = getChannel(props.userId);
    console.log("channels", channels);
    
    if (id.length > 0) {
      const videosResponse = await fetchVideosByChannelId(id);
      return videosResponse;
    }
  };
  const videos = null;//createResource(channels[0].id, getVideos);

  return {
    videos,
  };
};
