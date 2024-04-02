import { IUser, IUserResponse } from "../IUser";


export const mapUserResponseUser = (userResponse: IUserResponse): IUser => {
  return {
    id: userResponse.id,
    name: userResponse.username,
    isAdmin: userResponse.is_admin,
  };
}