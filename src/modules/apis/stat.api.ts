import { IStat } from "../models/IStat";

export const fetchStatsByVideoId = async (videoId: string, apiKey: string): Promise<IStat> => {
  const response = await fetch(`http://localhost:1234/stats?videoId=${videoId}`, {
    method: "GET",
    headers: {
      "api-key": apiKey,
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status : ${response.status}`);
  }

  return await response.json();
};