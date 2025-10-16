import React, { FC, useEffect, useRef, useState } from 'react'
import { useMessageSubscription, useSendMessage, useMessages } from '../hooks'
import { MessageItem } from './MessageItem'
import type { IRoom } from '../types'
import { useAuthUser } from '../context/AuthUserContext'

interface IProps { room: IRoom }

export const ChatWindow: FC<IProps> = ({ room }) => {
  const { user } = useAuthUser();

  const { data: messages, isLoading } = useMessages(room.id)
  const { mutateAsync: sendMessage } = useSendMessage(user.id, room.id);
  
  const [text, setText] = useState<string>('');
  const listRef = useRef<HTMLDivElement|null>(null);

  useMessageSubscription(room.id);

  useEffect(()=>{
    setTimeout(()=>{
      if (!listRef.current) return
      listRef.current.scrollTop = listRef.current.scrollHeight
    }, 50);
  }, [messages?.length])

  const handleSendMessage = async (e?:React.FormEvent) =>{
    e?.preventDefault(); 
    if (!text.trim()) return;

    await sendMessage(text);

    setText('');
  }

  return (
    <div className="chat-window">
      <div className="chat-header">{room.name || 'Chat'}</div>
      <div className="messages" ref={listRef}>
        {isLoading ? <div className="center">Loading...</div> : (
          messages?.map(m=> <MessageItem key={m.id} msg={m} me={user} />)
        )}
      </div>
      <form className="send-form" onSubmit={handleSendMessage}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}