let questionNumber = 0;
let correct = 0;

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10);
  }
}

function questionCounter() {
  questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}

function correctCounter() {
  correct ++;
}

function startQuiz() {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      questionAnswerCorrect();
    } else {
      selected.parent().addClass('wrong');
      questionAnswerWrong();
    }
  });
}

function questionAnswerCorrect() {
  userAnswerFeedbackCorrect();
  updateScore();
}

function userAnswerFeedbackCorrect() {
  let corectAnswer=`${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function questionAnswerWrong() {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  correctCounter();
  $('.correct').text(correct);
}

function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    questionCounter();
    renderQuestion();
    userSelectAnswer();
  });
}

function renderResults () {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You've finished the quiz!</h3><p>You got ${correct} / 10</p><p>Now get your gears ready and start shredding!</p><button class="restartButton">Restart Quiz</button></div>`);
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);