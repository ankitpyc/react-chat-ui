import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { UserChatResponse } from "../../dto/UserChatResponse"


function getUserData(id : number) {
  var data : UserData  = {"ID" : id}
  data.ID = id
  return data
}

interface UserData {
  ID: number;
}

export const fetchUserChats = createAsyncThunk(
  'users/FetchUserDetails',
  async (userId: number) => {  
      console.log("fetching user details")
      const postdata = getUserData(userId)
      debugger
      const response = await axios.post<UserChatResponse>("http://localhost:3023/api/LoadUserChats",postdata)
      return response.data
  },
)
