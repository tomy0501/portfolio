import type { JwtPayload } from "jwt-decode";

export interface MyCustomeClaims extends JwtPayload {
    username:string,
    role: string
}

export interface LoginMessage {
    message: string,
    accessToken: string
}