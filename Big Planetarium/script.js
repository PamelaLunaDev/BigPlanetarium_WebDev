// Interactive Mars fact. Part responsible for showing a random fact when the user clicks the button.
const factButton = document.getElementById("fact-button"); // Looks in the HTML for an element with id "fact-button" and stores it in a variable to use in JavaScript.
const factText = document.getElementById("fact-text"); // Looks for the element where the fact text will be displayed.

const marsFacts = [ // Array, which is a list of texts with facts about Mars.
  "Mars has the tallest volcano in the Solar System, Olympus Mons.", // Each item in the list is a possible message.
  "A day on Mars is only a little longer than a day on Earth.",
  "Mars has seasons, just like Earth.",
  "Mars has two moons, called Phobos and Deimos."
];

if (factButton && factText) { // Only runs the code if both elements exist on the page, prevents errors.
  factButton.addEventListener("click", function () { // Listens for button clicks, when clicked it runs this function.
    const randomIndex = Math.floor(Math.random() * marsFacts.length); // Generates a random number between 0 and the list length to choose a fact.
    factText.textContent = marsFacts[randomIndex]; // Replaces the text on screen with the randomly chosen fact.
  });
}

// Full quiz. Part responsible for creating and controlling the entire quiz.
const quizContainer = document.getElementById("quiz-container"); // Area where the questions will be inserted dynamically.
const submitQuizButton = document.getElementById("submit-quiz"); // Button the user clicks to check the quiz.
const resetQuizButton = document.getElementById("reset-quiz"); // Button that resets the quiz.
const quizResult = document.getElementById("quiz-result"); // Area where the final result will be shown.

const quizQuestions = [ // List of questions with options and correct answers.
  {
    question: "Which planet is known as the Red Planet?", // Question text.
    options: ["Earth", "Mars", "Venus"], // Options shown to the user.
    answer: "Mars" // Correct answer used for validation.
  },
  {
    question: "Which star is at the centre of our Solar System?",
    options: ["The Moon", "The Sun", "Mars"],
    answer: "The Sun"
  },
  {
    question: "Which planet is famous for its rings?",
    options: ["Saturn", "Mercury", "Earth"],
    answer: "Saturn"
  },
  {
    question: "What is the name of the galaxy that contains our Solar System?",
    options: ["Andromeda", "Milky Way", "Orion"],
    answer: "Milky Way"
  },
  {
    question: "Which planet do humans live on?",
    options: ["Jupiter", "Earth", "Neptune"],
    answer: "Earth"
  },
  {
    question: "How many moons does Mars have?",
    options: ["Two", "One", "Five"],
    answer: "Two"
  }
];

function shuffleArray(array) { // Function that shuffles the order of questions so it is not always the same.
  const copiedArray = [...array]; // Creates a copy of the list to avoid changing the original.

  for (let i = copiedArray.length - 1; i > 0; i--) { // Loops from the end of the list to the beginning.
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Chooses a random position in the list.
    [copiedArray[i], copiedArray[randomIndex]] = [copiedArray[randomIndex], copiedArray[i]]; // Swaps the two items.
  }

  return copiedArray; // Returns the shuffled list.
}

function renderQuiz() { // Function responsible for building the quiz on screen using JavaScript.
  if (!quizContainer) { // If the quiz area does not exist.
    return; // Stops execution to prevent errors.
  }

  const shuffledQuestions = shuffleArray(quizQuestions); // Shuffles the questions.
  quizContainer.innerHTML = ""; // Clears any previous content before creating again.

  shuffledQuestions.forEach((item, index) => { // For each question in the list.
    const questionBox = document.createElement("section"); // Creates a section block for the question.
    questionBox.className = "quiz-question"; // Adds class for CSS styling.

    const fieldset = document.createElement("fieldset"); // Groups the options (improves accessibility).
    const legend = document.createElement("legend"); // Question title.
    legend.textContent = `${index + 1}. ${item.question}`; // Shows question number and text.
    fieldset.appendChild(legend); // Adds title inside the group.

    item.options.forEach((option, optionIndex) => { // For each option.
      const optionWrapper = document.createElement("div"); // Creates a wrapper for input + label.
      optionWrapper.className = "quiz-option"; // Class for styling.

      const input = document.createElement("input"); // Creates the selection input.
      input.type = "radio"; // Radio type allows only one option.
      input.name = `question-${index}`; // Groups options of the same question.
      input.id = `question-${index}-option-${optionIndex}`; // Unique ID for label connection.
      input.value = option; // Value of selected option.
      input.setAttribute("data-correct-answer", item.answer); // Stores correct answer.
      input.setAttribute("data-question-text", item.question); // Stores question text.

      const label = document.createElement("label"); // Clickable text.
      label.setAttribute("for", input.id); // Links text to input.
      label.textContent = option; // Shows option text.

      optionWrapper.appendChild(input); // Adds input to wrapper.
      optionWrapper.appendChild(label); // Adds label to wrapper.
      fieldset.appendChild(optionWrapper); // Adds option to question group.
    });

    questionBox.appendChild(fieldset); // Adds everything to the question.
    quizContainer.appendChild(questionBox); // Adds question to the page.
  });

  if (quizResult) {
    quizResult.innerHTML = ""; // Clears previous result.
  }

  if (submitQuizButton) {
    submitQuizButton.disabled = false; // Enables submit button.
  }
}

