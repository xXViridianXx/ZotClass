import { db } from "../config/firebase";
import { addDoc, deleteDoc, collection, getDoc, query, where, getDocs, doc } from "firebase/firestore";
import { addClassToDay } from "../redux/reducers/user";
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


// const parseTimes = (timeString) => {
//     if (timeString == "TBA" || timeString == "") {
//         return {
//             startHour: -1,
//             startMinutes: -1,
//             endHour: -1,
//             endMinutes: -1,
//             duration: -1
//         }
//     }
//     let splitTime = timeString.split("-")
//     let cleanedTime = splitTime.map(word => word.trim())

//     const startTime = cleanedTime[0]
//     const endTime = cleanedTime[1]


//     let time = startTime.split(":")

//     let startHour = parseInt(time[0], 10)
//     const startMinutes = parseInt(time[1], 10)

//     time = endTime.split(":")
//     let endHour = parseInt(time[0], 10)
//     const endMinutes = parseInt(time[1], 10)

//     if (endTime[endTime.length - 1] != "p") {
//         let durationMinutes = ((endHour - startHour) * 60) + (endMinutes - startMinutes)
//         return {
//             startHour: startHour,
//             startMinutes: startMinutes,
//             endHour: endHour,
//             endMinutes: endMinutes,
//             duration: durationMinutes
//         }
//     }



//     if (endHour < 12) endHour += 12
//     if (endHour - startHour > 5 || startHour <= endTime - 12) {
//         if (startHour + 12 <= endHour) startHour += 12
//     }
//     let durationMinutes = ((endHour - startHour) * 60) + (endMinutes - startMinutes)

//     const timeData = {
//         startHour: startHour,
//         startMinutes: startMinutes,
//         endHour: endHour,
//         endMinutes: endMinutes,
//         duration: durationMinutes
//     }
//     return timeData
// }

const parseTimes = (startHour, startMinute, endHour, endMinute) => {
    if (startHour == null) {
        return {
            startHour: -1,
            startMinutes: -1,
            endHour: -1,
            endMinutes: -1,
            duration: -1
        }
    }

    let durationMinutes = ((endHour - startHour) * 60) + (endMinute - startMinute)

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
    const r = randomColor(0, 100)
    const g = randomColor(0, 100)
    const b = randomColor(0, 100)
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
            const days = getDays(classData.startHour, classData.startMinute, classData.endHour, classData.endMinute)
            classData.days = days
            const timeData = parseTimes(classData.time)
            classData.color = colorGenerator()
            const updatedClassData = {
                ...classData,
                ...timeData
            }
            // console.log(updatedClassData)
            const status = await addDoc(userStudyPlan, updatedClassData)
            return updatedClassData
        }
    } catch (error) {
        console.error("Error checking class existence: ", error);
    }
    // console.log("here")
    return -1

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

const fetchStudyPlan = async (uid) => {
    if (!uid) return []
    const userStudyPlan = collection(db, uid)
    try {
        const studyPlan = []
        const snapShot = await getDocs(userStudyPlan)
        snapShot.forEach((doc) => {
            studyPlan.push(doc.data())
        });
        
        return studyPlan
    } catch (error) {
        console.log("Error fetching study plan", error);
    }
    return []

}

const filterClass = (newClass, dispatch) => {
    if (newClass.days == []) return
    // const schedule = useSelector((state) => state.currentUser.schedule);
    // if (newClass.days == []) {
    //     console.log("Adding: ", newClass)
    //     dispatch(addClassToDay({ index: 5, newClass }))
    //     return
    // }
    console.log(newClass.days)
    newClass.days.forEach(day => {
        if (day === "M") dispatch(addClassToDay({ index: 0, newClass }));
        if (day === "Tu") dispatch(addClassToDay({ index: 1, newClass }));
        if (day === "W") dispatch(addClassToDay({ index: 2, newClass }));
        if (day === "Th") dispatch(addClassToDay({ index: 3, newClass }));
        if (day === "F") dispatch(addClassToDay({ index: 4, newClass }));
    });

};


export { addClass, deleteClass, fetchStudyPlan, filterClass }