<script setup>
const emit = defineEmits(['loadedKbf'])

function readFile(e) {
  const f = e.target.files[0]

  if (f) {
    const r = new FileReader()
    r.onload = (e) => {
      let json

      try {
        json = JSON.parse(e.target.result)
      } catch (ex) {
        alert("That wasn't a kbfirmware file!")
        console.log(ex)
      }

      if (json) {
        emit('loadedKbf', json)
      }
    }
    r.readAsText(f)
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <label for="file-import" class="form-label">Select a KBFirmware-formatted JSON file.</label>
      <input
        class="form-control"
        type="file"
        id="file-import"
        accesskey="u"
        accept="application/json"
        @change="readFile"
      />
      <div class="form-text">
        Supports JSON exports from kbfirmware.com, qmkeyboard.cn, and mtkeyboard.vip.<br />
        Have a problem or request? Please
        <a href="https://github.com/noroadsleft/kbf_qmk_converter/issues/new" target="_blank"
          >file an issue on GitHub</a
        >.
      </div>
    </div>
  </div>
</template>
