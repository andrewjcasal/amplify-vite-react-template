import { defineFunction } from '@aws-amplify/backend';

export const getUserTodos = defineFunction({
    // optionally specify a name for the Function (defaults to directory name)
    name: 'get-user-todos',
    entry: './handler.ts',
});