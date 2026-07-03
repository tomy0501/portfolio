import type { JwtPayload } from "jwt-decode";

export interface MyCustomeClaims extends JwtPayload {
    name:string,
    roles: string
}

export interface LoginMessage {
    message: string,
    accessToken: string
}