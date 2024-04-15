import { createResource, createSignal } from "solid-js";
import { mapUserResponseUser } from "./modules/models/mappers/mapUserResponseUser";
import { fetchUserByApiKey } from "./modules/apis/user.api";

export const useApp = () => {
  const [apiKey, setApiKey] = createSignal<string>();

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
