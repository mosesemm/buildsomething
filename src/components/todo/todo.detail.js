import ko from 'knockout';
import 'knockout-mapping';

import * as todoService from '../../services/todo/todo.services';

class TodoDetailVM {
    constructor(id) {
        const initItem = todoService.getItem(id);
        this.currentTodo = ko.mapping.fromJS(initItem);
    }
}

export default TodoDetailVM