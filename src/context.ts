import * as core from '@actions/core';
import csvparse from 'csv-parse/lib/sync';

export interface Inputs {
  tagName: string
  body: string;
  repositories: string[];
  owner: string;
  githubToken: string;
}

export async function getInputs(): Promise<Inputs> {
    return {
      tagName: getTag(),
      body: core.getInput('body'),
      repositories: await getRepositoryList(),
      owner: core.getInput('owner'),
      githubToken: core.getInput('github-token')
    };
}

export function getTag(): string {
    const tagName = core.getInput('tag-name');
    // This removes the 'refs/tags' portion of the string if present, i.e. from 'refs/tags/v1.10.15' to 'v1.10.15'
   return tagName.replace('refs/tags/', '');
}

export async function getRepositoryList(): Promise<string[]> {
    let res: Array<string> = [];

    const items = core.getInput('repo');
    if (items == '') {
        return res;
    }

    for (let output of (await csvparse(items, {
        columns: false,
        relaxColumnCount: true,
        skipLinesWithEmptyValues: true
    })) as Array<string[]>) {
        if (output.length == 1) {
            res.push(output[0]);
        } else {
            res.push(...output);
        }
    }

    return res.filter(item => item).map(pat => pat.trim());
}