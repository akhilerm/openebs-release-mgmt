import * as context from '../src/context';

describe('getRepositoryList', () => {
   it('single repo', async () => {
       await setInput('repo', 'jiva');
       const res = await context.getRepositoryList();
       expect(res).toEqual(['jiva']);
   });

   it('multiple repo', async () => {
       await setInput('repo', 'jiva\nmaya');
       const res = await context.getRepositoryList();
       expect(res).toEqual(['jiva', 'maya']);
   });

   it('multiline repo', async () => {
       await setInput('repo', `jiva
       node-disk-manager`);
       const res = await context.getRepositoryList();
       expect(res).toEqual(['jiva','node-disk-manager']);
   });
});

describe('getTag', () => {
   it('tag with git ref', async () => {
       await setInput('tag-name', 'refs/tags/v1.2.3');
       const res = context.getTag();
       expect(res).toEqual('v1.2.3');
   });

   it('tag without git ref', async () => {
      await setInput('tag-name', 'v1.2.3');
      const res = context.getTag();
      expect(res).toEqual('v1.2.3');
   });
});

function setInput(name: string, value: string): void {
    process.env[getInputName(name)] = value;
}

// See: https://github.com/actions/toolkit/blob/master/packages/core/src/core.ts#L67
function getInputName(name: string): string {
    return `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
}