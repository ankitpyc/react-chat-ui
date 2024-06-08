import SystemMessage from "../components/chat/message";
import { MessageDeliveryStatus, MessageType } from "../redux-store/interf";
import { useDispatch } from "react-redux";
import { addActiveUsers, addReceivedMessages, addSentMessages, removeInactiveUsers, updateMessageStatus } from "../redux-store/onlineUsers";


interface MessagingInf {
    creatChatMessage(text: string,currUserName : string,receiver : string,userId : string): SystemMessage
    createPingMessage(currUserName : string,userId :string): SystemMessage
    handleAndProcessMessageEvent(chatMessage : SystemMessage):SystemMessage
    AddMessageToStore(chatMessage : SystemMessage):void
    CreateAckMessage(messageId:string,userId : string,receiverID : string,status : MessageDeliveryStatus):SystemMessage
}


export class MessagingService implements MessagingInf {


    
    dispatch = useDispatch();
    
    AddMessageToStore(chatMessage : SystemMessage): void {
        this.dispatch(
            addSentMessages({
              id : chatMessage.messageId,
              receiver: chatMessage.receiverID,
              sender: chatMessage.userId,
              message: chatMessage.text,
              deliveryStatus : MessageDeliveryStatus.PUSHED,
              time : new Date().toString()
            })
          );
    }

    handleAndProcessMessageEvent(chatMessage : SystemMessage): SystemMessage {
        debugger
        const messageType = chatMessage.messageType.toString()
        switch (messageType) {
            case MessageType.CONNECT_PING.toString():
              if (chatMessage.userId != sessionStorage.getItem("ID")) {
                this.dispatch(addActiveUsers({ newUser: chatMessage }));
              }
              break;
            case MessageType.CLOSE.toString():
              this.dispatch(removeInactiveUsers({ userId: chatMessage.userId }));
              break;
            case MessageType.ACK.toString() :
              this.dispatch(updateMessageStatus({sender : chatMessage.userId,receiver : chatMessage.receiverID, messageId : chatMessage.messageId}))
              break;  
            case MessageType.CHAT.toString():
              this.dispatch(
                addReceivedMessages({
                  id: chatMessage.messageId,
                  receiver: chatMessage.receiverID,
                  sender: chatMessage.userId,
                  message: chatMessage.text,
                  deliveryStatus: chatMessage.MessageStatus,
                  time: chatMessage.date,
                })
              );
                var sentAck = this.CreateAckMessage(chatMessage.messageId,chatMessage.receiverID,chatMessage.userId,MessageDeliveryStatus.DELIVERED)
                return sentAck
            default :
            throw new Error("Invalid Message type not handled")
          }
          return null;
    }

    creatChatMessage(text: string,currUserName : string,receiver : string,userId :string): SystemMessage {
        var chatMessage: SystemMessage = {
            messageType : MessageType.CHAT.toString(),
            userName: currUserName,
            text: text,
            receiverID: receiver,
            messageId: crypto.randomUUID(),
            MessageStatus : MessageDeliveryStatus.PUSHED,
            userId: userId,
            date: Date.now().toString(),
          };
          return chatMessage;
    }

    createPingMessage(currUserName : string,userId :string): SystemMessage {
        var chatMessage: SystemMessage = {
            messageType:MessageType.CONNECT_PING.toString(),
            userName: "",
            text: "",
            receiverID: "",
            messageId: crypto.randomUUID(),
            MessageStatus : MessageDeliveryStatus.SENT,
            userId: userId,
            date: Date.now().toString(),
          };
          return chatMessage;
        }
        
        CreateAckMessage(messageId:string,userId : string,receiverID : string,status : MessageDeliveryStatus): SystemMessage {
            var chatMessage: SystemMessage = {
                messageType:MessageType.ACK.toString(),
                userName: "",
                text: "",
                receiverID: receiverID,
                messageId: messageId,
                MessageStatus : status,
                userId: userId,
                date: Date.now().toString(),
              };
              return chatMessage;        
        }
    }

 
