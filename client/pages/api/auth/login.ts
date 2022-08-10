import { getInstance } from '../../../helpers/axios-client'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async function loginRoute(request, response) {
    const instance = getInstance()

    const userExistsResponse = await instance.get(`/auth/${request.body.publicKey}/check`)

    const userExists = userExistsResponse.data.userId !== undefined

    let userId: string = ''
    let accessToken: string = ''
    let streamAccessToken: string = ''

    async function persistUser(payload: any) {
      request.session.user = payload

      userId = payload.userId
      accessToken = payload.accessToken
      streamAccessToken = payload.streamAccessToken

      await request.session.save()
    }

    if (userExists) {
      // login
      const userLoginResponse = await instance.post(`/auth/login`, request.body)

      await persistUser(userLoginResponse.data)

      return response.json({ userExists, accessToken, streamAccessToken, userId })
    }

    const userRegistrationResponse = await instance.post(`/auth/join`, request.body)

    await persistUser(userRegistrationResponse.data)

    response.send({ userExists, accessToken, streamAccessToken, userId })
  },
  {
    cookieName: 'myapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
)
