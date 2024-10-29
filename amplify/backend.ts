import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { formatUser } from './function/format-user/resource';

defineBackend({
    auth,
    data,
    formatUser,
});
