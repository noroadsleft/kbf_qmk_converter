<script setup>
import InputCard from '@/components/InputCard.vue'
import OutputCard from '@/components/OutputCard.vue'
</script>

<template>
  <div class="bg-light p-4 mb-4 border-bottom">
    <div class="container">
      <h2>KBFirmware JSON to QMK Parser</h2>
      <h5 class="text-muted fw-light">Convert KBFirmware-format JSON files to usable QMK data</h5>
    </div>
  </div>
  <div class="container mt-3">
    <InputCard />
    <OutputCard />
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
