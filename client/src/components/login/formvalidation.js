// Esta función llamada 'validation' se encarga de validar los campos de 'email' y 'password'
// en el formulario y actualizar el estado de 'errors' con los mensajes de error apropiados.

const formvalidation = (form, errors, setErrors) => {
  //password
  let passwordError = "";
  if (!form.password) {
    passwordError = "Please fill out this field.";
  } else if (form.password.length < 6 || form.password.length > 16) {
    passwordError = "Invalid password length.";
  } else if (!/\d/.test(form.password)) {
    passwordError = "Must contain at least one number.";
  }

  // Email
  let emailError = "";
  if (!form.email) {
    emailError = "Please fill out this field.";
  } else if (form.email.length > 35) {
    emailError = "Cannot exceed 35 characters.";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{3})+$/.test(form.email)) {
    emailError = "Invalid email.";
  }

  // Actualizar el estado de 'errors' con los mensajes de error correspondientes
  setErrors({
    email: emailError,
    password: passwordError,
  });
};

export default formvalidation;
