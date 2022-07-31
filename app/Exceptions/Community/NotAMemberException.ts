import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new NotAMemberException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotAMemberException extends Exception {}
