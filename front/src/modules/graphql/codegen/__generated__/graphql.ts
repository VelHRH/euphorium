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

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type GetSongInput = {
  name: Scalars['String']['input'];
};

export type GetSongOutputDto = {
  __typename?: 'GetSongOutputDto';
  name: Scalars['String']['output'];
};

export type GetUserInput = {
  id: Scalars['Int']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean']['output'];
  googleLogin?: Maybe<UserEntity>;
  login?: Maybe<UserEntity>;
  logout: Scalars['Boolean']['output'];
  revokePassword: Scalars['Boolean']['output'];
  signUp: UserEntity;
  updatePassword?: Maybe<UserEntity>;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
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
  song: GetSongOutputDto;
  user?: Maybe<UserEntity>;
  users: Array<UserEntity>;
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

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
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

export type GetSongQueryVariables = Exact<{
  input: GetSongInput;
}>;


export type GetSongQuery = { __typename?: 'Query', song: { __typename?: 'GetSongOutputDto', name: string } };


export const GetSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetSongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetSongQuery, GetSongQueryVariables>;