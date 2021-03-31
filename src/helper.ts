// gets the branch name from the version tag
// The tag to release branch conversion should be handled as follows:
// v1.9.0-RC1 => should be v1.9.x
// v1.9.0-hotfixid => should be v1.9.x-hotfixid
// v1.9.0 => should be v1.9.x
// v1.9.1 => should be v1.9.x
// v1.9.0-custom-RC1 => should be v1.9.x-custom
// v1.9.0-custom => should be v1.9.x-custom
// v1.9.1-custom => should be v1.9.x-custom
export function getBranchName(tag: string): string {
  const t = tag.split('-')
  const semanticVersion = t[0].split('.')
  let branch = `${semanticVersion[0]}.${semanticVersion[1]}.x`
  if (t[1]) {
    if (!isRCBuild(tag)) {
      branch = `${branch}-${t[1]}`
    }
  }
  return branch
}

// checks if the given tag corresponds to an RC build
export function isRCBuild(tag: string): boolean {
  const t = tag.split('-')

  // take the last custom suffix
  // can be v0.0.1-RC1 or v0.0.1-custom-RC1
  const tagSuffix = t[t.length - 1]

  if (tagSuffix.substr(0, 2) === 'RC') {
    return true
  }
  return false
}
