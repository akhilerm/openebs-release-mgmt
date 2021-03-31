import * as release from '../src/release';

describe('isReleaseAlreadyExist', () => {
    it('multiple errors along with release already exists error', () => {
        const errorString = '{\n' +
            '"message": "Validation Failed",\n' +
            '"errors": [\n' +
            '  {\n' +
            '"resource": "Release",\n' +
            '"code": "already_exists",\n' +
            '"field": "tag_name"\n' +
            '},\n' +
            '  {\n' +
            '"resource": "Release",\n' +
            '"code": "invalid",\n' +
            '"field": "target_commitish"\n' +
            '}\n' +
            '],\n' +
            '"documentation_url": "https://docs.github.com/rest/reference/repos#create-a-release"\n' +
            '}'
        const errorObject = JSON.parse(errorString)
        expect(release.isReleaseAlreadyExist(errorObject)).toEqual(false);
    });
    it('only release already exists error', () => {
        const errorString = '{\n' +
            '"message": "Validation Failed",\n' +
            '"errors": [\n' +
            '  {\n' +
            '"resource": "Release",\n' +
            '"code": "already_exists",\n' +
            '"field": "tag_name"\n' +
            '}\n' +
            '],\n' +
            '"documentation_url": "https://docs.github.com/rest/reference/repos#create-a-release"\n' +
            '}'
        const errorObject = JSON.parse(errorString)
        expect(release.isReleaseAlreadyExist(errorObject)).toEqual(true);
    });
});