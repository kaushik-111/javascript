// Function to append a value to the screen
function appendValue(value) {
    document.calc.screen.value += value;
}

// Function to clear the screen
function clearScreen() {
    document.calc.screen.value = '';
}

// Function to delete the last character
function deleteLast() {
    document.calc.screen.value = document.calc.screen.value.slice(0, -1);
}

// Function to calculate the result
function calculateResult() {
    try {
        document.calc.screen.value = eval(document.calc.screen.value);
    } catch (error) {
        document.calc.screen.value = 'Error';
    }
}