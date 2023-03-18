const longFormKeycodes = {
  KC_NO: 'XXXXXXX',
  KC_TRNS: '_______',
  KC_TRANSPARENT: '_______',

  // Legacy keycodes
  KC_BSPACE: 'KC_BSPC',
  KC_LBRACKET: 'KC_LBRC',
  KC_RBRACKET: 'KC_RBRC',
  KC_BSLASH: 'KC_BSLS',
  KC_SCOLON: 'KC_SCLN',
  KC_ZKHK: 'KC_GRV',
  KC_CAPSLOCK: 'KC_CAPS',
  KC_CLCK: 'KC_CAPS',
  KC_PSCREEN: 'KC_PSCR',
  KC_SCROLLLOCK: 'KC_SCRL',
  KC_SLCK: 'KC_SCRL',
  KC_PGDOWN: 'KC_PGDN',
  KC_NUMLOCK: 'KC_NUM',
  KC_NLCK: 'KC_NUM',
  KC_NONUS_BSLASH: 'KC_NUBS',
  KC_LOCKING_CAPS: 'KC_LCAP',
  KC_LOCKING_NUM: 'KC_LNUM',
  KC_LOCKING_SCROLL: 'KC_LSCR',
  KC_ALT_ERASE: 'KC_ERAS',
  KC_LCTRL: 'KC_LCTL',
  KC_LSHIFT: 'KC_LSFT',
  KC_RCTRL: 'KC_RCTL',
  KC_RSHIFT: 'KC_RSFT',

  // Basic Keycodes
  KC_ENTER: 'KC_ENT',
  KC_ESCAPE: 'KC_ESC',
  KC_SPACE: 'KC_SPC',
  KC_MINUS: 'KC_MINS',
  KC_EQUAL: 'KC_EQL',
  KC_NONUS_HASH: 'KC_NUHS',
  KC_QUOTE: 'KC_QUOT',
  KC_GRAVE: 'KC_GRV',
  KC_COMMA: 'KC_COMM',
  KC_SLASH: 'KC_SLSH',
  KC_BRMD: 'KC_SCRL',
  KC_PAUSE: 'KC_PAUS',
  KC_BRK: 'KC_PAUS',
  KC_BRMU: 'KC_PAUS',
  KC_INSERT: 'KC_INS',
  KC_DELETE: 'KC_DEL',
  KC_RIGHT: 'KC_RGHT',
  KC_KP_SLASH: 'KC_PSLS',
  KC_KP_ASTERISK: 'KC_PAST',
  KC_KP_MINUS: 'KC_PMNS',
  KC_KP_PLUS: 'KC_PPLS',
  KC_KP_ENTER: 'KC_PENT',
  KC_KP_1: 'KC_P1',
  KC_KP_2: 'KC_P2',
  KC_KP_3: 'KC_P3',
  KC_KP_4: 'KC_P4',
  KC_KP_5: 'KC_P5',
  KC_KP_6: 'KC_P6',
  KC_KP_7: 'KC_P7',
  KC_KP_8: 'KC_P8',
  KC_KP_9: 'KC_P9',
  KC_KP_0: 'KC_P0',
  KC_KP_DOT: 'KC_PDOT',
  KC_APPLICATION: 'KC_APP',
  KC_KP_EQUAL: 'KC_PEQL',
  KC_EXECUTE: 'KC_EXEC',
  KC_SELECT: 'KC_SLCT',
  KC_AGAIN: 'KC_AGIN',
  KC_PASTE: 'KC_PSTE',
  KC_KP_COMMA: 'KC_PCMM',
  KC_CLEAR: 'KC_CLR',

  // Media keys
  KC_SYSTEM_POWER: 'KC_PWR',
  KC_SYSTEM_SLEEP: 'KC_SLEP',
  KC_SYSTEM_WAKE: 'KC_WAKE',
  KC_AUDIO_MUTE: 'KC_MUTE',
  KC_AUDIO_VOL_UP: 'KC_VOLU',
  KC_AUDIO_VOL_DOWN: 'KC_VOLD',
  KC_MEDIA_NEXT_TRACK: 'KC_MNXT',
  KC_MEDIA_PREV_TRACK: 'KC_MPRV',
  KC_MEDIA_STOP: 'KC_MSTP',
  KC_MEDIA_PLAY_PAUSE: 'KC_MPLY',
  KC_MEDIA_SELECT: 'KC_MSEL',
  KC_MEDIA_EJECT: 'KC_EJCT',
  KC_CALCULATOR: 'KC_CALC',
  KC_MY_COMPUTER: 'KC_MYCM',
  KC_WWW_SEARCH: 'KC_WSCH',
  KC_WWW_HOME: 'KC_WHOM',
  KC_WWW_BACK: 'KC_WBAK',
  KC_WWW_FORWARD: 'KC_WFWD',
  KC_WWW_STOP: 'KC_WSTP',
  KC_WWW_REFRESH: 'KC_WREF',
  KC_WWW_FAVORITES: 'KC_WFAV',
  KC_MEDIA_FAST_FORWARD: 'KC_MFFD',
  KC_MEDIA_REWIND: 'KC_MRWD',
  KC_BRIGHTNESS_UP: 'KC_BRIU',
  KC_BRIGHTNESS_DOWN: 'KC_BRID',

  // Quantum
  RESET: 'QK_BOOT',
  EEPROM_RESET: 'EE_CLR',
  EEP_RST: 'EE_CLR',
  DEBUG: 'DB_TOGG',

  // Audio
  CLICKY_TOGGLE: 'CK_TOGG',
  CLICKY_UP: 'CK_UP',
  CLICKY_DOWN: 'CK_DOWN',
  CLICKY_RESET: 'CK_RST',

  // Bootmagic
  MAGIC_SWAP_CONTROL_CAPSLOCK: 'CL_SWAP',
  MAGIC_UNSWAP_CONTROL_CAPSLOCK: 'CL_NORM',
  MAGIC_CAPSLOCK_TO_CONTROL: 'CL_CTRL',
  MAGIC_UNCAPSLOCK_TO_CONTROL: 'CL_CAPS',
  MAGIC_SWAP_LCTL_LGUI: 'LCG_SWP',
  MAGIC_UNSWAP_LCTL_LGUI: 'LCG_NRM',
  MAGIC_SWAP_RCTL_RGUI: 'RCG_SWP',
  MAGIC_UNSWAP_RCTL_RGUI: 'RCG_NRM',
  MAGIC_SWAP_CTL_GUI: 'CG_SWAP',
  MAGIC_UNSWAP_CTL_GUI: 'CG_NORM',
  MAGIC_TOGGLE_CTL_GUI: 'CG_TOGG',
  MAGIC_SWAP_LALT_LGUI: 'LAG_SWP',
  MAGIC_UNSWAP_LALT_LGUI: 'LAG_NRM',
  MAGIC_SWAP_RALT_RGUI: 'RAG_SWP',
  MAGIC_UNSWAP_RALT_RGUI: 'RAG_NRM',
  MAGIC_SWAP_ALT_GUI: 'AG_SWAP',
  MAGIC_UNSWAP_ALT_GUI: 'AG_NORM',
  MAGIC_TOGGLE_ALT_GUI: 'AG_TOGG',
  MAGIC_NO_GUI: 'GUI_OFF',
  MAGIC_UNNO_GUI: 'GUI_ON',
  MAGIC_SWAP_GRAVE_ESC: 'GE_SWAP',
  MAGIC_UNSWAP_GRAVE_ESC: 'GE_NORM',
  MAGIC_SWAP_BACKSLASH_BACKSPACE: 'BS_SWAP',
  MAGIC_UNSWAP_BACKSLASH_BACKSPACE: 'BS_NORM',
  MAGIC_HOST_NKRO: 'NK_ON',
  MAGIC_UNHOST_NKRO: 'NK_OFF',
  MAGIC_TOGGLE_NKRO: 'NK_TOGG',
  MAGIC_EE_HANDS_LEFT: 'EH_LEFT',
  MAGIC_EE_HANDS_RIGHT: 'EH_RGHT',

  // Dynamic Macros
  DYN_REC_START1: 'DM_REC1',
  DYN_REC_START2: 'DM_REC2',
  DYN_MACRO_PLAY1: 'DM_PLY1',
  DYN_MACRO_PLAY2: 'DM_PLY2',
  DYN_REC_STOP: 'DM_RSTP',

  // Grave Escape
  GRAVE_ESC: 'QK_GESC',
  KC_GESC: 'QK_GESC',

  // International
  KC_HENK: 'KC_INT4',
  KC_MHEN: 'KC_INT5',

  // Mouse Keys
  KC_MS_UP: 'KC_MS_U',
  KC_MS_DOWN: 'KC_MS_D',
  KC_MS_LEFT: 'KC_MS_L',
  KC_MS_RIGHT: 'KC_MS_R',
  KC_MS_BTN1: 'KC_BTN1',
  KC_MS_BTN2: 'KC_BTN2',
  KC_MS_BTN3: 'KC_BTN3',
  KC_MS_BTN4: 'KC_BTN4',
  KC_MS_BTN5: 'KC_BTN5',
  KC_MS_WH_UP: 'KC_WH_U',
  KC_MS_WH_DOWN: 'KC_WH_D',
  KC_MS_WH_LEFT: 'KC_WH_L',
  KC_MS_WH_RIGHT: 'KC_WH_R',
  KC_MS_ACCEL0: 'KC_ACL0',
  KC_MS_ACCEL1: 'KC_ACL1',
  KC_MS_ACCEL2: 'KC_ACL2',

  // RGB Lighting
  RGB_MODE_FORWARD: 'RGB_MOD',
  RGB_MODE_REVERSE: 'RGB_RMOD',
  RGB_MODE_PLAIN: 'RGB_M_P',
  RGB_MODE_BREATHE: 'RGB_M_B',
  RGB_MODE_RAINBOW: 'RGB_M_R',
  RGB_MODE_SWIRL: 'RGB_M_SW',
  RGB_MODE_SNAKE: 'RGB_M_SN',
  RGB_MODE_KNIGHT: 'RGB_M_K',
  RGB_MODE_XMAS: 'RGB_M_X',
  RGB_MODE_GRADIENT: 'RGB_M_G',
  RGB_MODE_RGBTEST: 'RGB_M_T',

  // US ANSI Shifted Symbols
  KC_TILDE: 'KC_TILD',
  KC_EXCLAIM: 'KC_EXLM',
  KC_DOLLAR: 'KC_DLR',
  KC_PERCENT: 'KC_PERC',
  KC_CIRCUMFLEX: 'KC_CIRC',
  KC_AMPERSAND: 'KC_AMPR',
  KC_ASTERISK: 'KC_ASTR',
  KC_LEFT_PAREN: 'KC_LPRN',
  KC_RIGHT_PAREN: 'KC_RPRN',
  KC_UNDERSCORE: 'KC_UNDS',
  KC_LEFT_CURLY_BRACE: 'KC_LCBR',
  KC_RIGHT_CURLY_BRACE: 'KC_RCBR',
  KC_COLON: 'KC_COLN',
  KC_DOUBLE_QUOTE: 'KC_DQUO',
  KC_DQT: 'KC_DQUO',
  KC_LEFT_ANGLE_BRACKET: 'KC_LT',
  KC_LABK: 'KC_LT',
  KC_RIGHT_ANGLE_BRACKET: 'KC_GT',
  KC_RABK: 'KC_GT',
  KC_QUESTION: 'KC_QUES',

  // Unicode
  UNICODE_MODE_FORWARD: 'UC_NEXT',
  UNICODE_MODE_REVERSE: 'UC_PREV',
  UC_MOD: 'UC_NEXT',
  UC_RMOD: 'UC_PREV',
  UC_M_OS: 'UC_MAC',
  UC_M_MA: 'UC_MAC',
  UC_M_LN: 'UC_LINX',
  UC_M_WI: 'UC_WIN',
  UC_M_BS: 'UC_BSD',
  UC_M_WC: 'UC_WINC',
  UNICODE_MODE_OSX: 'UC_MAC',
  UNICODE_MODE_MAC: 'UC_MAC',
  UNICODE_MODE_LNX: 'UC_LINX',
  UNICODE_MODE_WIN: 'UC_WIN',
  UNICODE_MODE_BSD: 'UC_BSD',
  UNICODE_MODE_WINC: 'UC_WINC'
}

