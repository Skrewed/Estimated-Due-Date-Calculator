var eddDay, eddMonth, eddYear

function renderResults(divClass){
    document.querySelector(divClass).style.color = '#474747'
    document.querySelector(divClass).style.fontSize = '1rem'
    document.querySelector(divClass).style.fontWeight = '800'
    document.querySelector(divClass).style.fontStyle = 'normal'
}

//Listen to btn-calc click and returns the calculation
document.querySelector(".btn-calc").addEventListener('click', function (){
    eddDay = document.querySelector('.dayClass').value
    eddMonth = document.querySelector('.monthClass').value
    eddYear = document.querySelector('.yearClass').value

    if (eddDay.length == 1) {
        eddDay = "0" + eddDay
    }

    if (eddMonth.length == 1) {
        eddMonth = "0" + eddMonth
    }

    if (eddDay == 0 || eddMonth == 0 || eddYear == 0){
        alert(`You need to select a Date.`);
    } else {
        // alert(`Day: ${eddDay}\nMonth: ${eddMonth}\nYear: ${eddYear}`);

        //Writes the GA based on the LMP.
        document.querySelector(".gaResClass").innerText = `${Number(eddDay)} weeks and ${Number(eddMonth)} days.`
        renderResults(".gaResClass")

        //Writes the EDD based on the LMP.
        document.querySelector(".eddResClass").innerText = `${eddMonth}/${eddDay}/${eddYear}`
        renderResults(".eddResClass")
    }

})