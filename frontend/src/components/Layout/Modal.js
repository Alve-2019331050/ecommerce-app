import { CloseButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function MyModal(props) {

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
            <CloseButton onClick={()=>props.setShowModal(false)}/>
        </Modal.Header>

        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default MyModal;