if (quizContainer) { // If the page has a quiz.
  renderQuiz(); // Builds quiz on page load.
}

if (submitQuizButton && quizResult) {
  submitQuizButton.addEventListener("click", function () { // When user clicks to check.
    const questionSections = document.querySelectorAll(".quiz-question"); // Selects all questions.
    let score = 0; // Starts score at zero.
    let unanswered = 0; // Counts unanswered questions.
    let wrongAnswers = []; // Stores wrong answers.

    questionSections.forEach((section, index) => {
      const selected = section.querySelector(`input[name="question-${index}"]:checked`); // Gets selected option.
      const allOptions = section.querySelectorAll(`input[name="question-${index}"]`); // Gets all options.

      if (!selected) { // If not answered.
        unanswered += 1; // Count as unanswered.
        return; // Go to next question.
      }

      const correctAnswer = allOptions[0].dataset.correctAnswer; // Gets correct answer.
      const questionText = allOptions[0].dataset.questionText; // Gets question text.

      allOptions.forEach((option) => {
        const optionWrapper = option.parentElement; // Gets wrapper.
        option.disabled = true; // Disables option.
        optionWrapper.classList.remove("correct-answer", "wrong-answer"); // Clears previous styles.

        if (option.value === correctAnswer) {
          optionWrapper.classList.add("correct-answer"); // Highlights correct answer.
        }

        if (selected.value === option.value && selected.value !== correctAnswer) {
          optionWrapper.classList.add("wrong-answer"); // Highlights wrong selected answer.
        }
      });

      if (selected.value === correctAnswer) {
        score += 1; // Adds point if correct.
      } else {
        wrongAnswers.push({ // Stores error details.
          question: questionText,
          selected: selected.value,
          correct: correctAnswer
        });
      }
    });

    if (unanswered > 0) {
      quizResult.innerHTML = `Please answer all questions before checking your score. You still have ${unanswered} unanswered question(s).`; // Warning if unanswered.
      return;
    }

    let resultHTML = ""; // Builds final result.

    if (score === 6) {
      resultHTML += `<p>Excellent. You scored ${score} out of 6. Amazing work.</p>`; // Perfect score.
    } else if (score >= 4) {
      resultHTML += `<p>Well done. You scored ${score} out of 6. You know a lot about space.</p>`; // Good score.
    } else {
      resultHTML += `<p>You scored ${score} out of 6. Keep exploring and try again.</p>`; // Low score.
    }

    if (wrongAnswers.length > 0) { // Checks if there are wrong answers.
      resultHTML += `<div class="answer-review">`; // Creates visual box.
      resultHTML += `<h3>Correct answers</h3>`; // Section title.
      resultHTML += `<ul>`; // Starts list.

      // Shows quiz mistakes with question, user answer and correct answer.
      wrongAnswers.forEach((item) => { // Loops through wrong answers.
        resultHTML += `
          <li>
            <strong>Question:</strong> ${item.question}<br>
            <strong>Your answer:</strong> ${item.selected}<br>
            <strong>Correct answer:</strong> ${item.correct}
          </li>
        `;
      });

      resultHTML += `</ul>`; // Closes list.
      resultHTML += `</div>`; // Closes box.
    }

    quizResult.innerHTML = resultHTML; // Displays result.
    submitQuizButton.disabled = true; // Disables submit button.
  });
}

if (resetQuizButton) {
  resetQuizButton.addEventListener("click", function () {
    renderQuiz(); // Recreates quiz from scratch.
  });
}

