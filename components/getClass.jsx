import ReturnClassStatus from './ReturnClassStatus'
const getClass = async (subject, season, year) => {
    try {
        // const url = `https://1tgg4m2pra.execute-api.us-east-2.amazonaws.com/prod/courses?subject=${subject}`
        const url = `https://api.peterportal.org/rest/v0/schedule/soc?term=${year}%20${season}&department=${subject}`
        // console.log(url)
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Response was bad :(');
        }
        const data = await response.json()
        classes = data["schools"][0]["departments"][0]["courses"]
        numOfClasses = classes.length
        return { classes: classes, numOfClasses: numOfClasses }
    }
    catch (e) {
        console.log(e)
    }
}

const GetCourseInfo = async (className) => {
    let fullTitle = className.toUpperCase()
    let data = fullTitle.split(" ")
    // let couresName = data[0];
    data = data.map(text => text.replace("/", "%2F").replace("&", "%26"));
    // couresName = couresName.replace("/", "%2F")
    // couresName = couresName.replace("&", "%20")
    const query = data.join("");
    try {
        const url = `https://api.peterportal.org/rest/v0/courses/${query}`
        const response = await fetch(url)
        if (!response.ok) {
            // throw new Error('Response was bad in GetCourseInfo');
            return {description: "", prereqs: "", prereqTree: {}}
        }
        const data = await response.json()
        return {description: data.description, prereqs: data.prerequisite_text, prereqTree: data.prerequisite_tree}
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

export {getClass, getClassStatus, GetCourseInfo}