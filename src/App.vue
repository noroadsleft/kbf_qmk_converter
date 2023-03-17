<script setup>
import { ref } from 'vue'

import { kbfInfoJson, kbfKeymapC } from '@/kbf-parse'

import InputCard from '@/components/InputCard.vue'
import OutputCard from '@/components/OutputCard.vue'

const zipFilename = ref('keyboard')
const info = ref(null)
const keymap = ref(null)
const rules = ref('# This file intentionally left blank\n')

function parseKbf(filename, o) {
  zipFilename.value = filename.substring(0, filename.lastIndexOf('.'))
  info.value = kbfInfoJson(o.keyboard)
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
      v-if="info != null"
      :zip-filename="zipFilename"
      :info="info"
      :keymap="keymap"
      :rules="rules"
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
