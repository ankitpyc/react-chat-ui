import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const fetchUserById = createAsyncThunk(
    'users/fetchUserChats',
    async (userId: number, thunkAPI) => {
      var data : any = {"ID" : userId}
      await axios.post("http://localhost:3023/api/LoadUserChats",data)
      .then(response => {
        console.log(data)
        return response.data
      })
      .catch(err => {
        console.error(err)
      })
    },
  )