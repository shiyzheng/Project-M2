import React from 'react'
import axios from 'axios'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
let timeout = false
let gameWon = false
let gameStarted = false
const images = ['https://i.imgur.com/zEQsv1b.png', 'https://i.imgur.com/S4QlJRt.png', 'https://i.imgur.com/c3JpYEZ.png',
  'https://i.imgur.com/rTFbvUQ.png', 'https://i.imgur.com/WZ8w7qU.png', 'https://i.imgur.com/d6IwaVK.png']
const faceDown = 'https://i.imgur.com/MMNEZoC.png'
let cards = []
let flippedCards = []
let start
let curr
let user

async function checkWin() {
  let win = true
  for (let i = 0; i < 12; i++) {
    win = win && cards[i].matched
  }
  if (win) {
    curr = Date.now() - start
    const seconds = curr / 1000
    gameStarted = false
    gameWon = true
    alert(`Won in ${seconds} seconds!`)
    try {
      await axios.post('/account/user', { user, seconds })
    } catch (e) {
      console.log(e)
      alert('error occurred answering question')
    }
  }
}

function drawCard(i) {
  const image = new Image()
  image.onload = () => {
    ctx.drawImage(image, cards[i].x * 200, cards[i].y * 300, 200, 300)
  }
  if (cards[i].faceUp || cards[i].matched) {
    image.src = images[cards[i].id % 6]
  } else {
    image.src = faceDown
  }
}

function drawBoard() {
  for (let i = 0; i < 12; i++) {
    drawCard(i)
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards
  const { id: firstId } = card1
  const { id: secondId } = card2
  if (firstId % 6 === secondId % 6) {
    flippedCards[0].matched = true
    flippedCards[1].matched = true
    flippedCards.pop()
    flippedCards.pop()
    drawBoard()
  } else {
    timeout = true
    setTimeout(() => {
      flippedCards[0].faceUp = !flippedCards[0].faceUp
      flippedCards[1].faceUp = !flippedCards[1].faceUp
      flippedCards.pop()
      flippedCards.pop()
      drawBoard()
      timeout = false
    }, 1000)
  }
}

function initializeBoard() {
  gameStarted = true
  gameWon = false
  timeout = false
  cards = []
  flippedCards = []
  start = Date.now()

  for (let i = 0; i < 12; i++) {
    const card = {
      id: i, faceUp: false, matched: false, x: 0, y: 0,
    }
    cards.push(card)
  }

  cards.sort(() => 0.5 - Math.random()) // randomize order of cards
  for (let i = 0; i < 12; i++) {
    const position = i
    cards[i].x = position % 6
    cards[i].y = Math.floor(position / 6)
  }
}

function flipCard(card) {
  if (card.matched || timeout || flippedCards[0] === card) {
    return
  }
  const c = card
  c.faceUp = !card.faceUp
  flippedCards.push(card)
  drawBoard()
  if (flippedCards.length === 2) {
    checkMatch()
    setTimeout(() => {
      checkWin()
    }, 50)
  }
}

function updateBoard(event) {
  if (!gameStarted) {
    return
  }
  if (timeout || event.clientX > 1200 || event.clientY > 600 + 40) {
    return
  }
  const xCoord = Math.floor(event.clientX / 200) % 6
  const yCoord = Math.floor((event.clientY - 40) / 300) % 2

  for (let i = 0; i < 12; i++) {
    if (xCoord === cards[i].x && yCoord === cards[i].y) {
      flipCard(cards[i])
      return
    }
  }
}

const Board = () => {
  if (gameStarted) {
    return
  }
  initializeBoard()
  document.addEventListener('click', updateBoard)
  drawBoard()
}

function Play({ loggedIn, navigate }) {
  if (!loggedIn) {
    navigate('/')
  }
  user = loggedIn

  function returnHome() {
    gameStarted = false
    navigate('/')
    ctx.clearRect(0, 0, 2000, 2000)
  }

  return (
    <>
      <Board />
      <button type="button" className="btn btn-success" onClick={() => returnHome()}> Home </button>
    </>
  )
}

export default Play
