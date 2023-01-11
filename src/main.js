import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'
import json from 'highlight.js/lib/languages/json'
import makefile from 'highlight.js/lib/languages/makefile'

import 'highlight.js/styles/stackoverflow-light.css'

import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('json', json)
hljs.registerLanguage('makefile', makefile)

createApp(App).use(hljsVuePlugin).mount('#app')
