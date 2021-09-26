import * as todoService from '../../../src/services/todo/todo.services';


describe("TodoService", () => {

    test("AddItem adds an item when called with new item (without id)", () => {
        //Arrange
        const todoItem = {description: "Do something fun", tags: ["fun", "todo"], done: false}
        //Act
        const addedItem = todoService.addItem(todoItem);
    
        //Assert
        const newItem = todoService.getItem(addedItem.id);
        expect(newItem).toBeTruthy();
        expect(newItem.description).toBe(todoItem.description);
    })

});