// Memory game.
const memoryGame = document.getElementById("memory-game"); // Area where the memory cards will appear.
const resetMemoryButton = document.getElementById("reset-memory"); // Button used to restart the memory game.
const memoryMessage = document.getElementById("memory-message"); // Area where the winning message will appear.

const memoryImages = [ // List of images used in the memory game.
  "Planet/Asteroid.jpeg",
  "Planet/Earth.jpeg",
  "Planet/Jupiter.jpeg",
  "Planet/Mars.jpeg",
  "Planet/Mercury.jpeg",
  "Planet/Moon.jpeg",
  "Planet/Neptune.jpeg",
  "Planet/Pluto.jpeg",
  "Planet/Saturn.jpeg",
  "Planet/Sun.jpeg",
  "Planet/Uranus.jpeg",
  "Planet/Venus.jpeg"
];

let firstCard = null; // Stores the first selected card.
let secondCard = null; // Stores the second selected card.
let lockBoard = false; // Prevents the user from clicking while two cards are being checked.

function startMemoryGame() { // Creates the memory game.
  if (!memoryGame) { // If the memory game area does not exist.
    return; // Stops the code.
  }

  const selectedImages = shuffleArray(memoryImages).slice(0, 6); // Chooses 6 random images from the full list.
  const duplicatedCards = [...selectedImages, ...selectedImages]; // Duplicates the 6 images to create pairs.
  const shuffledCards = shuffleArray(duplicatedCards); // Shuffles the final cards.

  memoryGame.innerHTML = ""; // Clears the game area.
  firstCard = null; // Resets first card.
  secondCard = null; // Resets second card.
  lockBoard = false; // Unlocks the board.

  if (memoryMessage) {
    memoryMessage.textContent = ""; // Clears previous message.
  }

  shuffledCards.forEach((image, index) => { // Creates one card for each image.
    const card = document.createElement("button"); // Creates a clickable card.
    card.type = "button"; // Prevents form submission.
    card.className = "memory-card"; // Adds CSS class.
    card.setAttribute("data-image", image); // Saves image path inside the card.
    card.setAttribute("aria-label", "Memory card"); // Accessibility label.

    card.innerHTML = `
      <span class="card-back">?</span>
      <span class="card-front">
        <img src="${image}" alt="Space object">
      </span>
    `;

    card.addEventListener("click", function () { // Runs when the user clicks a card.
      flipCard(card); // Flips the clicked card.
    });

    memoryGame.appendChild(card); // Adds the card to the page.
  });
}

function flipCard(card) { // Controls what happens when a card is clicked.
  if (lockBoard) { // If the board is locked.
    return; // Do nothing.
  }

  if (card === firstCard) { // If the user clicks the same card twice.
    return; // Do nothing.
  }

  if (card.classList.contains("matched")) { // If the card is already matched.
    return; // Do nothing.
  }

  card.classList.add("flipped"); // Shows the image.

  if (!firstCard) { // If this is the first card selected.
    firstCard = card; // Store it.
    return; // Wait for the second card.
  }

  secondCard = card; // Store the second card.
  checkForMatch(); // Check if both cards are the same.
}

function checkForMatch() { // Checks if the selected cards match.
  const isMatch = firstCard.dataset.image === secondCard.dataset.image; // Compares both images.

  if (isMatch) {
    firstCard.classList.add("matched"); // Marks first card as matched.
    secondCard.classList.add("matched"); // Marks second card as matched.
    resetSelectedCards(); // Clears selected cards.
    checkMemoryWin(); // Checks if the user won.
  } else {
    lockBoard = true; // Locks the board while cards are visible.

    setTimeout(() => {
      firstCard.classList.remove("flipped"); // Hides first card again.
      secondCard.classList.remove("flipped"); // Hides second card again.
      resetSelectedCards(); // Clears selected cards.
    }, 1000);
  }
}

function resetSelectedCards() { // Clears the selected card variables.
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkMemoryWin() { // Checks if all pairs were found.
  const matchedCards = document.querySelectorAll(".memory-card.matched"); // Gets matched cards.

  if (matchedCards.length === memoryGame.children.length && memoryMessage) {
    memoryMessage.textContent = "Well done. You matched all the space objects."; // Winning message.
  }
}

if (memoryGame) {
  startMemoryGame(); // Starts the memory game when the page loads.
}

if (resetMemoryButton) {
  resetMemoryButton.addEventListener("click", function () {
    startMemoryGame(); // Restarts the memory game and chooses 6 new random images.
  });
}