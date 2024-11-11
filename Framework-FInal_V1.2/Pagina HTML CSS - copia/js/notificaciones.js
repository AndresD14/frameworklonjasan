// Selecciona el botón para solicitar permiso de notificación
const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', () => {
    Notification.requestPermission().then(resultado => {
        console.log('Respuesta: ', resultado);
    });
});

// Selecciona todos los botones con la clase "card__button"
const verNotificacionButtons = document.querySelectorAll('.card__button');

// Agrega un EventListener a cada botón de notificación
verNotificacionButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            const notificacion = new Notification('LONJASAN', {
                icon: 'img/logoLonjasan.svg',
                body: 'Cuando este inmueble esté disponible se le notificará'
            });

            notificacion.onclick = function () {
                window.open('indexInmuebles.html');
            };
        }
    });
});
