## About

Github action to release OpenEBS components downstream

> :bulb: See also:
> * [create-release](https://github.com/actions/create-release) action

#### NOTE: The action is tied to how OpenEBS handles the release tagging. The release branch and release tags convention is as per openebs

## Usage

#### Basic
```yaml
name: Release

on:
  create:
    tags:
      - 'v*'

jobs:
  downstream-release:
    runs-on: ubuntu-latest
    steps:
      - name: Create Downstream release
        uses: akhilerm/openebs-release-mgmt@main
        with:
          tag-name: ${{ github.ref }}
          body: 'Release created from linux utils'
          repo: |
            maya
            jiva
            node-disk-manager
          github-token: ${{ secrets.RELEASE_TOKEN }}
  
```

`RELEASE_TOKEN` should have write access to the repository

Repositories will be searched under the same user / org for tagging
