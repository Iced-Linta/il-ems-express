import { User } from "./User"

export enum UserRole {
    User = 0,
    HR = 1,
    Sales = 2,
    Management = 3
}

export type JwtToken = {
    Role: UserRole,
    User: User
}