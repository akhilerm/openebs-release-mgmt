import * as helper from '../src/helper';

describe('getBranchName', () => {
   it('RC tag of release branch', () => {
       const tag = 'v1.2.3-RC1';
   const isRC = helper.isRCBuild(tag);
       expect(isRC).toEqual(true);
   });

   it('hotfix tag from hotfix branch', () => {
      const tag = 'v1.2.3-hotfix';
   const isRC = helper.isRCBuild(tag);
      expect(isRC).toEqual(false);
   });

    it('release from release branch', () => {
        const tag = 'v1.2.0';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('patch release from release branch', () => {
        const tag = 'v1.2.1';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('RC tag from custom branch', () => {
        const tag = 'v1.2.0-custom-RC1';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(true);
    });

    it('custom release tag from custom branch', () => {
        const tag = 'v1.2.0-custom';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('patch release tag from custom branch', () => {
        const tag = 'v1.2.1-custom';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });
});

describe('isRCBuild', () => {
    it('RC tag of release branch', () => {
        const tag = 'v1.2.3-RC1';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(true);
    });

    it('hotfix tag from hotfix branch', () => {
        const tag = 'v1.2.3-hotfix';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('release from release branch', () => {
        const tag = 'v1.2.0';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('patch release from release branch', () => {
        const tag = 'v1.2.1';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('RC tag from custom branch', () => {
        const tag = 'v1.2.0-custom-RC1';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(true);
    });

    it('custom release tag from custom branch', () => {
        const tag = 'v1.2.0-custom';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });

    it('patch release tag from custom branch', () => {
        const tag = 'v1.2.1-custom';
    const isRC = helper.isRCBuild(tag);
        expect(isRC).toEqual(false);
    });
});