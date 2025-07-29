# System Patterns

## Architecture Overview
The project follows a modular architecture pattern both on frontend and backend:

### Backend (NestJS)
- Modular architecture with clear separation of concerns
- GraphQL API layer with Apollo Server
- TypeORM for database interactions
- Module-based structure following NestJS conventions
- Environment-based configuration system

### Frontend (Next.js)
- Modular architecture with feature-based organization
- Apollo Client for GraphQL communication
- Material-UI component system
- Module-based state management with Zustand

## Design Patterns

### Backend Patterns
- Repository Pattern (via TypeORM)
- Dependency Injection (NestJS)
- Factory Pattern (for service instantiation)
- Decorator Pattern (NestJS decorators)
- Module Pattern (NestJS modules)
- DTO Pattern for data validation and transformation

### Frontend Patterns
- Container/Presenter Pattern
- Hook Pattern (React hooks)
- Provider Pattern (Context API)
- Module Pattern (feature modules)

## Component Structure

### Backend Components
```
src/
├── modules/         # Feature modules
├── common/          # Shared utilities and helpers
├── config/         # Configuration management
└── types/          # TypeScript type definitions
```

### Frontend Components
```
src/
├── modules/         # Feature modules
├── components/      # Shared UI components
├── hooks/          # Custom React hooks
└── config/         # Configuration management
```

## Data Flow
1. Frontend Request Flow:
   - Component → GraphQL Query/Mutation
   - Apollo Client → Backend API
   - Response → State Management
   - State → Component Update

2. Backend Request Flow:
   - GraphQL Resolver
   - Service Layer
   - Repository Layer
   - Database

## State Management
- Backend: Database state via TypeORM
- Frontend: 
  - Zustand for global state
  - Apollo Client cache for GraphQL data
  - React local state for component-level state

## Error Handling
- Either monad pattern for error handling (@sweet-monads/either)
- Clear separation between exceptions and errors
- Error categorization:
  - Domain Errors (business logic errors)
  - Technical Exceptions (system/infrastructure errors)
- GraphQL error formatting and propagation
- Frontend error boundary pattern

## Security Patterns
- JWT-based authentication
- Google OAuth2.0 integration
- Role-based access control (RBAC)
- Environment variable validation
- Input validation using:
  - Zod schemas
  - Class-validator
  - GraphQL type safety

## Testing Strategy
Currently, testing is not implemented, but the architecture supports:
- Unit testing with Jest
- E2E testing capabilities
- Test configuration is set up (jest.config.ts)

## Performance Considerations
- GraphQL query optimization
- Database indexing
- TypeORM query optimization
- Apollo Client caching
- Next.js server-side rendering
- Docker container optimization

## Code Quality Patterns
- Strict ESLint configuration
- Prettier code formatting
- Git hooks for code quality (Husky)
- TypeScript strict mode
- Modular code organization
- Consistent naming conventions
- Spell checking (cspell)

Note: This document captures the technical architecture and patterns used throughout the system. The patterns are designed to maintain code quality, scalability, and maintainability. 