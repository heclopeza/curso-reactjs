import { useState } from 'react';
import {Table,Button} from 'react-bootstrap';
import DeleteConfirmationForm from './DeleteConfirmationForm';
import UserService from '../../services/UserService';
import Constants from '../../commons/Constants';

const {OPERACION_DETALLES,OPERACION_PRESTAMOS} = Constants();

const LibraryList = ({books,selectUpdateBook,handleDeleteHook,setShowPrestar,setBookPrestar,setOperacion}) =>{                       
    const [show, setShow] = useState(false);

    const handleClose = ()=>setShow(false);
    const handleShow = ()=>setShow(true);
    const [book, setBook] = useState({});
    
    const deleteBook = (book)=>{
        setBook(book);
        handleShow();
    }

    const deleteBookConfirmation = ()=>{
        handleDeleteHook(book.id);
        handleClose();
    }

    const selectBookDetails = async (book)=>{
        setOperacion(OPERACION_DETALLES);
        setBookPrestar(await datosTakenBy(book));
        setShowPrestar(true);
    }

    const selectBookPrestamo = async (book)=>{
        setOperacion(OPERACION_PRESTAMOS);
        setBookPrestar(await datosTakenBy(book));
        setShowPrestar(true);
    }

    const datosTakenBy = async (book)=>{
        if(book.takenBy&&!book.takenBy.id){
            const {findUserById} = UserService();
            const userTakenBy = await findUserById(book.takenBy);
            const newBook2 = {...book,takenBy:{
                id:userTakenBy.id,
                nombreCompleto:userTakenBy.nombreCompleto
            }};
            return newBook2;
        }else{
            return book;
        }
    }

    return (
        <>
            <DeleteConfirmationForm show={show} handleClose={handleClose} book={book} deleteBookConfirmation={deleteBookConfirmation}/>
            <Table striped>
                <thead>
                    <tr>
                    <th>isbn</th>
                    <th>Titulo</th>
                    <th>Author</th>
                    <th>Editorial</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => {
                            return (
                                <tr key={book.id}>
                                    <td>
                                        {book.isbn}
                                    </td>
                                    <td>
                                        <img 
                                            width='100' 
                                            src={book.file?
                                                    (`data:${book.file.fileType};base64, ${book.file.file}`):
                                                    ''}
                                        />
                                    </td>
                                    <td>
                                        {book.titulo}
                                    </td>
                                    <td>
                                        {book.autor}
                                    </td>
                                    <td>
                                        {book.editorial}
                                    </td>
                                    <td>
                                        <Button variant="secondary" size='sm' onClick={()=>selectUpdateBook(book)}>Editar</Button>
                                        {'  '}
                                        <Button variant="danger" size='sm' onClick={()=>deleteBook(book)}>Eliminar</Button>
                                        {'  '}
                                        {
                                            (book.takenBy)
                                                ?<Button variant="success" size='sm' onClick={()=>selectBookPrestamo(book)}>Devolver</Button>
                                                :<Button variant="success" size='sm' onClick={()=>selectBookPrestamo(book)}>Prestar</Button>
                                        }
                                        {'  '}
                                        <Button variant="primary" size='sm' onClick={()=>selectBookDetails(book)}>Detalles</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default LibraryList;