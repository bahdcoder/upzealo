/**
 * Contract source: https://bit.ly/3DP1ypf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import '@japa/runner'

declare module '@japa/runner' {
  interface TestContext {
    // Extend context
  }

  interface Test<TestData> {
    // Extend test
  }
}

declare module '@ioc:Adonis/Core/TestUtils' {
  // type HookCleanupHandler = () => Promise<void>
  // type HookCallback = () => Promise<HookCleanupHandler> | Promise<void>

  export interface TestUtilsContract {
    blockchain(connectionName?: string): {
      solanaValidator: HookCallback
    }
  }
}
