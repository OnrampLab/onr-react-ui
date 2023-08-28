import { ResourceClient } from '@onr/ts-rest-client';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { GetUserPayload, GetUsersPayload } from './interfaces/UserModel';

export class UserService extends ResourceClient {
  async getUsers(payload: GetUsersPayload) {
    try {
      const { data: users } = await this.list(payload.params);

      return users as AccountUser[];
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] getUsers Error: ${JSON.stringify(error)}`);
    }
  }

  async getUser(payload: GetUserPayload) {
    try {
      const { data: user } = await this.find(payload.userId);

      return user as AccountUser;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] getUser Error: ${JSON.stringify(error)}`);
    }
  }

  async createUser(payload: { data: AccountUser }) {
    try {
      const { data: user } = await this.create(payload.data);
      return user as AccountUser;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] createUser Error: ${JSON.stringify(error)}`);
    }
  }

  async updateUser(payload: { data: any; userId: number }) {
    try {
      const { data: user } = await this.update(payload.userId, payload.data);
      return user as AccountUser;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] updateUser Error: ${JSON.stringify(error)}`);
    }
  }

  async deleteUser(payload: { userId: number }): Promise<void> {
    try {
      await this.delete(payload.userId);
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] deleteUser Error: ${JSON.stringify(error)}`);
    }
  }
}
