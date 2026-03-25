# Decision: API access layer

## Context

Multiple features will call APIs.

## Decision

All API calls go through `data-access` services.
Components do not call HttpClient directly.

## Consequences

- consistent API handling
- easier mocking/testing
- clearer separation of concerns
