import { AxiosError } from "axios"

export class RCException {

    constructor(error) {
        this.handleError(error)
    }

    handleError(error) {
        if (error instanceof AxiosError) {
            this.handleAxiosError(error)
        }
    }

    handleAxiosError(error) {
        this.status = error.status
        this.message = error.response.data.detail
    }
}
export class Dialogs {
    static showAlert(error) {
        const err = new RCException(error)
        alert(err.message)

    }
}
