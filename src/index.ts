import * as core from '@actions/core'
import * as lock from './lock'

async function run() {
  try {
    const required = {
      required: true
    }
    const key = core.getInput('key', required)
    const repository = core.getInput('repository', required)
    const prefix = core.getInput('prefix', required)

    const state = await lock.lock({
      key,
      repository,
      prefix
    })
    core.saveState('STATE', JSON.stringify(state))
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e)
    } else {
      core.setFailed(`${e}`)
    }
  }
}

run()
