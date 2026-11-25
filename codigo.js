
const texto = document.getElementById("texto");
const generar = document.getElementById("generar");
const descargar = document.getElementById("descargar");
const codigoQR = document.getElementById("codigoQR");
const estado = document.getElementById("estado");

let qrGenerado = false;

// Generar código QR
function generarCodigoQR() {

    const contenido = texto.value.trim();

    if (contenido === "") {
        estado.textContent = "⚠ Escribe un texto o enlace primero.";
        estado.style.color = "#ff6868";
        texto.focus();
        return;
    }

    // Comprobar que la librería esté cargada
    if (typeof QRCode === "undefined") {
        estado.textContent = "Error al cargar la librería QR.";
        estado.style.color = "#ff6868";
        return;
    }

    // Limpiar código anterior
    codigoQR.innerHTML = "";

    // Crear nuevo código QR
    new QRCode(codigoQR, {
        text: contenido,
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    estado.textContent = "✓ ¡Código QR generado correctamente!";
    estado.style.color = "#24e88b";

    descargar.disabled = false;
    qrGenerado = true;
}

// Descargar código QR
function descargarCodigoQR() {

    if (!qrGenerado) {
        return;
    }

    const canvas = codigoQR.querySelector("canvas");

    if (!canvas) {
        estado.textContent = "No se pudo preparar la descarga.";
        estado.style.color = "#ff6868";
        return;
    }

    // Crear imagen PNG
    const enlace = document.createElement("a");

    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "mi-codigo-QR.png";

    enlace.click();

    estado.textContent = "✓ ¡Código QR descargado!";
    estado.style.color = "#24e88b";
}

// Eventos
generar.addEventListener("click", generarCodigoQR);

descargar.addEventListener("click", descargarCodigoQR);

// Generar también al presionar Enter
texto.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        generarCodigoQR();
    }
});
