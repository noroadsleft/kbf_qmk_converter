<script setup>
import { computed } from 'vue'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import CodeView from '@/components/CodeView.vue'

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
  keymap: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: true
  }
})

const prettyInfo = computed(() => {
  if (props.info) {
    return (
      JSON.stringify(props.info, null, '    ')
        // Place layout keys on a single line
        .replace(/\n {20,}/g, ' ')
        .replace(/\n {16,}\}/g, ' }')
        // Remove spacing
        .replace(/\{ "label"/g, '{"label"')
        .replace(/([0-9.]+) \}/g, '$1}')
        // Place matrix pin arrays on a single line
        .replace(/\n {12}"([BCDEF][0-7])"/g, ' "$1"')
        .replace(/"\n +\]/g, '" ]')
        // Remove spacing
        .replace(/\[ /g, '[')
        .replace(/ \]/g, ']') + '\n'
    )
  }

  return ''
})

function downloadZip() {
  const zip = new JSZip()

  zip.file('info.json', prettyInfo.value)
  zip.file('rules.mk', props.rules)
  zip.folder('keymaps').folder('default').file('keymap.c', props.keymap)

  zip
    .generateAsync({
      type: 'blob'
    })
    .then((content) => {
      saveAs(content, 'keyboard.zip')
    })
}
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <button
            id="tab-info"
            class="nav-link text-end active"
            type="button"
            data-bs-toggle="tab"
            data-bs-target="#tab-pane-info"
          >
            info.json
          </button>
        </li>
        <li class="nav-item">
          <button
            id="tab-info"
            class="nav-link text-end"
            type="button"
            data-bs-toggle="tab"
            data-bs-target="#tab-pane-keymap"
          >
            keymap.c
          </button>
        </li>
        <li class="nav-item">
          <button
            id="tab-info"
            class="nav-link text-end"
            type="button"
            data-bs-toggle="tab"
            data-bs-target="#tab-pane-rules"
          >
            rules.mk
          </button>
        </li>
      </ul>
      <button class="btn btn-sm btn-outline-success" @click="downloadZip">Download ZIP</button>
    </div>
    <div class="card-body">
      <div class="tab-content">
        <div id="tab-pane-info" class="tab-pane fade show active">
          <CodeView language="json" :code="prettyInfo" />
        </div>
        <div id="tab-pane-keymap" class="tab-pane fade">
          <CodeView language="cpp" :code="keymap" />
        </div>
        <div id="tab-pane-rules" class="tab-pane fade">
          <CodeView language="makefile" :code="rules" />
        </div>
      </div>
    </div>
  </div>
</template>
