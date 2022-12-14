import { getInstance } from '../../../helpers/axios-client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../../helpers/session'

export default withIronSessionApiRoute(async function loginRoute(request, response) {
  const instance = getInstance()

  const userExistsResponse = await instance.get(`/auth/${request.body.publicKey}/check`)

  const userExists = userExistsResponse.data.userId !== undefined

  let user: any = {}
  let userId: string = ''
  let accessToken: string = ''
  let streamAccessToken: string = ''

  async function persistUser(payload: any) {
    request.session.user = {
      userId: payload.userId,
      accessToken: payload.accessToken,
      streamAccessToken: payload.streamAccessToken,
    }

    user = payload.user
    userId = payload.userId
    accessToken = payload.accessToken
    streamAccessToken = payload.streamAccessToken

    await request.session.save()
  }

  if (userExists) {
    // login
    const userLoginResponse = await instance.post(`/auth/login`, request.body)

    await persistUser(userLoginResponse.data)

    return response.json({ userExists, accessToken, streamAccessToken, userId, user })
  }

  const userRegistrationResponse = await instance.post(`/auth/join`, request.body)

  await persistUser(userRegistrationResponse.data)

  response.send({ userExists, accessToken, streamAccessToken, userId, user })
}, ironSessionOptions)
