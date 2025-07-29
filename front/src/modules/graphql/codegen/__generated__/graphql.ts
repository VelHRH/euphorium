/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ConfirmationEntity = {
  __typename?: 'ConfirmationEntity';
  createdAt: Scalars['DateTime']['output'];
  expires: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  token: Scalars['String']['output'];
  type: ConfirmationType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserEntity;
};

/** Type of confirmation (e.g., EMAIL, PHONE) */
export enum ConfirmationType {
  Email = 'EMAIL',
  Password = 'PASSWORD',
  PasswordChanged = 'PASSWORD_CHANGED'
}

export type CreateSongInput = {
  name: Scalars['String']['input'];
};

export type CreateSongOutput = {
  __typename?: 'CreateSongOutput';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DeleteSongInput = {
  name: Scalars['String']['input'];
};

export type DeleteSongOutput = {
  __typename?: 'DeleteSongOutput';
  success: Scalars['Boolean']['output'];
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ForgotPasswordOutput = {
  __typename?: 'ForgotPasswordOutput';
  success: Scalars['Boolean']['output'];
};

export type GetSongInput = {
  name: Scalars['String']['input'];
};

export type GetSongOutput = {
  __typename?: 'GetSongOutput';
  name: Scalars['String']['output'];
};

export type GetUserInput = {
  id: Scalars['Int']['input'];
};

export type GetUserOutput = {
  __typename?: 'GetUserOutput';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GoogleLoginInput = {
  idToken: Scalars['String']['input'];
};

export type GoogleLoginOutput = {
  __typename?: 'GoogleLoginOutput';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ListUsersOutput = {
  __typename?: 'ListUsersOutput';
  list: Array<ListUsersOutput_List>;
};

export type ListUsersOutput_List = {
  __typename?: 'ListUsersOutput_List';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSong: CreateSongOutput;
  deleteSong: DeleteSongOutput;
  forgotPassword: ForgotPasswordOutput;
  googleLogin: GoogleLoginOutput;
  login: LoginOutput;
  logout: LogoutOutput;
  refresh: Scalars['Boolean']['output'];
  revokePassword: RevokePasswordOutput;
  signUp: SignUpOutput;
  updatePassword: UpdatePasswordOutput;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationDeleteSongArgs = {
  input: DeleteSongInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationGoogleLoginArgs = {
  input: GoogleLoginInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRevokePasswordArgs = {
  input: RevokePasswordInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  song: GetSongOutput;
  songs: Array<SongEntity>;
  user: GetUserOutput;
  users: ListUsersOutput;
};


export type QuerySongArgs = {
  input: GetSongInput;
};


export type QueryUserArgs = {
  input: GetUserInput;
};

export type RevokePasswordInput = {
  newPassword: Scalars['String']['input'];
  repeatPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RevokePasswordOutput = {
  __typename?: 'RevokePasswordOutput';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SessionEntity = {
  __typename?: 'SessionEntity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserEntity;
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpOutput = {
  __typename?: 'SignUpOutput';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SongEntity = {
  __typename?: 'SongEntity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdatePasswordOutput = {
  __typename?: 'UpdatePasswordOutput';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  confirmation: Array<ConfirmationEntity>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  session: Array<SessionEntity>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GoogleLoginMutationVariables = Exact<{
  input: GoogleLoginInput;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'GoogleLoginOutput', id: number, email: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', id: number, email: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', success: boolean } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpOutput', id: number, email: string } };

export type CreateSongMutationVariables = Exact<{
  input: CreateSongInput;
}>;


export type CreateSongMutation = { __typename?: 'Mutation', createSong: { __typename?: 'CreateSongOutput', id: number, name: string, createdAt: any, updatedAt: any } };

export type DeleteSongMutationVariables = Exact<{
  input: DeleteSongInput;
}>;


export type DeleteSongMutation = { __typename?: 'Mutation', deleteSong: { __typename?: 'DeleteSongOutput', success: boolean } };

export type GetSongQueryVariables = Exact<{
  input: GetSongInput;
}>;


export type GetSongQuery = { __typename?: 'Query', song: { __typename?: 'GetSongOutput', name: string } };

export type ListSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSongsQuery = { __typename?: 'Query', songs: Array<{ __typename?: 'SongEntity', id: number, name: string, createdAt: any, updatedAt: any }> };

export type UserFieldsFragment = { __typename?: 'ListUsersOutput', list: Array<{ __typename?: 'ListUsersOutput_List', id: number, email: string }> };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'Query', users: { __typename?: 'ListUsersOutput', list: Array<{ __typename?: 'ListUsersOutput_List', id: number, email: string }> } };

export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersOutput"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const GoogleLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoogleLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const CreateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateSongMutation, CreateSongMutationVariables>;
export const DeleteSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteSongMutation, DeleteSongMutationVariables>;
export const GetSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetSongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetSongQuery, GetSongQueryVariables>;
export const ListSongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListSongs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ListSongsQuery, ListSongsQueryVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersOutput"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;