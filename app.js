var eddDay, eddMonth, eddYear, chosenMonth, chosenDay, chosenYear, daysArr, daysInFebruary

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

//Is it a Leap Year?
if (((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0)){
    daysInFebruary = 29
} else {
    daysInFebruary = 28
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
            document.querySelector(".dayClass > option:nth-child(30)").style.display = 'none'

            //Is it a Leap Year?
            if (daysInFebruary == 29){
                document.querySelector(".dayClass > option:nth-child(30)").style.display = 'inline'
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

//Array storing how many days there is in each month
daysArr = {
    jan : 31,
    feb : daysInFebruary,
    mar : 31,
    apr : 30,
    may : 31,
    jun : 30,
    jul : 31,
    aug : 31,
    sep : 30,
    oct : 31,
    nov : 30,
    dec : 31
}

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

        switch (chosenMonth) {
            case 1:
            case 2:
            case 3:
                eddDay = chosenDay + 7
                eddMonth = chosenMonth + 9
                eddYear = chosenYear

                if (eddMonth == 10 && eddDay > daysArr.oct){
                    eddDay = eddDay - daysArr.oct //Excedeed - Days on that specific month
                    eddMonth += 1 //Jumped to the next month.
                } else if (eddMonth == 11 && eddDay > daysArr.nov){
                    eddDay = eddDay - daysArr.nov //Excedeed - Days on that specific month
                    eddMonth += 1 //Jumped to the next month.
                } else if (eddMonth == 12 && eddDay > daysArr.dec){
                    eddDay = eddDay - daysArr.dec //Excedeed - Days on that specific month
                    eddMonth = 1 //January
                    eddYear += 1 //Year + 1
                }
            break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                eddDay = chosenDay + 7
                eddMonth = chosenMonth - 3
                eddYear = chosenYear + 1
                
                if (eddMonth == 1 && eddDay > daysArr.jan){
                    eddDay = eddDay - daysArr.jan
                    eddMonth += 1
                } else if (eddMonth == 2 && eddDay > daysArr.fev){
                    eddDay = eddDay - daysArr.fev
                    eddMonth += 1
                } else if (eddMonth == 3 && eddDay > daysArr.mar){
                    eddDay = eddDay - daysArr.mar
                    eddMonth += 1
                } else if (eddMonth == 4 && eddDay > daysArr.apr){
                    eddDay = eddDay - daysArr.apr
                    eddMonth += 1
                } else if (eddMonth == 5 && eddDay > daysArr.may){
                    eddDay = eddDay - daysArr.may
                    eddMonth += 1
                } else if (eddMonth == 6 && eddDay > daysArr.jun){
                    eddDay = eddDay - daysArr.jun
                    eddMonth += 1
                } else if (eddMonth == 7 && eddDay > daysArr.jul){
                    eddDay = eddDay - daysArr.jul
                    eddMonth += 1
                } else if (eddMonth == 8 && eddDay > daysArr.aug){
                    eddDay = eddDay - daysArr.aug
                    eddMonth += 1
                } else if (eddMonth == 9 && eddDay > daysArr.sep){
                    eddDay = eddDay - daysArr.sep
                    eddMonth += 1
                }
            break;
        }

        //Writes the EDD result to DOM based on the LMP.
        document.querySelector(".eddResClass").innerText = `${eddMonth.toString().padStart(2,"0")}/${eddDay.toString().padStart(2,"0")}/${eddYear}`

        //Changes the CSS for the Results
        renderResults(".gaResClass")
        renderResults(".eddResClass")
    }
})