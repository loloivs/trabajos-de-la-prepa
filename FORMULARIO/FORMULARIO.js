document.addEventListener("DOMContentLoaded", function () { //gracias a esta línea de código podemos esperar que el HTML se cargue perfectamente en el navegador ante de comenzar a manipular el javascript

  const form = document.getElementById("formulario"); //obtener form

  form.addEventListener("submit", function (event) { 
    event.preventDefault(); //evito recarga

    console.log("¡Form submitted"); //utilizo console.log para que me de avisos de qué es lo que sucede dentro de mi js y poder checarlo sea el la consola de mi navegador o en la terminal

    const NOMBRE = document.getElementById("NOMBRE").value;
    const EDAD= document.getElementById("EDAD").value;
    const CORREO = document.getElementById("CORREO").value;
    const TELEFONO = document.getElementById("TELEFONO").value;
    const CARRERA = document.getElementById("CARRERA").value;

    console.log("¡BEFORE FETCH! put attention");

    fetch("/api/solicitudes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        NOMBRE,
        EDAD,
        CORREO,
        TELEFONO,
        CARRERA
      })
    })
    .then(res => res.text())//convertir respuestas en texto
    .then(data => console.log("Respuesta:", data))//ahora que se tienen los textos se van a mostrar
    .catch(err => console.error("ERROR:", err));//captura los errores que pueden llegar a pasar
  });

});