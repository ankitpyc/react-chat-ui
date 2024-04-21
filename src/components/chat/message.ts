export default interface Message{
    messageType: string,
    messageId : string,
    userName : string,
    text: string,
    recieverID : string,
    userId: string,
    date: number,
    isDelivered : boolean,
    isRead : boolean,
    isSent : boolean
}