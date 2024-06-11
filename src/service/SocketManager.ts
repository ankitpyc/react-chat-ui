import { Socket, io } from "socket.io-client"
import { MessagingService } from "./MessagingService"
import { socket } from "../components/util/socket/socket";
import { useDispatch } from "react-redux";
import { setUserOffline } from "../redux-store/userSlice";
import SystemMessage from "../components/chat/message";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface SocketInf{
    onConnect():void
    onMessage(data:Event):void
    RegisterSocketEvents():void
    onClose():void
    GetSocket():WebSocket
    SendMessage(data:string):void
}

export class SocketManager implements SocketInf{
    
    GetSocket():WebSocket  {
       return this.sock
    }
    
    messageService : MessagingService
    sock:WebSocket
    currUserId = sessionStorage.getItem("ID");
    currUserName = sessionStorage.getItem("userName");
    
    dispatch = useDispatch();
    
    constructor(){
        this.messageService = new MessagingService()
        this.sock = new WebSocket("ws://localhost:2023/ws")
        this.sock.onmessage = this.onMessage.bind(this)
        this.sock.onopen = this.onConnect.bind(this)
        this.sock.onclose = this.onClose.bind(this)
    }
    RegisterSocketEvents(): void {
        throw new Error("Method not implemented.");
    }

    onConnect(): void {
        console.log("Initiating websocket connection");
        debugger
        var ping = this.messageService.createPingMessage(this.currUserName,this.currUserId);
        console.log(JSON.stringify(ping));
        this.sock.send(JSON.stringify(ping));
        this.dispatch(setUserOffline({ isActive: true  }));
    }
    
    onMessage(event:MessageEvent): void {
        console.log("recieved message ", JSON.stringify(event.data))
        const chatMessage : SystemMessage = JSON.parse(event.data);
        const ackMessage = this.messageService.handleAndProcessMessageEvent(chatMessage)
        if (ackMessage !== null ){
        this.sock.send(JSON.stringify(ackMessage))
        }    
    }
    SendMessage(data:string): void {
        this.sock.send(data)
    }

    onClose(): void {
        console.log("Closing connection .. ") 
        this.dispatch(setUserOffline({ isActive: false }));    
    }


}