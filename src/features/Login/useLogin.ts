import {createSignal, Setter} from "solid-js";
import {mapUserResponseUser} from "~/models/mappers/mapUserResponseUser";

export const useLogin = () => {
    const [apiKey, setApiKey] = createSignal('');

    const fetchUserByApiKey = async (id: string) => (await fetch(`http://localhost:1234/users?apikey=${id}`)).json();
    const getUserByApiKey = async () => {
        const userResponse = await fetchUserByApiKey(apiKey());
        return mapUserResponseUser(userResponse);
    }

    return {
        apiKey, setApiKey, getUserByApiKey
    };
}