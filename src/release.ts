import * as context from './context'
import * as github from '@actions/github'
import * as helper from './helper'
import * as core from '@actions/core'

export async function createRelease(ctx: context.Inputs) {
  const octokit = github.getOctokit(ctx.githubToken)
  const branchName = helper.getBranchName(ctx.tagName)
  const preRelease = helper.isRCBuild(ctx.tagName)
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
        core.setFailed(`Release creation failed`)
      }
      /* if (result.status != 201) {
        core.error(`Creating release failed for ${ctx.owner}/${repo}`);
        // when failFast is set, if tagging of one repository fails, all the further
        // repository tagging is cancelled
        if (ctx.failFast) {
          core.setFailed(`Aborting release tagging..`);
        }
      }*/
    } catch (error) {
      for (let i = 0; i < error.errors.length; i++) {
        if (error.errors[i].code === 'already_exists') {
          core.info(`Already exist error validation message`)
        }
      }
    }
  }
}
