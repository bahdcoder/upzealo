import { getInstance } from '../../../helpers/axios-client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../../helpers/session'

export default withIronSessionApiRoute(async function loginRoute(request, response) {
  request.session.destroy()

  return response.json({ ok: true })
}, ironSessionOptions)