const mcus = ['atmega32u2', 'atmega32u4', 'at90usb1286']

function parseProcessor(o) {
  return mcus[o.controller]
}

function parseBootloader(o) {
  switch (o.settings.bootloaderSize) {
    case 0: // 512kB
      return 'halfkay'
    case 1: // 2048kB (should actually be 1024kB)
      if (mcus[o.controller] == 'at90usb1286') {
        return 'halfkay'
      }
      break
  }

  return 'atmel-dfu'
}

function parseDiodeDirection(o) {
  switch (o.settings.diodeDirection) {
    case 0:
      return 'COL2ROW'
    case 1:
      return 'ROW2COL'
  }
}

function parseBootmagic(o) {
  if (o.settings.chooseBootmagic != null) {
    // QMKeyboard.cn
    return o.settings.chooseBootmagic != 1
  } else if (o.settings.bootMagic != null) {
    // mtkeyboard.vip
    return !!o.settings.bootMagic
  }

  return true
}

function parseMousekey(o) {
  if (o.settings.chooseMousekey != null) {
    // QMKeyboard.cn
    return !o.settings.chooseMousekey
  } else if (o.settings.mouseKey != null) {
    // mtkeyboard.vip
    return !!o.settings.mouseKey
  }

  return true
}

function parseExtrakey(o) {
  if (o.settings.chooseExtrakey != null) {
    // QMKeyboard.cn
    return !o.settings.chooseExtrakey
  }

  return true
}

