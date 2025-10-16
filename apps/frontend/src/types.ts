export type IUser = { id: string; username: string }
export type IRoom = {
  id: string
  name?: string
}
export type IMessage = {
  id: string
  content: string
  createdAt: string
  user: IUser
}