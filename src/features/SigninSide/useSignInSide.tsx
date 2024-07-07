import { fetchRandomImage } from "../../modules/apis/unsplash.api";
import { IUnplash } from "../../modules/models/IUnplash";

interface IParams {
  unsplashApiKey: string;
}

export const useSignInSide = (props: IParams) => {
  const getRandomImage = async (): Promise<IUnplash> => {
    return await fetchRandomImage(props.unsplashApiKey);
  }

  return { getRandomImage };
}