function parseKeyLock(o) {
  if (o.settings.choosekeylock != null) {
    // QMKeyboard.cn
    return !o.settings.choosekeylock
  } else if (o.settings.keyLock != null) {
    // mtkeyboard.vip
    return !!o.settings.keyLock
  }

  return false
}

function parseFeatures(o) {
  return {
    bootmagic: parseBootmagic(o),
    mousekey: parseMousekey(o),
    extrakey: parseExtrakey(o),
    console: false,
    command: false,
    nkro: false,
    backlight: o.pins.led != null,
    rgblight: o.pins.rgb != null,
    audio: false,
    key_lock: parseKeyLock(o)
  }
}

function parseBacklight(o) {
  return {
    pin: o.pins.led,
    levels: o.settings.backlightLevels,
    breathing: false
  }
}

function parseRGBlight(o) {
  return {
    pin: o.pins.rgb,
    led_count: o.settings.rgbNum,
    hue_steps: 8,
    saturation_steps: 8,
    brightness_steps: 8,
    max_brightness: 255,
    sleep: true,
    animations: {
      all: true
    }
  }
}

function parseIndicators(o) {
  let indicators = {}

  if (o.pins.num) {
    indicators.num_lock = o.pins.num
  }

  if (o.pins.caps) {
    indicators.caps_lock = o.pins.caps
  }

  if (o.pins.scroll) {
    indicators.scroll_lock = o.pins.scroll
  }

  return indicators
}

