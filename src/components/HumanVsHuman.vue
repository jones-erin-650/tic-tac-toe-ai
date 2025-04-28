// made by following this tutorial: https://www.youtube.com/watch?v=sjYxRlwHvsM&t=6s

<script setup lang="ts">
  import {ref, computed, Ref, registerRuntimeCompiler} from 'vue'
  const player = ref('X')
  const board: Ref<string[][]> = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

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

// .flat() is used to turn it into a one dimmensional array, easier to check lines that way
const winner = computed(() => calculateWinner(board.value.flat()))

const isDraw = computed(() => {
  // if there are no more moves left
  return board.value.flat().every((cell: string) => cell !== '') && !winner.value
})

// x and y are the indeces of the square that's chosen
const makeMove = (x: number, y: number): string | undefined => {
  // if we have a winner
  if(winner.value) return

  // if a marker is already placed
  if (board.value[x][y] !== '') return

  board.value[x][y] = player.value

  // swap the player value
  player.value = player.value === 'X' ? 'O' : 'X'
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
    <h1 class="text-7xl font-bold uppercase">Human Vs Human</h1>

    <h3 class="text-4xl my-4">Player {{player}}'s Turn</h3>

    <div class="flex flex-col items-center mb-8">
      <div
        v-for="(row, x) in board"
        :key="x"
        class="flex">

        <div
          v-for="(cell, y) in row"
          :key="y"
          @click="makeMove(x, y)"
          :class="`border border-white w-40 h-40 hover:bg-gray-900 flex items-center justify-center text-6xl cursor-pointer ${ cell === 'X' ? 'text-pink-400' : 'text-blue-400' }`">
          {{ cell === 'X' ? 'X' : cell === 'O' ? 'O' : '' }}

        </div>

      </div>
      <h2 v-if="winner !== null" class="text-6xl font-bold mb-8 mt-8">Player '{{winner}}' wins!</h2>
      <h2 v-if="isDraw === true" class="text-6xl font-bold mb-8 mt-8">Draw Game!</h2>

      <button @click="resetGame" class="text-3xl my-4 px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300 cursor-pointer">Reset Game</button>
    </div>
  </main>
</template>

<style>

</style>
