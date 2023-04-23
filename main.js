async function getSource (source) {
    let result = await fetch(source) 
      .then(response => response.json())
      .then(response => response)

    return result;
}

var assistant = []

function assistantList(assistantInfo) {
    assistantInfo[1].student = []
    assistant.push(assistantInfo)
    
}

function addStudent(studentInfo) {
    for (const assistantNum in assistant){
        if(assistant[assistantNum][1].group==studentInfo[1].group){
            assistant[assistantNum][1].student.push(studentInfo)
        }
    }
}

let allStudents = await getSource("./source.json")
let allStudentsArr = Object.entries(allStudents)

console.log(allStudentsArr)

for (const arr in allStudentsArr) {
    if (allStudentsArr[arr][1]["assistant"]) {
        assistantList(allStudentsArr[arr])
        console.log("assistants",assistant)
    }
}

for (const arr in allStudentsArr) {
    if (!allStudentsArr[arr][1]["assistant"]) {
        addStudent(allStudentsArr[arr])
        console.log("students",assistant)
    }
}

let studentResult = JSON.stringify(assistant)
let studentResultParse = JSON.parse(studentResult)

document.getElementById("json").innerHTML = JSON.stringify(studentResultParse, undefined, 2)
