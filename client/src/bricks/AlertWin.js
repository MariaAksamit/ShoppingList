import { Alert } from 'react-bootstrap';

function AlertWin({showAlert, onClose, varianta, text}) {

  return (
    <>
      <Alert 
        show={showAlert}
        onClose={onClose}
        variant={varianta}
        dismissible
        >
          {text}
      </Alert>
    </>
  );
}

export default AlertWin;