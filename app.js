var selectedDate, day, month, year

//Listen to btn-calc click and returns the calculation
document.querySelector(".btn-calc").addEventListener('click', function (){
    if (day == undefined) {
        alert('Selecione uma data.')
    } else {
        alert(`Day: ${day}\nMonth: ${month}\nYear: ${year}`);
    }
})

//Listen to input date change
document.querySelector(".date").addEventListener('change', function(){
    day = this.value.split("-")[2]
    month = this.value.split("-")[1]
    year = this.value.split("-")[0]
})