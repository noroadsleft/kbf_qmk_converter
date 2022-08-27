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


/**
 * @brief round a floating point number
 *   i : number to round
 *   p : points of precision
 */
function fp_round(i, p) {
    return Math.round( i * Math.pow(10, p) ) / Math.pow(10, p);
};


document.getElementById("c_rules").addEventListener(
    "click",
    function(){
        output("rules.mk");
        highlightTab("rules");
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

        if ( obj.keyboard.settings.rgbVol != null ) {
            var rgbValMax = obj.keyboard.settings.rgbVol;
        } else if ( obj.keyboard.settings.rgbLimit != null ) {
            var rgbValMax = obj.keyboard.settings.rgbLimit;
        }

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
                case 1:
                    var BootmagicEnable = false;
                    break;
                default:
                    var BootmagicEnable = true;
            }
        }
        else if ( obj.keyboard.settings.bootMagic != null ) {
            // mtkeyboard.vip export
            switch ( obj.keyboard.settings.bootMagic ) {
                case 0:
                    var BootmagicEnable = false;
                    break;
                default:
                    var BootmagicEnable = true;
            }
        }
        else {
            var BootmagicEnable = true;
        }

        /* MOUSEKEY_ENABLE */
        if ( obj.keyboard.settings.chooseMousekey != null ) {
            // QMKeyboard.cn export
            switch ( obj.keyboard.settings.chooseMousekey ) {
                case 0:
                    var MousekeyEnable = true;
                    break;
                case 1:
                    var MousekeyEnable = false;
                    break;
            }
        }
        else if ( obj.keyboard.settings.mouseKey != null ) {
            // mtkeyboard.vip export
            switch ( obj.keyboard.settings.mouseKey ) {
                case 0:
                    var MousekeyEnable = false;
                    break;
                case 1:
                    var MousekeyEnable = true;
                    break;
            }
        }
        else {
            var MousekeyEnable = true;
        }

        /* EXTRAKEY_ENABLE */
        if ( obj.keyboard.settings.chooseExtrakey != null ) {
            switch ( obj.keyboard.settings.chooseExtrakey ) {
                case 0:
                    var ExtrakeyEnable = true;
                    break;
                case 1:
                    var ExtrakeyEnable = false;
                    break;
            }
        }
        else {
            var ExtrakeyEnable = true;
        }

        /* KEY_LOCK_ENABLE */
        if ( obj.keyboard.settings.choosekeylock != null ) {
            // QMKeyboard.cn export
            switch ( obj.keyboard.settings.choosekeylock ) {
                case 0:
                    var KeyLockEnable = true;
                    break;
                case 1:
                    var KeyLockEnable = false;
                    break;
            }
        }
        else if ( obj.keyboard.settings.keyLock != null ) {
            // mtkeyboard.vip export
            switch ( obj.keyboard.settings.keyLock ) {
                case 0:
                    var KeyLockEnable = false;
                    break;
                case 1:
                    var KeyLockEnable = true;
                    break;
            }
        }

        var rulesOutput = ["# This file intentionally left blank"];

        /***************
        ** keyboard.h **
        ***************/
        var matrix = new Array(matrix_rows);

        for ( row = 0; row < matrix_rows; row++ ) {
            matrix[row] = new Array(matrix_cols);
            for ( col = 0; col < matrix_cols; col++ ) {
                matrix[row][col] = "XXX";
            }
        }
        //console.log( matrix );


        /*************
        ** keymap.c **
        *************/
        var customKeycodes = [];

        var keymapData = "";
        var keymap_line_indent = 8;

        // File header
        var keymapOutput = [
            "// Copyright "+ year +" %YOUR_FULL_NAME% (@%YOUR_GITHUB_USERNAME%)",
            "// SPDX-License-Identifier: GPL-2.0-or-later",
            "",
            "#include QMK_KEYBOARD_H",
            "",
        ];

        var layerCount = obj.keyboard.keys[0].keycodes.length;
        for ( layer=0; layer<layerCount; layer++ ) {
            //console.log( "Processing Layer "+ layer +"..." );
            var layerData_prefix = "\n    ["+ layer +"] = LAYOUT(\n";
            var layerData2 = " ".repeat(8) + "\\";
            //layerData_rowOffset = Math.ceil( kbWidth * 9 ) + 1;
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
                    //layerData2_start = ( layerData_rowOffset * Math.floor( obj.keyboard.keys[key].state.y ) ) + ( obj.keyboard.keys[key].state.x * 9 );
                    // if ( kb.keys[key].state.w > 5.75 ) {
                    //     layerData2_start += Math.floor( Math.round( kb.keys[key].state.w * 9 ) / 2 ) - ( append.length + 2 );
                    // }
                    layerData2 = layerData2.replace(
                        /\\$/g,
                        append + "," + " ".repeat(9 - append.length - 1 ) + "\\"
                    );
                    // add a line break if the next key starts a new row
                    if ( ( key < keyCount-1 ) ) {
                        /*
                        console.log(
                            key + ": " + append + "\t" +
                            [
                                ["compare X -> ", kb.keys[key].state.x > kb.keys[key+1].state.x].join(''),
                                ["compare Y -> ", kb.keys[key].state.y < ( kb.keys[key+1].state.y - 0.5 )].join('')
                            ].join('\t')
                        );
                        */
                        if (
                            ( kb.keys[key].state.x > kb.keys[key+1].state.x ) &&
                            ( kb.keys[key].state.y < ( kb.keys[key+1].state.y - 0.5 ) )
                        ) {
                            layerData2 = layerData2.replace(
                                /\\$/g,
                                "\n" + " ".repeat(keymap_line_indent) + "\\"
                            );
                        }
                    }
                } else {
                    console.error( "keycode "+ append +" not recognized!" );
                }
                matrix[matrixRow][matrixCol] = "K"+ base32hex.substr( obj.keyboard.keys[key].row , 1) + base32hex.substr( obj.keyboard.keys[key].col , 1);
            }
            layerData_suffix = "\n    ),\n";

            // Only output the layer if non-KC_TRNS keycodes are present (blank layers are suppressed).
            if ( transCodes != keyCount ) {
                keymapData +=
                    layerData_prefix +
                    //" ".repeat(keymap_line_indent) +
                    layerData2
                        .replace(/,( +)\\$/, " $1")
                        //.replace(/ +\n/g, "\n")
                        .replace(/ +\\/g, "\n" + " ".repeat(keymap_line_indent)) +
                    layerData_suffix
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
            "    \"manufacturer\": \"\",",
            "    \"url\": \"\",",
            "    \"maintainer\": \"qmk\",",
            "    \"usb\": {",
            "        \"vid\": \"0xFEED\",",
            "        \"pid\": \"0x0000\",",
            "        \"device_version\": \"1.0.0\"",
            "    },",
            "    \"processor\": \"" + MicroController + "\",",
            "    \"bootloader\": \"atmel-dfu\",",
            "    \"features\": {",
            "        \"bootmagic\": " + (BootmagicEnable ? "true" : "false") + ",",
            "        \"mousekey\": " + (MousekeyEnable ? "true" : "false") + ",",
            "        \"extrakey\": " + (ExtrakeyEnable ? "true" : "false") + ",",
            "        \"backlight\": " + (obj.keyboard.pins.led != null ? "true" : "false") + ",",
            "        \"rgblight\": " + (obj.keyboard.pins.rgb != null ? "true" : "false") + ",",
            "        \"key_lock\": " + (KeyLockEnable ? "true" : "false"),
            "    },",
            "    \"diode_direction\": \"" + dd + "\",",
            "    \"matrix_pins\": {",
            "        \"cols\": [" + obj.keyboard.pins.col.toString().split(',').map(p => `"${p}"`).join(', ') + "],",
            "        \"rows\": [" + obj.keyboard.pins.row.toString().split(',').map(p => `"${p}"`).join(', ') + "]",
            "    },",
        ];

        if (obj.keyboard.pins.led) {
            infojsonOutput.push(
                "    \"backlight\": {",
                "        \"breathing\": false,",
                "        \"levels\": " + obj.keyboard.settings.backlightLevels + ",",
                "        \"pin\": \"" + obj.keyboard.pins.led + "\"",
                "    },",
            );
        }

        if (obj.keyboard.pins.rgb) {
            infojsonOutput.push(
                "    \"rgblight\": {",
                "        \"animations\": {",
                "            \"all\": true",
                "        },",
                "        \"brightness_steps\": 8,",
                "        \"hue_steps\": 8,",
                "        \"led_count\": " + obj.keyboard.settings.rgbNum + ",",
                "        \"max_brightness\": " + (rgbValMax ?? "255") + ",",
                "        \"pin\": \"" + obj.keyboard.pins.rgb + "\",",
                "        \"saturation_steps\": 8,",
                "        \"sleep\": true",
                "    },"
            );
        }

        if (obj.keyboard.pins.caps || obj.keyboard.pins.num || obj.keyboard.pins.scroll) {
            infojsonOutput.push("    \"indicators\": {");
            if (obj.keyboard.pins.caps) infojsonOutput.push("        \"caps_lock\": \"" + obj.keyboard.pins.caps + "\",");
            if (obj.keyboard.pins.num) infojsonOutput.push("        \"num_lock\": \"" + obj.keyboard.pins.num + "\",");
            if (obj.keyboard.pins.scroll) infojsonOutput.push("        \"scroll_lock\": \"" + obj.keyboard.pins.scroll + "\",");
            infojsonOutput.push("    },");
        }

        infojsonOutput.push(
            "    \"layouts\": {",
            "        \"LAYOUT\": {",
            "            \"layout\": ["
        );

        // How many lines is the info.json "preamble"?
        var infojsonPreambleLines = infojsonOutput.length;

        /****************************
        ** CREATE LAYOUT CONTAINER **
        ****************************/
        //var layoutMacro = new Array( keymapHeight );
        var layoutMacro = "    \\";
        /*
        for ( i=0 ; i<keymapHeight; i++ ) {
            layoutMacro += "";
        }
        */
        console.log( layoutMacro );

        /*******************************
        ** CREATE info.json STRUCTURE **
        *******************************/
        var keyObjects = new Array(keyCount);
        for ( key=0; key<keyCount; key++ ) {
            // Key Dimensions and Positioning
            var w = fp_round( obj.keyboard.keys[key].state.w , 3 );
            var h = fp_round( obj.keyboard.keys[key].state.h , 3 );
            var x = fp_round( obj.keyboard.keys[key].state.x , 3 );
            // check y-axis vertical offset (handling vertically-offset keys)
            var y = fp_round( obj.keyboard.keys[key].state.y , 3 );
            //var yo = obj.keyboard.keys[key].state.y - y;

            // Electrical Data
            var pinRow = obj.keyboard.pins.row[obj.keyboard.keys[key].row];
            var pinCol = obj.keyboard.pins.col[obj.keyboard.keys[key].col];
            var keyLabel = ["K", base32hex.substr(obj.keyboard.keys[key].row, 1), base32hex.substr(obj.keyboard.keys[key].col, 1)].join('');
            var keyPins = [pinRow,pinCol].join(',');

            keyObject = new Array(
                '"label": "' + keyLabel +' (' + keyPins + ')"',
                '"matrix": [' + obj.keyboard.keys[key].row + ", " + obj.keyboard.keys[key].col + "]",
                '"x": '+ x,
                '"y": '+ y,
                '"w": '+ w,
                '"h": '+ h
            );

            // Remove width and/or height keys if value is equal to 1
            if ( h == 1 ) {
                keyObject.splice(5, 1);
            }
            if ( w == 1 ) {
                keyObject.splice(4, 1);
            }

            keyObjects[key] = keyObject.join('\t');

            infojsonOutput.push(
                " ".repeat(16) + "{ " + keyObject.join(', ') + " },"
            );
        }

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
            }
        );
        keymap = keymap.join('\n\n\n');
        newRow = new Array();
        for ( key=0; key<keyCount; key++ ) {
            keyObjects[key] = keyObjects[key].split('\t');
            keyY = keyObjects[key][2].split(': ')[1];
            keyX = keyObjects[key][1].split(': ')[1];
            //keyWidth = keyObjects[key][5].split(': ')[1];
            //console.log(  keyX + "@" + keyY );
            matrixIdent = keyObjects[key][0].split(': ')[1].split(' ')[0].replace(/["]/g, "");

            if ( key == ( keyCount-1 ) ) {
            }

            //build physical layout macro
            // add key to layout macro
            layoutMacro = layoutMacro.replace(
                /\\$/g,
                matrixIdent + ", \\"
            );
            // Is the just-added key wider than 1u?
            /*
            if ( keyWidth > 1 ) {
                layoutMacro = layoutMacro.replace(
                    matrixIdent,
                    " ".repeat( Math.floor(((keyWidth-1)*5) / 2) ) +
                    matrixIdent +
                    " ".repeat( Math.ceil(((keyWidth-1)*5) / 2) )
                );
            }
            */
            // Does the just-added key need to start a new row?
            if ( key < keyCount-1 ) {

                if (
                    ( kb.keys[key].state.x > kb.keys[key+1].state.x ) &&
                    ( kb.keys[key].state.y < ( kb.keys[key+1].state.y - 0.5 ) )
                ) {
                    layoutMacro = layoutMacro.replace(
                        /\\$/g,
                        "\n" + " ".repeat(4) + "\\"
                    );
                }
            }
        }
        // remove the last comma
        layoutMacro = layoutMacro.replace(/, \\$/g, "  \\");
        // insert missing backslashes
        layoutMacro = layoutMacro.replace(/\n/g, "\\\n");

        infojsonOutput.push(
            "            ]",
            "        }",
            "    }",
            "    ,\"meta\": \"https://noroadsleft.github.io/kbf_qmk_converter/\"",
            "}",
        );


        /**********************************************
        ** Output the resultant text to the textarea **
        **********************************************/
        window.output = function(OutputFile) {
            preElement.innerHTML = "";
            switch ( OutputFile ) {
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
                                //         ┌ there are `infojsonPreambleLines` lines before the actual layout data starts
                                //         │                                 ┌ 6+keys because that's the last line that should have a comma
                                //         ↓                                 ↓
                                if ( n == infojsonPreambleLines+keyCount ) {
                                    console.log( "removing trailing comma on the last key's JSON object...\n\t" + line );
                                    // remove the trailing comma on the last key's JSON object
                                    insLine.innerHTML = line.replace(/\},$/g, "}") +"\n";
                                }
                                else {
                                    insLine.innerHTML = line +"\n";
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

        output("info.json");
        highlightTab("info");

    }
);
