import {ko} from 'knockout';
import TodoDetailVM from './todo.detail';
import * as todoService from '../../services/todo/todo.services';
import {MDCDialog} from '@material/dialog';

const dialog = new MDCDialog(document.querySelector(".mdc-dialog"));

class TodoListingVM{

    todoDetail;
    todoItems;

    constructor() {
        this.todoItems = todoService.getItems();
    }

    addTodo() {
        this.todoDetail = new TodoDetailVM();
        dialog.open();
    }

    viewTodo(){

    }
}

export default TodoListingVM