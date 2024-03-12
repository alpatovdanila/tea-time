import { createEvent, createStore } from '../lib/nanite'
import { AlertProps } from '../ui/modal/alert'

export const setModalWindow = createEvent<AlertProps | null>()
export const hideModalWindow = () => setModalWindow(null)

export const $modalWindow = createStore<AlertProps | null>(null)

$modalWindow.reset(setModalWindow)
