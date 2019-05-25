console.log( "Running showOutput3.js..." );

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
		var footer = document.getElementById('footer');
		var notice = document.createElement('p');
		notice.appendChild( document.createTextNode(filename +' contents copied to clipboard.') );
		footer.innerHTML = "";
		footer.appendChild(notice);
		footer.setAttribute('style', "display: block;");
	}
);


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
			"/*",
			"Copyright 2019 REPLACE_WITH_YOUR_NAME",
			"",
			"This program is free software: you can redistribute it and/or modify",
			"it under the terms of the GNU General Public License as published by",
			"the Free Software Foundation, either version 2 of the License, or",
			"(at your option) any later version.",
			"",
			"This program is distributed in the hope that it will be useful,",
			"but WITHOUT ANY WARRANTY; without even the implied warranty of",
			"MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the",
			"GNU General Public License for more details.",
			"",
			"You should have received a copy of the GNU General Public License",
			"along with this program.  If not, see &lt;http://www.gnu.org/licenses/>.",
			"*/",
			"",
			"#pragma once",
			"",
			"#include \"config_common.h\"",
			"",
			"/* USB Device descriptor parameter */",
			"#define VENDOR_ID       0xFEED",
			"#define PRODUCT_ID      0x0000",
			"#define DEVICE_VER      0x0001",
			"#define MANUFACTURER    [EDIT_THIS]",
			"#define PRODUCT         [EDIT_THIS] " + obj.keyboard.settings.name + "",
			"#define DESCRIPTION     [EDIT_THIS] A QMK-powered custom keyboard",
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
				"// #define BACKLIGHT_PIN " + obj.keyboard.pins.led,
				"// #define BACKLIGHT_BREATHING",
				"// #define BACKLIGHT_LEVELS " + obj.keyboard.settings.backlightLevels,
				""
			);
		}

		if ( obj.keyboard.pins.rgb ) {
			configOutput.push(
				"// #define RGB_DI_PIN " + obj.keyboard.pins.rgb + "",
				"// #ifdef RGB_DI_PIN",
				"//     #define RGBLED_NUM 16",
				"//     #define RGBLIGHT_HUE_STEP 8",
				"//     #define RGBLIGHT_SAT_STEP 8",
				"//     #define RGBLIGHT_VAL_STEP 8",
				"//     #define RGBLIGHT_LIMIT_VAL 255 /* The maximum brightness level */",
				"//     #define RGBLIGHT_SLEEP  /* If defined, the RGB lighting will be switched off when the host goes to sleep */",
				"// /*== all animations enable ==*/",
				"//     #define RGBLIGHT_ANIMATIONS",
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
				"// #endif"
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
		var mcuConfig = [];
		switch ( obj.keyboard.controller ) {
			case 0:
				mcuConfig.push( "atmega32u2" );
				break;
			case 1:
				mcuConfig.push( "atmega32u4" );
				break;
			case 2:
				mcuConfig.push( "at90usb1286" );
				break;
		}
		switch ( mcuConfig[0] ) {
			case "atmega32u2":
			case "atmega32u4":
			case "at90usb1286":
				mcuConfig.push(
					16000000,
					"AVR8"
				);
				break;
		}
		var rulesOutput = [
			"MCU = "+ mcuConfig[0],
			"F_CPU = "+ mcuConfig[1],
			"ARCH = "+ mcuConfig[2],
			"F_USB = $(F_CPU)",
			"OPT_DEFS += -DINTERRUPT_CONTROL_ENDPOINT"
		];
		rulesOutput.push( "", "" );
		rulesOutput.push(
			"# Bootloader selection",
			"#   Teensy       halfkay",
			"#   Pro Micro    caterina",
			"#   Atmel DFU    atmel-dfu",
			"#   LUFA DFU     lufa-dfu",
			"#   QMK DFU      qmk-dfu",
			"#   atmega32a    bootloadHID",
			"BOOTLOADER = atmel-dfu",
			"",
			"",
			"# If you don't know the bootloader type, then you can specify the",
			"# Boot Section Size in *bytes* by uncommenting out the OPT_DEFS line",
			"#   Teensy halfKay      512",
			"#   Teensy++ halfKay    1024",
			"#   Atmel DFU loader    4096",
			"#   LUFA bootloader     4096",
			"#   USBaspLoader        2048",
			"# OPT_DEFS += -DBOOTLOADER_SIZE=4096",
			"",
			"",
			"# Build Options",
			"#   change yes to no to disable",
			"#",
			"BOOTMAGIC_ENABLE = lite      # Virtual DIP switch configuration",
			"MOUSEKEY_ENABLE = yes        # Mouse keys",
			"EXTRAKEY_ENABLE = yes        # Audio control and System control",
			"CONSOLE_ENABLE = yes         # Console for debug",
			"COMMAND_ENABLE = yes         # Commands for debug and configuration",
			"# Do not enable SLEEP_LED_ENABLE. it uses the same timer as BACKLIGHT_ENABLE",
			"SLEEP_LED_ENABLE = no        # Breathing sleep LED during USB suspend",
			"# if this doesn't work, see here: https://github.com/tmk/tmk_keyboard/wiki/FAQ#nkro-doesnt-work",
			"NKRO_ENABLE = no             # USB Nkey Rollover",
			"BACKLIGHT_ENABLE = no        # Enable keyboard backlight functionality on B7 by default",
			"RGBLIGHT_ENABLE = no         # Enable keyboard RGB underglow",
			"MIDI_ENABLE = no             # MIDI support",
			"UNICODE_ENABLE = no          # Unicode",
			"BLUETOOTH_ENABLE = no        # Enable Bluetooth with the Adafruit EZ-Key HID",
			"AUDIO_ENABLE = no            # Audio output on port C6",
			"FAUXCLICKY_ENABLE = no       # Use buzzer to emulate clicky switches",
			"HD44780_ENABLE = no          # Enable support for HD44780 based LCDs"
		);
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
			"/* Copyright 2019 REPLACE_WITH_YOUR_NAME",
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
			"#include \"%KEYBOARD%.h\"",
			"",
			"void matrix_init_kb(void) {",
			"    // put your keyboard start-up code here",
			"    // runs once when the firmware starts up",
			"",
			"    matrix_init_user();",
			"}",
			"",
			"void matrix_scan_kb(void) {",
			"    // put your looping keyboard code here",
			"    // runs every cycle (a lot)",
			"",
			"    matrix_scan_user();",
			"}",
			"",
			"bool process_record_kb(uint16_t keycode, keyrecord_t *record) {",
			"    // put your per-action keyboard code here",
			"    // runs for every action, just before processing by the firmware",
			"",
			"    return process_record_user(keycode, record);",
			"}",
			"",
			"void led_set_kb(uint8_t usb_led) {",
			"    // put your keyboard LED indicator (ex: Caps Lock LED) toggling code here",
			"",
			"    led_set_user(usb_led);",
			"}",
			""
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
			"/* Copyright 2019 REPLACE_WITH_YOUR_NAME",
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
			"/* Copyright 2019 REPLACE_WITH_YOUR_NAME",
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
				if ( append.length <= 7 ) {
					if ( append == "KC_TRNS" ) {
						transCodes++;
						append = "_______";
					} else if ( append == "KC_NO" ) {
						//transCodes++;
						append = "XXXXXXX";
					} //else if ( keycode.substr( ) )
					//var append = keycode;
					console.log( "adding keycode: "+ append + " | layerData2.length: "+ layerData2.length );
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
			"            \"key_count\": "+ obj.keyboard.keys.length +",",
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
			infojsonOutput[key+10] = "{" + infojsonOutputArray.join(', ') +
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
			layoutMacroOutput.splice(21, 0, "    { "+ matrix[i].join(', ').replace(/( +),/g, ",$1") +" }, \\" );
		}
		// inserts Physical Switch Matrix at index 20
		layoutMacroOutput.splice(20, 0, layoutMacro);


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
								//         ┌ Offset 10 because there are 10 lines before the actual layout data starts
								//         │             ┌ 10+keys because that's the last line that should have a comma
								//         ↓             ↓
								if ( ( n > 10 ) && ( n < 10+keyCount ) ) {
									insLine.innerHTML = line.replace(/^{\"label/, " ".repeat(16) + "{\"label" ).replace(/\},/g, "},") +"\n";
								} else /* if ( n == 10+keys ) */ {
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
