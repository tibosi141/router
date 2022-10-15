export type UserData =  {
  username: string,
  password: string,
  rememberMe: boolean,
}

export type Result = {
  success: boolean
  code?: string,
  message?: string
}