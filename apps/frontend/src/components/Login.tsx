import React, { FC, useState } from 'react'
import { useCreateUser } from '../hooks/useCreateUser'
import { useAuthUser } from '../context/AuthUserContext';
import { useGetUser } from '../hooks';

export const Login: FC = () => {
  const [name, setName] = useState('');

  const { mutateAsync: createUser, isPending: isCreateUserPending } = useCreateUser();
  const { mutateAsync: getUserByName, isPending: isGetUserPending } = useGetUser();
  const { login } = useAuthUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await getUserByName(name);

    if (user) {
      login(user);
    } else {
      const createdUser = await createUser(name);
      login(createdUser);
    }
  };

  return (
    <div className="login">
      {isCreateUserPending || isGetUserPending 
        ? <div className="center">Loading...</div>
        : (
          <form onSubmit={handleLogin} className="login-form">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
            <button type="submit" disabled={isCreateUserPending || isGetUserPending }>Enter</button>
          </form>
        )
      }
    </div>
  )
}