const UserFormValidation = (user) =>{
    let errorValidations = {}
    if(!user.nombreCompleto)
        errorValidations.nombreCompleto = construyeError('nombreCompleto');
    if(!user.correo)
        errorValidations.correo = construyeError('correo');
    if(!user.telefono)
        errorValidations.telefono = construyeError('telefono');
    if(!user.fechaNacimiento)
        errorValidations.fechaNacimiento = construyeError('fechaNacimiento');
    if(!user.direccion)
        errorValidations.direccion = construyeError('direccion');
    if(!user.password)
        errorValidations.password = construyeError('password');
    return errorValidations;
}

const construyeError = (campo)=>{
    return `El campo ${campo} está vacío`;
}

export default UserFormValidation;