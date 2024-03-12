import { createEvent } from '../lib/nanite'
import { add, reset } from './counter'
import { createPersistedStore } from '../services/storage'
import release from '../release'
import { setModalWindow } from './ui'

export const appStarted = createEvent()

export const $lastKnownVersion = createPersistedStore<null | number>(
  null,
  'lastKnownVersion',
)
export const $isFirstStart = createPersistedStore(true, 'isFirstStart')

appStarted.addListener(() => {
  const startingTimeParam = new URL(document.location.href).searchParams.get(
    'start',
  )

  if (startingTimeParam) {
    const startingTime = Number(startingTimeParam)
    if (!isNaN(startingTime) && startingTime > 0) {
      reset()
      add(Number(startingTime))
    }
  }
})

appStarted.addListener(() => {
  if (
    !$isFirstStart.get() &&
    $lastKnownVersion.get() !== release.currentVersion
  ) {
    let content = ''

    if (release.versionChangelog.features.length)
      content += `
        <h4>New Features</h4>
        <ul>${release.versionChangelog.features.map((f) => `<li>${f}</li>`).join('')}</ul>`

    if (release.versionChangelog.fixes.length)
      content += `
        <h4>Fixes</h4>
        <ul>${release.versionChangelog.fixes.map((f) => `<li>${f}</li>`).join('')}</ul>`

    if (release.versionChangelog.other.length)
      content += `
        <h4>Other</h4>
        <ul>${release.versionChangelog.other.map((f) => `<li>${f}</li>`).join('')}</ul>`

    setModalWindow({
      content,
      title: 'New version!',
    })
  }
})

$isFirstStart.on(appStarted, () => false)
$lastKnownVersion.on(appStarted, () => release.currentVersion)
