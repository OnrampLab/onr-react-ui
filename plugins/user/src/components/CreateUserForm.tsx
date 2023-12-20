import { App } from '@onr/core';
import React from 'react';
import { UserService } from '../services/UserService';
import { UserRequestPayload } from '../services/interfaces';
import { UserForm } from './UserForm';

interface CreateUserFormProps {
  onSubmit: () => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
}: CreateUserFormProps) => {
  return <UserForm handleSubmit={handleSubmit} />;

  async function handleSubmit(user: UserRequestPayload) {
    const userService = App.getInstance().getService<UserService>('userService');
    await userService.createUser(user);

    if (onSubmit) {
      onSubmit();
    }
  }
};
