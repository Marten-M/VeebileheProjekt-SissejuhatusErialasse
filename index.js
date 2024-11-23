// Kood tehtud Marten Mehide poolt
var trainingGoalDropdown = document.getElementById("training-goal");
var fitnessLevelDropdown = document.getElementById("fitness-level");
var questionnaireBox = document.getElementById("questions-box")

// Lisab rippmenüüsse füüsilise vormi taseme valikud ühest kümneni
for (var i = 1; i <= 10; i++) {
    var newOption = document.createElement("option");
    newOption.innerHTML = String(i);
    fitnessLevelDropdown.appendChild(newOption);
}

/**
 * Genereerib personaalse treeningkava sõltuvalt küsimuste vastustest
 */
function generate_personal_workout() {
    var fitnessLevel = parseInt(fitnessLevelDropdown.value);
    var trainingGoal = parseInt(trainingGoalDropdown.value);

    // Algsed väärtused
    var repsPerUnit = 4; // Kui mitu korda harjutusühikut korrata (nt kätekõverdustel 5 kätekõverdust = 1 harjutusühik)
    var sets = 3; // Kui mitu ringi harjutust teha
    var runningTimeMinutes = 10;
    var trainingsPerWeek = 2;
    var weightsClass = "keskmine"; // Kui raskeid raskusi kasutada

    if (fitnessLevel > 3) {
        trainingsPerWeek = 3;
    } else {
        sets = 2;
    }

    // Muuda väärtusi vastavalt küsimuste vastustele
    if (trainingGoal == 1) {
        // Trenni eesmärk kaalu kaotada
        if (3 < fitnessLevel && fitnessLevel < 7) {
            runningTimeMinutes = 20;
        } else if (7 < fitnessLevel) {
            runningTimeMinutes = 30;
        }
    } else if (trainingGoal == 2) {
        // Trenni eesmärk vastupidavust parandada
        weightsClass = "kerge";
        if (3 < fitnessLevel && fitnessLevel < 7) {
            repsPerUnit = 5;
            runningTimeMinutes = 20;
        } else if (7 < fitnessLevel) {
            repsPerUnit = 6;
            sets = 4;
            runningTimeMinutes = 30;
        }
    } else if (trainingGoal == 3) {
        // Trenni eesmärk tugevamaks saada
        if (fitnessLevel < 7) {
            trainingsPerWeek = 2;
        }
        weightsClass = "raske";
        repsPerUnit = 3;
    } else if (trainingGoal == 4) {
        // Trenni eesmärk füüsilist vormi hoida
        if (fitnessLevel > 3)
            runningTimeMinutes = 15;
    }


    // Loo treeningkava tekst
    // Harjutused
    const excercises = [
        `${runningTimeMinutes} minutit rahulikku sörkjooksu`,
        `${sets}x${repsPerUnit * 5} kätekõverdust`,
        `${sets}x${repsPerUnit * 6} kõhulihast`,
        `${sets}x${repsPerUnit * 2} pulloverit`,
        `${sets}x${repsPerUnit * 3} kummardudes tõmmet`
    ];

    const introductoryMessage = "Sinu vormi ja eesmärke arvesse võttes soovitame sul järgid järgmist treeningkava:"
    const finalMessage = `Tee trenni ${trainingsPerWeek} korda nädalas. Harjutuste, mis vajavad raskusi, raskusastme klass võiks olla Sinu jaoks ${weightsClass}. Mittetuttavate harjutuste kohta saad täpsemalt lugeda vajutades "Kodus treenimine" peale.`

    // Asenda tekst kastis
    questionnaireBox.innerHTML = introductoryMessage;
    var bulletPoints = document.createElement("ul");
    excercises.forEach(excerciseText => {
        const entry = document.createElement("li");
        entry.innerHTML = excerciseText;
        bulletPoints.appendChild(entry);
    })
    questionnaireBox.appendChild(bulletPoints);
    var finalParagraph = document.createElement("p");
    finalParagraph.innerHTML = finalMessage;
    questionnaireBox.appendChild(finalParagraph);

}