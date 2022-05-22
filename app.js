var eddDay, eddMonth, eddYear

//Listen to btn-calc click and returns the calculation
document.querySelector(".btn-calc").addEventListener('click', function (){
    eddDay = document.querySelector('.dayClass').value
    eddMonth = document.querySelector('.monthClass').value
    eddYear = document.querySelector('.yearClass').value

    if (eddDay == 0 || eddMonth == 0 || eddYear == 0){
        alert(`You need to select a Date.`);
    } else {
        alert(`Day: ${eddDay}\nMonth: ${eddMonth}\nYear: ${eddYear}`);
    }

    
})