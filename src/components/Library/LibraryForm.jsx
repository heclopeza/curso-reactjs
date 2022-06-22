import {useEffect, useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import LibraryFormValidation from '../../validations/LibraryFormValidation';
import useUpdateBook from '../../hooks/UseUpdateBook';
import AlertManagement from '../../commons/AlertManagement';
import Constants from '../../commons/Constants';

const { UPDATE_BOOK_WARNING_MSG } = Constants()

const LibraryForm = (props) =>{
    const { warning } = AlertManagement();

    const [id, setId] = useState(null);
    const [isbn, setIsbn] = useState('');
    const [titulo, setTitulo] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [autor, setAutor] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [editorial, setEditorial] = useState('');
    const [edicion, setEdicion] = useState('');
    const [numPaginas, setNumPaginas] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estatusSelect, setEstatusSelect] = useState('ACTIVO');
    const [file, setFile] = useState({});

    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);

    function createBook(book){
        setId(book.id);
        setIsbn(book.isbn);
        setTitulo(book.titulo);
        setCiudad(book.ciudad);
        setAutor(book.autor);
        setPublicationDate(book.publicationDate);
        setEditorial(book.editorial);
        setEdicion(book.edicion);
        setNumPaginas(book.numPaginas);
        setDescripcion(book.descripcion);
        setEstatusSelect(book.estatusSelect);
        setFile(book.file);
    }

    useEffect(()=>{ //Sirve para controlar el ciclado de peticiones.
        if(props.updateBook){
            createBook(props.updateBook);
        }
    },[props.updateBook]);

    const handleSave = () => {
        let book = {
            isbn,
            titulo,
            ciudad,
            autor,
            publicationDate,
            editorial,
            edicion,
            numPaginas,
            descripcion,
            estatusSelect,
            file
        }
        const libraryValidations = LibraryFormValidation(book);
        setErrors(libraryValidations);
        if(Object.keys(libraryValidations).length>0){
            props.setOptionsAlert(warning(UPDATE_BOOK_WARNING_MSG));
            setValidated(true);
        }else{
            props.handleSaveBook(book);
            //props.handleSaveBook({...book,id: uuidv4()});
            limpiarForm();
        }
    }

    const handleUpdate = ()=>{
        let book = {
            id,
            isbn,
            titulo,
            ciudad,
            autor,
            publicationDate,
            editorial,
            edicion,
            numPaginas,
            descripcion,
            estatusSelect,
            file
        }
        const libraryValidations = LibraryFormValidation(book);
        setErrors(libraryValidations);
        if(Object.keys(libraryValidations).length>0){
            setValidated(true);
            props.setOptionsAlert(warning(UPDATE_BOOK_WARNING_MSG));
        }else{
            props.handlUpdateBook(book);
            limpiarForm();
        }
    }

    const {setIsUpdated} = useUpdateBook(handleUpdate);

    const limpiarForm = ()=>{
        setId('');
        setIsbn('');
        setTitulo('');
        setCiudad('');
        setAutor('');
        setPublicationDate('');
        setEditorial('');
        setEdicion('');
        setNumPaginas('');
        setDescripcion('');
        setEstatusSelect('ACTIVO');
        setFile(null);
    }

    return (
        <>
            <Form noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="isbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" 
                        value = {isbn}
                        onChange={e => setIsbn(e.target.value)} 
                        placeholder="Introduce ISBN"
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.isbn}
                        </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" 
                        value = {titulo} 
                        onChange={e => setTitulo(e.target.value)} 
                        placeholder="Introduce título"
                        required
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.titulo}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="ciudad">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control type="text" 
                        value = {ciudad} 
                        onChange={e => setCiudad(e.target.value)} 
                        placeholder="Introduce ciudad"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.ciudad}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="autor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text"
                        value = {autor} 
                        onChange={e => setAutor(e.target.value)} 
                        placeholder="Introduce autor"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.autor}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="publicationDate">
                    <Form.Label>Año de publicación</Form.Label>
                    <Form.Control type="number" 
                        value = {publicationDate} 
                        onChange={e => setPublicationDate(e.target.value)} 
                        placeholder="Introduce Año de publicación"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.publicationDate}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editorial">
                    <Form.Label>Editorial</Form.Label>
                    <Form.Control type="text" 
                        value = {editorial} 
                        onChange={e => setEditorial(e.target.value)} 
                        placeholder="Introduce editorial"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.editorial}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="edicion">
                    <Form.Label>Edición</Form.Label>
                    <Form.Control type="number" 
                        value = {edicion} 
                        onChange={e => setEdicion(e.target.value)} 
                        placeholder="Introduce número de edición"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.edicion}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numPaginas">
                    <Form.Label>No. Páginas</Form.Label>
                    <Form.Control type="number" 
                        value = {numPaginas} 
                        onChange={e => setNumPaginas(e.target.value)} 
                        placeholder="Introduce número de páginas"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.numPaginas}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" 
                        value = {descripcion} 
                        onChange={e => setDescripcion(e.target.value)} 
                        placeholder="Introduce descripción"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.descripcion}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="estatusSelect">
                    <Form.Select aria-label="Selecciona el estado del libro" 
                        value = {estatusSelect}
                        onChange={e => setEstatusSelect(e.target.value)}
                        required>
                        <option>Selecciona el estatus</option>
                        <option value="ACTIVO">Activo</option>
                        <option value="INACTIVO">Inactivo</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {errors.estatusSelect}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="file" className="mb-3">
                    <Form.Label>Imagen de portada</Form.Label>
                    <Form.Control type="file" onChange={e => setFile(e.target.files[0])}/>
                </Form.Group>

                {
                    (id)
                    ? (
                        <Button variant="primary" type="button" onClick={()=>setIsUpdated(true)}>
                            Actualizar
                        </Button>
                    )
                    : (
                        <Button variant="primary" type="button" onClick={()=>handleSave()}>
                            Guardar
                        </Button>
                    )
                }
                {' '}
                <Button variant="dark" type="button" onClick={()=>props.setShow(false)}>
                    Cancelar
                </Button>
            </Form>
        </>
    )
}

export default LibraryForm;