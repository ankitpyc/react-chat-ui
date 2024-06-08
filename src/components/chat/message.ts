import { MessageDeliveryStatus,MessageType} from "../../redux-store/interf";

export default interface SystemMessage {
    messageType: string,
    messageId: string,
    userName: string,
    text: string,
    receiverID: string,
    userId: string,
    date: string,
    MessageStatus : MessageDeliveryStatus
}