function parseLayout(o) {
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUV'

  return o.keys.map((k, i) => {
    const row = o.pins.row[k.row]
    const col = o.pins.col[k.col]
    const label = `K${digits[o.keys[i].row]}${digits[o.keys[i].col]} (${row},${col})`
    const { x, y, w, h } = k.state

    let key = {
      label,
      matrix: [k.row, k.col],
      x: +x.toFixed(3),
      y: +y.toFixed(3)
    }

    if (w != 1) {
      key.w = +w.toFixed(3)
    }

    if (h != 1) {
      key.h = +h.toFixed(3)
    }

    return key
  })
}

function kbfInfoJson(o) {
  let infoJson = {
    keyboard_name: o.settings.name,
    manufacturer: '',
    url: '',
    maintainer: 'qmk',
    usb: {
      vid: '0xFEED',
      pid: '0x0000',
      device_version: '1.0.0'
    },
    processor: parseProcessor(o),
    bootloader: parseBootloader(o),
    matrix_pins: {
      rows: o.pins.row,
      cols: o.pins.col
    },
    diode_direction: parseDiodeDirection(o),
    features: parseFeatures(o)
  }

  if (o.pins.led) {
    infoJson.backlight = parseBacklight(o)
  }

  if (o.pins.rgb) {
    infoJson.rgblight = parseRGBlight(o)
  }

  if (o.pins.caps || o.pins.num || o.pins.scroll) {
    infoJson.indicators = parseIndicators(o)
  }

  infoJson.layouts = {
    LAYOUT: {
      layout: parseLayout(o)
    }
  }

  infoJson.meta = 'https://noroadsleft.github.io/kbf_qmk_converter/'

  return infoJson
}

function parseSimpleLayerKey(key) {
  const layer = key.fields[0]

  return key.id.replace(/\(\)/, `(${layer})`)
}

function parseLayerTap(key) {
  const layer = key.fields[0]
  const kc = key.fields[1].id

  return `LT(${layer}, ${kc})`
}

function parseModifierMask(mask) {
  let mods = []

  // bitfield:
  //  5  4  3  2  1  0
  // 32 16  8  4  2  1
  // [M][H][G][A][S][C]

  if (mask == 0xf || mask == 0x10) {
    return 'MOD_HYPR'
  } else if (mask == 0x7 || mask == 0x20) {
    return 'MOD_MEH'
  }

  if (mask & 1) {
    mods.push('MOD_LCTL')
  }
  if (mask & 2) {
    mods.push('MOD_LSFT')
  }
  if (mask & 4) {
    mods.push('MOD_LALT')
  }
  if (mask & 8) {
    mods.push('MOD_LGUI')
  }

  return mods.join(' | ')
}

