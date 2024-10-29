import { defineFunction } from '@aws-amplify/backend';

export const formatUser = defineFunction({
    // optionally specify a name for the Function (defaults to directory name)
    name: 'format-user',
    entry: './handler.ts',
});