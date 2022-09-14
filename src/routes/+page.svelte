<script lang="ts">
  import 'sanitize.css'
  import { onDestroy, onMount } from 'svelte'
  import './global.scss'
  import { Gradient } from './Gradient.js'
  const gradient = new Gradient()

  const keypressTime = 90
  const waitTime = 3000
  const text = [
    'web developer',
    'backend developer',
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
  let currentTextIndex: number
  $: if (loaded) typingAnimation(text[currentTextIndex % text.length])

  let loaded = false
  onMount(() => {
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
    loaded = true
    currentTextIndex = 0
  })
  $: y = 0
  $: innerY = 100
  $: currentPage = Math.floor((y + innerY / 1.8) / innerY)
  $: hueRotate = currentPage * 70
  $: console.log(hueRotate)
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={innerY} />
<canvas
  id="gradient-canvas"
  style="filter: hue-rotate({hueRotate}deg)"
  data-transition-in
/>
<div class="main center-col">
  <div class="page1 center">
    <h1 class="center-col moving-text-container">
      <span class="center">Hi,</span>
      <span class="center">I'm Cooper,</span>
      <a
        class="rot-text center"
        class:typing
        href="#page{(currentTextIndex % text.length) + 2}"
      >
        {currentText}
      </a>
    </h1>
  </div>
  <div class="page2 center" id="page2"><h1>web developer</h1></div>
  <div class="page3 center" id="page3"><h1>backend developer</h1></div>
  <div class="page4 center" id="page4"><h1>gamer</h1></div>
  <div class="page5 center" id="page5"><h1>trader</h1></div>
  <div class="page6 center" id="page6"><h1>defi user</h1></div>
</div>

<style lang="scss">
  .main {
    padding: 0 50px;
    > * {
      width: 100vw;
      height: 100vh;
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
    position: fixed;
    opacity: 70%;
    width: 100vw;
    height: 100vh;
    // filter: blur();
    --gradient-color-1: #c3e4ff;
    --gradient-color-2: #6ec3f4;
    --gradient-color-3: #eae2ff;
    --gradient-color-4: #b9beff;
    z-index: -10;
    transition: 1s filter linear;
    // filter: hue-rotate(0deg);
  }
</style>
