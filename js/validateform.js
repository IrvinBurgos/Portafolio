// variables
const form = document.getElementById("form");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const send = document.getElementById("send");
const regExPhone = /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){2}\d{3}|(\d{2}[\*\.\-\s]){3}\d{2}|(\d{4}[\*\.\-\s]){1}\d{4})|\d{8}|\d{10}|\d{12}$/;
const regExgMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const loadersContainer = document.getElementById("contact__loaders");

// creando elemento mensaje del spinner gif
const spinnerMessage = document.createElement("p");
spinnerMessage.classList.add("contact__message");
spinnerMessage.textContent = "Cargando...";
loadersContainer.appendChild(spinnerMessage);
spinnerMessage.style.display = "none";

// creando elemento spinner gif con sus atributos
const spinnerGif = document.createElement("img");
spinnerGif.src = "images/contact/spinner.webp";
spinnerGif.classList.add("contact__gif");
spinnerGif.alt = "Imagen gif cargando";
loadersContainer.appendChild(spinnerGif);
spinnerGif.style.display = "none";

// eventos
const eventListeners = () =>
{
    form.addEventListener("submit",sendForm,false);
}

document.addEventListener("DOMContentLoaded",eventListeners,false);

// funciones
const validateInputs = () =>
{   
    if(name.value == "")
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el campo nombre no debe ir vacío",
            onAfterClose: () => 
            {
                setTimeout(() => name.focus(), 100)
            }
        });

        return false;
    }
    else if(phone.value == "")
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el campo teléfono no debe ir vacío",
            onAfterClose: () => 
            {
                setTimeout(() => phone.focus(), 100)
            }
        });

        return false;
    }
    else if(!regExPhone.test(phone.value))
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el teléfono no es válido",
            onAfterClose: () => 
            {
                setTimeout(() => phone.focus(), 100)
            }
        });

        return false;
    }
    else if(email.value == "")
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el campo correo no debe ir vacío",
            onAfterClose: () => 
            {
                setTimeout(() => email.focus(), 100)
            }
        });

        return false;
    }
    else if(!regExgMail.test(email.value))
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el correo no es válido",
            onAfterClose: () => 
            {
                setTimeout(() => email.focus(), 100)
            }
        });

        return false;
    }
    else if(subject.value == "")
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el campo asunto no debe ir vacío",
            onAfterClose: () =>
            {
                setTimeout(() => subject.focus(), 100)
            }
        });

        return false;
    }
    else if(message.value == "")
    {
        Swal.fire({
            type: "error",
            title: "ERROR",
            text: "el campo mensaje no debe ir vacío",
            onAfterClose: () => 
            {
                setTimeout(() => message.focus(), 100)
            }
        });

        return false;
    }
    else 
    {
        // mostrar mensaje y spinner gif
        spinnerMessage.style.display = "block";
        spinnerGif.style.display = "block";

        //petición con ajax
        let formData = $("#form");
        let loadersContainer = $("#contact__loaders");

         $.ajax({
            type: "POST",
            url: "sendMail.php",
            data: formData.serialize(),
            success: (response) => 
            {
                loadersContainer.html(response);
                formData[0].reset();
                send.remove();
            },
            error: () => 
            {
                console.log('Error en la petición');
            }
        });
    }
}

const sendForm = (e) =>
{
    // detiene la carga de la página 
    e.preventDefault();

    validateInputs();
}