// Get references to the DOM elements
const inputTextArea = document.getElementById('input-values');
const outputTextArea = document.getElementById('output-values');
const convertButton = document.getElementById('convert-btn');

// Run convertValues when the button is clicked
convertButton.addEventListener('click', convertValues);

// Main conversion function
function convertValues() {
    const rawInput = inputTextArea.value;

    // Split input by newlines, commas, or spaces
    const rawValues = rawInput.split(/[\n,\s]+/);
    
    const cleanedValues = [];
    
    // Clean up each value
    for (let i = 0; i < rawValues.length; i++) {
        const trimmedValue = rawValues[i].trim();
        // Add to array if not empty
        if (trimmedValue !== '') {
            cleanedValues.push("'" + trimmedValue + "'");
        }
    }
    
    // Join values and format for SQL
    const valuesList = cleanedValues.join(', ');
    const sqlInClause = '(' + valuesList + ')';

    // Display the result
    outputTextArea.value = sqlInClause;
}