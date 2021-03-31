import * as context from './context'
import * as github from '@actions/github'
import * as helper from './helper'
import * as core from '@actions/core'

export async function createRelease(ctx: context.Inputs) {
  const octokit = github.getOctokit(ctx.githubToken)
  const branchName = helper.getBranchName(ctx.tagName)
  const preRelease = helper.isRCBuild(ctx.tagName)

  let isSuccess = true
  let failureMessage = `Tagging failed for: `

  for (const repo of ctx.repositories) {
    try {
      const result = await octokit.repos.createRelease({
        owner: ctx.owner,
        repo,
        tag_name: ctx.tagName,
        name: ctx.tagName,
        body: ctx.body,
        target_commitish: branchName,
        prerelease: preRelease,
        draft: false
      })

      if (result.status === 201) {
        core.info(`Created release for ${ctx.owner}/${repo}`)
      } else {
        if (ctx.failFast) {
          core.setFailed(
            `Tagging failed for ${ctx.owner}/${repo}. Error: ${result}`
          )
          core.error(`Aborting tagging for further repositories`)
          return
        } else {
          isSuccess = false
          failureMessage = failureMessage.concat(`${repo}, `)
        }
      }
    } catch (error) {
      if (!isReleaseAlreadyExist(error)) {
        if (ctx.failFast) {
          core.setFailed(
            `Tagging failed for ${ctx.owner}/${repo}. Error: ${error}`
          )
          core.error(`Aborting tagging for further repositories`)
          return
        } else {
          isSuccess = false
          failureMessage = failureMessage.concat(`${repo}, `)
        }
      } else {
        core.info(`Release tag ${ctx.tagName} already exists for ${ctx.owner}/${repo}`)
      }
    }
  }

  if (!isSuccess) {
    core.setFailed(failureMessage)
  }
}

// checks if the release tag already exists
export function isReleaseAlreadyExist(error: any): boolean {
  core.info(`lenght` + error.errors.length )
  core.info(`message` + error.message )
  core.info(`resource` + error.errors[0].resource )
  core.info(`code` + error.errors[0].code )
  return (
    error.errors.length === 1 &&
    error.message === 'Validation Failed' &&
    error.errors[0].resource === 'Release' &&
    error.errors[0].code === 'already_exists'
  )
}
