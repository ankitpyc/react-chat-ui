interface SessionInf {
    SetSessionVariables(sessionVariables: { [key: string]: string }): void;
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
}
