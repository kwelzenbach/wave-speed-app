// Function to generate random values and set up the problem with a word problem format
function generateProblem() {
    // Randomly choose the type of calculation: 1 (speed), 2 (wavelength), 3 (frequency)
    const problemType = Math.floor(Math.random() * 3) + 1;

    // Generate random values rounded to the nearest hundredth
    const wavelength = roundToHundredth(Math.random() * 100);
    const frequency = roundToHundredth(Math.random() * 10);
    const speed = roundToHundredth(wavelength * frequency);

    let problemStatement = '';
    let correctAnswer = 0;
    let units = '';

    // Randomize the wording of the problem
    const scenarios = [
        `A wave travels with a frequency of ${frequency} Hz and a wavelength of ${wavelength} meters. Calculate the speed of the wave.`,
        `If the speed of a wave is ${speed} m/s and its wavelength is ${wavelength} meters, determine the frequency.`,
        `Given a wave with a speed of ${speed} m/s and frequency of ${frequency} Hz, find the wavelength.`,
        `A wave moving at ${speed} m/s has a frequency of ${frequency} Hz. Calculate its wavelength.`,
        `Calculate the frequency of a wave that has a wavelength of ${wavelength} meters and travels at a speed of ${speed} m/s.`,
        `Given a wavelength of ${wavelength} meters and a speed of ${speed} m/s, determine the frequency of the wave.`
    ];

    // Select the correct answer based on the problem type and randomize phrasing
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

    // Update the DOM with the randomized word problem
    document.getElementById("problem-statement").innerText = problemStatement;
    document.getElementById("feedback").innerText = '';
    document.getElementById("answer-input").value = '';
    document.getElementById("unit-label").innerText = units; // Update unit display

    // Store correct answer and units in a data attribute for later verification
    document.getElementById("answer-input").dataset.correctAnswer = correctAnswer;
    document.getElementById("answer-input").dataset.units = units;
}

// Function to check if the answer is correct
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("answer-input").value);
    const correctAnswer = parseFloat(document.getElementById("answer-input").dataset.correctAnswer);
    const units = document.getElementById("answer-input").dataset.units;

    // Verify if the answer is within tolerance for rounding to two decimal places
    const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.01;

    if (isCorrect) {
        document.getElementById("feedback").innerText = `Correct! The answer is ${correctAnswer.toFixed(2)} ${units}.`;
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").innerText = `Incorrect. Please try again!`;
        document.getElementById("feedback").style.color = "red";
    }
}

// Helper function to round to the nearest hundredth
function roundToHundredth(num) {
    return Math.round(num * 100) / 100;
}
