<script setup>
import { ref } from 'vue'

import { kbfKeyboardJson, kbfKeymapC } from '@/kbf-parse'

import InputCard from '@/components/InputCard.vue'
import OutputCard from '@/components/OutputCard.vue'

const zipFilename = ref('keyboard')
const keyboard = ref(null)
const keymap = ref(null)

function parseKbf(filename, o) {
  zipFilename.value = filename.substring(0, filename.lastIndexOf('.'))
  keyboard.value = kbfKeyboardJson(o.keyboard)
  keymap.value = kbfKeymapC(o.keyboard)
}
</script>

<template>
  <div class="container pt-4">
    <h2>KBFirmware JSON to QMK Parser</h2>
    <h5 class="text-muted fw-light">Convert KBFirmware-format JSON files to usable QMK data</h5>
  </div>
  <div class="container mt-3">
    <InputCard @loaded-kbf="parseKbf" />
    <OutputCard
      v-if="keyboard != null"
      :zip-filename="zipFilename"
      :keyboard="keyboard"
      :keymap="keymap"
    />
    <footer class="text-muted mb-5">
      <hr />
      <p>
        <small
          >Authored by
          <a href="https://github.com/noroadsleft" target="_blank">@noroadsleft</a></small
        >
      </p>
    </footer>
  </div>
</template>
