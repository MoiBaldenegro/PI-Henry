// Esta función llamada 'validation' se encarga de validar los campos de 'email' y 'password'
// en el formulario y actualizar el estado de 'errors' con los mensajes de error apropiados.

const newvalidation = (form, errors, setErrors) => {
  // Validación para el campo 'Nombre'
  let nombreError = "";
  if (!form.name) {
    nombreError = "Por favor completa este campo";
  } else if (form.name.length > 50) {
    nombreError = "No puede exceder los 50 caracteres";
  } else nombreError = "";

  // Validación para el campo 'Imagen (URL)'
  let imagenError = "";
  if (!form.image) {
    imagenError = "Por favor completa este campo";
  } else if (!/^https?:\/\/\S+$/.test(form.image)) {
    imagenError = "URL de imagen inválida";
  } else imagenError = "";

  // Validación para el campo 'Descripción'
  let descripcionError = "";
  if (!form.description) {
    descripcionError = "Por favor completa este campo";
  } else if (form.description.length < 20) {
    descripcionError = "No puede ser menor de 20 caracteres";
  } else if (form.description.length > 500) {
    descripcionError = "No puede exceder los 500 caracteres";
  } else descripcionError = "";

  // Validación para el campo 'Plataformas'
  let plataformasError = "";
  if (!form.platforms) {
    plataformasError = "Por favor completa este campo";
  } else plataformasError = "";

  // Validación para el campo 'Fecha de lanzamiento'
  let lanzamientoError = "";
  if (!form.releasedate) {
    lanzamientoError = "Por favor selecciona una fecha";
  } else lanzamientoError = "";

  // Validación para el campo 'Rating'
  let ratingError = "";
  if (!form.rating) {
    ratingError = "Por favor ingresa un valor de rating";
  } else if (form.rating < 0 || form.rating > 5) {
    ratingError = "El rating debe ser un número entre 0 y 5";
  } else ratingError = "";

  // Validación para el campo 'Genres'
  let generosError = "";
  if (!form.generos || form.generos.length === 0) {
    generosError = "Por favor selecciona al menos un género";
  }

  // Actualizar el estado de 'errors' con los mensajes de error correspondientes
  setErrors({
    name: nombreError,
    image: imagenError,
    description: descripcionError,
    platforms: plataformasError,
    releasedate: lanzamientoError,
    rating: ratingError,
    genres: generosError,
  });
};

export default newvalidation;
