# Technical Context

## Technology Stack

### Backend (NestJS)
- NestJS v10 - Node.js framework for building server-side applications
- GraphQL with Apollo Server v4.11.2 - API layer
- TypeORM v0.3.20 - Database ORM
- PostgreSQL - Primary database
- Passport.js - Authentication (JWT + Google OAuth2.0)
- Nodemailer - Email service
- Zod v3.23.8 - Schema validation
- Class Validator & Class Transformer - DTO validation and transformation

### Frontend (Next.js)
- Next.js v15.1.6 - React framework with server-side rendering
- React v19 - UI library
- Material-UI v6 - Component library
- Apollo Client v3.12 - GraphQL client
- NextAuth v4 - Authentication
- Zustand v5 - State management
- React Hook Form v7 - Form handling
- Yup - Form validation

### Shared Package
- Custom NPM package for shared types and GraphQL schema
- Zod schemas for type validation
- Common utilities and interfaces

## Development Environment

### Prerequisites
- Node.js
- Docker & Docker Compose
- PostgreSQL
- Yarn package manager

### Development Tools
- ESLint with extensive rule set
- Prettier for code formatting
- Husky for Git hooks
- TypeScript v5
- GraphQL Code Generator
- Jest for testing

## Dependencies
See package.json files for complete list of dependencies and their versions.

### Key Backend Dependencies
- @nestjs/* ecosystem packages (v10)
- @apollo/server: ^4.11.2
- typeorm: ^0.3.20
- pg: ^8.13.1
- zod: 3.23.8

### Key Frontend Dependencies
- next: 15.1.6
- react: ^19.0.0
- @mui/material: ^6.4.1
- @apollo/client: ^3.12.7
- zustand: ^5.0.3

## Build Process

### Backend
- Development: `yarn start:dev` (with hot reload)
- Production: `yarn build && yarn start:prod`
- Database migrations: 
  - Create: `yarn migration:create`
  - Generate: `yarn migration:generate`
  - Run: `yarn migration:run`
  - Revert: `yarn migration:revert`

### Frontend
- Development: `yarn dev` (with Turbopack)
- Build: `yarn build`
- Start: `yarn start`
- GraphQL Code Generation: `yarn generate-gql`

## Configuration
- Environment variables (.env files)
- Docker configuration for development and production
- ESLint configuration with strict rules
- Husky Git hooks for pre-commit and pre-push checks
- TypeScript configuration for each package

## Infrastructure

### Docker Setup
- Multi-container setup with docker-compose
- Separate containers for:
  - Backend server (NestJS)
  - PostgreSQL database
- Volume mapping for development
- Hot reload enabled
- Environment variable configuration

### Database
- PostgreSQL
- TypeORM for database management
- Migration system for schema changes
- Persistent volume storage

## External Services
- Google OAuth2.0 for authentication
- Email service (via Nodemailer)
- [Additional services to be documented]

## Development Tools
- VS Code / Cursor IDE recommended
- ESLint + Prettier for code quality
- Husky for Git hooks
  - Pre-commit: Linting and formatting
  - Pre-push: Additional checks
- GraphQL Code Generator for type safety
- Environment validation scripts

## Technical Constraints
- Node.js environment
- PostgreSQL database
- Docker for containerization
- TypeScript for type safety
- ESLint rules must be followed
- Git hooks must pass before commits/pushes
- Environment variables must be validated

Note: This document provides the technical foundation and constraints of the project. 