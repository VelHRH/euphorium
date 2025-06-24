/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      id\n      email\n    }\n  }\n": types.GoogleLoginDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      id\n      email\n    }\n  }\n": types.SignUpDocument,
    "\n  query GetSong($input: GetSongInput!) {\n    song(input: $input) {\n      name\n    }\n  }\n": types.GetSongDocument,
    "\n  fragment UserFields on UserEntity {\n    id\n    email\n  }\n": types.UserFieldsFragmentDoc,
    "\n  query ListUsers {\n    users {\n      ...UserFields\n    }\n  }\n": types.ListUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSong($input: GetSongInput!) {\n    song(input: $input) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetSong($input: GetSongInput!) {\n    song(input: $input) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFields on UserEntity {\n    id\n    email\n  }\n"): (typeof documents)["\n  fragment UserFields on UserEntity {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListUsers {\n    users {\n      ...UserFields\n    }\n  }\n"): (typeof documents)["\n  query ListUsers {\n    users {\n      ...UserFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;