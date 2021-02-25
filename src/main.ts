import * as core from '@actions/core';
import * as context from './context';
import {createRelease} from './release';

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    await createRelease(inputs);

  } catch (error) {
    core.setFailed(error.message);
  }
}


run()
