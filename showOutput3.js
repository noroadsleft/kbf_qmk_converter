console.log( "Running showOutput3.js..." );

const year = new Date().getFullYear();

/***************************************
** https://stackoverflow.com/a/987376 **
***************************************/
function selectElementText(el, win) {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}

//selectElementText(document.getElementById("someElement"));
//selectElementText(elementInIframe, iframe.contentWindow);
function highlightTab(tab) {
    var el = document.getElementsByClassName('panel3')[0].getElementsByTagName('ul')[0];
    for ( i=0; i<el.getElementsByTagName('li').length; i++ ) {
        if ( el.getElementsByTagName('li')[i].getAttribute('id') == "c_"+tab ) {
            el.getElementsByTagName('li')[i].setAttribute('class', "selected");
        } else {
            el.getElementsByTagName('li')[i].removeAttribute('class');
        }
    }
}

// https://stackoverflow.com/a/14880260
String.prototype.replaceBetween = function(start, end, new_string) {
  return this.substring(0, start) + new_string + this.substring(end);
};


document.getElementById("c_config").addEventListener(
    "click",
    function(){
        output("config.h");
        highlightTab("config");
    }
);
document.getElementById("c_rules").addEventListener(
    "click",
    function(){
        output("rules.mk");
        highlightTab("rules");
    }
);
document.getElementById("c_keyboard_c").addEventListener(
    "click",
    function(){
        output("keyboard.c");
        highlightTab("keyboard_c");
    }
);
document.getElementById("c_board").addEventListener(
    "click",
    function(){
        output("keyboard.h");
        highlightTab("board");
    }
);
document.getElementById("c_keymap").addEventListener(
    "click",
    function(){
        output("keymap.c");
        highlightTab("keymap");
    }
);
document.getElementById("c_info").addEventListener(
    "click",
    function(){
        output("info.json");
        highlightTab("info");
    }
);


document.getElementById('copy').addEventListener(
    "click",
    function() {
        document.execCommand('copy');
        var filename = document.getElementsByClassName('selected')[0].innerHTML.replace(/&[lg]t;/g, "");
        var status = document.getElementById('status');
        var notice = document.createTextNode(filename +' contents copied to clipboard.');
        status.innerHTML = "";
        status.appendChild(notice);
        status.setAttribute('style', "display: block;");
    }
);

const longFormKeycodes = {
    KC_TRANSPARENT: 'KC_TRNS',
    _______: 'KC_TRNS',
    XXXXXXX: 'KC_NO',

    // Basic Keycodes
    KC_ENTER: 'KC_ENT',
    KC_ESCAPE: 'KC_ESC',
    KC_BSPACE: 'KC_BSPC',
    KC_SPACE: 'KC_SPC',
    KC_MINUS: 'KC_MINS',
    KC_EQUAL: 'KC_EQL',
    KC_LBRACKET: 'KC_LBRC',
    KC_RBRACKET: 'KC_RBRC',
    KC_BSLASH: 'KC_BSLS',
    KC_NONUS_HASH: 'KC_NUHS',
    KC_SCOLON: 'KC_SCLN',
    KC_QUOTE: 'KC_QUOT',
    KC_GRAVE: 'KC_GRV',
    KC_ZKHK: 'KC_GRV',
    KC_COMMA: 'KC_COMM',
    KC_SLASH: 'KC_SLSH',
    KC_CAPSLOCK: 'KC_CAPS',
    KC_CLCK: 'KC_CAPS',
    KC_PSCREEN: 'KC_PSCR',
    KC_SCROLLLOCK: 'KC_SLCK',
    KC_BRMD: 'KC_SLCK',
    KC_PAUSE: 'KC_PAUS',
    KC_BRK: 'KC_PAUS',
    KC_BRMU: 'KC_PAUS',
    KC_INSERT: 'KC_INS',
    KC_DELETE: 'KC_DEL',
    KC_PGDOWN: 'KC_PGDN',
    KC_RIGHT: 'KC_RGHT',
    KC_NUMLOCK: 'KC_NLCK',
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
    KC_NONUS_BSLASH: 'KC_NUBS',
    KC_APPLICATION: 'KC_APP',
    KC_KP_EQUAL: 'KC_PEQL',
    KC_EXECUTE: 'KC_EXEC',
    KC_SELECT: 'KC_SLCT',
    KC_AGAIN: 'KC_AGIN',
    KC_PASTE: 'KC_PSTE',
    KC_LOCKING_CAPS: 'KC_LCAP',
    KC_LOCKING_NUM: 'KC_LNUM',
    KC_LOCKING_SCROLL: 'KC_LSCR',
    KC_KP_COMMA: 'KC_PCMM',
    KC_INT1: 'KC_RO',
    KC_INT2: 'KC_KANA',
    KC_INT3: 'KC_JYEN',
    KC_INT4: 'KC_HENK',
    KC_INT5: 'KC_MHEN',
    KC_LANG1: 'KC_HAEN',
    KC_LANG2: 'KC_HANJ',
    KC_ALT_ERASE: 'KC_ERAS',
    KC_CLEAR: 'KC_CLR',
    KC_LCTRL: 'KC_LCTL',
    KC_LSHIFT: 'KC_LSFT',
    KC_LCMD: 'KC_LGUI',
    KC_LWIN: 'KC_LGUI',
    KC_RCTRL: 'KC_RCTL',
    KC_RSHIFT: 'KC_RSFT',
    KC_ALGR: 'KC_RALT',
    KC_RCMD: 'KC_RGUI',
    KC_RWIN: 'KC_RGUI',
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
    EEPROM_RESET: 'EEP_RST',

    // Audio Keys
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
    GRAVE_ESC: 'KC_GESC',

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

    // Modifiers
    // Change short-form mod wrappers to long-form
    // e.g. C(kc) to LCTL(kc)
    C: 'LCTL',
    S: 'LSFT',
    A: 'LALT',
    G: 'LGUI',
    LCMD: 'LGUI',
    LWIN: 'LGUI',
    ALGR: 'RALT',
    RCMD: 'RGUI',
    RWIN: 'RGUI',
    SCMD: 'SGUI',
    SWIN: 'SGUI',

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

    // Unicode Support
    UNICODE_MODE_FORWARD: 'UC_MOD',
    UNICODE_MODE_REVERSE: 'UC_RMOD',
    UNICODE_MODE_OSX: 'UC_M_OS',
    UNICODE_MODE_LNX: 'UC_M_LN',
    UNICODE_MODE_WIN: 'UC_M_WI',
    UNICODE_MODE_BSD: 'UC_M_BS',
    UNICODE_MODE_WINC: 'UC_M_WC'
};


