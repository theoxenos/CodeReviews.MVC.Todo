import elementsService from "../services/elementsService.js";
import { ACTION_TYPE } from "../consts.js";
class MainView {
    addTodoButton;
    todoList;
    onPrevPageClick;
    onNextPageClick;
    prevPageButton;
    onCompleteClick;
    onDeleteClick;
    onUpdateClick;
    onCreateClick;
    nextPageButton;
    currentPageSpan;
    constructor() {
        this.addTodoButton = document.querySelector('#btnAddTodo');
        this.todoList = document.querySelector('#todoList');
        this.prevPageButton = document.querySelector('#prevPage');
        this.nextPageButton = document.querySelector('#nextPage');
        this.currentPageSpan = document.querySelector('#currentPage');
        this.init();
    }
    render(todos, page, totalTodos) {
        this.todoList.innerHTML = '';
        this.todoList.append(...todos.map(elementsService.createTodoItemElement));
        this.currentPageSpan.innerText = page.toString();
        this.prevPageButton.disabled = page === 1;
        this.nextPageButton.disabled = (page * 5) >= totalTodos;
    }
    init() {
        this.todoList.addEventListener('click', (event) => {
            const target = event.target;
            const actionEl = target.closest('[data-action-type]');
            if (!actionEl)
                return;
            const actionType = actionEl.getAttribute('data-action-type');
            const li = actionEl.closest('li');
            if (!li)
                return;
            const todoId = Number(li.getAttribute('data-id'));
            switch (actionType) {
                case ACTION_TYPE.COMPLETE:
                    this.onCompleteClick?.(todoId);
                    break;
                case ACTION_TYPE.DELETE:
                    this.onDeleteClick?.(todoId);
                    break;
                case ACTION_TYPE.UPDATE:
                    this.onUpdateClick?.(todoId);
                    break;
            }
        });
        this.addTodoButton.onclick = () => this.onCreateClick?.();
        this.prevPageButton.onclick = () => this.onPrevPageClick?.();
        this.nextPageButton.onclick = () => this.onNextPageClick?.();
    }
}
export default new MainView();
