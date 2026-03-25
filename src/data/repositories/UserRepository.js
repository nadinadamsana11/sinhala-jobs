/**
 * User Repository Implementation.
 */

import { FirestoreSource } from '../sources/FirestoreSource.js';
import { User } from '../../domain/entities/User.js';

export const UserRepository = {
    async getUserProfile(uid) {
        const data = await FirestoreSource.getUser(uid);
        return data ? new User(data) : null;
    },

    async updateUserProfile(uid, userData) {
        return await FirestoreSource.set('users', uid, userData);
    }
};
