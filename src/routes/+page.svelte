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
  data-js-darken-top
  data-transition-in
/>
<div class="main center-col">
  <div class="page1 center">
    <h1 class="center-col moving-text-container">
      <span class="center">Hi,</span>
      <span class="center">I'm Cooper,</span>
      <span class="rot-text center" class:typing>{currentText}</span>
    </h1>
  </div>
  <div class="page2 center"><h1>test</h1></div>
  <div class="page3 center"><h1>test</h1></div>
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
