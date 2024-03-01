let tarjetasDestapadas = 0;
let aciertos = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let movimientos = 0;
let temporizador = false;
let primerResultado = null;
let segundoResultado = null;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

//llamar items html
let mostrarMovimiento = document.getElementById("contenedor-movimiento");
let mostrarAciertos = document.getElementById("contenedor-aciertos");
let mostrarTiempo = document.getElementById("contenedor-tiempo");
let reiniciarJuego =document.getElementById('btn-reiniciar');
//num aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//boton reiniciar
let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
})



function contarTiempo() {
  //xq es conteo regresivo
  tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: <span>${timer} </span>`;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      //bloquear tarjetas y mostrar tarjetas
      bloquearTarjetas();
    }
  }, 1000);}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  } }

  function destapar(id) {
    if (temporizador == false) {
      contarTiempo();
      temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
      //mostrar el primer numero
      tarjeta1 = document.getElementById(id);
      primerResultado = numeros[id];
      tarjeta1.innerHTML = primerResultado;
      //desabilitar carta
      tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
      tarjeta2 = document.getElementById(id);
      segundoResultado = numeros[id];
      tarjeta2.innerHTML = segundoResultado;
      //desabilitar carta
      tarjeta2.disabled = true;
      //incrementar movimiento
      movimientos++;
      mostrarMovimiento.innerHTML = ` Movimientos : <br><span> ${movimientos}</span> `;

      if (primerResultado == segundoResultado) {
        tarjetasDestapadas = 0;
        // aumentar aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: <span > ${aciertos} `;

        if (aciertos == 8) {
            clearInterval(tiempoRegresivo);
        mostrarAciertos.innerHTML = ` Aciertos: <span > ${aciertos} 😎 `;
        mostrarTiempo.innerHTML=`<span> Felicidades ! solo demoraste ${timerInicial - timer} segundos!!`;
        mostrarMovimiento.innerHTML = `Movimientos: <span> ${movimientos} 🤩`;
        }
      } else {
        //mostrar momentaneamiente y ocultar carta

        setTimeout(() => {
          tarjeta1.innerHTML = " "; //tarjeta seleccionada en vacio si no son iguales
          tarjeta2.innerHTML = " ";
          tarjeta1.disabled = false;
          tarjeta2.disabled = false; //desaparece el dato para seleccionar otro
          tarjetasDestapadas = 0;
        }, 800); //0.8 segundos de espera para vaciar todo
      }
    }
  }




