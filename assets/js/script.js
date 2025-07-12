// Get references to the DOM elements
const inputTextArea = document.getElementById('input-values');
const outputTextArea = document.getElementById('output-values');
const convertButton = document.getElementById('convert-btn');
const copyButton = document.getElementById('copy-btn');
const addQuotesCheckbox = document.getElementById('add-quotes');

// Run convertValues when the button is clicked
convertButton.addEventListener('click', convertValues);

// Run copyToClipboard when the copy button is clicked
copyButton.addEventListener('click', copyToClipboard);

// Main conversion function
function convertValues() {
    const rawInput = inputTextArea.value;
    const rawValues = rawInput.split(/\r?\n/);
    const cleanedValues = [];
    const shouldAddQuotes = addQuotesCheckbox.checked;
    
    // Clean up each value
    for (const value of rawValues) {
        const trimmedValue = value.trim();
        // Add to array if not empty
        if (trimmedValue !== '') {
            // Use template literals for cleaner string building
            const finalValue = shouldAddQuotes ? `'${trimmedValue}'` : trimmedValue;
            cleanedValues.push(finalValue);
        }
    }
    
    const sqlInClause = `WHERE IN (${cleanedValues.join(', ')})`;
    
    // Display the result
    outputTextArea.value = sqlInClause;
}

// Copy to clipboard function
async function copyToClipboard() {
    if (!outputTextArea.value.trim()) return;
    
    await navigator.clipboard.writeText(outputTextArea.value);
    copyButton.textContent = 'Copied!';
    setTimeout(() => copyButton.textContent = 'Copy to Clipboard', 1500);
}