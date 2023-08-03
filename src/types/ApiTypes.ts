// src/types/ApiTypes.ts
export enum ApiLoadingState {
  loading = 'Loading',
  idle = 'idle',
  succeeded = 'succeeded',
  failed = 'failed',
}

export type ValidationError = number | null
