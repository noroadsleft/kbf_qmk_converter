<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
})

const copied = ref(false)

function copyCode() {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 5000)
  })
}
</script>

<template>
  <div class="position-relative">
    <button
      class="btn position-absolute end-0 top-0 me-3 mt-3"
      type="submit"
      :class="copied ? 'btn-success' : 'btn-outline-primary'"
      @click="copyCode"
    >
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
    <highlightjs :language="language" :code="code" class="border rounded mb-0" />
  </div>
</template>
