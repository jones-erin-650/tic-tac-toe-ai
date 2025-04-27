import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'


import HumanVsAI from './components/HumanVsAI.vue'
import AIVsAI from './components/AIVsAI.vue'
import HumanVsHuman from './components/HumanVsHuman.vue'

import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const routes = [
  { path: '/', component: App },
  { path: '/human', component: HumanVsHuman },
  { path: '/ai', component: HumanVsAI },
  { path: '/cpu', component: AIVsAI },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
