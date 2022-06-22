import { useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import UseBooks from "../../hooks/useBooks";
import UseUserHooks from "../../hooks/UseUserHooks";
import UsersFormModal from "./UsersFormModal";
import UsersList from "./UsersList";
import usePaginationUserHook from "../../hooks/usePaginationUserHook";
import AlertMessage from "../../commons/AlertMessage";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [optionsAlert, setOptionsAlert] = useState({alertShow: false})
    const [updateUser,setUpdateUser] = useState(null);
    const [show, setShow] = useState(false);
  
    const {handleSaveUser,handleDeleteUserHook,handlUpdateUser,selectUpdateUser} = UseUserHooks(setUsers,users,setUpdateUser,setShow,setOptionsAlert);

    const {items, paginatedUsers} = usePaginationUserHook(users);

    const {books} = UseBooks();
    console.log('books', books);
    
    return (
        
        <>
        <AlertMessage optionsAlert={optionsAlert} setOptionsAlert={setOptionsAlert}/>
        <Container fluid>
            <Row>
                <Col>
                    <UsersFormModal 
                        show={show}
                        setShow={setShow}
                        handleSaveUser={handleSaveUser}
                        updateUser={updateUser}
                        handlUpdateUser={handlUpdateUser}
                        setOptionsAlert={setOptionsAlert}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <UsersList 
                        users={paginatedUsers}
                        selectUpdateUser={selectUpdateUser}
                        handleDeleteUserHook={handleDeleteUserHook}/>
                </Col>
            </Row>
            <Pagination size="sm">{items}</Pagination>
        </Container>        
    </>
    )
}

export default Users;