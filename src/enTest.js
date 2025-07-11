import { englishAssessmentTest } from './englishAssessmentTest.js'

let currentQuestionIndex = 0
let correctAnswers = 0
let introHidden = false

document.addEventListener('DOMContentLoaded', () => {
  const questionText = document.getElementById('question-text')
  const optionsContainer = document.getElementById('options-container')
  const resultContainer = document.getElementById('result')
  const quizContainer = document.getElementById('quiz-container')
  const introText = document.getElementById('introText')

  if (!quizContainer || !questionText || !optionsContainer || !resultContainer) return

  function loadQuestion() {
    const questionData = englishAssessmentTest[currentQuestionIndex]
    questionText.innerHTML = `<h3>${questionData.question}</h3>`

    optionsContainer.innerHTML = ''
    questionData.options.forEach((option) => {
      const button = document.createElement('button')
      button.innerText = option
      button.classList.add('option-btn')
      button.addEventListener('click', () => selectAnswer(option, questionData.correctAnswer))
      optionsContainer.appendChild(button)
    })
  }

  function selectAnswer(selected, correct) {
    if (!introHidden && introText) {
      introText.classList.add('hidden')
      introHidden = true
    }

    if (selected === correct) correctAnswers++
    currentQuestionIndex++
    if (currentQuestionIndex < englishAssessmentTest.length) {
      loadQuestion()
    } else {
      showResult(correctAnswers)
    }
  }

  function showResult(score) {
    const level = calculateLevel(score)
    quizContainer.style.display = 'none'
    resultContainer.style.display = 'block'
    resultContainer.innerHTML = `
      <h2>Vaš nivo znanja je približno: <strong>${level}</strong></h2>
      <p>Broj tačnih odgovora: ${score} / ${englishAssessmentTest.length}</p>
      <div class="result-buttons">
        <button id="restart-btn" class="primary-btn">Uradi test ponovo</button>
        <button id="call-btn" class="secondary-btn">Zakaži proveru</button>
      </div>
    `

    document.getElementById('restart-btn').addEventListener('click', restartTest)
    document.getElementById('call-btn').addEventListener('click', scheduleSession)
  }

  function calculateLevel(score) {
    if (score <= 10) return 'A1'
    if (score <= 20) return 'A2'
    if (score <= 30) return 'B1'
    if (score <= 40) return 'B2'
    return 'C1'
  }

  function restartTest() {
    window.location.reload()
  }

  function scheduleSession() {
    window.location.href = 'tel:+381-063-549-585'
  }

  loadQuestion()
})