function parseLayerMod(key) {
  const layer = key.fields[0]
  const mod_mask = parseModifierMask(key.fields[1])

  return `LM(${layer}, ${mod_mask})`
}

function parseModTap(key) {
  const mod_mask = parseModifierMask(key.fields[0])
  const kc = key.fields[1].id

  return `MT(${mod_mask}, ${kc})`
}

function parseModTapShortcut(key) {
  const kc = key.fields[0].id

  return key.id.replace(/\(\)/, `(${kc})`)
}

function parseModifiedKey(key, depth = 0) {
  if (depth <= 5 && key.fields.length > 0 && 'id' in key.fields[0]) {
    return key.id.replace(/\(\)/, `(${parseModifiedKey(key.fields[0], depth + 1)})`)
  }

  return key.id
}

function parseKeycode(key) {
  switch (key.id) {
    case 'M()':
      return '_______'
    case 'MO()':
    case 'TG()':
    case 'TO()':
    case 'TT()':
    case 'DF()':
    case 'OSL()':
      return parseSimpleLayerKey(key)
    case 'OSM()':
      return ''
    case 'LT()':
      return parseLayerTap(key)
    case 'LM()':
      return parseLayerMod(key)
    case 'MT()':
      return parseModTap(key)
    case 'CTL_T()':
    case 'SFT_T()':
    case 'ALT_T()':
    case 'GUI_T()':
    case 'CMD_T()':
    case 'WIN_T()':
    case 'LCTL_T()':
    case 'LSFT_T()':
    case 'LALT_T()':
    case 'LOPT_T()':
    case 'LGUI_T()':
    case 'LCMD_T()':
    case 'LWIN_T()':
    case 'RCTL_T()':
    case 'RSFT_T()':
    case 'RALT_T()':
    case 'ALGR_T()':
    case 'RGUI_T()':
    case 'RCMD_T()':
    case 'RWIN_T()':
    case 'C_S_T()':
    case 'MEH_T()':
    case 'ALL_T()':
      return parseModTapShortcut(key)
    case 'C()':
    case 'S()':
    case 'A()':
    case 'G()':
    case 'LCTL()':
    case 'LSFT()':
    case 'LALT()':
    case 'LOPT()':
    case 'LGUI()':
    case 'LCMD()':
    case 'LWIN()':
    case 'RCTL()':
    case 'RSFT()':
    case 'RALT()':
    case 'ROPT()':
    case 'ALGR()':
    case 'RGUI()':
    case 'RCMD()':
    case 'RWIN()':
    case 'SCMD()':
    case 'SWIN()':
    case 'LCAG()':
    case 'MEH()':
    case 'HYPR()':
      return parseModifiedKey(key)
    default:
      if (key.id in longFormKeycodes) {
        return longFormKeycodes[key.id]
      }
      return key.id
  }
}

function parseKeymap(o) {
  let keymap = []

  for (let l = 0; l < o.keys[0].keycodes.length; l++) {
    let layer = []
    let transparentKeyCount = 0

    let line = []

    o.keys.forEach((k, i) => {
      const keycode = parseKeycode(k.keycodes[l])

      if (keycode == '_______') {
        transparentKeyCount++
      }

      line.push(keycode)

      if (
        i == o.keys.length - 1 ||
        (k.state.x > o.keys[i + 1].state.x && k.state.y < o.keys[i + 1].state.y - 0.5)
      ) {
        layer.push(line)
        line = []
      }
    })

    if (transparentKeyCount < o.keys.length) {
      keymap.push(layer)
    }
  }

  return keymap
}

function kbfKeymapC(o) {
  const keymap = parseKeymap(o)

  const layers = keymap.map((layer, i) => {
    const lines = layer.map((line, j) => {
      const keycodes = line.map((keycode, k) => {
        // Don't add trailing space if we are on the last keycode of the line
        if (k == keymap[i][j].length - 1) {
          // Don't add comma if we are on the last keycode of the last line
          if (j == keymap[i].length - 1) {
            return keycode
          }

          return `${keycode},`
        }

        return `${keycode}, `.padEnd(9)
      })

      return `        ${keycodes.join('')}`
    })

    return `    [${i}] = LAYOUT(
${lines.join('\n')}
    )`
  })

  return `// Copyright ${new Date().getFullYear()} %YOUR_FULL_NAME% (@%YOUR_GITHUB_USERNAME%)
// SPDX-License-Identifier: GPL-2.0-or-later

#include QMK_KEYBOARD_H

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
${layers.join(',\n')}
};
`
}

export { kbfInfoJson, kbfKeymapC }
