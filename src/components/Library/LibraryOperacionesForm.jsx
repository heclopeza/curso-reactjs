import { useState, useEffect } from "react";
import { Badge, Button,Table } from "react-bootstrap";
import Constants from "../../commons/Constants";

const {OPERACION_DETALLES,OPERACION_PRESTAMOS} = Constants();

const LibraryOperacionesForm = ({book,setShowPrestar,handlePrestar,users,operacion})=>{
    const [userSelect, setUserSelect] = useState('0');
    const handlePrestamoLibro = (book)=>{
        handlePrestar(book, userSelect);
        setShowPrestar(false);
    }

    return (
        <>
            <Table striped>
                <tbody>
                    <tr>
                        <td>
                            <img 
                                width='100' 
                                src={book.file?
                                        (`data:${book.file.fileType};base64, ${book.file.file}`):
                                        ''}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ISBN: {book.isbn}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Titulo: {book.titulo}
                        </td>
                    </tr>
                    {
                        (operacion===OPERACION_DETALLES || (operacion===OPERACION_PRESTAMOS &&!book.takenBy))
                        ?
                        <>
                            <tr>
                                <td>
                                    Autor: {book.autor}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Editorial: {book.editorial}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Edición: {book.edicion}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Fecha de publicación: {book.publicationDate}
                                </td>
                            </tr>
                            {
                                (operacion===OPERACION_DETALLES)
                                ?
                                <>
                                    <tr>
                                        <td>
                                            Ciudad: {book.ciudad}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Número de páginas: {book.numPaginas}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {
                                                (book.takenBy)
                                                    ?<Badge bg="warning">Prestado</Badge>
                                                    :<Badge bg="success">Disponible</Badge>
                                            }
                                        </td>
                                    </tr>
                                    {
                                        (book.takenBy)
                                        ?
                                            <tr>
                                                <td>
                                                    Prestado a:<br/>
                                                    {book.takenBy.nombreCompleto.concat(' - ').concat(book.takenBy.id)}
                                                </td>
                                            </tr>
                                        :''
                                    }
                                </>
                                : (operacion===OPERACION_PRESTAMOS && !book.takenBy)
                                    ?
                                    <>
                                        <tr>
                                            <td>
                                                Prestar a usuario
                                                <select name="usuarios" id="selectUser" onChange={(e)=>setUserSelect(e.target.value)}>
                                                <option value="0">Selecciona un usuario</option>
                                                {
                                                    users.map(usr =>{
                                                        return (
                                                            <option key={usr.id} value={usr.id}>{usr.nombreCompleto}</option>
                                                        )
                                                    })
                                                }
                                                </select>
                                            </td>
                                        </tr>
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>
                                                <Badge bg="warning">Prestado</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Prestado a:<br/>
                                                {book.takenBy.nombreCompleto.concat(' - ').concat(book.takenBy.id)}
                                            </td>
                                        </tr>
                                    </>
                            }
                        </>
                        :''
                    }
                </tbody>
            </Table>
            {
                (operacion!==OPERACION_DETALLES)
                ?
                    <Button variant="primary" type="button" onClick={()=>handlePrestamoLibro(book)}>
                        Aceptar
                    </Button>
                :''
            }
            {' '}
            <Button variant="dark" type="button" onClick={()=>setShowPrestar(false)}>
                Cerrar
            </Button>

        </>
    )
}

export default LibraryOperacionesForm;