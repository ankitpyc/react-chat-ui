export enum MessageDeliveryStatus{
    PUSHED = "PUSHED",
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ"
}

export enum MessageType {
    CHAT = "CHAT_MESSAGE",
    CONNECT_PING = "CONNECT_PING",
    BROADCAST = "BROADCAST",
    ACK = "ACK",
    CLOSE = "CLOSE"    
}

export interface UserInfo {
    userId: string;
    userName: string;
}

export interface UserMessage {
    text: string;
    id : string,
    sender: string;
    receiver: string;
    status? : MessageDeliveryStatus
    sentTime : string 
}

export interface ActiveUser {
    userInfo: UserInfo;
    messages: UserMessage[];
    unread: number;
    isActive?: boolean;
    chatId? : string
}

export interface ActiveUsersState {
    activeUsers: ActiveUser[];
}

