import ko from 'knockout';
import TodoListingVM from './components/todo/todo.listing';

class AppVM {
    todoListingVm = new TodoListingVM();
}

(function() {
    ko.applyBindings(new AppVM(), document.getElementById("app"));
})()
