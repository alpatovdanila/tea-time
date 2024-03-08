import { createStore, createEvent } from '../lib/nanite'

export const errorHappened = createEvent<Error>()

export enum ErrorType {
  warning,
  critical,
  debug,
}

type Error = { type: ErrorType; title: string; text: string; err: unknown }

export const $errors = createStore<Array<Error>>([])

$errors.on(errorHappened, (errors, newError) => [...errors, newError])

$errors.addListener(console.log)
