import { getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { User } from './updateUser';

export default async function addUser(userId: string) {
    try {
        const docRef = doc(db, 'users', userId);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) return false;
        const newUser: User = {
            userId,
            xp: 0,
            level: 0,
            remainingXp: 10,
            overallNeededXp: 10,
            lastUpdated: new Date(),
        };
        await setDoc(docRef, newUser);
        console.log('User added');
    } catch (e) {
        console.error(`Error adding user: ${e}`);
    }
    return true;
}
