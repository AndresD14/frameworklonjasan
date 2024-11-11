//Definir Variables
let minValue = document.getElementById("min_value");
let maxValue = document.getElementById("max_value");
let minPrice_I = document.getElementById("min_value_input");
let maxPrice_I = document.getElementById("max_value_input");

const rangeFill = document.querySelector(".range_fill");

//Funcion validar Rango y actualizar el Color en Slider
function validateRange() {
    let minPrice = parseInt(minPrice_I.value);
    let maxPrice = parseInt(maxPrice_I.value);

    //Intercambiar valores si minPrice es mayor
    if(minPrice > maxPrice) {
        let tempValue = maxPrice;
        maxPrice = minPrice;
        minPrice = tempValue;
    }

    //Calcular % de color entre Min y Max
    const minPercentage = ((minPrice - 10) /490) *100;
    const maxPercentage = ((maxPrice - 10) /490) *100;

    //Rellenar color del Rango
    rangeFill.style.left = minPercentage + "%";
    rangeFill.style.width = maxPercentage - minPercentage + "%";

    //Actualizar los valores de precio
    minValue.innerHTML = "$" + minPrice;
    maxValue.innerHTML = "$" + maxPrice;
}

//Obtener referencias para los elementos de entrada
const inputElements = document.querySelectorAll("input")

//Desplegar Slider
function DisplaySlider() {
    document.getElementById("slider_dropdwn").classList.toggle("show");
    console.log("Click");
}

//Eventos
inputElements.forEach((element) => {
    element.addEventListener("input", validateRange);
});

//Inicializar color del Slider
validateRange();