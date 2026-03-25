# Architecture Context

Follow:

- .ai\decisions\01-api-strategy.md
- .ai\decisions\02-signal-store-feature-state.md

Use Angular standalone components.

Structure rules:

- core = app-wide infrastructure
- shared = generic reusable UI and utilities
- features = business domains
- keep business logic inside feature boundaries
- use typed models
- prefer small focused components
- keep diffs small

API access:

- use data-access layer per feature
- no direct HttpClient usage in components
