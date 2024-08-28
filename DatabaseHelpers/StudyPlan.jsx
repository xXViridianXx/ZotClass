import { db } from "../config/firebase";
import { addDoc, deleteDoc, collection, getDoc, query, where, getDocs, doc } from "firebase/firestore";


// classData = {
//     className: COMPSCI 121
//     classTitle: Info Retrieval
//     classType: LecA
//     classCode: 34040

//     subject: COMPSCI
//     season: Fall
//     year: 2024
// }

// only add class if doesn't exist in study plan
const addClass = async (uid, classData) => {
    const userStudyPlan = collection(db, uid)
    const sectionCode = classData.sectionCode
    const q = query(userStudyPlan, where("sectionCode", "==", sectionCode));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log(`adding ${sectionCode}`);
            return await addDoc(userStudyPlan, classData)

        }
    } catch (error) {
        console.error("Error checking class existence: ", error);
        return false; // Handle the error appropriately
    }

}

// deletes a class from user study plan
const deleteClass = async (uid, sectionCode) => {
    const userStudyPlan = collection(db, uid)
    const q = query(userStudyPlan, where("sectionCode", "==", sectionCode));
    try {
        const querySnapShot = await (getDocs(q))

        if (querySnapShot.empty) {
            console.log("No matching documents found.");
            return;
        }
        const docSnapshot = querySnapShot.docs[0];

        const docRef = doc(db, uid, docSnapshot.id);

        // Delete the document
        await deleteDoc(docRef);
        console.log(`${sectionCode} removed successfully`);
    } catch (error) {
        console.error("Error checking class existence: ", error);
    }
}

export { addClass, deleteClass }