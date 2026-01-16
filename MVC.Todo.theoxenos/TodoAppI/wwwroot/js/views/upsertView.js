class UpsertView {
    confirmButton;
    modal;
    completedInput;
    nameInput;
    titleHeader;
    todoInputId;
    onModalSubmitted;
    constructor() {
        this.confirmButton = document.querySelector('#upsertModalSubmit');
        this.modal = new bootstrap.Modal('#upsertModal');
        this.completedInput = document.querySelector('#todo-completed');
        this.nameInput = document.querySelector('#todo-name');
        this.titleHeader = document.querySelector('#upsertLabel');
        this.todoInputId = document.querySelector('#todo-id');
        this.confirmButton.onclick = () => this.handleConfirm();
    }
    formatTitle(modalType) {
        return `${modalType} Todo`;
    }
    setFormData(todo) {
        if (todo) {
            this.nameInput.value = todo.name;
            this.todoInputId.value = String(todo.id);
            this.completedInput.checked = todo.completed;
        }
        else {
            this.nameInput.value = '';
            this.todoInputId.value = '';
            this.completedInput.checked = false;
        }
    }
    show(todo) {
        this.titleHeader.innerText = this.formatTitle(todo ? 'Update' : 'Create');
        this.modal.show();
        this.setFormData(todo);
    }
    handleConfirm() {
        this.modal.hide();
        this.onModalSubmitted?.({
            name: this.nameInput.value.trim(),
            id: this.todoInputId.value ? Number(this.todoInputId.value) : undefined,
            completed: this.completedInput.checked
        });
    }
}
export default new UpsertView();
