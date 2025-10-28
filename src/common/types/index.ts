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

export type User = {
    id: string,
    email: string,
    profile: Profile

    contacts: Contact[]
}

export type Profile = {
    id: string,
    full_name: string
    image_url: string

    user: User
}

export type Contact = {
    id: string,
    contact_id: string,
    contact_name: string
    user_id: string

    user: User
}
