import { TOAST_TYPE } from "../consts.js";
class ToastView {
    toast;
    toastContainer = document.querySelector('#toastContainer');
    toastBody = this.toastContainer.querySelector('.toast-body');
    constructor() {
        this.toast = new bootstrap.Toast('#toastContainer');
    }
    show(message, type = TOAST_TYPE.SUCCESS) {
        this.toastBody.textContent = message;
        this.toastContainer.classList.remove('bg-success', 'bg-danger');
        this.toastContainer.classList.add(`bg-${type}`);
        this.toast.show();
    }
}
export default new ToastView;
