// initializing variables
let nameInput = document.getElementById("nameInput");
let submitBtn = document.getElementById("submitBtn");
let ansHybri = document.getElementById("ansHybri");
fetch("./data/data.json")
.then(response => {
    return response.json();
})
.then(jsondata => {

    let rootWordList = jsondata.rootWordList;
    console.log(jsondata.funcGroup.length);

    // setting a onClick event for the submitBtn button
    submitBtn.addEventListener("click", e =>{

        // Fetching the name
        const name = nameInput.value;

        // spliting up the name to analysis it
        let splitedName = name.split("-");

        // Finding the no. of carbon by checking the root word
        let rootWordIndex;
        Object.keys(rootWordList).forEach( rootWord => {
            for (let i = 0; i<splitedName.length; i++) {
                if (splitedName[i].toLowerCase() == rootWord.toLowerCase()){
                    rootWordIndex = i;
                }
            }
        });
        let noOfCarbon = rootWordList[splitedName[rootWordIndex].toLowerCase()];

        // Checking if there is any Alkene group
        let eneIndex = [];
        splitedName.forEach((name, i) => {
            if(name.includes("ene")){
                splitedName[i-1].split(",").forEach((n, i) => {
                    eneIndex[i] = parseInt(n);
                })
            }
        })
        
        // Cheking if there is any Alkyne group
        var yneIndex = [];
        splitedName.forEach((name, i) => {
            if(name.includes("yne")){
                splitedName[i-1].split(",").forEach((n, i) => {
                    yneIndex[i] = parseInt(n);
                })
            }
        });


        // Getting the hybridisation
        let hybriList = [];
        let hybri = "sp3";

        for (let i = 1; i <= noOfCarbon; i++) {

            // Checking for hybridisation
            if (eneIndex.includes(i) && eneIndex.includes(i-1)){
                hybri = "sp";
            } else if (eneIndex.includes(i) || eneIndex.includes(i-1)){
                hybri = "sp2";
            } else if(yneIndex.includes(i) || yneIndex.includes(i-1)) {
                hybri = "sp";
            } else {
                hybri = "sp3";
            }
            // console.log("Carbon No. " + i + ": " + hybri + " ---> " + i + "==" + eneIndex + " || " + (eneIndex+1));
            hybriList[i-1] = hybri
        }

        // Appending Answers to the Web Page
        ansHybri.innerHTML = "";
        hybriList.forEach( (h, i) => {
            ansHybri.innerHTML += `Carbon No. ${i+1}: ${h}<br />`;
        } );

    });
})