document.getElementById('submit').addEventListener(
    "click",
    function() {

        var preElement = document.getElementById('editor');
        var jsonData = document.getElementById('input').value;
        var base32hex = "0123456789ABCDEFGHIJKLMNOPQRSTUV";

        // create an object of our JSON data
        var obj = JSON.parse(JSON.stringify(eval("(" + jsonData + ")")));

        var keyCount = obj.keyboard.keys.length;

        // keymap is an array that holds our keymap
        // 16 layers, the maximum supported by kbfirmware
        var keymap = [
            [], [], [], [],
            [], [], [], [],
            [], [], [], [],
            [], [], [], [],
        ];
        var kb = obj.keyboard;

        // Matrix dimensions
        var matrix_rows = obj.keyboard.rows;
        var matrix_cols = obj.keyboard.cols;
        var layerCount = obj.keyboard.keys[0].keycodes.length;

        // Physical dimensions of the keyboard
        var kbHeight = obj.keyboard.bounds.max.y;
        var kbWidth = obj.keyboard.bounds.max.x;

        // keymap.c layer dimensions
        var keymapHeight = Math.floor( kbHeight + 0 );
        var keymapWidth = Math.floor( kbWidth + 0 );

        var baseData = [
            "Keyboard Name: "+ kb.settings.name,
            "Matrix Rows: "+ matrix_rows,
            "Matrix Columns: "+ matrix_cols,
            "Layer Count: "+ layerCount
        ];
        console.log( baseData.join(' | ') );

        /*************
        ** config.h **
        *************/

        /* Capture Diode Direction */
        var dd;
        switch ( obj.keyboard.settings.diodeDirection ) {
            case 0:
                dd = "COL2ROW";
                break;
            case 1:
                dd = "ROW2COL";
                break;
            case 2:
                dd = "CUSTOM_MATRIX";
        }

        var configOutput = [
            "/* Copyright "+ year +" REPLACE_WITH_YOUR_NAME",
            " *",
            " * This program is free software: you can redistribute it and/or modify",
            " * it under the terms of the GNU General Public License as published by",
            " * the Free Software Foundation, either version 2 of the License, or",
            " * (at your option) any later version.",
            " *",
            " * This program is distributed in the hope that it will be useful,",
            " * but WITHOUT ANY WARRANTY; without even the implied warranty of",
            " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the",
            " * GNU General Public License for more details.",
            " *",
            " * You should have received a copy of the GNU General Public License",
            " * along with this program.  If not, see &lt;http://www.gnu.org/licenses/>.",
            " */",
            "",
            "#pragma once",
            "",
            "#include \"config_common.h\"",
            "",
            "/* USB Device descriptor parameter */",
            "#define VENDOR_ID       0xFEED",
            "#define PRODUCT_ID      0x0000",
            "#define DEVICE_VER      0x0001",
            "#define MANUFACTURER    %MANUFACTURER%",
            "#define PRODUCT         " + obj.keyboard.settings.name + "",
            "",
            "/* key matrix size */",
            "#define MATRIX_ROWS " + matrix_rows,
            "#define MATRIX_COLS " + matrix_cols + "",
            "",
            "/*",
            " * Keyboard Matrix Assignments",
            " *",
            " * Change this to how you wired your keyboard",
            " * COLS: AVR pins used for columns, left to right",
            " * ROWS: AVR pins used for rows, top to bottom",
            " * DIODE_DIRECTION: COL2ROW = COL = Anode (+), ROW = Cathode (-, marked on diode)",
            " *                  ROW2COL = ROW = Anode (+), COL = Cathode (-, marked on diode)",
            " *",
            " */",
            "#define MATRIX_ROW_PINS { " + obj.keyboard.pins.row.toString().split(',').join(', ') + " }",
            "#define MATRIX_COL_PINS { " + obj.keyboard.pins.col.toString().split(',').join(', ') + " }",
            "",
            "#define DIODE_DIRECTION " + dd + "",
            ""
        ];

        if ( obj.keyboard.pins.led ) {
            configOutput.push(
                "#define BACKLIGHT_PIN " + obj.keyboard.pins.led,
                "// #define BACKLIGHT_BREATHING",
                "#define BACKLIGHT_LEVELS " + obj.keyboard.settings.backlightLevels,
                ""
            );
        }

        if ( obj.keyboard.settings.rgbVol != null ) {
            var rgbValMax = obj.keyboard.settings.rgbVol;
        } else if ( obj.keyboard.settings.rgbLimit != null ) {
            var rgbValMax = obj.keyboard.settings.rgbLimit;
        }

        if ( obj.keyboard.pins.rgb ) {
            configOutput.push(
                "#define RGB_DI_PIN " + obj.keyboard.pins.rgb + "",
                "#ifdef RGB_DI_PIN",
                "    #define RGBLED_NUM " + obj.keyboard.settings.rgbNum,
                "    #define RGBLIGHT_HUE_STEP 8",
                "    #define RGBLIGHT_SAT_STEP 8",
                "    #define RGBLIGHT_VAL_STEP 8",
                "    #define RGBLIGHT_LIMIT_VAL "+ rgbValMax +" /* The maximum brightness level */",
                "    #define RGBLIGHT_SLEEP  /* If defined, the RGB lighting will be switched off when the host goes to sleep */",
                "/*== all animations enable ==*/",
                "    #define RGBLIGHT_ANIMATIONS",
                "// /*== or choose animations ==*/",
                "//     #define RGBLIGHT_EFFECT_BREATHING",
                "//     #define RGBLIGHT_EFFECT_RAINBOW_MOOD",
                "//     #define RGBLIGHT_EFFECT_RAINBOW_SWIRL",
                "//     #define RGBLIGHT_EFFECT_SNAKE",
                "//     #define RGBLIGHT_EFFECT_KNIGHT",
                "//     #define RGBLIGHT_EFFECT_CHRISTMAS",
                "//     #define RGBLIGHT_EFFECT_STATIC_GRADIENT",
                "//     #define RGBLIGHT_EFFECT_RGB_TEST",
                "//     #define RGBLIGHT_EFFECT_ALTERNATING",
                "#endif"
            );
        }
        configOutput.push(
            "",
            "// generated by KBFirmware JSON to QMK Parser",
            "// https://noroadsleft.github.io/kbf_qmk_converter/"
        );

        /*************
        ** rules.mk **
        *************/
        /*
            MCU = atmega32u4
            F_CPU = 16000000
            ARCH = AVR8
            F_USB = $(F_CPU)
            OPT_DEFS += -DINTERRUPT_CONTROL_ENDPOINT
        */
        var Controllers = ["atmega32u2", "atmega32u4", "at90usb1286"];
        var MicroController = Controllers[obj.keyboard.controller];

        /* BOOTMAGIC_ENABLE */
        if ( obj.keyboard.settings.chooseBootMagic != null ) {
            // QMKeyboard.cn export
            switch ( obj.keyboard.settings.chooseBootMagic ) {
                case 0:
                    var BootmagicEnable = "full";
                    break;
                case 1:
                    var BootmagicEnable = "no  ";
                    break;
                case 2:
                    var BootmagicEnable = "lite";
                    break;
            }
        }
        else if ( obj.keyboard.settings.bootMagic != null ) {
            // mtkeyboard.vip export
            switch ( obj.keyboard.settings.bootMagic ) {
                case 0:
                    var BootmagicEnable = "no  ";
                    break;
                case 1:
                    var BootmagicEnable = "lite";
                    break;
                case 2:
                    var BootmagicEnable = "full";
                    break;
            }
        }
        else {
            var BootmagicEnable = "lite";
        }

        /* MOUSEKEY_ENABLE */
        if ( obj.keyboard.settings.chooseMousekey != null ) {
            // QMKeyboard.cn export
            switch ( obj.keyboard.settings.chooseMousekey ) {
                case 0:
                    var MousekeyEnable = "yes";
                    break;
                case 1:
                    var MousekeyEnable = "no ";
                    break;
            }
        }
        else if ( obj.keyboard.settings.mouseKey != null ) {
            // mtkeyboard.vip export
            switch ( obj.keyboard.settings.mouseKey ) {
                case 0:
                    var MousekeyEnable = "no ";
                    break;
                case 1:
                    var MousekeyEnable = "yes";
                    break;
            }
        }
        else {
            var MousekeyEnable = "yes";
        }

        /* EXTRAKEY_ENABLE */
        if ( obj.keyboard.settings.chooseExtrakey != null ) {
            switch ( obj.keyboard.settings.chooseExtrakey ) {
                case 0:
                    var ExtrakeyEnable = "yes";
                    break;
                case 1:
                    var ExtrakeyEnable = "no ";
                    break;
            }
        }
        else {
            var ExtrakeyEnable = "yes";
        }

        /* KEY_LOCK_ENABLE */
        if ( obj.keyboard.settings.choosekeylock != null ) {
            // QMKeyboard.cn export
            switch ( obj.keyboard.settings.choosekeylock ) {
                case 0:
                    var KeyLockEnable = "yes";
                    break;
                case 1:
                    var KeyLockEnable = "no ";
                    break;
            }
        }
        else if ( obj.keyboard.settings.keyLock != null ) {
            // mtkeyboard.vip export
            switch ( obj.keyboard.settings.keyLock ) {
                case 0:
                    var KeyLockEnable = "no ";
                    break;
                case 1:
                    var KeyLockEnable = "yes";
                    break;
            }
        }

        var rulesOutput = [
            "# MCU name",
            "MCU = "+ MicroController,
            "",
            "# Bootloader selection",
            "BOOTLOADER = atmel-dfu",
            "",
            "# Build Options",
            "#   change yes to no to disable",
            "#",
            "BOOTMAGIC_ENABLE = "+ BootmagicEnable +"     # Virtual DIP switch configuration",
            "MOUSEKEY_ENABLE = "+ MousekeyEnable +"       # Mouse keys",
            "EXTRAKEY_ENABLE = "+ ExtrakeyEnable +"       # Audio control and System control",
            "CONSOLE_ENABLE = yes        # Console for debug",
            "COMMAND_ENABLE = yes        # Commands for debug and configuration",
            "# Do not enable SLEEP_LED_ENABLE. it uses the same timer as BACKLIGHT_ENABLE",
            "SLEEP_LED_ENABLE = no       # Breathing sleep LED during USB suspend",
            "# if this doesn't work, see here: https://github.com/tmk/tmk_keyboard/wiki/FAQ#nkro-doesnt-work",
            "NKRO_ENABLE = no            # USB Nkey Rollover"
        ];
        rulesOutput.push( [ "BACKLIGHT_ENABLE = ", ( ( obj.keyboard.pins.led != null ) ? "yes" : "no " ), "      # Enable keyboard backlight functionality"].join('') );
        rulesOutput.push( [ "RGBLIGHT_ENABLE = ", ( ( obj.keyboard.pins.rgb != null ) ? "yes" : "no " ), "       # Enable keyboard RGB underglow"].join('') );
        rulesOutput.push(
            "BLUETOOTH_ENABLE = no       # Enable Bluetooth",
            "AUDIO_ENABLE = no           # Audio output",
        );
        if ( KeyLockEnable ) {
            rulesOutput.push(
                "",
                "KEY_LOCK_ENABLE = "+ KeyLockEnable +"     # Enable KC_LOCK support"
            );
        }
        rulesOutput.push(
            "",
            "# generated by KBFirmware JSON to QMK Parser",
            "# https://noroadsleft.github.io/kbf_qmk_converter/"
        );


        /***************
        ** keyboard.c **
        ***************/
        var matrix = new Array(matrix_rows);

        for ( row = 0; row < matrix_rows; row++ ) {
            matrix[row] = new Array(matrix_cols);
            for ( col = 0; col < matrix_cols; col++ ) {
                matrix[row][col] = "KC_NO";
            }
        }
        //console.log( matrix );
        var keyboardCOutput = [
            "/* Copyright "+ year +" REPLACE_WITH_YOUR_NAME",
            " *",
            " * This program is free software: you can redistribute it and/or modify",
            " * it under the terms of the GNU General Public License as published by",
            " * the Free Software Foundation, either version 2 of the License, or",
            " * (at your option) any later version.",
            " *",
            " * This program is distributed in the hope that it will be useful,",
            " * but WITHOUT ANY WARRANTY; without even the implied warranty of",
            " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the",
            " * GNU General Public License for more details.",
            " *",
            " * You should have received a copy of the GNU General Public License",
            " * along with this program.  If not, see &lt;http://www.gnu.org/licenses/>.",
            " */",
            "",
            "#include \"%KEYBOARD%.h\""
        ];
        keyboardCOutput.push(
            "",
            "// generated by KBFirmware JSON to QMK Parser",
            "// https://noroadsleft.github.io/kbf_qmk_converter/"
        );

        /***************
        ** keyboard.h **
        ***************/
        var matrix = new Array(matrix_rows);

        for ( row = 0; row < matrix_rows; row++ ) {
            matrix[row] = new Array(matrix_cols);
            for ( col = 0; col < matrix_cols; col++ ) {
                matrix[row][col] = "KC_NO";
            }
        }
        //console.log( matrix );
        var layoutMacroOutput = [
            "/* Copyright "+ year +" REPLACE_WITH_YOUR_NAME",
            " *",
            " * This program is free software: you can redistribute it and/or modify",
            " * it under the terms of the GNU General Public License as published by",
            " * the Free Software Foundation, either version 2 of the License, or",
            " * (at your option) any later version.",
            " *",
            " * This program is distributed in the hope that it will be useful,",
            " * but WITHOUT ANY WARRANTY; without even the implied warranty of",
            " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the",
            " * GNU General Public License for more details.",
            " *",
            " * You should have received a copy of the GNU General Public License",
            " * along with this program.  If not, see &lt;http://www.gnu.org/licenses/>.",
            " */",
            "",
            "#pragma once",
            "",
            "#include \"quantum.h\"",
            "",
            "#define LAYOUT( \\",
            ") { \\",
            "}"
        ];
        layoutMacroOutput.push(
            "",
            "// generated by KBFirmware JSON to QMK Parser",
            "// https://noroadsleft.github.io/kbf_qmk_converter/"
        );


        /*************
        ** keymap.c **
        *************/
        var customKeycodes = [];

        var keymapData = "";
        var keymap_line_indent = 8;

        // File header
        var keymapOutput = [
            "/* Copyright "+ year +" REPLACE_WITH_YOUR_NAME",
            " *",
            " * This program is free software: you can redistribute it and/or modify",
            " * it under the terms of the GNU General Public License as published by",
            " * the Free Software Foundation, either version 2 of the License, or",
            " * (at your option) any later version.",
            " *",
            " * This program is distributed in the hope that it will be useful,",
            " * but WITHOUT ANY WARRANTY; without even the implied warranty of",
            " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the",
            " * GNU General Public License for more details.",
            " *",
            " * You should have received a copy of the GNU General Public License",
            " * along with this program.  If not, see &lt;http://www.gnu.org/licenses/>.",
            " */",
            "",
            "#include QMK_KEYBOARD_H",
            "",
        ];

        var layerCount = obj.keyboard.keys[0].keycodes.length;
        for ( layer=0; layer<layerCount; layer++ ) {
            //console.log( "Processing Layer "+ layer +"..." );
            var layerData_prefix = "    ["+ layer +"] = LAYOUT(\n";
            var layerData2 = "";
            layerData_rowOffset = Math.ceil( kbWidth * 9 ) + 1;
            for ( i=0; i<keymapHeight; i++ ) {
                layerData2 +=
                    //" ".repeat(8) +
                    " ".repeat( layerData_rowOffset - 1 ) + "\\"
                ;
            }
            var transCodes = 0;

            /*
             * append is the code that will actually go in the layer
             */
            for ( key=0; key<keyCount; key++ ) {
                var matrixRow = obj.keyboard.keys[key].row;
                var matrixCol = obj.keyboard.keys[key].col;
                var keycode = obj.keyboard.keys[key].keycodes[layer].id;
                switch ( keycode ) {
                    case "MO()":
                    case "TG()":
                    case "TO()":
                    case "TT()":
                    case "DF()":
                    case "OSL()":
                    case "M()":
                        var append = keycode.replace(/\(\)/, "("+ kb.keys[key].keycodes[layer].fields[0] +")");
                        break;

                    case "LT()":
                        var lt_layer = kb.keys[key].keycodes[layer].fields[0];
                        var lt_kc = kb.keys[key].keycodes[layer].fields[1].id;
                        var shortCode = keycode.replace(/\(\)/, "(" + lt_layer + ", " + lt_kc + ")");
                        var append = "LT" + lt_layer + "_" + lt_kc.substr(0, 6).replace(/KC_/, "");
                        customKeycodes.push( "#define "+ append + " ".repeat(12 - append.length) + shortCode );
                        break;

                    case "LM()":
                        var lm_layer = kb.keys[key].keycodes[layer].fields[0]; // Target Layer
                        var lm_mod = kb.keys[key].keycodes[layer].fields[1]; // Mod Mask
                        var bitflags = "0".repeat( 6 - (lm_mod).toString(2).length ) + (lm_mod).toString(2);
                        var suffix = "";
                        var mods = [];
                        /* 32 16 8 4 2 1
                           15 = HYPR ( LCTL+LSFT+LALT+LGUI )
                           7  = MEH ( LCTL+LSFT+LALT )
                        */
                        if ( bitflags.substr(5, 1) == 1 ) { mods.push( "MOD_LCTL" ); suffix += "C"  ; }
                        if ( bitflags.substr(4, 1) == 1 ) { mods.push( "MOD_LSFT" ); suffix += "S"  ; }
                        if ( bitflags.substr(3, 1) == 1 ) { mods.push( "MOD_LALT" ); suffix += "A"  ; }
                        if ( bitflags.substr(2, 1) == 1 ) { mods.push( "MOD_LGUI" ); suffix += "G"  ; }
                        if ( bitflags.substr(0, 1) == 1 ) { mods.push( "MOD_MEH"  ); suffix = "MEH" ; }
                        if ( bitflags.substr(1, 1) == 1 ) { mods.push( "MOD_HYPR" ); suffix = "HYP" ; }
                        // If mod state concatenates to HYPR or MEH, force those suffixes
                        switch ( suffix ) {
                            case "CSAG": suffix = "HYP"; break;
                            case "CSA":  suffix = "MEH"; break;
                        }
                        var shortCode = keycode.replace(/\(\)/, "("+ lm_layer + ", "+ mods.join(' | ') +")");
                        var append = "LM" + lm_layer +"_"+ suffix;
                        customKeycodes.push( "#define " + append + " ".repeat(12 - append.length) + shortCode );
                        break;

                    case "MT()":
                        var mt_mod = kb.keys[key].keycodes[layer].fields[0]; // Mod Mask
                        var mt_kc = kb.keys[key].keycodes[layer].fields[1].id; // Keycode
                        var bitflags = "0".repeat( 6 - (mt_mod).toString(2).length ) + (mt_mod).toString(2);
                        var prefix = "";
                        var mods = [];
                        if ( bitflags.substr(5, 1) == 1 ) { mods.push( "MOD_LCTL" ); prefix += "C"  ; }
                        if ( bitflags.substr(4, 1) == 1 ) { mods.push( "MOD_LSFT" ); prefix += "S"  ; }
                        if ( bitflags.substr(3, 1) == 1 ) { mods.push( "MOD_LALT" ); prefix += "A"  ; }
                        if ( bitflags.substr(2, 1) == 1 ) { mods.push( "MOD_LGUI" ); prefix += "G"  ; }
                        if ( bitflags.substr(0, 1) == 1 ) { mods.push( "MOD_MEH"  ); prefix = "MEH" ; }
                        if ( bitflags.substr(1, 1) == 1 ) { mods.push( "MOD_HYPR" ); prefix = "HYP" ; }
                        // If mod state concatenates to HYPR or MEH, force those prefixes
                        switch ( prefix ) {
                            case "CSAG": prefix = "HYP"; break;
                            case "CSA":  prefix = "MEH"; break;
                        }
                        // Make basic mod states more clear
                        switch ( prefix ) {
                            case "C": prefix = "CTL"; break;
                            case "S": prefix = "SFT"; break;
                            case "A": prefix = "ALT"; break;
                            case "G": prefix = "GUI"; break;
                        }
                        var shortCode = keycode.replace(/\(\)/, "("+ mods.join(' | ') +", "+ mt_kc +")");
                        var append = prefix + "_" + mt_kc.replace(/KC_/g, "");
                        customKeycodes.push( "#define "+ append +" ".repeat(12 - append.length) + shortCode );
                        break;

                    case "CTL_T()":
                    case "SFT_T()":
                    case "ALT_T()":
                    case "GUI_T()":
                    case "LCTL_T()":
                    case "LSFT_T()":
                    case "LALT_T()":
                    case "LGUI_T()":
                    case "RCTL_T()":
                    case "RSFT_T()":
                    case "RALT_T()":
                    case "RGUI_T()":
                        var mt_kc = kb.keys[key].keycodes[layer].fields[0].id; // Internal Keycode
                        if ( keycode.length == 7 ) {
                            keycode = "L"+ keycode;
                        }
                        var shortCode = keycode.replace(/\(\)/, "("+ mt_kc +")");
                        var append = keycode.substring(1, 4) + "_" + mt_kc.replace(/KC_/g, "").substring(0, 3);
                        customKeycodes.push( "#define "+ append +" ".repeat(12 - append.length) + shortCode );
                        break;

                    case "LCTL()":
                    case "LSFT()":
                    case "LALT()":
                    case "LGUI()":
                    case "RCTL()":
                    case "RSFT()":
                    case "RALT()":
                    case "RGUI()":
                        var keycodeValue = kb.keys[key].keycodes[layer].fields[0].id;
                        console.log( "[NESTED MODS] keycodeValue: "+ keycodeValue );
                        if ( keycodeValue.match(/^[LR](CTL|SFT|ALT|GUI)/) != null ) {
                            var keycode = keycode.replace(/\(\)/, "("+ keycodeValue +")");

                            if ( keycodeValue.match(/([LR](CTL|SFT|ALT|GUI)\(\))/) != null ) {
                                var keycodeValue = kb.keys[key].keycodes[layer].fields[0].fields[0].id;
                                //console.log( "keycodeValue: "+ keycodeValue );
                                var keycode = keycode.replace(/\(\)/, "("+ keycodeValue +")");
                                if ( keycode.match(/([LR](CTL|SFT|ALT|GUI)\(\))/) != null ) {
                                    var keycodeValue = kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].id;
                                    //console.log( "keycodeValue: "+ keycodeValue );
                                    var keycode = keycode.replace(/\(\)/, "("+ keycodeValue +")");
                                    if ( keycode.match(/([LR](CTL|SFT|ALT|GUI)\(\))/) != null ) {
                                        var keycodeValue = kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].fields[0].id;
                                        //console.log( "keycodeValue: "+ keycodeValue );
                                        var keycode = keycode.replace(/\(\)/, "("+ keycodeValue +")");
                                        if ( keycode.match(/([LR](CTL|SFT|ALT|GUI)\(\))/) != null ) {
                                            var keycodeValue = kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].fields[0].fields[0].id;
                                            //console.log( "keycodeValue: "+ keycodeValue );
                                            var keycode = keycode.replace(/\(\)/, "("+ keycodeValue +")");
                                        }
                                    }
                                }
                            }
                        }
                        keycode = keycode.replace(/\(\)/g, "("+ keycodeValue +")");
                        console.log( "[NESTED MODS] POST: "+ keycode );

                        console.log( keycode.length );
                        var append = keycode
                            .replace(/[LR]CTL\(/g, "C" )
                            .replace(/[LR]SFT\(/g, "S" )
                            .replace(/[LR]ALT\(/g, "A" )
                            .replace(/[LR]GUI\(/g, "G" )
                            .replace(/KC_([A-Z0-9_]+)[\)]+/g, "_$1" )
                            //.replace(/([CSAG_]+)__/g, "$1".replace(/_/g, "") )
                            ;
                        //console.log( shortCode );
                        customKeycodes.push( "#define "+ append +" ".repeat(12 - append.length) + keycode );
                        //var append = shortCode;
                        //layerData2 += append /*+","+ " ".repeat( Math.max(0, (8 - shortCode.length) ) )*/;
                        break;

                    default:
                        var append = keycode;
                }

                if ( longFormKeycodes[keycode] !== undefined && longFormKeycodes[keycode] !== null ) {
                    keycode = longFormKeycodes[keycode];
                    var append = keycode;
                }

                if ( append.length <= 7 ) {
                    if ( append == "KC_TRNS" ) {
                        transCodes++;
                        append = "_______";
                    } else if ( append == "KC_NO" ) {
                        //transCodes++;
                        append = "XXXXXXX";
                    } //else if ( keycode.substr( ) )
                    //var append = keycode;
                    //console.log( "adding keycode: "+ append + " | layerData2.length: "+ layerData2.length );
                    layerData2_start = ( layerData_rowOffset * Math.floor( obj.keyboard.keys[key].state.y ) ) + ( obj.keyboard.keys[key].state.x * 9 );
                    if ( kb.keys[key].state.w > 5.75 ) {
                        layerData2_start += Math.floor( Math.round( kb.keys[key].state.w * 9 ) / 2 ) - ( append.length + 2 );
                    }
                    layerData2 =
                        //append
                        layerData2.replaceBetween(
                            layerData2_start,
                            layerData2_start + 9,
                            append + "," + " ".repeat( 9 - append.length - 1 )
                        )
                    ;
                } else {
                    console.error( "keycode "+ append +" not recognized!" );
                }
                matrix[matrixRow][matrixCol] = "K"+ base32hex.substr( obj.keyboard.keys[key].row , 1) + base32hex.substr( obj.keyboard.keys[key].col , 1) +"  ";
            }
            layerData_suffix = "    ),";

            // Only output the layer if non-KC_TRNS keycodes are present (blank layers are suppressed).
            if ( transCodes != keyCount ) {
                keymapData +=
                    layerData_prefix +
                    " ".repeat(keymap_line_indent) +
                    layerData2
                        .replace(/,( +)\\$/, " $1\n")
                        .replace(/ +\n/g, "\n")
                        .replace(/ +\\/g, "\n" + " ".repeat(keymap_line_indent)) +
                    layerData_suffix + "\n"
                ;
            }

        }

        if ( customKeycodes.length > 0 ) {
            keymapOutput.push(
                customKeycodes.join('\n') +"\n"
            );
        }
        keymapOutput.push(
            //"// keys per layer: " + keys,
            "const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {",
        );
        keymapOutput.push(
            keymapData,
            "};"
        );


        /**************
        ** info.json **
        **************/
        var infojsonOutput = [
            "{",
            "    \"keyboard_name\": \""+ obj.keyboard.settings.name +"\",",
            "    \"url\": \"\",",
            "    \"maintainer\": \"qmk\",",
            "    \"width\": "+ obj.keyboard.bounds.max.x +",",
            "    \"height\": "+ obj.keyboard.bounds.max.y +",",
            "    \"layouts\": {",
            "        \"LAYOUT\": {",
            "            \"layout\": ["
        ];


        /****************************
        ** CREATE LAYOUT CONTAINER **
        ****************************/
        //var layoutMacro = new Array( keymapHeight );
        var layoutMacro = "";
        for ( i=0 ; i<keymapHeight; i++ ) {
            layoutMacro += " ".repeat( ( keymapWidth * 5 ) + 4 ) + "\\";
        }
        var layoutMacro_rowOffset = ( keymapWidth * 5 ) + 5;
        //console.log( layoutMacro );

        /*******************************
        ** CREATE info.json STRUCTURE **
        *******************************/
        var keyObjects = new Array(keyCount);
        for ( key=0; key<keyCount; key++ ) {
            // Key Dimensions and Positioning
            var w = obj.keyboard.keys[key].state.w;
            var h = obj.keyboard.keys[key].state.h;
            var x = obj.keyboard.keys[key].state.x;
            // check y-axis vertical offset (handling vertically-offset keys)
            var y = Math.floor( obj.keyboard.keys[key].state.y );
            var yo = obj.keyboard.keys[key].state.y - y;

            // Electrical Data
            var pinRow = obj.keyboard.pins.row[obj.keyboard.keys[key].row];
            var pinCol = obj.keyboard.pins.col[obj.keyboard.keys[key].col];
            var label = ["K", base32hex.substr(obj.keyboard.keys[key].row, 1), base32hex.substr(obj.keyboard.keys[key].col, 1)].join('') + " ("+ [pinRow,pinCol].join(',') +")";

            var pos = y +"."+ ( x / 100 ).toString().replace(/\./g, "");
            keyObject = new Array( pos, y, x, yo, label, w, h );
            //console.log ( "y,yo -> "+ y +","+ yo +" | "+ keyObject.join(', ') );

            if ( h == 1 ) {
                //keyObject.splice(6, 1);
            }
            if ( w == 1 ) {
                //keyObject.splice(5, 1);
            }

            keyObjects[key] = keyObject.join('\t');

            infojsonOutput.push(
                [
                    "{\"label\":\""+ [
                        "K",
                        base32hex.substr(obj.keyboard.keys[key].row, 1),
                        base32hex.substr(obj.keyboard.keys[key].col, 1)
                    ].join('') +
                    " (" + pinRow +"," + pinCol +")"+
                    "\"",
                    "\"x\":"+ x,
                    "\"y\":"+ y,
                    "\"yo\":"+ yo +"},"
                    /*"\"offset\":"+ vOffset + */
                ].join(', ')
            );

            if ( w != 1 ) {
                infojsonOutput[infojsonOutput.length-1] = infojsonOutput[infojsonOutput.length-1].replace(/},$/g, ", \"w\":"+ w +"},");
            }
            if ( h != 1 ) {
                infojsonOutput[infojsonOutput.length-1] = infojsonOutput[infojsonOutput.length-1].replace(/},$/g, ", \"h\":"+ h +"},");
            }
        }
        /*
        for ( row=0; row<keymapHeight; row++ ) {
            console.log( row +" of "+ keymapHeight );
            for ( col=0; col<keymapWidth; col++ ) {
                layoutMacro[row][col] = ["P", base32hex.substr( row, 1), base32hex.substr( col, 1)].join('');
            }
        }
        */
        /*console.log(
                "Layout Macro: ("+ keymapHeight +"x"+ keymapWidth +")\n"+
                "=".repeat(20) +"\n"+
                layoutMacro
        );*/

        var keymapRowText = "";
        var keymapLayer = "";
        for ( layer = 0; layer<layerCount; layer++ ) {
            for ( keymapRow = 0; keymapRow < keymap[layer].length; keymapRow++ ) {
                for ( keymapCol = 0; keymapCol < keymap[layer][keymapRow].length; keymapCol++ ) {
                    if ( keymap[layer][keymapRow][keymapCol] == null ) {
                        keymap[layer][keymapRow][keymapCol] = " ".repeat(7);
                    }
                }
                keymapRowText = " ".repeat(4) + keymap[layer][keymapRow].join(', ') + ", \\";
            }
        }
        keymap.forEach(
            function(km_layer) {
                km_layer.forEach(
                    function(km_layer_row) {
                        km_layer_row.join(', ');
                    }
                );
                //km_layer.join('  ),\n  ');
            }
        );
        keymap = keymap.join('\n\n\n');
        /*
            "  ["+ layer +"] = LAYOUT( \\\n"
              text of keymap layer
            "  ),"
        */

        keyObjects.sort();

        for ( key=0; key<keyCount; key++ ) {
            keyObjects[key] = keyObjects[key].split('\t');
            keyObjects[key].splice(0, 1);
            keyObjects[key][0] = Number( keyObjects[key][0] ) + Number( keyObjects[key][2] );
            keyObjects[key].splice(2, 1);

            var infojsonOutputArray = [
                "\"label\":\""+ keyObjects[key][2] +"\"",
                "\"x\":"+ keyObjects[key][1],
                "\"y\":"+ keyObjects[key][0],
                "\"w\":"+ keyObjects[key][3],
                "\"h\":"+ keyObjects[key][4]
            ];
            if ( keyObjects[key][4] == 1 ) {
                infojsonOutputArray.splice(4, 1);
            }
            if ( keyObjects[key][3] == 1 ) {
                infojsonOutputArray.splice(3, 1);
            }
            // key output starts at line 10
            infojsonOutput[key+9] = "{" + infojsonOutputArray.join(', ') +
                /*[
                    "\"label\":\""+ keyObjects[key][2] +"\"",
                    "\"x\":"+ keyObjects[key][1],
                    "\"y\":"+ keyObjects[key][0],
                    "\"w\":"+ keyObjects[key][3],
                    "\"h\":"+ keyObjects[key][4]
                ].join(', ') +*/
                "},";
            if ( key == ( keyCount-1 ) ) {
            }

            //build physical layout macro
            if ( keyObjects[key][3] >= 6 ) {
                // A key this long is probably a spacebar, so handle it differently
                layoutMacro_start = (
                    /* V Offset */
                    Number( Math.floor( keyObjects[key][0] ) * layoutMacro_rowOffset ) +
                    /* H Offset */
                    ( keyObjects[key][1] * 5 ) + Math.floor( keyObjects[key][3] * 2 )
                );
            } else {
                layoutMacro_start = ( Number( Math.floor( keyObjects[key][0] ) * layoutMacro_rowOffset ) + ( keyObjects[key][1] * 5 ) );
            }
            layoutMacro_end = Number(layoutMacro_start + 5);
            layoutMacro = layoutMacro.replaceBetween( layoutMacro_start, layoutMacro_end, keyObjects[key][2].replace(/ \(.*/, "")+", " );
        }
        //console.log( "^" + layoutMacro + "$" );
        layoutMacro = "    "+ layoutMacro
            .replace(/,( +)\\$/g, " $1\\")
            .replace(/\\/g, "\\\n    ")
            .replace(/\\\n    $/g, "\\")
            .replace(/  \\/g, "\\")
        ;
        //physicalMatrix = physicalMatrix.replace(/, \\$/, "")

        infojsonOutput.push(
            "            ]",
            "        }",
            "    }",
            "    ,\"meta\": \"https://noroadsleft.github.io/kbf_qmk_converter/\"",
            "}",
        );

        for ( i = matrix_rows-1; i >= 0; i-- ) {
            // inserts Electrical Switch Matrix at index 21 (22nd line)
            layoutMacroOutput.splice(22, 0, "    { "+ matrix[i].join(', ').replace(/( +),/g, ",$1") +" }, \\" );
        }
        // inserts Physical Switch Matrix at index 20
        layoutMacroOutput.splice(21, 0, layoutMacro);


        /**********************************************
        ** Output the resultant text to the textarea **
        **********************************************/
        window.output = function(OutputFile) {
            preElement.innerHTML = "";
            switch ( OutputFile ) {
                case "config.h":
                    configOutput.forEach(
                        function(line) {
                            var insLine = document.createElement('code');
                            preElement.setAttribute('class', "language-clike");
                            insLine.innerHTML = line +"\n";
                            preElement.appendChild( insLine );
                        }
                    );
                    break;
                case "rules.mk":
                    rulesOutput.forEach(
                        function(line) {
                            var insLine = document.createElement('code');
                            preElement.setAttribute('class', "language-makefile");
                            insLine.innerHTML = line +"\n";
                            preElement.appendChild( insLine );
                        }
                    );
                    break;
                case "keyboard.c":
                    keyboardCOutput.forEach(
                        function(line) {
                            var insLine = document.createElement('code');
                            preElement.setAttribute('class', "language-clike");
                            insLine.innerHTML = line +"\n";
                            preElement.appendChild( insLine );
                        }
                    );
                    break;
                case "keyboard.h":
                    layoutMacroOutput.forEach(
                        function(line) {
                            var insLine = document.createElement('code');
                            preElement.setAttribute('class', "language-clike");
                            insLine.innerHTML = line +"\n";
                            preElement.appendChild( insLine );
                        }
                    );
                    break;
                case "keymap.c":
                    keymapOutput.forEach(
                        function(line) {
                            var insLine = document.createElement('code');
                            preElement.setAttribute('class', "language-clike");
                            insLine.innerHTML = line +"\n";
                            preElement.appendChild( insLine );
                        }
                    );
                    break;
                case "info.json":
                    var n = 0; // Track which line of text is about to be output
                    infojsonOutput.forEach(
                        function(line) {
                            if ( typeof line == "string" ) {
                                n++; // Line number
                                var insLine = document.createElement('code');
                                preElement.setAttribute('class', "language-json");
                                // Only output a comma at the end of the line if there's another key object to add
                                //         ┌ Offset 9 because there are 9 lines before the actual layout data starts
                                //         │             ┌ 9+keys because that's the last line that should have a comma
                                //         ↓             ↓
                                if ( ( n > 9 ) && ( n < 9+keyCount ) ) {
                                    insLine.innerHTML = line.replace(/^{\"label/, " ".repeat(16) + "{\"label" ).replace(/\},/g, "},") +"\n";
                                } else /* if ( n == 9+keys ) */ {
                                    insLine.innerHTML = line.replace(/^{\"label/, " ".repeat(16) + "{\"label" ).replace(/(\{\"label.*\}),/g, "$1") +"\n";
                                }
                                preElement.appendChild( insLine );
                            }
                        }
                    );
                    Prism.highlightElement(preElement);
                    break;
            }
            var lastLine = document.createElement('code');
            lastLine.innerHTML = "\n";
            preElement.appendChild( lastLine );
            // Rerun Prism syntax highlighting on the element
            Prism.highlightElement(preElement);
            selectElementText(document.getElementById("editor"));
        };

        output("config.h");
        highlightTab("config");

    }
);
