import LibraryList from './LibraryList';
import LibraryFormModal from './LibraryFormModal';
import {Container,Row,Col, Alert} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import '../../styles/alertStyles.css';
import UseBookHooks from '../../hooks/UseBookHooks';
import AlertMessage from '../../commons/AlertMessage'

import Pagination from 'react-bootstrap/Pagination';
import usePaginationHook from '../../hooks/usePaginationHook';
import LibraryOperacionesFormModal from './LibraryOperacionesFormModal';
import UseContextUsers from '../../hooks/UseContextUsers';

const Library_success_message = 'El libro se guardó con éxito';
const Library_warning_message = 'El libro NO se guardó con éxito';

const Library = () =>{
    const [books, setBooks] = useState([]);
    const [optionsAlert, setOptionsAlert] = useState({alertShow: false})
    const [updateBook,setUpdateBook] = useState(null);
    const [show, setShow] = useState(false);

    const [showPrestar, setShowPrestar] = useState(false);
    const [bookPrestar, setBookPrestar] = useState(null);
    const [operacion, setOperacion] = useState('');

    const {users} = UseContextUsers();

    useEffect(()=>{ //Sirve para controlar el ciclado de peticiones.
    },[bookPrestar,operacion]);

    const {handleSaveBook,handleDeleteHook,handlUpdateBook,selectUpdateBook,handlePrestar} = 
        UseBookHooks(setBooks,books,setUpdateBook,setShow,setOptionsAlert,setShowPrestar);

    const {items, paginatedBooks} = usePaginationHook(books)

    return (
        <>
            <AlertMessage optionsAlert={optionsAlert} setOptionsAlert={setOptionsAlert}/>
            <Container fluid>
                <Row>
                    <Col>
                        <LibraryFormModal 
                            show={show}
                            setShow={setShow}
                            handleSaveBook={handleSaveBook}
                            updateBook={updateBook}
                            handlUpdateBook={handlUpdateBook}
                            setOptionsAlert={setOptionsAlert}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LibraryOperacionesFormModal 
                            showPrestar={showPrestar}
                            setShowPrestar={setShowPrestar}
                            bookPrestar={bookPrestar}
                            handlePrestar={handlePrestar}
                            users={users}
                            operacion={operacion}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LibraryList 
                            books={paginatedBooks}
                            setShow={setShow}
                            selectUpdateBook={selectUpdateBook}
                            setBooks={setBooks}
                            handleDeleteHook={handleDeleteHook}
                            setShowPrestar={setShowPrestar}
                            setBookPrestar={setBookPrestar}
                            setOperacion={setOperacion}/>
                    </Col>
                </Row>
                <Pagination size="sm">{items}</Pagination>
            </Container>
        </>
    )
}

export default Library;