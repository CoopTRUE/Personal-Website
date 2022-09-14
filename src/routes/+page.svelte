<script lang="ts">
  import 'sanitize.css'
  import { onDestroy, onMount } from 'svelte'
  import './global.scss'
  import { Gradient } from './Gradient.js'
  const gradient = new Gradient()

  const keypressTime = 90
  const waitTime = 4000
  const text = [
    'web designer',
    'backend designer',
    'gamer',
    'trader',
    'defi user'
  ]

  let currentText = ''
  let typing = false
  async function typingAnimation(newText: string) {
    const newTextArray = Array.from(newText)
    typing = true
    for (const char of newTextArray) {
      currentText += char
      await new Promise((r) => setTimeout(r, keypressTime))
    }
    typing = false
    await new Promise((r) => setTimeout(r, waitTime))
    for (const _ of newTextArray) {
      currentText = currentText.substring(0, currentText.length - 1)
      await new Promise((r) => setTimeout(r, keypressTime))
    }
    currentTextIndex++
  }
  let currentTextIndex = 0
  $: typingAnimation(text[currentTextIndex % text.length])

  onMount(() => {
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
  })
  // onDestroy(() => window.clearInterval(intervalId))
</script>

<canvas id="gradient-canvas" data-js-darken-top data-transition-in />
<div class="main center">
  <h1 class="center-col moving-text-container">
    <span class="center">Hi,</span>
    <span class="center">I'm Cooper,</span>
    <span class="rot-text center" class:typing>{currentText}</span>
  </h1>
  <div class="profession-image">hi</div>
</div>

<style lang="scss">
  @media (max-width: 550px) {
    .main {
      flex-direction: column;
      > * {
        width: 100% !important;
        padding: 0 0.1vw !important;
      }
    }
  }
  .main {
    padding: 0 50px;
    height: 100vh;
    > * {
      width: 50%;
    }
  }
  .moving-text-container {
    align-items: baseline;
    height: 200px;
    span {
      text-align: center;
      height: 45px;
    }
  }
  .rot-text {
    border-right: 4px solid rgb(253, 202, 106);
    border-color: orange;
    padding-right: 1px;
    &:not(.typing) {
      animation: blink-caret 0.7s step-end infinite;
    }
  }
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
  #gradient-canvas {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 70%;
    width: 100%;
    height: 100%;
    // filter: blur();
    --gradient-color-1: #c3e4ff;
    --gradient-color-2: #6ec3f4;
    --gradient-color-3: #eae2ff;
    --gradient-color-4: #b9beff;
    z-index: -10;
  }
</style>
