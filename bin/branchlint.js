const branchPattern =
  /^(feat|fix|refactor|hotfix|reformat|optimize|enhance|ci|docs)\/[A-Z]{2,4}-[A-Z]+-[0-9]+\/.+$/i;

const branchName = process.argv[2];

if (branchName == null) {
  console.log('branch name is required');

  process.exit(1);
}

if (
  branchPattern.test(branchName) ||
  ['dev', 'qa', 'main'].includes(branchName)
) {
  process.exit(0);
}

console.log('Wrong branch name!');
console.log('The branch name must have this format:');
console.log('<verb>/<developer-initials>-<project>-<issue-id>/<what-was-done>');
console.log(
  'Allowed verbs: feat | fix | refactor | hotfix | reformat | optimize | enhance | merge | ci | docs',
);
console.log('Example:');
console.log('feat/MVS-PROJECT-1234/add-new-feature');
console.log('-');
console.log('Your branch name was:');
console.log(branchName);
console.log('-');
console.log('For more information, check script in bin/branchlint.js');
console.log('-');

process.exit(1);
