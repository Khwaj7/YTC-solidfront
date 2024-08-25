import { createResource, createSignal } from "solid-js";
import { mapUserResponseUser } from "./modules/models/mappers/mapUserResponseUser";
import { fetchUserByApiKey } from "./modules/apis/user.api";

export const useApp = () => {
  const [apiKey, setApiKey] = createSignal<string>();
  const [error, setError] = createSignal<string>("");

  const getUser = async (id: string) => {
    if (id.length > 0) {
      try {
        const userResponse = await fetchUserByApiKey(id);
        if (userResponse.ok) {
          const user = userResponse.json();
          return mapUserResponseUser(await user);
        } else {
          setError("API key is unknown");
          setApiKey(null);
        }
      } catch (e) {
        setError("Failed to fetch");
        setApiKey(null);
      }
    }
  };
  const [user] = createResource(apiKey, getUser);

  return {
    setApiKey,
    user,
    error,
    apiKey
  };
};
