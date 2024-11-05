// Initialize correct and incorrect counters
let correctCount = 0;
let incorrectCount = 0;

// Function to generate random values and set up the problem with a word problem format
function generateProblem() {
    const problemType = Math.floor(Math.random() * 3) + 1;
    const wavelength = roundToHundredth(Math.random() * 100);
    const frequency = roundToHundredth(Math.random() * 10);
    const speed = roundToHundredth(wavelength * frequency);

    let problemStatement = '';
    let correctAnswer = 0;
    let units = '';

    // Select the correct answer and set problem statement based on type
    if (problemType === 1) {
        problemStatement = `A wave travels with a frequency of ${frequency} Hz and a wavelength of ${wavelength} meters. Calculate the speed of the wave.`;
        correctAnswer = speed;
        units = "m/s";
    } else if (problemType === 2) {
        problemStatement = `Given a wave with a speed of ${speed} m/s and frequency of ${frequency} Hz, find the wavelength.`;
        correctAnswer = wavelength;
        units = "m";
    } else {
        problemStatement = `If the speed of a wave is ${speed} m/s and its wavelength is ${wavelength} meters, determine the frequency.`;
        correctAnswer = frequency;
        units = "Hz";
    }

    // Update the DOM with the problem and units
    document.getElementById("problem-statement").innerText = problemStatement;
    document.getElementById("feedback").innerText = '';
    document.getElementById("answer-input").value = '';
    document.getElementById("unit-label").innerText = units;

    // Hide the solution box when a new problem is generated
    document.getElementById("solutionBox").style.display = "none";

    // Store correct answer and units in data attributes
    const answerInput = document.getElementById("answer-input");
    answerInput.dataset.correctAnswer = correctAnswer;
    answerInput.dataset.units = units;
    answerInput.dataset.problemType = problemType;  // Track problem type
    answerInput.dataset.wavelength = wavelength;
    answerInput.dataset.frequency = frequency;
    answerInput.dataset.speed = speed;
}

// Function to check if the answer is correct
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("answer-input").value);
    const correctAnswer = parseFloat(document.getElementById("answer-input").dataset.correctAnswer);
    const units = document.getElementById("answer-input").dataset.units;

    // Round both user answer and correct answer to two decimal places for comparison
    const roundedUserAnswer = roundToHundredth(userAnswer);
    const roundedCorrectAnswer = roundToHundredth(correctAnswer);

    // Verify if the rounded answers match
    const isCorrect = roundedUserAnswer === roundedCorrectAnswer;

    if (isCorrect) {
        document.getElementById("feedback").innerText = `Correct! The answer is ${correctAnswer.toFixed(2)} ${units}.`;
        document.getElementById("feedback").style.color = "green";
        correctCount++; // Increment correct count
    } else {
        document.getElementById("feedback").innerText = `Incorrect. Please try again!`;
        document.getElementById("feedback").style.color = "red";
        incorrectCount++; // Increment incorrect count
    }

    // Update the tally bar
    updateTally();

    // Check if the correct count reaches 10
    if (correctCount === 10) {
        showSubmissionForm();
    }
}

// Function to show the submission form
function showSubmissionForm() {
    const formHtml = `
        <div id="submissionForm">
            <h3>Submit Your Work</h3>
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="First and Last Name" required>
            <label for="classHour">Hour:</label>
            <select id="classHour" required>
                <option value="">Select Hour</option>
                <option value="1">4th</option>
                <option value="2">5th</option>
                <option value="3">7th</option>
            </select>
            <button onclick="submitForm()">Submit</button>
            <button onclick="closeSubmissionForm()">Cancel</button>
        </div>
    `;
    document.getElementById("feedback").innerHTML = formHtml;
}

// Function to close the submission form
function closeSubmissionForm() {
    document.getElementById("feedback").innerText = ''; // Clear feedback
}

// Function to submit the form data to Google Sheets
function submitForm() {
    const name = document.getElementById("name").value;
    const classHour = document.getElementById("classHour").value;

    // Send data to Google Sheets
    sendDataToGoogleSheet(name, classHour);

    // Reset the counters and feedback
    correctCount = 0;
    incorrectCount = 0;
    updateTally();
    closeSubmissionForm();
}

// Function to send data to Google Sheets
function sendDataToGoogleSheet(name, classHour) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxf61h0FNlPnNerIA76FquCVFV-c88A736lgXTbw-kEHrgYvKpiwSebCEQysnHvjqF9/exec'; // Replace with your Google Script URL
    const data = new FormData();
    data.append('entry.934309979', name); // Entry ID for Name
    data.append('entry.1435057847', classHour); // Entry ID for Hour

    fetch(scriptURL, {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (response.ok) {
            alert('Submission successful! Thank you for submitting your work.');
        } else {
            alert('There was a problem with the submission. Please try again.');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

// Function to update the tally bar display
function updateTally() {
    document.getElementById("correct-tally").innerText = `✅: ${correctCount}`;
    document.getElementById("incorrect-tally").innerText = `❌: ${incorrectCount}`;
}

// Solution walkthrough function
function showSolutionWalkthrough() {
    const answerInput = document.getElementById("answer-input");
    const problemType = parseInt(answerInput.dataset.problemType);
    const wavelength = answerInput.dataset.wavelength;
    const frequency = answerInput.dataset.frequency;
    const speed = answerInput.dataset.speed;
    let solutionText = "";

    if (problemType === 1) {
        solutionText = `To find the speed, use the formula: Speed = Wavelength × Frequency.
        Substitute the values: Speed = ${wavelength} m × ${frequency} Hz.`;
    } else if (problemType === 2) {
        solutionText = `To find the wavelength, use the formula: Wavelength = Speed ÷ Frequency.
        Substitute the values: Wavelength = ${speed} m/s ÷ ${frequency} Hz.`;
    } else {
        solutionText = `To find the frequency, use the formula: Frequency = Speed ÷ Wavelength.
        Substitute the values: Frequency = ${speed} m/s ÷ ${wavelength} m.`;
    }

    document.getElementById("solutionText").innerText = solutionText;
    document.getElementById("solutionBox").style.display = "block";
}

// Helper function to round to the nearest hundredth
function roundToHundredth(num) {
    return Math.round(num * 100) / 100;
}
