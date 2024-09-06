import { db } from "../config/firebase";
import { addDoc, deleteDoc, collection, getDoc, query, where, getDocs, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
// classData = {
//     className: COMPSCI 121
//     classTitle: Info Retrieval
//     classType: LecA
//     classCode: 34040

//     subject: COMPSCI
//     season: Fall
//     year: 2024
// }
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler


const parseTimes = (timeString) => {
    if (timeString == "TBA" || timeString == "") {
        return {
            startHour: -1,
            startMinutes: -1,
            endHour: -1,
            endMinutes: -1,
            duration: -1
        }
    }
    let splitTime = timeString.split("-")
    let cleanedTime = splitTime.map(word => word.trim())

    const startTime = cleanedTime[0]
    const endTime = cleanedTime[1]


    let time = startTime.split(":")

    let startHour = parseInt(time[0], 10)
    const startMinutes = parseInt(time[1], 10)

    time = endTime.split(":")
    let endHour = parseInt(time[0], 10)
    const endMinutes = parseInt(time[1], 10)

    if (endTime[endTime.length - 1] != "p") {
        let durationMinutes = ((endHour - startHour) * 60) + (endMinutes - startMinutes)
        return {
            startHour: startHour,
            startMinutes: startMinutes,
            endHour: endHour,
            endMinutes: endMinutes,
            duration: durationMinutes
        }
    }



    if (endHour < 12) endHour += 12
    if (endHour - startHour > 5 || startHour <= endTime - 12) {
        if (startHour + 12 <= endHour) startHour += 12
    }
    let durationMinutes = ((endHour - startHour) * 60) + (endMinutes - startMinutes)

    const timeData = {
        startHour: startHour,
        startMinutes: startMinutes,
        endHour: endHour,
        endMinutes: endMinutes,
        duration: durationMinutes
    }
    return timeData
}


const randomColor = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colorGenerator = () => {
    const r = randomColor(0, 255)
    const g = randomColor(0, 255)
    const b = randomColor(0, 255)
    return `rgba(${r}, ${g}, ${b}, .5)`
}
const getDays = (dayString) => {
    if (dayString == "TBA" || "") {
        return []
    }
    const stack = []

    for (let char of dayString) {
        let day = char
        if (char == "u" || char == "h") {
            popped = stack.pop()
            day = popped + char
        }
        stack.push(day)
    }
    return stack
}
const addClass = async (uid, classData) => {
    const userStudyPlan = collection(db, uid)
    const sectionCode = classData.sectionCode
    const q = query(userStudyPlan, where("sectionCode", "==", sectionCode));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log(`adding ${sectionCode}`);
            const days = getDays(classData.days)
            classData.days = days
            const timeData = parseTimes(classData.time)
            classData.color = colorGenerator()
            const updatedClassData = {
                ...classData,
                ...timeData
            }
            // console.log(updatedClassData)
            return updatedClassData
            // return await addDoc(userStudyPlan, classData)

        }
        return {}
    } catch (error) {
        console.error("Error checking class existence: ", error);
        return {} // Handle the error appropriately
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