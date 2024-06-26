import { History, Message, UserChatResponse } from "../dto/UserChatResponse";
import { ActiveUser, MessageDeliveryStatus, UserInfo, UserMessage } from "../redux-store/interf";

export function  populateMessages(resp : UserChatResponse) : ActiveUser []  {
    
    var chats:ActiveUser[] = []
     
    resp.history.forEach(chat => {
    var otherUserId:string = resp.userid.toString() === chat.userID1 ? chat.userID2 : chat.userID1
    var otherUserDetails = resp.userid.toString() === chat.userID1 ? chat.user2Details : chat.user1Details 
    var userInfo : UserInfo = {
        "userId" : otherUserId,
        "userName" : otherUserDetails.userName
    }
    var user:ActiveUser = {
        "userInfo" : userInfo,
        "unread" : 0,
        "messages" : mapMessage(chat.messages),
        "isActive" : false,
        "chatId" : chat.ID.toString(),
    }
    chats.push(user)
    })

    return chats
}

function mapMessage( messages : Message[]): UserMessage[] {
    var usrMessage : UserMessage[] = []
    messages.forEach(m => {
        var userMessage : UserMessage = {
            "text" : m.message,
            "id" : m.ID.toString(),
            "sender" : m.senderId,
            "receiver" : m.receiverId,
            "status" : MessageDeliveryStatus.DELIVERED,
            "sentTime" : m.CreatedAt
        }
        usrMessage.push(userMessage)
    })
    return usrMessage
}
