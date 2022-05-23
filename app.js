var eddDay, eddMonth, eddYear, chosenMonth, chosenDay, chosenYear

var currentDate = new Date()

var [currentDay, currentMonth, currentYear] = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()]

//Updates the Select/Option to the last year and current year (so it won't get obssolate later)
document.querySelector('.currentYear').innerText = `${currentYear}`
document.querySelector('.currentYear').value = `${currentYear}`

document.querySelector('.lastYear').innerText = `${currentYear - 1}`
document.querySelector('.lastYear').value = `${currentYear - 1}`

//Demands that the user select the Month first, so our EventListener 'change' can work on how many days to show.
if (document.querySelector(".monthClass").value == "0"){
    document.querySelector(".dayClass").disabled = true
    document.querySelector(".yearClass").disabled = true
}

//Disable day 31 on months that have only 30 days (disables 31, 30 and 29 on February)
document.querySelector(".monthClass").addEventListener('change', function(){

    chosenMonth = document.querySelector(".monthClass").value

    document.querySelector(".dayClass").disabled = false
    document.querySelector(".yearClass").disabled = false

    //If at any point the user selects 'Month' (value 0), it turns off Day and Year select again
    if (chosenMonth == "0"){
        document.querySelector(".dayClass").disabled = true
        document.querySelector(".yearClass").disabled = true
    }

    //Reset the display:inline from days 29, 30 and 31
    function displayDays() {
        document.querySelector(".dayClass > option:nth-child(30)").style.display = 'inline'
        document.querySelector(".dayClass > option:nth-child(31)").style.display = 'inline'
        document.querySelector(".dayClass > option:nth-child(32)").style.display = 'inline'
    }

    switch (chosenMonth) {
        //January
        case "1":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;

        //February
        case "2":
            document.querySelector(".dayClass > option:nth-child(32)").style.display = 'none'
            document.querySelector(".dayClass > option:nth-child(31)").style.display = 'none'

            //Disables day 29 only if it is !NOT a Leap Year.
            if (!(((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0))){
                document.querySelector(".dayClass > option:nth-child(30)").style.display = 'none'
            }

            chosenMonth = Number(chosenMonth)

            /*If user selects a month, then day 31, and changes the month again, to one 
            that doesn't have 31 days, the 'day select' will be reset to "Day" (value 0)*/
            if (chosenDay > 28){
                document.querySelector(".dayClass").value = "0"
            }
        break;

        //March
        case "3":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;

        //April
        case "4":
            displayDays()
            document.querySelector(".dayClass > option:nth-child(32)").style.display = 'none'
            chosenMonth = Number(chosenMonth)

            if (chosenDay > 30){
                document.querySelector(".dayClass").value = "0"
            }
        break;

        //May
        case "5":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;

        //June
        case "6":
            displayDays()
            document.querySelector(".dayClass > option:nth-child(32)").style.display = 'none'
            chosenMonth = Number(chosenMonth)

            if (chosenDay > 30){
                document.querySelector(".dayClass").value = "0"
            }
        break;

        //July
        case "7":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;

        //August
        case "8":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;

        //September
        case "9":
            displayDays()
            document.querySelector(".dayClass > option:nth-child(32)").style.display = 'none'
            chosenMonth = Number(chosenMonth)

            if (chosenDay > 30){
                document.querySelector(".dayClass").value = "0"
            }
        break;

        //October
        case "10":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;

        //November
        case "11":
            displayDays()
            document.querySelector(".dayClass > option:nth-child(32)").style.display = 'none'
            chosenMonth = Number(chosenMonth)

            if (chosenDay > 30){
                document.querySelector(".dayClass").value = "0"
            }
        break;

        //December
        case "12":
            displayDays()
            chosenMonth = Number(chosenMonth)
        break;
    }
})

//Saves the selected day (option value) to a variable as Number
document.querySelector(".dayClass").addEventListener('change', function(){
    chosenDay = Number(document.querySelector(".dayClass").value)
})

//Saves the selected year (option value) to a variable as Number
document.querySelector(".yearClass").addEventListener('change', function(){
    chosenYear = Number(document.querySelector(".yearClass").value)
})




function renderResults(divClass){
    document.querySelector(divClass).style.color = '#474747'
    document.querySelector(divClass).style.fontSize = '1rem'
    document.querySelector(divClass).style.fontWeight = '800'
    document.querySelector(divClass).style.fontStyle = 'normal'
}

//Listen to btnCalc click and returns the calculation
document.querySelector(".btnCalc").addEventListener('click', function (){

    if (chosenDay == undefined || chosenMonth == undefined || chosenYear == undefined){
        alert(`You need to select a Date.`);
    } else {

        //Reconstructs the inputed date as a actual new Date() element
        var lastPeriodDate = new Date(`"${chosenMonth.toString().padStart(2, "0")}/${chosenDay.toString().padStart(2, "0")}/${chosenYear}"`)

        if (lastPeriodDate >= currentDate){
            alert('You need to select a Date prior to Today')
            return
        }

        //Subtracts the total of miliseconds between currentDate and lastPeriodDate
        var dateDifference = currentDate.getTime() - lastPeriodDate.getTime()

        /*Takes 12 hours in ms from the ms value so it would count +1 day if we're past 12 O'clock.
        And also converts it to a total of days*/
        var daysFromLastPeriodToCurrentDate = ((dateDifference - 43200000) / (1000 * 3600 * 24)).toFixed(0)

        var gaWeeks = Math.floor(daysFromLastPeriodToCurrentDate / 7)

        //If there is remain to the days / 7 division...
        if (daysFromLastPeriodToCurrentDate % 7 != 0){

            //Stores the remain as days
            var gaDays = daysFromLastPeriodToCurrentDate % 7

            //Writes the GA result to DOM based on the LMP.
            if (gaDays == 1){
                document.querySelector(".gaResClass").innerText = `${gaWeeks} weeks and ${gaDays} day`
            } else {
                document.querySelector(".gaResClass").innerText = `${gaWeeks} weeks and ${gaDays} days`
            }
        } else {
            document.querySelector(".gaResClass").innerText = `${gaWeeks} weeks`
        }

        //Changes the CSS for the Results
        renderResults(".gaResClass")

        //Writes the EDD based on the LMP.
        document.querySelector(".eddResClass").innerText = `${eddMonth}/${eddDay}/${eddYear}`
        renderResults(".eddResClass")
    }
})

