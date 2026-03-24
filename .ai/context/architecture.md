# Architecture Context

Use Angular standalone components.

Structure rules:

- core = app-wide infrastructure
- shared = generic reusable UI and utilities
- features = business domains
- keep business logic inside feature boundaries
- use typed models
- prefer small focused components
- keep diffs small
