# Git Developer Workflow

## Branch naming convention

The branch name must have this format:

```plaintext
<verb>/<developer-initials>-<project>-<issue-id>/<what-was-done>
```

Allowed verbs:

feat | fix | refactor | hotfix | reformat | optimise | enhance | merge | ci | docs

Example:

feat/MVS-PROJECT-1234/add-new-feature

## Commit message convention

The commit message must have this format:

```plaintext
<verb>(<module>): <what-was-done>
```

Allowed verbs:

feat | fix | refactor | hotfix | reformat | optimise | enhance | merge | ci | docs

Example:

feat(auth): add new feature
