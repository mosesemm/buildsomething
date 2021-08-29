import {isNotEmpty, desializeData, serializeData
} from "../src/utils";


test("isNotEmpty returns true when called with values", () => {
    //Arrange
    const someValue = "this is not empty";

    //Act
    const results = isNotEmpty(someValue);

    //Assert
    expect(results).toBeTruthy()
});


test("isNotEmpty returns false when called without values", () => {
    //Arrange
    const someValue = " ";

    //Act
    const results = isNotEmpty(someValue);

    //Assert
    expect(results).toBeFalsy();
});
