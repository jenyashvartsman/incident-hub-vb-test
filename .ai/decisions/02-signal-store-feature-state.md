# Decision: Use NgRx SignalStore for feature state

## Context

The application is growing and needs a consistent way to handle feature-level state,
loading flags, errors, derived state, and update flows.

## Decision

Use NgRx SignalStore as the default pattern for feature data handling.

## Rules

- each feature owns its own store
- stores live under `features/<feature>/state`
- components do not manage business data state directly
- components interact with store methods and store signals
- HttpClient access stays in `data-access`
- SignalStore handles feature state, derived state, and orchestration
- do not introduce global NgRx Store unless cross-app state truly requires it

## Consequences

- more consistency across features
- easier derived state with Angular Signals
- cleaner component layer
- slightly more upfront structure
- migration needed for older feature-local services
