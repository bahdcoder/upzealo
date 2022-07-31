import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { SolanaTestValidator } from 'App/Helpers/Tests/SolanaValidator'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    this.defineTestUtils()
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }

  private defineTestUtils() {
    this.app.container.withBindings(
      ['Adonis/Core/TestUtils', 'Adonis/Core/Ace'],
      (testUtils, ace) => {
        testUtils.constructor.macro('blockchain', () => {
          return {
            solanaValidator() {
              return new SolanaTestValidator(ace).run()
            },
          }
        })
      }
    )
  }
}
