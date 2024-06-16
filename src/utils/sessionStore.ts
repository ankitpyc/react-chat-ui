import { AxiosResponse, AxiosResponseHeaders } from "axios";
import { setUserDetails } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";
import { de } from "@faker-js/faker";

interface SessionInf {
    SetSessionVariables(sessionVariables: { [key: string]: any }): void;
    SetAuthHeaders( response : AxiosResponse): void ;
    RemoveSessionVariables(key : string) : void
}

export class UserSession implements SessionInf {
    dispatch = useDispatch()
    RemoveSessionVariables(key: string): void {
        sessionStorage.removeItem(key)
    }
    SetSessionVariables(sessionVariables: { [key: string]: any }): void {
        var user = sessionVariables["user"]
        sessionStorage.setItem("token",sessionVariables["token"])
        sessionStorage.setItem("ID",user["ID"])
        sessionStorage.setItem("userName",user["userName"])
        this.dispatch(
            setUserDetails({
              userName: user["userName"],
              userId: user["ID"],
            })
          );
    }

    SetAuthHeaders( response : AxiosResponse): void {
             var header = response.headers
             if (header['authorization'] !== undefined){
                    var token : string = header['authorization']
                    token = token.split(" ")[1]
                    sessionStorage.setItem("token",token)
             }
    }   

}
