export const checkError = (name, value) => {


    switch (name) {

        case "firstName":

            if (value.length < 2) {
                return "El nombre debe de tener mínimo 2 carácteres"
            }
            return "";

        case "lastName":

            if (value.length < 2) {
                return "El apellido debe de tener mínimo 2 carácteres"
            }
            return "";

        case "email":

            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "E-mail no válido";
            }
            return "";

        case "password":

            if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{}[\]|;:'",.<>/?]).{8,}/.test(value)
            ) {
                return "La contraseña debe tener 8 caracteres y contener al menos una letra mayúscula, un número y un carácter especial.";

            }
            return "";

        case "address":
            if (value.length < 10) {
                return "Formato no válido";
            }
            return "";

        case "document":
            if (!value.length < 8 && !/(?=(?:.*[A-Z]){1,2})/.test(value)) {
                return "Formato de documento no válido";
            }
            return "";


        case "dateOfBirth":
            if (value.length < 10) {
                return "La fecha debe de tener 10 caracteres minimo";
            }
            return "";


        case "phoneNumber":
            if (!/^\d{9}$/.test(value)) {
                return "El número de teléfono incorrecto";
            }
            return "";

        case "groupName":
            if (value.length < 2) {
                return "El nombre del grupo muy corto";
            }
            return "";

        case "genre":

            if (value.length < 3) {
                return "Formato incorrecto"
            }
            return "";

        case "description":

            if (value.length < 20) {
                return "La descripción tiene que ser más larga"
            }
            return "";

        case "musicsNumber":

            const checkNumber = parseInt(value, 10);
            if (isNaN(checkNumber) || checkNumber < 2 || checkNumber > 100) {
                return "Tiene que ser mínimo dos músicos, no se admite texto"
            }
            return "";

        case "image":
            const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

            if (!urlPattern.test(value)) {
                return "Por favor, ingresa una URL válida para la imagen";
            }
            return "";

        case "title":

            if (value.length < 5) {
                return "El título tiene que ser más largo"
            }
            return "";

        case "programm":

            if (value.length < 20) {
                return "El programma tiene que ser más largo"
            }
            return "";

        default:
            console.log("Formato desconocido");
    }


}

export const humanDate = (dbDate) => {
    const date = new Date(dbDate);

    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "EST",
    });
}