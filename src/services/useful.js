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
                return "El password debe tener 8 caracteres y contener al menos una letra mayúscula, un número y un carácter especial.";

            }
            return "";

        case "name":

            break;

        default:
            console.log("Formato desconocido");
    }
}

export const inputHandler = ({ target }, state) => {
    let { name, value } = target;
    state((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};