import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import autoprefixer from 'autoprefixer'
import image from 'svelte-image'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: seqPreprocessor([
    preprocess({
      postcss: {
        plugins: [autoprefixer()]
      }
    }),
    image({
      webpOptions: {
        quality: 90
      },
      placeholder: 'blur'
    })
  ]),

  kit: {
    adapter: adapter({
      edge: true
    })
  }
}

export default config
