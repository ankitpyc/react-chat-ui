import { AxiosResponse, AxiosResponseHeaders } from "axios";

interface SessionInf {
    SetSessionVariables(sessionVariables: { [key: string]: string }): void;
    SetAuthHeaders( response : AxiosResponse): void ;
    RemoveSessionVariables(key : string) : void
}

export class UserSession implements SessionInf {
    RemoveSessionVariables(key: string): void {
        sessionStorage.removeItem(key)
    }
    SetSessionVariables(sessionVariables: { [key: string]: string }): void {
        debugger;
        for (const key in sessionVariables) {   
            if (sessionVariables.hasOwnProperty(key)) {
                sessionStorage.setItem(key, sessionVariables[key]);
            }
        }
        console.log("Session variables are set:", sessionVariables);
    }

    SetAuthHeaders( response : AxiosResponse): void {
        debugger
             var header = response.headers
             if (header['authorization'] !== undefined){
                    var token : string = header['authorization']
                    token = token.split(" ")[1]
                    sessionStorage.setItem("token",token)
             }
    }   

}
