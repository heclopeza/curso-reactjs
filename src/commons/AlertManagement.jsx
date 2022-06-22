const AlertManagement = () => {

    const success = (message) => {
        return {
            variant: 'success',
            message: message,
            alertShow: true
        }
    }

    const warning = (message) => {
        return {
            variant: 'warning',
            message: message,
            alertShow: true
        }
    }

    const error = (message) => {
        return {
            variant: 'danger',
            message: message,
            alertShow: true
        }
    }

    return {success, warning, error};
}
 
export default AlertManagement;