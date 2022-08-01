import Getstream from 'App/Services/Getstream'
import Cloudinary from 'App/Services/Cloudinary'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { SolanaTestValidator } from 'App/Helpers/Tests/SolanaValidator'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Adonis/Addons/Cloudinary', () => {
      const config = this.app.container.resolveBinding('Adonis/Core/Config').get('cloudinary', {})

      return new Cloudinary(config)
    })

    this.app.container.singleton('Adonis/Addons/Getstream', () => {
      const config = this.app.container.resolveBinding('Adonis/Core/Config').get('getstream', {})

      return new Getstream(config)
    })
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
