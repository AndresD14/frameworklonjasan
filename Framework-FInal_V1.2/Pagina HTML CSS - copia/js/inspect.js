document.oncontextmenu = () => {
    alert("Acción no permitida")
    return false
}

document.onkeydown = e => {
    if(e.key == "F12") {
        alert("Acción no permitida por seguridad")
        return false
    }

    if(e.ctrlKey && e.key == "u") {
        alert("Acción no permitida por seguridad")
        return false
    }
}