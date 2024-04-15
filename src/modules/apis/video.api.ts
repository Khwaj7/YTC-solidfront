export const fetchVideosByChannelId = async (id: string) =>
  (await fetch(`http://localhost:1234/channels?userId=${id}`)).json();
