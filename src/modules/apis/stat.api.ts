import { IStat } from "../models/IStat";

export const fetchStatsByVideoId = async (videoId: string): Promise<IStat> => {
  const response = await fetch(`http://localhost:1234/stats?videoId=${videoId}`, {
    method: "GET",
    headers: {
      "api-key": "QDuebCUy0G5U-oNCJX9lSTXbnxncDENUP66gY0_r7Le3lw4lW-9Y5n_vxQxNxWE8"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status : ${response.status}`);
  }

  return await response.json();
};