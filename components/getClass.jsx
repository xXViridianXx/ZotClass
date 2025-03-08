import ReturnClassStatus from './ReturnClassStatus'


// const getClass = async (subject, season, year) => {
//     try {
//         // const url = `https://1tgg4m2pra.execute-api.us-east-2.amazonaws.com/prod/courses?subject=${subject}`
//         const API_KEY = process.env.REACT_APP_ANTEATER_API_KEY;
//         const url = await fetch(
//             "https://anteaterapi.com/v2/rest/websoc?" +
//             new URLSearchParams({
//                 year: year,
//                 quarter: season,
//                 department: subject,
//             }),
//             {
//                 headers: {
//                     Authorization: `Bearer ${API_KEY}`,
//                 },
//             }
//         );
//         const response = await fetch(url)
//         console.log(response)
//         if (!response.ok) {
//             throw new Error('Response was bad :(');
//         }
//         const data = await response.json()
//         classes = data["data"]["schools"][0]["departments"][0]["courses"]
//         numOfClasses = classes.length
//         return { classes: classes, numOfClasses: numOfClasses }
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

// https://anteaterapi.com/v2/rest/websoc?year=2025&quarter=Spring&department=COMPSCI
const getClass = async (subject, season, year) => {
    console.log(subject)
    try {
        const API_KEY = process.env.REACT_APP_ANTEATER_API_KEY;
        const res = await fetch(
            "https://anteaterapi.com/v2/rest/websoc?" +
            new URLSearchParams({
                year: year,
                quarter: season,
                department: subject,
            }),
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,  // Use the API key securely
                    // other headers if needed
                },
                // other options if needed
            }
        );

        //   console.log("Request URL:", res);

        if (!res.ok) {
            throw new Error('API request failed');
        }

        const data = await res.json();
        const classes = data["data"]["schools"][0]["departments"][0]["courses"]
        // console.log(data["data"]["schools"][0]["departments"][0]["courses"]);  // Handle or display the data as needed

        numOfClasses = classes.length
        return { classes: classes, numOfClasses: numOfClasses }
    } catch (error) {
        console.error("Error fetching class data:", error);
    }
};

const GetCourseInfo = async (className) => {
    let fullTitle = className.toUpperCase()
    let data = fullTitle.split(" ")
    // let couresName = data[0];
    data = data.map(text => text.replace("/", "%2F").replace("&", "%26"));
    // couresName = couresName.replace("/", "%2F")
    // couresName = couresName.replace("&", "%20")
    const query = data.join("");
    try {
        const url = `https://anteaterapi.com/v2/rest/courses/${query}`
        const response = await fetch(url)
        if (!response.ok) {
            // throw new Error('Response was bad in GetCourseInfo');
            return { description: "", prereqs: "", prereqTree: {} }
        }
        const json = await response.json()
        const data = json["data"]
        // console.log(data.prerequisiteText)
        return { description: data.description, prereqs: data.prerequisiteText, prereqTree: data.prerequisite_tree }
    }
    catch (e) {
        console.log(e)
    }
}

const getClassStatus = (sections) => {
    let classStatus = "FULL"
    if ("Lec" == sections[0].sectionType) {
        for (let i = 0; i < sections.length; i++) {
            if ("Lec" != sections[i].sectionType) {
                continue
            }
            classStatus = ReturnClassStatus(classStatus, sections[i].status)
            if ("OPEN" == classStatus) {
                break
            }
        }
    }
    else {
        for (let i = 0; i < sections.length; i++) {
            classStatus = ReturnClassStatus(classStatus, sections[i].status)
            if ("OPEN" == classStatus) {
                break
            }
        }
    }
    // console.log(classStatus)
    return classStatus
}

export { getClass, getClassStatus, GetCourseInfo }

// https://anteaterapi.com/v2/rest/websoc?year=2025&quarter=Spring&department=I%2526C%2520SCI
// https://anteaterapi.com/v2/rest/websoc?year=2025&quarter=Spring&department=I%26C%20SCI