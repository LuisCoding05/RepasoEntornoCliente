class Usuario {
    constructor(nombre = "ejemplo", correo = "ejemplo@ejemplo.com", numero = "600900300") {
        this.nombre = nombre;
        this.correo = correo;
        this.numero = numero;
    }
}
const usuario = new Usuario();;

const usuarios = []
const tableBody = document.querySelector('#userTable tbody');
const table = document.getElementById("userTable")
const form = document.getElementById("userForm");
const error = document.getElementById("error")
function validate(name, email, phone) {
    const nameRegEx = /^[a-zA-Z\s]+$/;
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\+34\s?)?(\d{3}\s?\d{3}\s?\d{3})$/;
    if (!nameRegEx.test(name.value)) {error.textContent = 'El nombre solo debe contener letras y espacios.'; return false;};
    if (!emailRegEx.test(email.value)) {error.textContent ='El correo es inválido.'; return false;}
    if (!phoneRegex.test(phone.value)){ error.textContent = 'El teléfono es inválido.'; return false;}
    return true;
}

function updateTable(usuarios) {
    tableBody.innerHTML = ''; // Limpiar la tabla

    usuarios.forEach((usuario, index) => {
        const fila = document.createElement("tr");

        // Columnas de datos
        const nombreColumna = document.createElement("td");
        nombreColumna.textContent = usuario.nombre;
        fila.appendChild(nombreColumna);

        const correoColumna = document.createElement("td");
        correoColumna.textContent = usuario.correo;
        fila.appendChild(correoColumna);

        const numeroColumna = document.createElement("td");
        numeroColumna.textContent = usuario.numero;
        fila.appendChild(numeroColumna);

        // Columna de acciones
        const accionesColumna = document.createElement("td");

        // Botón Editar
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.addEventListener("click", () => modifyUser(index));
        accionesColumna.appendChild(editarBtn);

        // Botón Eliminar
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => removeUser(index));
        accionesColumna.appendChild(eliminarBtn);

        fila.appendChild(accionesColumna);

        tableBody.appendChild(fila);
    });
}



function removeUser(index) {
    // Elimina al usuario del array
    usuarios.splice(index, 1);

    // Actualiza la tabla
    updateTable(usuarios);
}


function modifyUser(index) {
    // Obtener el usuario a editar
    const usuario = usuarios[index];

    // Llenar los campos del formulario con los datos actuales
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");

    nameField.value = usuario.nombre;
    emailField.value = usuario.correo;
    phoneField.value = usuario.numero;

    // Cambiar el texto del botón de envío para indicar edición
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = "Actualizar";

    // Agregar un evento temporal para manejar la actualización
    form.onsubmit = (e) => {
        e.preventDefault();

        // Validar los nuevos datos
        if (validate(nameField, emailField, phoneField)) {
            // Actualizar el usuario en el array
            usuarios.splice(index, 1);
            usuarios[index] = new Usuario(nameField.value, emailField.value, phoneField.value);
            // Restablecer el formulario
            form.reset();
            submitButton.textContent = "Añadir";

            // Reiniciar el evento submit a su función original
            form.onsubmit = originalSubmit;

            // Actualizar la tabla
            updateTable(usuarios);
        }
    };
}

// Guardar la referencia original del evento submit
const originalSubmit = form.onsubmit;


function addUser(name, email, phone) {
    const usuario = new Usuario(name.value, email.value, phone.value)
    usuarios.push(usuario);
    updateTable(usuarios);
}

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const validacion = validate(name, email, phone);
    if (validacion) {
        addUser(name, email, phone);
    } else {
        console.error("Hubo algún error en la validación")
    }
});