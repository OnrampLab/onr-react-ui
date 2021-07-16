import React from 'react';
import { UserRequestPayload } from '../services/interfaces';
import { UserService } from '../services/UserService';
import { UserForm } from './UserForm';

interface CreateUserFormProps {
  onSubmit: () => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
}: CreateUserFormProps) => {
  // @ts-ignore
  return <UserForm handleSubmit={handleSubmit} currentUser={{}} />;

  async function handleSubmit(user: UserRequestPayload) {
    await UserService.createUser(user);

    if (onSubmit) {
      onSubmit();
    }
  }
};
