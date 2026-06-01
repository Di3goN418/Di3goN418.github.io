function actualizarCountdown() {
    const fechaActual = new Date();

    fechaActual.getFullYear();

    // const fechaFinal = new Date(`June 27, 2026 18:00:00` );
    // New Date(año, mes 0-11, dia, horas, minutos, segundos)
    const fechaFinal = new Date(2026, 5, 27, 17, 0, 0);

    // diferencia total entre la fecha final y la fecha actual
    const diferencia = fechaFinal - fechaActual;

    if(diferencia <= 0) {
        document.querySelector('.countdown').innerHTML = '';
        clearInterval(intervalo);
        return;
    }

    // obtener dias y mes en milisegundos 
    const dias = Math.floor(diferencia / (1000 * 60 * 60 *24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 *24))/(1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60 ))/(1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60))/(1000));


    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;

}


const intervalo = setInterval(actualizarCountdown, 1000);
