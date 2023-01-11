<script setup></script>

<template>
  <div class="card">
    <div class="card-header">
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
    </div>
    <div class="card-body">
      <div class="tab-content">
        <div id="tab-pane-info" class="tab-pane fade show active"></div>
        <div id="tab-pane-keymap" class="tab-pane fade"></div>
        <div id="tab-pane-rules" class="tab-pane fade"></div>
      </div>
    </div>
  </div>
</template>
