import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token')

    // Get authenticated GitHub client
    const octokit = github.getOctokit(token)

    // Get the inputs from the workflow file: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    const tagName = core.getInput('tag_name', {required: true})

    // This removes the 'refs/tags' portion of the string, i.e. from 'refs/tags/v1.10.15' to 'v1.10.15'
    const tag = tagName.replace('refs/tags/', '')

    const body = core.getInput('body', {required: true})

    const r = await octokit.repos.createRelease({
      owner: 'akhilerm',
      repo: 'release-test',
      body: body,
      tag_name: tag,
      target_commitish: 'main',
      prerelease: false,
      draft: false
    })
    core.info(JSON.stringify(r))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
