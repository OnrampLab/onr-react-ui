import { App } from '@onr/core';
import React from 'react';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { UserRequestPayload } from '../services/interfaces';
import { UserService } from '../services/UserService';
import { UserForm } from './UserForm';

interface UpdateUserFormProps {
  currentUser: AccountUser;
  onSubmit: () => void;
}

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  currentUser,
  onSubmit,
}: UpdateUserFormProps) => {
  return <UserForm handleSubmit={handleSubmit} currentUser={currentUser} />;

  async function handleSubmit(user: UserRequestPayload) {
    if (!currentUser.id) {
      return;
    }

    const userService = App.getInstance().getService('userService') as UserService;

    await userService.updateUser({ userId: currentUser.id, ...user });

    if (onSubmit) {
      onSubmit();
    }
  }
};
