<script setup></script>

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
