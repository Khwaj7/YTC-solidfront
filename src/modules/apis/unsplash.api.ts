export const fetchRandomImage = async (unsplashApiKey: string) => {
  const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`,
    {
      method: "GET"
    });
  return response.json();
};