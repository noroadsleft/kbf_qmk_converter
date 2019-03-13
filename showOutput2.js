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

		var keys = obj.keyboard.keys.length;

		// keymap is an array that holds our keymap
		// 16 layers, the maximum supported by kbfirmware
		var keymap = [
			[], [], [], [],
			[], [], [], [],
			[], [], [], [],
			[], [], [], [],
		];
		var kb = obj.keyboard;
		var rows = obj.keyboard.rows;
		var cols = obj.keyboard.cols;

		var baseData = ["Keyboard Name: "+ kb.settings.name, "Matrix Rows: "+ rows, "Matrix Columns: "+ cols];
		console.log( baseData.join(' | ') );

		/***************
		** keyboard.h **
		***************/
		var matrix = new Array(rows);

		for ( row = 0; row < rows; row++ ) {
			matrix[row] = new Array(cols);
			for ( col = 0; col < cols; col++ ) {
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



		/***************
		** keyboard.c **
		***************/
		var matrix = new Array(rows);

		for ( row = 0; row < rows; row++ ) {
			matrix[row] = new Array(cols);
			for ( col = 0; col < cols; col++ ) {
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
			"	// put your keyboard start-up code here",
			"	// runs once when the firmware starts up",
			"",
			"	matrix_init_user();",
			"}",
			"",
			"void matrix_scan_kb(void) {",
			"	// put your looping keyboard code here",
			"	// runs every cycle (a lot)",
			"",
			"	matrix_scan_user();",
			"}",
			"",
			"bool process_record_kb(uint16_t keycode, keyrecord_t *record) {",
			"	// put your per-action keyboard code here",
			"	// runs for every action, just before processing by the firmware",
			"",
			"	return process_record_user(keycode, record);",
			"}",
			"",
			"void led_set_kb(uint8_t usb_led) {",
			"	// put your keyboard LED indicator (ex: Caps Lock LED) toggling code here",
			"",
			"	led_set_user(usb_led);",
			"}"
		];





		/****************************
		** Capture Diode Direction **
		****************************/
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
			"BOOTMAGIC_ENABLE = lite      # Virtual DIP switch configuration(+1000)",
			"MOUSEKEY_ENABLE = yes        # Mouse keys(+4700)",
			"EXTRAKEY_ENABLE = yes        # Audio control and System control(+450)",
			"CONSOLE_ENABLE = yes         # Console for debug(+400)",
			"COMMAND_ENABLE = yes         # Commands for debug and configuration",
			"# Do not enable SLEEP_LED_ENABLE. it uses the same timer as BACKLIGHT_ENABLE",
			"SLEEP_LED_ENABLE = no        # Breathing sleep LED during USB suspend",
			"# if this doesn't work, see here: https://github.com/tmk/tmk_keyboard/wiki/FAQ#nkro-doesnt-work",
			"NKRO_ENABLE = no             # USB Nkey Rollover",
			"BACKLIGHT_ENABLE = no        # Enable keyboard backlight functionality on B7 by default",
			"RGBLIGHT_ENABLE = no         # Enable keyboard RGB underglow",
			"MIDI_ENABLE = no             # MIDI support (+2400 to 4200, depending on config)",
			"UNICODE_ENABLE = no          # Unicode",
			"BLUETOOTH_ENABLE = no        # Enable Bluetooth with the Adafruit EZ-Key HID",
			"AUDIO_ENABLE = no            # Audio output on port C6",
			"FAUXCLICKY_ENABLE = no       # Use buzzer to emulate clicky switches",
			"HD44780_ENABLE = no          # Enable support for HD44780 based LCDs (+400)"
		);


		/*************
		** config.h **
		*************/
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
			"#define MATRIX_ROWS " + rows,
			"#define MATRIX_COLS " + cols + "",
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
			"*/",
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
				"//   #define RGBLED_NUM 16",
				"//   #define RGBLIGHT_HUE_STEP 8",
				"//   #define RGBLIGHT_SAT_STEP 8",
				"//   #define RGBLIGHT_VAL_STEP 8",
				"//   #define RGBLIGHT_LIMIT_VAL 255 /* The maximum brightness level */",
				"//   #define RGBLIGHT_SLEEP  /* If defined, the RGB lighting will be switched off when the host goes to sleep */",
				"// /*== all animations enable ==*/",
				"//   #define RGBLIGHT_ANIMATIONS",
				"// /*== or choose animations ==*/",
				"//   #define RGBLIGHT_EFFECT_BREATHING",
				"//   #define RGBLIGHT_EFFECT_RAINBOW_MOOD",
				"//   #define RGBLIGHT_EFFECT_RAINBOW_SWIRL",
				"//   #define RGBLIGHT_EFFECT_SNAKE",
				"//   #define RGBLIGHT_EFFECT_KNIGHT",
				"//   #define RGBLIGHT_EFFECT_CHRISTMAS",
				"//   #define RGBLIGHT_EFFECT_STATIC_GRADIENT",
				"//   #define RGBLIGHT_EFFECT_RGB_TEST",
				"//   #define RGBLIGHT_EFFECT_ALTERNATING",
				"// #endif"
			);
		}


		/*************
		** keymap.c **
		*************/
		var customKeycodes = [];
		var keymapData = "";
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

		for ( layer=0; layer<=15; layer++ ) {
			//console.log( "Processing Layer "+ layer +"..." );
			var layerData = "  ["+ layer +"] = LAYOUT( \\\n    ";
			var transCodes = 0;
			for ( key=0; key<keys; key++ ) {
				var matrixRow = obj.keyboard.keys[key].row
				var matrixCol = obj.keyboard.keys[key].col;
				var keycode = obj.keyboard.keys[key].keycodes[layer].id;
				switch ( keycode ) {
					case "MO()":
					case "TG()":
					case "TO()":
					case "TT()":
					case "DF()":
					case "OSL()":
						var keycode = keycode.replace(/\(\)/, "("+ kb.keys[key].keycodes[layer].fields[0] +")");
						break;
					case "LT()":
						var keycode = keycode.replace(/\(\)/, "("+ kb.keys[key].keycodes[layer].fields[0] +", "+ kb.keys[key].keycodes[layer].fields[1].id +")");
						var shortCode = keycode
							.replace(/^LT\(/, "LT")
							.replace(/, KC_([A-Z0-9_]+)\)/, "_$1")
							;
						customKeycodes.push( "#define "+ shortCode +" ".repeat(12 - shortCode.length) + keycode );
						var append = shortCode;
						layerData += append /*+","+ " ".repeat( Math.max(0, (8 - shortCode.length) ) )*/;

						break;
					case "LM()":
						var n = kb.keys[key].keycodes[layer].fields[0]; // Target Layer
						var mod = kb.keys[key].keycodes[layer].fields[1]; // Mod Mask
						var bitflags = "0".repeat( 6 - (mod).toString(2).length ) + (mod).toString(2);
						var suffix = "";
						var mods = [];
						if ( bitflags.substr(5, 1) == 1 ) { mods.push( "MOD_LCTL" ); suffix += "C"   ; }
						if ( bitflags.substr(4, 1) == 1 ) { mods.push( "MOD_LSFT" ); suffix += "S"   ; }
						if ( bitflags.substr(3, 1) == 1 ) { mods.push( "MOD_LALT" ); suffix += "A"   ; }
						if ( bitflags.substr(2, 1) == 1 ) { mods.push( "MOD_LGUI" ); suffix += "G"   ; }
						if ( bitflags.substr(0, 1) == 1 ) { mods.push( "MOD_MEH"  ); suffix = "MEH"  ; }
						if ( bitflags.substr(1, 1) == 1 ) { mods.push( "MOD_HYPR" ); suffix = "HYPR" ; }

						var shortCode = "LM"+ n +"_"+ suffix;
						var keycode = keycode.replace(/\(\)/, "("+ n + ", "+ mods.join(' | ') +")");

						customKeycodes.push( "#define "+ shortCode +" ".repeat(12 - shortCode.length) + keycode );
						var append = shortCode;
						layerData += append /*+","+ " ".repeat( Math.max(0, (8 - shortCode.length) ) )*/;

						break;
					case "MT()":
						var n = kb.keys[key].keycodes[layer].fields[0]; // Mod Mask
						var kc = kb.keys[key].keycodes[layer].fields[1].id; // Keycode
						var bitflags = "0".repeat( 6 - (n).toString(2).length ) + (n).toString(2);
						var prefix = "";
						var mods = [];
						if ( bitflags.substr(5, 1) == 1 ) { mods.push( "MOD_LCTL" ); prefix += "C"   ; }
						if ( bitflags.substr(4, 1) == 1 ) { mods.push( "MOD_LSFT" ); prefix += "S"   ; }
						if ( bitflags.substr(3, 1) == 1 ) { mods.push( "MOD_LALT" ); prefix += "A"   ; }
						if ( bitflags.substr(2, 1) == 1 ) { mods.push( "MOD_LGUI" ); prefix += "G"   ; }
						if ( bitflags.substr(0, 1) == 1 ) { mods.push( "MOD_MEH"  ); prefix = "MEH"  ; }
						if ( bitflags.substr(1, 1) == 1 ) { mods.push( "MOD_HYPR" ); prefix = "HYPR" ; }

						var shortCode = prefix +"_"+ kc.replace(/KC_/g, "");
						var keycode = keycode.replace(/\(\)/, "("+ mods.join(' | ') +", "+ kc +")");

						customKeycodes.push( "#define "+ shortCode +" ".repeat(12 - shortCode.length) + keycode );
						var append = shortCode;
						layerData += append /*+","+ " ".repeat( Math.max(0, (8 - shortCode.length) ) )*/;

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
						var shortCode = keycode
							.replace(/[LR]CTL\(/g, "C" )
							.replace(/[LR]SFT\(/g, "S" )
							.replace(/[LR]ALT\(/g, "A" )
							.replace(/[LR]GUI\(/g, "G" )
							.replace(/KC_([A-Z0-9_]+)[\)]+/g, "_$1" )
							//.replace(/([CSAG_]+)__/g, "$1".replace(/_/g, "") )
							;
						console.log( shortCode );
						customKeycodes.push( "#define "+ shortCode +" ".repeat(12 - shortCode.length) + keycode );
						var append = shortCode;
						layerData += append /*+","+ " ".repeat( Math.max(0, (8 - shortCode.length) ) )*/;

						break;
				}
				if ( keycode.length <= 7 ) {
					var append = keycode;
					layerData += append /*+","+ " ".repeat( Math.max(0, (8 - keycode.length) ) )*/;
					if ( keycode == "KC_TRNS" ) { transCodes++; }
				} else {
					//layerData += keycode /*+","+ " ".repeat( Math.max(0, (8 - keycode.length) ) )*/;
				}
				if ( key < keys-1 ) {
					layerData += ",";
					layerData += " ".repeat( Math.max(0, (8 - append.length) ) );
					if ( key % cols == cols-1 ) {
						layerData += "\\\n    ";
					} else {
						//layerData += "\\"
					}
				} else {
					layerData += " ".repeat( Math.max(0, (9 - keycode.length) ) );
					layerData += "\\" /*+ " ".repeat( Math.max(0, (9 - keycode.length) ) )*/;
				}
				matrix[matrixRow][matrixCol] = "K"+ base32hex.substr( obj.keyboard.keys[key].row , 1) + base32hex.substr( obj.keyboard.keys[key].col , 1) +"  ";
			}
			layerData += "\n  ),\n";
			// Only output the layer if non-KC_TRNS keycodes are present (blank layers are suppressed).
			if ( transCodes != keys ) {
				keymapData += layerData;
			}
		}

		keymapOutput.push(
			customKeycodes.join('\n') +"\n",
			//"// keys per layer: " + keys,
			"const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {",
		);
		keymapOutput.push(
			keymapData,
			"};"
		);
		/*
		text_o.value = [
			layer_data.replace(/\\\\/g, "\\").replace(/\\\n[\s\n]+\)/g, "\\\n  \)") +
		].join('\n') + "\n";
		*/


		/**************
		** info.json **
		**************/
		var infojsonOutput = [
			"{",
			"  \"keyboard_name\": \""+ obj.keyboard.settings.name +"\",",
			"  \"url\": \"\",",
			"  \"maintainer\": \"qmk\",",
			"  \"width\": "+ obj.keyboard.bounds.max.x +",",
			"  \"height\": "+ obj.keyboard.bounds.max.y +",",
			"  \"layouts\": {",
			"    \"LAYOUT\": {",
			"      \"key_count\": "+ obj.keyboard.keys.length +",",
			"      \"layout\": ["
		];

		var layoutString = ""; // physical layout
		// Layout Data
		for ( key=0; key<keys; key++ ) {
			var w = obj.keyboard.keys[key].state.w;
			var h = obj.keyboard.keys[key].state.h;
			infojsonOutput.push(
				[
					"{\"label\":\""+ [
						"K",
						base32hex.substr(obj.keyboard.keys[key].row, 1),
						base32hex.substr(obj.keyboard.keys[key].col, 1)
					].join('') +
					" (" + obj.keyboard.pins.row[obj.keyboard.keys[key].row] +"," + obj.keyboard.pins.col[obj.keyboard.keys[key].col] +")"+
					"\"",
					"\"x\":"+ obj.keyboard.keys[key].state.x,
					"\"y\":"+ obj.keyboard.keys[key].state.y +"},"
				].join(', ')
			);

			if ( w != 1 ) {
			  infojsonOutput[infojsonOutput.length-1] = infojsonOutput[infojsonOutput.length-1].replace(/},$/g, ", \"w\":"+ w +"},");
			}
			if ( h != 1 ) {
			  infojsonOutput[infojsonOutput.length-1] = infojsonOutput[infojsonOutput.length-1].replace(/},$/g, ", \"h\":"+ h +"},");
			}

			layoutString += ["K", base32hex.substr(obj.keyboard.keys[key].row, 1), base32hex.substr(obj.keyboard.keys[key].col, 1)].join('') +", ";
			if ( ( key < (keys - 1) ) && ( obj.keyboard.keys[key].state.x > obj.keyboard.keys[key+1].state.x ) ) {
				layoutString += "\\\n";
			}
		}
		infojsonOutput.push(
			"      ]",
			"    }",
			"  }",
			"}",
		);


		for ( i=0; i<matrix.length; i++ ) {
			for ( j=0; j<matrix[i].length; j++ ) {
				if ( matrix[i][j] == "KC_NO" ) {
					//matrix[i][j] = "_x_";
				}
			}
		}
		for ( i = rows-1; i >= 0; i-- ) {
			// inserts at 5th index position
			layoutMacroOutput.splice(21, 0, "  {   "+ matrix[i].join(', ').replace(/( +),/g, ",$1") +" }, \\" );
		}
		/*
		for ( i = rows-1; i >= 0; i-- ) {
			// inserts at 4th index position
			layoutMacroOutput.splice(4, 0, "  "+ matrix[i].join(', ')
				.replace(/KC_NO/g, "     ")
				.replace(/( +),/g, ",$1")
				.replace(/,( +),/g, ",$1 ")
				.replace(/,( +),/g, ",$1 ") +", \\" )
			;
		}
		*/
		// inserts at 4th index position
		layoutString = layoutString.split('\n');
		for ( i = layoutString.length-1; i>=0; i-- ) {
			if ( i == layoutString.length-1 ) {
				//console.log( layoutString[i] );
				layoutMacroOutput.splice(20, 0, "  "+ layoutString[i].replace(/, $/, "") +"  \\" );
			} else {
				layoutMacroOutput.splice(20, 0, "  "+ layoutString[i] +"" );
			}
		}

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
								if ( ( n > 10 ) && ( n < 10+keys ) ) {
									insLine.innerHTML = line.replace(/^{\"label/, " ".repeat(8) + "{\"label" ).replace(/\},/g, "},") +"\n";
								} else {
									insLine.innerHTML = line.replace(/^{\"label/, " ".repeat(8) + "{\"label" ).replace(/\},/g, "}") +"\n";
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
