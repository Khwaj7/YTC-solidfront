export const fetchUserByApiKey = async (id: string) =>
(await fetch(`http://localhost:1234/users?apikey=${id}`)).json();