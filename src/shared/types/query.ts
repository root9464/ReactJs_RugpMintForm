import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type Query<T> = UseQueryResult<T, Error>;

export type Mutation<T> = UseMutationResult<T, Error, true | undefined, unknown>;
