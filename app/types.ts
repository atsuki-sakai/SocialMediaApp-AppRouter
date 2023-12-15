
export interface UserInfo {
    id: number,
    username: string,
    avatar?: string
}

export interface PostInfo {
    id: number,
    username: string,
    avatar?: string,
    content: string,
    updated_at: string
}