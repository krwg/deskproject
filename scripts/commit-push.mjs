import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const git = 'C:/Program Files/Git/cmd/git.exe'
const env = {
  ...process.env,
  GIT_AUTHOR_NAME: 'krwg',
  GIT_AUTHOR_EMAIL: 'shevotsukov@icloud.com',
  GIT_COMMITTER_NAME: 'krwg',
  GIT_COMMITTER_EMAIL: 'shevotsukov@icloud.com',
}

function run(args, opts = {}) {
  return execFileSync(git, args, {
    encoding: 'utf8',
    env,
    ...opts,
  }).trim()
}

const msg = `Fix Pages deploy, drop gallery filters, refresh README.

Switch deploy to the gh-pages branch so the live site can publish without Actions-source setup. Remove the unused ALL / EVOLUTION / FULL SETUP chips. Restore Apache 2.0 and rewrite the README around the archive itself.
`

run(['add', '-A'])
console.log(run(['status', '--short']))

try {
  execFileSync(git, ['commit', '-F', '-'], {
    encoding: 'utf8',
    env,
    input: msg,
    stdio: ['pipe', 'inherit', 'inherit'],
  })
} catch {
  /* may already be clean */
}

let body = run(['log', '-1', '--format=%B'])
if (body.includes('Co-authored-by')) {
  const tree = run(['rev-parse', 'HEAD^{tree}'])
  const parent = run(['rev-parse', 'HEAD^'])
  fs.writeFileSync('.git/MSG', msg)
  const out = run(['commit-tree', tree, '-p', parent, '-F', '.git/MSG'])
  run(['update-ref', 'refs/heads/main', out])
  fs.unlinkSync('.git/MSG')
  body = run(['log', '-1', '--format=%B'])
}

console.log('clean=', !body.includes('Co-authored-by'))
console.log(run(['log', '-1', '--format=%an <%ae> | %s']))
execFileSync(git, ['push', 'origin', 'HEAD'], {
  encoding: 'utf8',
  env,
  stdio: 'inherit',
})
