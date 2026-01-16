import todosApiService from '../services/todosApiService.js';
import mainView from '../views/mainView.js';
import deleteView from '../views/deleteView.js';
import upsertView from '../views/upsertView.js';
import toastView from '../views/toastView.js';
import { TOAST_TYPE } from "../consts.js";
class TodoController {
    todos;
    currentPage;
    pageSize = 5;
    constructor() {
        this.todos = [];
        this.currentPage = 1;
    }
    async init() {
        mainView.onDeleteClick = (id) => this.handleDeleteClick(id);
        mainView.onCreateClick = () => this.handleCreateClick();
        mainView.onUpdateClick = (id) => this.handleUpdateClick(id);
        mainView.onCompleteClick = (id) => this.handleToggleComplete(id);
        mainView.onPrevPageClick = () => this.handlePrevPage();
        mainView.onNextPageClick = () => this.handleNextPage();
        deleteView.onModalSubmitted = (id) => this.handleDeleteConfirm(id);
        upsertView.onModalSubmitted = (todoData) => this.handleUpsertConfirm(todoData);
        await this.loadTodos();
    }
    async loadTodos() {
        try {
            const response = await todosApiService.getAllTodos(this.currentPage, this.pageSize);
            this.todos = response.data;
            mainView.render(this.todos, this.currentPage, response.totalRecords);
        }
        catch (error) {
            console.error('Failed to load todos:', error);
            toastView.show('Failed to load todos. Please try again later.', TOAST_TYPE.ERROR);
        }
    }
    async handlePrevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            await this.loadTodos();
        }
    }
    async handleNextPage() {
        this.currentPage++;
        await this.loadTodos();
    }
    handleDeleteClick(id) {
        deleteView.show(id);
    }
    async handleDeleteConfirm(id) {
        try {
            await todosApiService.deleteTodoById(id);
            await this.loadTodos();
            toastView.show('Todo deleted successfully!', TOAST_TYPE.SUCCESS);
        }
        catch (error) {
            console.error('Failed to delete todo:', error);
            if (error instanceof Error)
                toastView.show(`Failed to delete todo. ${error.message}.`, TOAST_TYPE.ERROR);
        }
    }
    handleCreateClick() {
        upsertView.show();
    }
    handleUpdateClick(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            upsertView.show(todo);
        }
    }
    async handleUpsertConfirm(todoData) {
        try {
            if (todoData.id) {
                await todosApiService.updateTodo(todoData);
            }
            else {
                await todosApiService.createTodo(todoData);
            }
            await this.loadTodos();
            toastView.show('Todo saved successfully!', TOAST_TYPE.SUCCESS);
        }
        catch (error) {
            console.error('Failed to upsert todo:', error);
            if (error instanceof Error)
                toastView.show(`Failed to save todo. ${error.message}.`, TOAST_TYPE.ERROR);
        }
    }
    async handleToggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            try {
                const updatedTodo = { ...todo, completed: !todo.completed };
                await todosApiService.updateTodo(updatedTodo);
                await this.loadTodos();
                toastView.show('Todo status updated successfully!', TOAST_TYPE.SUCCESS);
            }
            catch (error) {
                console.error('Failed to toggle complete:', error);
                toastView.show('Failed to update todo status. Please try again later.', TOAST_TYPE.ERROR);
            }
        }
    }
}
export default new TodoController();
