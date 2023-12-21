import { App } from '@onr/core';
import { message } from 'antd';
import React from 'react';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { UserService } from '../services/UserService';
import { UserRequestPayload } from '../services/interfaces';
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

    const userService = App.getInstance().getService<UserService>('userService');

    await userService.updateUser({ userId: currentUser.id, ...user });

    message.success(`User ${currentUser.name} Updated`);

    if (onSubmit) {
      onSubmit();
    }
  }
};
