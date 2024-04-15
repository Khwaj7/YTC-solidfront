export const fetchChannelsByUserId = async (id: number) =>
  (await fetch(`http://localhost:1234/videos?channelId=${id}`)).json();
