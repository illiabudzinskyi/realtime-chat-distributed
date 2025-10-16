import React, { FC } from 'react'
import type { IMessage, IUser } from '../types'
import { formatTime } from '../utils/date'

interface IProps { msg: IMessage; me?: IUser };

export const MessageItem: FC<IProps> = ({ msg, me }) => {
  const isMine = me.id === msg.user.id;

  return (
    <div className={"message " + (isMine? 'mine':'other') }>
      <div className="msg-user">{msg.user.username || 'anon'}</div>
      <div className="msg-text">{msg.content}</div>
      <div className="msg-time">{formatTime(msg.createdAt)}</div>
    </div>
  )
}