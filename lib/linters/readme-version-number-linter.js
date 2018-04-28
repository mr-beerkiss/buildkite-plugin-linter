const path = require('path')
const fs = require('fs')
const git = require('isomorphic-git')
const compareVersions = require('compare-versions')

module.exports = async function(argv, tap) {
  const { name, path: pluginPath, readme, silent } = argv

  const pluginConfigKeyPattern = new RegExp(`${name}#(v.*):`, 'g')

  const readmePath = path.join(pluginPath, readme)
  const readmeContents = fs.readFileSync(readmePath, 'utf8')

  const tags = await git.listTags({fs, dir: pluginPath})
 
  const sortedTags = tags.sort(compareVersions)
  const latestVersion = tags[tags.length - 1];

  const invalidVersionNumbers = []

  let match
  while(match = pluginConfigKeyPattern.exec(readmeContents)) {
    const version = match[1];
    if (version !== latestVersion) {
      invalidVersionNumbers.push(version)
    }
  }

  if (!invalidVersionNumbers.length) {
    if (!silent) {
      tap.pass(`Readme version numbers are up-to-date (${latestVersion})`)
    }
    return true
  } else {
    if (!silent) {
      tap.fail(`Readme version numbers out of date. Latest is ${latestVersion}`, {
        'invalid version numbers': invalidVersionNumbers,
        at: false,
        stack: false
      })
    }
    return false
  }
}