export interface UserChatResponse {
    userid: number
    username: string
    history: History[]
  }
  
  export interface History {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: any
    userID1: string
    userID2: string
    time: string
    isdeleted: boolean
    messages: Message[]
    user1Details: User1Details
    user2Details: User2Details
  }
  
  export interface Message {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: any
    messageId: string
    chatId: number
    senderId: string
    receiverId: string
    status: number
    message: string
  }
  
  export interface User1Details {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: any
    userName: string
    email: string
    password: string
    userid: string
  }
  
  export interface User2Details {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: any
    userName: string
    email: string
    password: string
    userid: string
  }
  