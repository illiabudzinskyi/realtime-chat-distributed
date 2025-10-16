import React, { FC, useEffect, useState } from 'react'
import { Login } from './Login'
import { ChatWindow } from './ChatWindow';
import { useAuthUser } from '../context/AuthUserContext'
import ChatList from './ChatList';
import { useGetUser, useRooms } from '../hooks';
import { IRoom } from '../types';

const ROOM = {
  id: 'c7d66c91-3a07-4e11-bf0e-1a71a4f2bb4d',
  name: 'General'
}

export const App: FC = () => {
  const { user, logout } = useAuthUser();
  const [active, setActive] = useState<IRoom>(null);
  const { data: rooms  } = useRooms();
  const { mutateAsync: getUserByName, isPending: isGetUserPending } = useGetUser();

  useEffect(() => {
    if (user) checkIfUserExists();
  }, [user]);

  const checkIfUserExists = async () => {
    const authUser = await getUserByName(user.username);

    if (!authUser) {
      logout();
    }
  }

  if (!user) return <Login />

  return (
    <div className="app">
      <div className="sidebar">
        <div className="brand">
          <ChatList chats={rooms || []} activeId={active?.id || ''} onSelect={(room)=> setActive(room)} />
          <div style={{ marginTop: 'auto', padding: '10px' }}>
            <button 
              onClick={() => logout()} 
              className="logout_btn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
        <div className="main">
          {active 
            ? <ChatWindow room={active}/>
            : <div className="center">Select room</div>}
        </div>
    </div>
  )
}