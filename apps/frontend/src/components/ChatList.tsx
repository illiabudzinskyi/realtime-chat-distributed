import React, { useState } from 'react'
import type { IRoom, IUser } from '../types'
import { formatTime } from '../utils/date'
import { useAuthUser } from '../context/AuthUserContext';
import { useCreateRoom } from '../hooks';

export default function ChatList({ chats, activeId, onSelect }: { chats: IRoom[]; activeId?:string; onSelect:(c:IRoom)=>void}){
  const { user } = useAuthUser();
  const [text, setText] = useState<string>('');
  //c.lastMessage? formatTime(c.lastMessage.createdAt) : 
  const { mutateAsync: createRoom } = useCreateRoom(user.id);

  const handleSendMessage = async (e?:React.FormEvent) =>{
      e?.preventDefault(); 
      if (!text.trim()) return;
  
      await createRoom(text);
  
      setText('');
    }
  return (
    <div className="chat-list">
      <div>
        <form className="create-form" onSubmit={handleSendMessage}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="New room name" />
        <button type="submit">Create</button>
      </form>
      </div>
      {chats.map(c=> (
        <div key={c.id} className={"chat-item " + (c.id===activeId? 'active':'')} onClick={()=>onSelect(c)}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className="chat-title">{c.name || 'Untitled'}</div>
            {/* <div className="chat-time">{'At 3 PM'}</div>  */}
          </div>
          {/* <div className="chat-last">{'c.lastMessage?.content'}</div> */}
        </div>
      ))}
    </div>
  )
}