import { IVideo } from "../models/IVideo";

export const fetchVideosByChannelId = async (channelId: string, apiKey: string): Promise<IVideo[]> => {
  try {
    const response = await fetch(`http://localhost:1234/videos?channelId=${channelId}`, {
      method: "GET",
      headers: {
        "api-key": apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: IVideo[] = await response.json();
    return data;  // Return the data conforming to the IChannel interface
  } catch (error) {
    console.error("Error:", error);
    throw error;  // Re-throw the error to be handled by the caller if needed
  }
};