import { spawn } from 'child_process'
import { BaseCommand } from '@adonisjs/core/build/standalone'
import { blockchain } from 'Config/app'

function pause(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, timeout)
  })
}

export default class SolanaValidator extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'solana:validator'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Run the solana test validator.'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const port = blockchain.rpcUrl.split(':')[2]

    global.testValidatorProcess = spawn('solana-test-validator', ['--rpc-port', port.toString()])

    this.logger.info(`Running solana validator on http://127.0.0.1:${port}`)

    await pause()
  }
}
