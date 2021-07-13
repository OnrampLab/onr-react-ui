import { Http } from '@onr/common';
import { IUser } from '../entities/interfaces';
import {
  CreateUserPayload,
  DeleteUserPayload,
  GetUserPayload,
  GetUserResponse,
  GetUsersPayload,
  UpdateUserPayload,
} from './interfaces/UserModel';

export const UserService = {
  getUsers: async (payload: GetUsersPayload): Promise<IUser[]> => {
    try {
      const response = await Http.get<IUser[]>(`/users`, {
        params: payload.params,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] getUsers Error: ${JSON.stringify(error)}`);
    }
  },

  getUser: async (payload: GetUserPayload): Promise<GetUserResponse> => {
    try {
      const response = await Http.get<GetUserResponse>(`/users/${payload.userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] getUser Error: ${JSON.stringify(error)}`);
    }
  },

  createUser: async (payload: CreateUserPayload): Promise<GetUserResponse> => {
    try {
      const response = await Http.post<GetUserResponse>(`/users`, {
        data: payload.data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] createUser Error: ${JSON.stringify(error)}`);
    }
  },

  updateUser: async (payload: UpdateUserPayload): Promise<GetUserResponse> => {
    try {
      const response = await Http.patch<GetUserResponse>(`/users/${payload.userId}`, {
        data: payload.data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] updateUser Error: ${JSON.stringify(error)}`);
    }
  },

  deleteUser: async (payload: DeleteUserPayload): Promise<GetUserResponse> => {
    try {
      const response = await Http.delete<GetUserResponse>(`/users/${payload.userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] deleteUser Error: ${JSON.stringify(error)}`);
    }
  },
};
