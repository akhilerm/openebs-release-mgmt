import * as context from './context';
import * as github from '@actions/github';
import * as helper from './helper';
import * as core from '@actions/core';

export async function createRelease(ctx: context.Inputs) {
  const octokit = github.getOctokit(ctx.githubToken);
  const branchName = helper.getBranchName(ctx.tagName);
  const preRelease = helper.isRCBuild(ctx.tagName);
  for (const repo of ctx.repositories) {
    const result = await octokit.repos.createRelease({
      owner: ctx.owner,
      repo: repo,
      tag_name: ctx.tagName,
      name: ctx.tagName,
      body: ctx.body,
      target_commitish: branchName,
      prerelease: preRelease,
      draft: false
    });
    if (result.status != 201) {
      core.setFailed(`Creating release failed for ${ctx.owner}/${repo}`);
    }
    else {
      core.info(`Created release ${ctx.tagName} for ${ctx.owner}/${repo}`);
    }
  }
}
