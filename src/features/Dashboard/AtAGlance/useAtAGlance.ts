import { fetchStatsByVideoId } from "../../../modules/apis/stat.api";
import { IVideo } from "../../../modules/models/IVideo";
import { IStat } from "../../../modules/models/IStat";

export const useAtAGlance = () => {
  const getStatsByVideoId = async (videoId: string) => {
    if (videoId.length <= 0) {
      throw { code: 404, message: "id is incorrect" };
    }
    return await fetchStatsByVideoId(videoId);
  };

  const getStatsByVideos = async (videos: IVideo[]) => {
    const videosStats: IStat[] = [];
    for (const vid of videos) {
      const stats = await getStatsByVideoId(vid.id);
      videosStats.push(stats);
    }
    return videosStats;
  };

  return { getStatsByVideoId, getStatsByVideos };
};