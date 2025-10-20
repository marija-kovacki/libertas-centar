import './style.css'
import { dictionary } from './words'

const message = document.createElement('div')
message.className = 'game-msg'
const mainContainer = document.getElementById('app')
const btn = document.createElement('button')
let keyboardLetters = document.querySelectorAll('.keyboard-letter:not(.enter):not(.backspace)')

function handleModal() {
  let overlay = document.querySelector('.shadow-overlay')
  let closeBtn = document.querySelector('.close-btn')
  const modal = document.querySelector('.modal')

  let selectors = [overlay, closeBtn]

  selectors.forEach((selector) =>
    selector.addEventListener('click', function () {
      modal.classList.add('hidden')
      overlay.classList.add('hidden')
      document.body.classList.remove('noscroll')
    })
  )

  if (overlay && !overlay.classList.contains('hidden')) {
    console.log('overlay')
    document.body.classList.add('noscroll')
  }
}
handleModal()

const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
  gameOver: false,
  clicksWired: false,
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`)
      box.textContent = state.grid[i][j]
    }
  }
}

function drawBox(container, row, col, letter = '') {
  const box = document.createElement('div')
  box.className = 'box'
  box.id = `box${row}${col}`
  box.textContent = letter

  container.appendChild(box)
  return box
}

function drawGrid(container) {
  const grid = document.createElement('div')
  grid.className = 'grid'

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBox(grid, i, j)
    }
  }
  container.appendChild(grid)
}

function statusMessage() {
  mainContainer.appendChild(message)
  setTimeout(() => {
    message.remove()
  }, 5000)
}

function handleEnter() {
  if (state.currentCol === 5) {
    const word = getCurrentWord()
    if (isWordValid(word)) {
      revealWord(word)
      state.currentRow++
      state.currentCol = 0
    } else {
      statusMessage()
      message.textContent = `${word.toUpperCase()} is not on a word list`
    }
  }
}

function registerClickEvents() {
  if (state.clicksWired) return
  state.clicksWired = true
  document.querySelector('.enter').addEventListener('click', function () {
    if (state.gameOver) return

    handleEnter()
    updateGrid()
  })

  document.querySelector('.backspace').addEventListener('click', function () {
    if (state.gameOver) return

    removeLetter()
    updateGrid()
  })

  document.querySelector('#keyboard').addEventListener('click', (e) => {
    if (state.gameOver) return
    const key = e.target.closest('.keyboard-letter')
    if (!key || key.classList.contains('enter') || key.classList.contains('backspace')) return
    addLetter(key.innerHTML)
    updateGrid()
  })
}

function registeKeyBoardEvents() {
  document.body.onkeydown = (e) => {
    if (state.gameOver) return
    const key = e.key

    if (key === 'Enter') {
      handleEnter()
    }

    if (key === 'Backspace') {
      removeLetter()
    }

    if (isLetter(key)) {
      addLetter(key)
    }

    updateGrid()
  }
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr)
}

function isWordValid(word) {
  return dictionary.includes(word)
}

function revealWord(guess) {
  const row = state.currentRow
  const secret = state.secret.split('')
  const guessArray = guess.split('')
  const letterCount = {}

  for (let char of secret) {
    letterCount[char] = (letterCount[char] || 0) + 1
  }

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`)
    const letter = guessArray[i]

    if (letter === secret[i]) {
      box.classList.add('right')
      keyboardLetters.forEach((key) => {
        if (key.innerHTML === letter) {
          key.classList.add('right')
        }
      })
      letterCount[letter]--
      guessArray[i] = null
    }
  }

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`)
    const letter = guessArray[i]

    if (letter && letterCount[letter] > 0) {
      box.classList.add('wrong')
      keyboardLetters.forEach((key) => {
        if (key.innerHTML === letter) {
          key.classList.add('wrong')
        }
      })
      letterCount[letter]--
    } else if (letter) {
      keyboardLetters.forEach((key) => {
        if (key.innerHTML === letter) {
          key.classList.add('empty')
        }
      })
      box.classList.add('empty')
    }
  }

  const isWinner = state.secret === guess
  const isGameOver = state.currentRow === 5

  if (isWinner) {
    message.textContent = 'Amazing!'
    statusMessage()
    state.gameOver = true
    resetGame()
  } else if (isGameOver) {
    message.textContent = `Correct word is ${state.secret.toUpperCase()}. Better luck next time!`
    statusMessage()
    state.gameOver = true
    resetGame()
  }
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i)
}

function addLetter(letter) {
  if (state.currentCol === 5) return
  state.grid[state.currentRow][state.currentCol] = letter
  state.currentCol++
}

function removeLetter() {
  if (state.currentCol === 0) return
  state.grid[state.currentRow][state.currentCol - 1] = ''
  state.currentCol--
}

function newGame() {
  state.secret = dictionary[Math.floor(Math.random() * dictionary.length)]
  state.grid = Array(6)
    .fill()
    .map(() => Array(5).fill(''))
  state.currentRow = 0
  state.currentCol = 0
  state.gameOver = false
  const grid = document.querySelector('.grid')
  if (grid) grid.remove()
  btn.remove()
  if (message) {
    message.remove()
  }

  keyboardLetters.forEach((key) => {
    if (
      key.classList.contains('empty') ||
      key.classList.contains('wrong') ||
      key.classList.contains('right')
    ) {
      key.classList.remove('empty')
      key.classList.remove('wrong')
      key.classList.remove('right')
    }
  })
  startUp()
}

function resetGame() {
  mainContainer.prepend(btn)
  btn.className = 'reload-btn primary-btn'
  btn.innerHTML = 'Play again'
  btn.addEventListener('click', newGame)
}

function startUp() {
  const game = document.getElementById('game')
  drawGrid(game)
  registeKeyBoardEvents()
  registerClickEvents()
}

startUp()
