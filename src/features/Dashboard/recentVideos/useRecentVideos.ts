import { fetchVideosByChannelId } from "../../../modules/apis/video.api";
import { fetchChannelsByUserId } from "../../../modules/apis/channel.api";

interface IProps {
  userId: number;
}

export const useRecentVideos = (props: IProps) => {
  console.log("props", props);
  const getChannel = async (id: number) => {
    if (id <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    const channelResponse = await fetchChannelsByUserId(id);
    console.log("channelResponse", channelResponse);
    return channelResponse;
  };

  const getVideos = async (id: string) => {
    const channels = await getChannel(props.userId);
    console.log("channels", channels);

    if (id.length <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    const videosResponse = await fetchVideosByChannelId(channels[0].id);
    console.log("videosResponse", videosResponse);
    return videosResponse;
  };
  const videos = null;//createResource(channels[0].id, getVideos);

  return {
    getChannel,
    getVideos
  };
};
