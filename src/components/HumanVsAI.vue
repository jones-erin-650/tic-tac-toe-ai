// made by following this tutorial: https://www.youtube.com/watch?v=sjYxRlwHvsM&t=6s

<script setup lang="ts">
  import {ref, computed, Ref, registerRuntimeCompiler} from 'vue'
  const player = ref('X')
  const board: Ref<string[][]> = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const isDraw = computed(() => {
  // if there are no more moves left
  return board.value.flat().every((cell: string) => cell !== '') && !winner.value
})

  // Taken from a react tutorial: https://react.dev/learn/tutorial-tic-tac-toe
  function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Min-max algorithm to make a move for the AI
function minimax(board: string[], depth: number, isMaximizing: boolean, maxDepth: number): number {
  const winner = calculateWinner(board)
  //Check if the game is over and who the winner is.
    //If the winner is 'X', return a negative score while adding the number of moves(depth) such that quicker wins are rewarded more.
  if (winner === 'X') return -10 + depth
    //If the winner is 'O', return a positive score while subtracting the number of moves(depth) such that quicker wins are rewarded more.
  if (winner === 'O') return 10 - depth
  // Draw
  if (!board.includes('')) return 0

  // Stop recursion if max depth is reached
  if (depth >= maxDepth) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    // Check every possible move for creating minmax tree
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        // Calculate best score for other player
        const score = minimax(board, depth + 1, false, maxDepth);
        // Reset the board
        board[i] = '';
        // Track best score/move so far
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        // Calculate best score for the AI
        const score = minimax(board, depth + 1, true, maxDepth);
        board[i] = '';
        // Track best score/move
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

const getBestMove = (maxDepth: number): { x: number; y: number } | null => {
  let bestScore = -Infinity
  let move: { x: number; y: number } | null = null

  const flatBoard = board.value.flat();
    for (let i = 0; i < flatBoard.length; i++) {
      if(flatBoard[i] === '') {
        flatBoard[i] = 'O'
        const score = minimax(flatBoard, 0, false, maxDepth);
        flatBoard[i] = ''
        if (score > bestScore) {
          bestScore = score
          move = { x: Math.floor(i / 3), y: i % 3 }
        }
      }
    }
    return move
}

// .flat() is used to turn it into a one dimmensional array, easier to check lines that way
const winner = computed(() => calculateWinner(board.value.flat()))

// x and y are the indeces of the square that's chosen
const makeMove = (x: number, y: number, maxDepth: number): string | undefined => {
  // if we have a winner
  if(winner.value) return

  // if a marker is already placed
  if (board.value[x][y] !== '') return

  // the marker of Player X is placed
  board.value[x][y] = player.value
  // If Player X is the winner, return
  if (winner.value) return

  // Swap the player value
  player.value = 'O'

  if(player.value === 'O') {
    const bestMove = getBestMove(maxDepth)
    if(bestMove) {
      board.value[bestMove.x][bestMove.y] = player.value
      //Swap the player value
      player.value = 'X'
    }
  }
}

const resetGame = () => {
  board.value = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  player.value = 'X'
}

</script>

<template>
  <main class="pt-8 text-center dark:bg-gray-800 min-h-screen dark:text-white">
    <h1 class="text-7xl font-bold uppercase">Human Vs AI</h1>

    <h3 class="text-4xl my-4">Player {{player}}'s Turn</h3>

    <div class="flex flex-col items-center mb-8">
      <div
        v-for="(row, x) in board"
        :key="x"
        class="flex">

        <div
          v-for="(cell, y) in row"
          :key="y"
          :class="`border border-white w-40 h-40 hover:bg-gray-900 flex items-center justify-center text-6xl cursor-pointer ${ cell === 'X' ? 'text-pink-400' : 'text-blue-400' }`"
          @click="player === 'X' ? makeMove(x, y, maxDepth) : null">      
          {{ cell === 'X' ? 'X' : cell === 'O' ? 'O' : '' }}

        </div>

      </div>
      <h2 v-if="winner !== null" class="text-6xl font-bold mb-8 mt-8">Player '{{winner}}' wins!</h2>
      <h2 v-if="isDraw === true" class="text-6xl font-bold mb-8 mt-8">Draw Game!</h2>

      <button @click="resetGame" class="text-3xl my-4 px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300 cursor-pointer">Reset Game</button>
      <!-- Slider to set the maxDepth of the AI with numbers underneath to now the number that it is set at -->
      <div class="flex flex-col items-center mb-8">
        <label for="maxDepth" class="text-2xl mb-4">AI Difficulty</label>
        <input type="range" id="maxDepth" min="1" max="9" v-model="maxDepth" class="w-64" />
        <div class="flex justify-between w-64 mt-2">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
      </div>
      </div>
    </div>
  </main>
</template>

<style>

</style>
