import { IronSessionOptions } from 'iron-session'

export const ironSessionOptions: IronSessionOptions = {
  cookieName: 'upzealo',
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
