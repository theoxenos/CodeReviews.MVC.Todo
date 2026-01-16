class DeleteView {
    modal;
    confirmButton;
    toDeleteId;
    onModalSubmitted;
    constructor() {
        this.modal = new bootstrap.Modal('#deleteModal');
        this.confirmButton = document.querySelector('#deleteModalConfirm');
        this.toDeleteId = null;
        this.confirmButton.onclick = () => this.handleConfirm();
    }
    show(id) {
        this.toDeleteId = id;
        this.modal.show();
    }
    handleConfirm() {
        this.modal.hide();
        if (this.toDeleteId !== null) {
            this.onModalSubmitted?.(this.toDeleteId);
        }
    }
}
export default new DeleteView();
