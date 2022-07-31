import type Ace from '@ioc:Adonis/Core/Ace'

/**
 * Migrator class to be used for testing.
 */
export class SolanaTestValidator {
  constructor(private ace: typeof Ace) {}

  private async runCommand(commandName: string) {
    const command = await this.ace.exec(commandName, [])
    if (command.exitCode) {
      if (command.error) {
        throw command.error
      } else {
        throw new Error(`"${commandName}" failed`)
      }
    }
  }

  public async run() {
    await this.runCommand('solana:validator')

    return async () => {
      if (global.testValidatorProcess) {
        global.testValidatorProcess.kill()
      }
    }
  }
}
