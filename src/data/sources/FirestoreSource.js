/**
 * Firestore Data Source.
 * Handles direct interaction with Firebase Firestore.
 */

import { db } from '../../core/firebase-config.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    addDoc, 
    updateDoc, 
    query, 
    where, 
    orderBy, 
    limit,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

export const FirestoreSource = {
    // Generic Get
    async get(coll, id) {
        const docRef = doc(db, coll, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    // Generic Add
    async add(coll, data) {
        return await addDoc(collection(db, coll), {
            ...data,
            createdAt: serverTimestamp()
        });
    },

    // Generic Set (with ID)
    async set(coll, id, data) {
        return await setDoc(doc(db, coll, id), {
            ...data,
            updatedAt: serverTimestamp()
        }, { merge: true });
    },

    // Query Jobs
    async queryJobs(filters = {}) {
        let q = collection(db, 'jobs');
        const constraints = [orderBy('postedAt', 'desc')];

        if (filters.category && filters.category !== 'All') {
            constraints.push(where('category', '==', filters.category));
        }
        if (filters.location && filters.location !== 'All Locations') {
            constraints.push(where('location', '==', filters.location));
        }
        if (filters.type) {
            constraints.push(where('type', '==', filters.type));
        }

        const finalQuery = query(q, ...constraints, limit(20));
        const querySnapshot = await getDocs(finalQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get User Data
    async getUser(uid) {
        return await this.get('users', uid);
    }
};
