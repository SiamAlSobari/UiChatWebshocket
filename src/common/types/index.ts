export type AuthSession = {
    id: string,
}


export type ResponseSession = {
    user: AuthSession
}

export type LoginDto = {
    email: string,
    password: string
}
