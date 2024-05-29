import { IChannel } from "../models/IChannel";

export const fetchChannelsByUserId = async (userId: number, apiKey: string): Promise<IChannel> => {
  try {
    const response = await fetch(`http://localhost:1234/channels?userId=${userId}`, {
      method: "GET",
      headers: {
        "api-key": apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: IChannel = await response.json();
    return data;  // Return the data conforming to the IChannel interface
  } catch (error) {
    console.error("Error:", error);
    throw error;  // Re-throw the error to be handled by the caller if needed
  }
};
