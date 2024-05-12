export const fetchUserByApiKey = async (apiKey: string) =>
(await fetch(`http://localhost:1234/users?apikey=${apiKey}`)).json();