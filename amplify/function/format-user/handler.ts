import { AppSyncIdentityCognito, AppSyncIdentityIAM } from 'aws-lambda';
import { Schema } from '../../data/resource';

export const handler: Schema["formatUser"]["functionHandler"] = async (event) => {
    const { userId, email } = event.arguments;
    const rand = Math.floor(Math.random() * 10000000000).toString();
    return {
        userId: `${userId + rand}`,
        email: `${email + rand}`,
    };
};