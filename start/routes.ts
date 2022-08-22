import './routes/auth'
import './routes/feed'
import './routes/profile'
import './routes/learning'
import './routes/community'

import Route from '@ioc:Adonis/Core/Route'
import { getProgram } from 'App/Services/Greekz'

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

Route.get('/greekz', async ({ request }) => {
  const { program } = getProgram({} as any)
  const params = request.qs()

  const allRascalPhases = await program.account.rascalPhase.all()

  const randomRascal = shuffle(allRascalPhases).find((nft) => {
    return (
      nft.account.minted === false &&
      nft?.account.phase.toString() === params.phase &&
      nft?.account.level.toString() === params.level
    )
  })

  return { mint: randomRascal?.account.mint.toBase58() }
})
