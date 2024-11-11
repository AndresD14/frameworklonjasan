function cambiarImagen() {
    // 1 - Obtenemos la fecha actual, día y hora
    let date = new Date(),
        currentNumberDay = date.getUTCDay(), // Obtiene el día de la semana (1 - Lunes, 6 - Sábado)
        currentHourDay = date.getUTCHours(); // Obtiene la hora del día (0-23)

    // 2 - Declaramos un objeto con una propiedad por día
    const customImagesPC = {
        "0": ["./img/img_picoyplaca/num1-2.jpg"],
        "1": ["./img/img_picoyplaca/num3-4.jpg"],
        "2": ["./img/img_picoyplaca/num5-6.jpg"],
        "3": ["./img/img_picoyplaca/num7-8.jpg"],
        "4": ["./img/img_picoyplaca/num9-0.jpg"],
        "5": ["./img/img_picoyplaca/num1-2.jpg"],
        "6": ["./img/img_picoyplaca/num3-4.jpg"],
    };

    // 3 - Función para obtener la imagen basada en el día
    const getImage = (numberDay) => {
        return customImagesPC[numberDay][0]; // Siempre selecciona la primera imagen
    };

    // 4 - Establecer la imagen actual
    const setImage = () => {
        const imageUrl = getImage(currentNumberDay); // Obtiene la URL de la imagen
        document.getElementById("picoyplaca").src = imageUrl; // Cambia la imagen
        console.log(`Imagen cambiada: ${imageUrl}`); // Para verificar en consola
    };

    // 5 - Cambiar la imagen cada 60 segundos (60000 ms)
    setImage();
    setInterval(setImage, 60000);
}

// Ejecutar la función al cargar la página
cambiarImagen();
