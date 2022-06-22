import { Alert } from "react-bootstrap"

const AlertMessage = ({ optionsAlert, setOptionsAlert }) => {

    const handleClose = () => {
        setOptionsAlert({
            ...optionsAlert,
            alertShow: false
        })
    }
    return (
        <>
            <Alert 
                show={optionsAlert.alertShow}
                variant={optionsAlert.variant}
                className="position-fixed-message"
                onClose={() => handleClose(false)}
                dismissible>
                {optionsAlert.message}
            </Alert>
        </>
    )
}

export default AlertMessage