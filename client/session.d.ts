import {} from 'iron-session'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      userId: string
      accessToken: string
      streamAccessToken: string
    }
  }
}
