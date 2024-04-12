import { createResource, createSignal } from "solid-js";
import { mapUserResponseUser } from "./modules/models/mappers/mapUserResponseUser";

export const useApp = () => {
  const [apiKey, setApiKey] = createSignal<string>();

  const fetchUserByApiKey = async (id: string) =>
    (await fetch(`http://localhost:1234/users?apikey=${id}`)).json();

  const getUser = async (id: string) => {
    if (id.length > 0) {
      const userResponse = await fetchUserByApiKey(id);
      return mapUserResponseUser(userResponse);
    }
  };
  const [user] = createResource(apiKey, getUser);

  return {
    setApiKey,
    user,
  };
};
