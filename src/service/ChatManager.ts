import { MessagingService } from "./MessagingService";
import { SocketManager } from "./SocketManager";
import Message from "../components/chat/message";
import { ActiveUser } from "../redux-store/interf";
import { useDispatch } from "react-redux";
import { markAllRead } from "../redux-store/onlineUsers";

export class ChatManager{
    dispatch = useDispatch()
    socketManger : SocketManager
    messagingService : MessagingService
    activeUser : ActiveUser
    currUser : string
    currUserName : string

    constructor(sm : SocketManager) {
        this.socketManger = sm
        this.messagingService = new MessagingService()
        this.currUser = sessionStorage.getItem("ID")
        this.currUserName = sessionStorage.getItem("userName")
    }
    
    sendMessage = (message: string,activeUser : ActiveUser) => {
        console.log("sending Message");
        if (message.trim() !== "") {
          var chatMessage: Message;
          chatMessage = this.messagingService.creatChatMessage(message,this.currUserName,activeUser.userInfo.userId,this.currUser,activeUser.chatId);
          this.messagingService.AddMessageToStore(chatMessage)
          this.socketManger.SendMessage(JSON.stringify(chatMessage))
        }
      };

      markAllMessagesRead(activeUser : ActiveUser) {
        this.dispatch(markAllRead({sender : activeUser.userInfo.userId}))
      }
}