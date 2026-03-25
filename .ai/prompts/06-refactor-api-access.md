Refactor API access.

Context:

- Angular feature-first app
- .ai\context\architecture.md
- .ai\decisions\001-api-strategy.md

Constraints:

- do not change behavior
- do not change API contracts

Task:

- extract all HttpClient calls into data-access services per feature
- ensure components do not call HttpClient directly
- update imports accordingly
