const LibraryFormValidation = (book) =>{
    let errorValidations = {}
    if(!book.isbn)
        errorValidations.isbn = construyeError('ISBN');
    if(!book.titulo)
        errorValidations.titulo = construyeError('titulo');
    if(!book.ciudad)
        errorValidations.ciudad = construyeError('ciudad');
    if(!book.autor)
        errorValidations.autor = construyeError('autor');
    if(!book.publicationDate)
        errorValidations.publicationDate = construyeError('publicationDate');
    if(!book.editorial)
        errorValidations.editorial = construyeError('editorial');
    if(!book.edicion)
        errorValidations.edicion = construyeError('edicion');
    if(!book.numPaginas)
        errorValidations.numPaginas = construyeError('numPaginas');
    if(!book.estatusSelect)
        errorValidations.estatusSelect = construyeError('estatusSelect');
    return errorValidations;
}

const construyeError = (campo)=>{
    return `El campo ${campo} está vacío`;
}

export default LibraryFormValidation;