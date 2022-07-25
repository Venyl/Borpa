import { getDocs, collection } from 'firebase/firestore/lite';
import { db } from '../firebase';

export default async function fetchAllUsers() {
    try {
        const userDocs = await getDocs(collection(db, 'users'));
        return userDocs.docs;
    } catch (e) {
        console.error(`Error adding user: ${e}`);
    }
}
