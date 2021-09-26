import ko from 'knockout';

class Todo {
    description = ko.observable();
    done = ko.observable();
    tags = ko.observableArray();
    id = ko.observable();
}