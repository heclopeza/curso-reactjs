import {Modal} from 'react-bootstrap';
import LibraryOperacionesForm from './LibraryOperacionesForm';
import Constants from '../../commons/Constants';

const {OPERACION_DETALLES,OPERACION_PRESTAMOS,OPERACION_DEVOLUCIONES} = Constants();

const LibraryOperacionesFormModal = ({showPrestar,setShowPrestar,bookPrestar,handlePrestar,users,operacion})=>{
    return (
      <>
        <Modal
          show={showPrestar}
          onHide={()=>setShowPrestar(false)}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {
                (operacion===OPERACION_DETALLES)
                ?OPERACION_DETALLES
                :(bookPrestar&&bookPrestar.takenBy)
                  ?OPERACION_DEVOLUCIONES
                  :OPERACION_PRESTAMOS}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <LibraryOperacionesForm
                  book={bookPrestar}
                  setShowPrestar={setShowPrestar}
                  handlePrestar={handlePrestar}
                  users={users}
                  operacion={operacion}
                  />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default LibraryOperacionesFormModal;