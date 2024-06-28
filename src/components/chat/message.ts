import { MessageDeliveryStatus,MessageType} from "../../dto/interface";

export default interface SystemMessage {
    messageType: string,
    messageId: string,
    userName: string,
    text: string,
    receiverID: string,
    userId: string,
    date: string,
    chatId? : string,
    MessageStatus : MessageDeliveryStatus
}