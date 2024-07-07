import { IVideo } from "../../modules/models/IVideo";
import { fetchVideosByChannelId } from "../../modules/apis/video.api";
import { fetchChannelsByUserId } from "../../modules/apis/channel.api";

// TODO: Better apiKey sending method
interface IParams {
  userId: number;
  apiKey: string;
}

export const useDashboard = (props: IParams) => {
  const getChannel = async (id: number) => {
    if (id <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    return await fetchChannelsByUserId(id, props.apiKey);
  };

  const getVideos = async (id: string): Promise<IVideo[]> => {
    const channels = await getChannel(props.userId);

    if (id.length <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    return await fetchVideosByChannelId(channels[0].id, props.apiKey);
  };

  return {
    getChannel, getVideos
  };
};