import axios from "axios";

const instance = axios.create({
  baseURL: "https://limitless-citadel-18990.herokuapp.com/api/auth",
});

export const usersAPI = {
  getUsers(page = 0,token:string| undefined) {
    return instance.get(
        `user?page=${page}&limit=20`, {
          headers: {
            "app-id": process.env.NEXT_PUBLIC_API_ID,
            Authorization: `Bearer ${token}`
          }
        }
    );
  },
  getUserFullProfile(id: string, token:string| undefined) {
    return instance.get(
        `user/${id}`, {
          headers: {
            "app-id": process.env.NEXT_PUBLIC_API_ID,
            Authorization: `Bearer ${token}`
          }
        }
    );
  }
}

export const userAPI = {
  singIn(username:string, password: string) {
    return instance.post(
        `sign-in`, {
          username,
          password
        }
    );
  }
}



