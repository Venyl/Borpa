import { getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

export interface User {
    userId: string;
    xp: number;
    level: number;
    remainingXp: number;
    overallNeededXp: number;
    lastUpdated: Date;
}

export default async function updateUser(userId: string, message: string) {
    try {
        const docRef = doc(db, 'users', userId);
        const userDoc = await getDoc(docRef);
        const userLastUpdate: number = userDoc.get('lastUpdated').seconds;
        const actualTime = new Date().getTime() / 1000;
        const timeDelta = actualTime - userLastUpdate;

        if (timeDelta < 10) return;

        //Xp logic
        let userXp: number = userDoc.get('xp');
        let multiplier = 1 + Math.floor(message.length / 20) / 10;
        multiplier = multiplier > 2 ? 2 : multiplier;
        const newXp = userXp + 10 * multiplier;
        let overallNeededXp = 0;
        let userLevel = 0;
        let i = newXp;
        let c = 0;
        while (i > 0) {
            let xpForNextLvl = 10 + 200 ** Math.log10(c++);
            i -= xpForNextLvl;
            overallNeededXp += xpForNextLvl;
            if (i >= 0) userLevel++;
        }
        if (overallNeededXp === newXp) overallNeededXp += 10 + 200 ** Math.log10(userLevel);
        overallNeededXp = Math.ceil(overallNeededXp);
        userXp = newXp;
        const remainingXp = overallNeededXp - userXp;

        const user: User = {
            userId,
            xp: newXp,
            level: userLevel,
            remainingXp,
            overallNeededXp,
            lastUpdated: new Date(),
        };
        await setDoc(docRef, user);
    } catch (e) {
        console.error(`Error updating user: ${e}`);
    }
}
