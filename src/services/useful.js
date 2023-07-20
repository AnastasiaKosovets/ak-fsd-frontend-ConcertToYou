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
                if (value.length < 10 ) {
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

        default:
            console.log("Formato desconocido");
    }
}
