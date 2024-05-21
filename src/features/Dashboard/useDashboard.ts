import { IVideo } from "../../modules/models/IVideo";
import { fetchVideosByChannelId } from "../../modules/apis/video.api";
import { fetchChannelsByUserId } from "../../modules/apis/channel.api";

interface IParams {
  userId: number;
}

export const useDashboard = (props: IParams) => {
  const getChannel = async (id: number) => {
    if (id <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    const channelResponse = await fetchChannelsByUserId(id);
    return channelResponse;
  };

  const getVideos = async (id: string): Promise<IVideo[]> => {
    const channels = await getChannel(props.userId);

    if (id.length <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    const videosResponse = await fetchVideosByChannelId(channels[0].id);
    return videosResponse;
  };

  return {
    getChannel, getVideos
  };
};