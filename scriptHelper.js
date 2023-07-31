// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById("missionTarget");
   div.innerHTML=`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons:${moons} </li>
                </ol>
                <img src="${imageUrl}">
   `;
}

function validateInput(testInput) {
    
    if (testInput === "" ) {
        return "Empty";
    } else if (isNaN(Number(testInput)))  {
        return "Not a Number";
    } else if (isNaN(testInput) === false){
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let pilotName = document.querySelector("input[name=pilotName]").value;
    let copilotName = document.querySelector("input[name=copilotName]").value;
    let fuel = document.querySelector("input[name=fuelLevel]").value;
    let cargoMass= document.querySelector("input[name=cargoMass]").value;
   // let list = document.getElementById("faultyItems");
    let pilotStatus =document.getElementById("pilotStatus");
    let copilotStatus =document.getElementById("copilotStatus");
    let fuelStatus =document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus =document.getElementById("launchStatus");

 
    const pilotValidation = validateInput(pilotName);
    const copilotValidation = validateInput(copilotName);
    const fuelValidation = validateInput(fuel);
    const cargoValidation = validateInput(cargoMass);

    if (pilotValidation === "Empty" || copilotValidation === "Empty" || fuelValidation === "Empty" || cargoValidation === "Empty") {
        alert("All fields are required!");
        return;
    }

    else if (pilotValidation === "Is a Number" || copilotValidation === "Is a Number" ) {
        alert("Please do not enter numbers for the name of pilot or co-pilot");
        return;
    }

    else if (fuelValidation === "Not a Number" || cargoValidation === "Not a Number") {
        alert("Please enter numerical values for Fuel Level and Cargo Mass");
        return;
    }
    else{
        pilotStatus.innerHTML = `Pilot ${pilotName} is ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilotName} is ready`;
        list.style.visibility="visible";

    if(fuel < 10000 && cargoMass <= 10000){
        list.style.visibility="visible";
        fuelStatus.innerHTML="Fuel level too low for launch";
        cargoStatus.innerHTML="Cargo mass low enough for launch";
        launchStatus.innerHTML="Shuttle Not Ready for Launch";
        launchStatus.style.color= "#C7254E";
    }
    else if( fuel >= 10000 && cargoMass > 10000)
    {
        
        list.style.visibility="visible";
        fuelStatus.innerHTML="Fuel level high enough for launch";
        cargoStatus.innerHTML="Cargo mass too heavy for launch";
        launchStatus.innerHTML="Shuttle Not Ready for Launch";
        launchStatus.style.color= "#C7254E";

    }
    else if (fuel < 10000 && cargoMass > 10000) {
        list.style.visibility="visible";
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";
    }
    else
    {
        list.style.visibility="visible";
        fuelStatus.innerHTML="Fuel level high enough for launch";
        cargoStatus.innerHTML="Cargo mass low enough for launch";
        launchStatus.innerHTML="Shuttle Ready for Launch";
        launchStatus.style.color= "#419F6A";

    }

}

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let num = Math.floor(Math.random() * planets.length);
    return planets[num];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
