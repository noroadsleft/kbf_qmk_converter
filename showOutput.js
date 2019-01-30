function showField(field) {
	document.getElementById("config").setAttribute("style", "display: none;");
	document.getElementById("matrix").setAttribute("style", "display: none;");
	document.getElementById("keymap").setAttribute("style", "display: none;");
	document.getElementById("info").setAttribute("style", "display: none;");
	//document.getElementById(field).removeAttribute("style");
	document.getElementById("single").value = document.getElementById(field).value;
	document.getElementsByClassName("selected")[0].removeAttribute('class');
	document.getElementById("c_"+field.replace('matrix', "board")).setAttribute('class', "selected");
};

document.getElementById("c_config").addEventListener("click", function(){ /* console.log("config"); */ showField("config") });
document.getElementById("c_board").addEventListener("click",  function(){ /* console.log("matrix"); */ showField("matrix") });
document.getElementById("c_keymap").addEventListener("click", function(){ /* console.log("keymap"); */ showField("keymap") });
document.getElementById("c_info").addEventListener("click",   function(){ /* console.log("info");   */ showField( "info" ) });

function clearOutputFields() {
	document.getElementById('single').value = "";
	document.getElementById('keymap').value = "";
	document.getElementById('config').value = "";
	document.getElementById('info').value = "";
	document.getElementById('matrix').value = "";
};

document.getElementsByTagName('button')[1].addEventListener(
	"click",
	clearOutputFields()
);


function parseOutput() {
	document.getElementById('keymap').value = "";
	document.getElementById('config').value = "";
	document.getElementById('info').value = "";
	document.getElementById('matrix').value = "";
};


document.getElementById('submit').addEventListener(
	"click",
	function() {

		var text_i = document.getElementById('input').value;
		var text_o = document.getElementById('keymap');
		var text_config = document.getElementById('config');
		var text_info = document.getElementById('info');
		var text_matrix = document.getElementById('matrix');
		text_o.value = "";
		//console.log( text_i );

		// create an object of our JSON data
		var obj = JSON.parse(JSON.stringify(eval("(" + text_i + ")")));
		//console.log(typeof obj);

		// t will equal the number of keys in the keymap
		var t = obj.keyboard.keys.length;

		// keymap is an array that holds our keymap
		// 16 layers, the maximum supported by kbfirmware
		var keymap = [
			[], [], [], [],
			[], [], [], [],
			[], [], [], [],
			[], [], [], [],
		];
		var kb = obj.keyboard;
		var cols = obj.keyboard.cols;

		// 9 - obj.keyboard.keys[0].keycodes[0].id.length;
		var layer_data = "";
		var info_data = "";
		var info_data_l = 0;

		var switch_matrix = new Array(obj.keyboard.rows);
		var switch_layout = new Array( t );

		for (row = 0; row < obj.keyboard.rows; row++) {
			switch_matrix[row] = new Array(obj.keyboard.cols);
		}
		//console.log(switch_matrix);

		for (layer = 0; layer < 16; layer++) {
			//keymap[layer].push("[" + layer + "] = LAYOUT(" );
			//keymap[layer].push( [] );
			layer_data += "  [" + layer + "] = LAYOUT( \\\n    ";

			for (key = 0; key < t; key++) {
				var keycode = kb.keys[key].keycodes[layer].id;

				if ( kb.keys[key].keycodes[layer].fields.length == 1 ) {
					var keydata = [];
						keydata.push( "layer: "+ layer +" > key: "+ key +" > keycode_0: "+ keycode );
						keydata.push( "layer: "+ layer +" > key: "+ key +" > keycode_1: "+ kb.keys[key].keycodes[layer].fields[0].id );
						//if ( kb.keys[key].keycodes[layer].fields[0].fields[0].id != null )                     { keydata.push( "keycode_2: " + kb.keys[key].keycodes[layer].fields[0].fields[0].id ); }
						//if ( kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].id != null )           { keydata.push( "keycode_3: " + kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].id ); }
						//if ( kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].fields[0].id != null ) { keydata.push( "keycode_4: " + kb.keys[key].keycodes[layer].fields[0].fields[0].fields[0].fields[0].id ); }

						switch ( keycode ) {
							case "MO()":
							case "TG()":
							case "TO()":
							case "TT()":
							case "DF()":
							case "OSL()":
								var keycode = keycode.replace(/\(\)/, "("+ kb.keys[key].keycodes[layer].fields[0] +")");
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
								//console.log( "keycodeValue: "+ keycodeValue );
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
								//console.log( "POST: "+ keycode );
								break;
						}

						//console.log( [ "Layer "+ layer +", key "+ key, "Keycode: "+ keycode].join(" > ") );
						//console.log( "-".repeat(72) );
					/*console.log(
						[
							"type: " + typeof kb.keys[key].keycodes[layer].fields[0],
							"\n\t",
							keydata.join("\n\t")
						].join('')
					);*/
					switch ( typeof kb.keys[key].keycodes[layer].fields[0] ) {
						case "number":
						case "string":
							var field = kb.keys[key].keycodes[layer].fields[0];
							break;
						case "object":
							var field = kb.keys[key].keycodes[layer].fields[0].id;

							if ( kb.keys[key].keycodes[layer].fields[0].fields.length == 1 ) {
								switch ( typeof kb.keys[key].keycodes[layer].fields[0].fields[0] ) {
									case "number":
									case "string":
										var field = kb.keys[key].keycodes[layer].fields[0].fields[0];
										break;
									case "object":
										var field = kb.keys[key].keycodes[layer].fields[0].fields[0].id;
										break;
								}
							}
							keycode = keycode.replace(/\(\)/, "(" + field + ")");
							break;
					}
					keycode = keycode.replace(/\(\)/, "(" + field + ")");
				}

				var pad = 9 - 1 - keycode.length;

				// keymap[layer]/*[0]*/.push( "\"" + keycode + "\"" + "" + " ".repeat(pad) );
				//layer_data += keycode + "," + " ".repeat( Math.max( 0, pad ) );
				/*if ( ( nestedKeycode ) && ( nestedKeycode.length > 0 ) ) {
					layer_data += nestedKeycode;
					nestedKeycode = null;
					//console.log( "nestedKeycode: "+ nestedKeycode );
				} else {*/
					layer_data += keycode;
				//}
				if (key < (t - 1)) {
					layer_data += "," + " ".repeat(Math.max(0, pad));
				} else {
					layer_data += " ".repeat(Math.max(0, pad + 1)) + "\\";
				}


				/************************
				 ** Build switch matrix **
				 ************************/
				if (kb.keys[key].row > 9) {
					var r = String.fromCharCode(55 + kb.keys[key].row);
				} else {
					var r = kb.keys[key].row;
				}
				if (kb.keys[key].col > 9) {
					var c = String.fromCharCode(55 + kb.keys[key].col);
				} else {
					var c = kb.keys[key].col;
				}
				switch_matrix_id = "K" + r + c;
				switch_matrix[kb.keys[key].row][kb.keys[key].col] = switch_matrix_id;
				switch_layout[key] = switch_matrix_id +" ".repeat( Math.max(0, 5-switch_matrix_id) );


				/***********************
				 ** add info.json data **
				 ***********************/
				if (info_data_l < t) {
					if ((key > 0) && (kb.keys[key].state.y > kb.keys[key - 1].state.y)) {
						//info_data += "],\n[\n";
					}
					/*if (key == 0) {
						var x = 0;
						var y = 0;
					} else {
						var x = kb.keys[key].state.x - (kb.keys[key - 1].state.x + kb.keys[key - 1].state.w);
						var y = kb.keys[key].state.y - kb.keys[key - 1].state.y;
					}
					info_data += "" +
						"{x:" + x + "," +
						"y:" + Math.min(0, y) + "," +
						"w:" + kb.keys[key].state.w + "," +
						"h:" + kb.keys[key].state.h + "}," +
						//"\""+ kb.keys[key].keycodes[0].id +"\",\n";
						"\"K" + kb.keys[key].row.toString(16).toUpperCase() + kb.keys[key].col.toString(16).toUpperCase() + "\",\n";*/
					var info_data_key = [
						"K"+ kb.keys[key].row.toString(16).toUpperCase() + kb.keys[key].col.toString(16).toUpperCase(),
						kb.keys[key].state.x,
						kb.keys[key].state.y,
						kb.keys[key].state.w,
						kb.keys[key].state.h
					];
					info_data += "        {\"label\":\""+ info_data_key[0] +"\", "+
						"\"x\":"+ info_data_key[1] +", "+
						"\"y\":"+ info_data_key[2] +", "+
						"\"w\":"+ info_data_key[3] +", "+
						"\"h\":"+ info_data_key[4] +"},\n"
						;
					//console.log( kb.keys[key].row.toString(16) + "/" + kb.keys[key].col.toString(16) );
					info_data_l++;
				}

				// wrap the line every 10 keys
				if (key % cols == (cols - 1)) {
					layer_data += "\\\n    ";
				}
			}

			layer_data = layer_data.replace(
				/, +\n  \)$/g,
				"  \\\n  )"
			) + "\n  ),\n";
		}

		/*
			Capture Diode Direction
		*/
		var dd = obj.keyboard.settings.diodeDirection;
		if (dd == 0) {
			dd = "COL2ROW";
		} else if (dd == 1) {
			dd = "ROW2COL";
		} else {
			dd = "CUSTOM_MATRIX";
		}

		/*
			Capture Bootloader Size
		*/
		var bs = obj.keyboard.settings.bootloaderSize;
		if (bs == 0) {
			bs = "512";
		} else if (bs == 1) {
			bs = "2048";
		} else if (bs == 2) {
			bs = "4096";
		} else if (bs == 3) {
			bs = "8192";
		}

		text_o.value = [
			"#include QMK_KEYBOARD_H\n",
			"const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {",
			"  // keys per layer: " + t + "",
			layer_data.replace(/\\\\/g, "\\").replace(/\\\n[\s\n]+\)/g, "\\\n  \)") +
			"};"
		].join('\n') + "\n";


		text_config.value = [
			"#pragma once\n",
			"#include \"config_common.h\"\n",
			"/* USB Device descriptor parameter */",
			"#define VENDOR_ID       0xFEED",
			"#define PRODUCT_ID      0x0000",
			"#define DEVICE_VER      0x0001",
			"#define MANUFACTURER    [EDIT_THIS]",
			"#define PRODUCT         [EDIT_THIS] " + obj.keyboard.settings.name + "",
			"#define DESCRIPTION     [EDIT_THIS] A custom keyboard\n",
			"/* key matrix size */\n",
			"#define MATRIX_ROWS " + obj.keyboard.pins.row.length,
			"#define MATRIX_COLS " + obj.keyboard.pins.col.length + "\n",
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
			"#define MATRIX_COL_PINS { " + obj.keyboard.pins.col.toString().split(',').join(', ') + " }\n",
			"#define DIODE_DIRECTION " + dd + "\n",
			"// #define BACKLIGHT_PIN " + obj.keyboard.pins.led,
			"// #define BACKLIGHT_BREATHING",
			"// #define BACKLIGHT_LEVELS " + obj.keyboard.settings.backlightLevels + "\n",
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
		].join("\n") + "\n";

		text_info.value = [
			"{",
			"  \"keyboard_name\": \""+ obj.keyboard.settings.name +"\",",
			"  \"url\": \"\",",
			"  \"maintainer\": \"qmk\",",
			"  \"width\": "+ obj.keyboard.bounds.max.x +",",
			"  \"height\": "+ obj.keyboard.bounds.max.y +",",
			"  \"layouts\": {",
			"    \"LAYOUT\": {",
			"      \"key_count\": "+ obj.keyboard.keys.length +",",
			"      \"layout\": [",
			info_data,
			"",
			"      ]",
			"    }",
			"  }",
			"}"
		].join("\n") + "\n";

		/***********************************
		** SWITCH MATRIX ERROR CORRECTION **
		***********************************/
		for ( i=0; i<switch_matrix.length; i++ ) {
			for ( j=0; j<switch_matrix[i].length; j++ ) {
				if ( switch_matrix[i][j] == null ) {
					switch_matrix[i][j] = "KC_NO";
				}
			}
		}
		//console.log(switch_matrix);
		//console.log("switch_matrix length: "+ switch_matrix.length);
		//console.log(switch_layout);

		text_matrix.value = "#define LAYOUT( \\\n" +
			"  "+ switch_layout.join(', ') +
			" \\\n) { \\\n";
		for ( i=0; i<switch_matrix.length; i++ ) {
			text_matrix.value += "  { "+ switch_matrix[i].join(', ') +" }, \\\n";
		}
		text_matrix.value += "}\n";
		text_matrix.value = text_matrix.value
			/*.replace(/(K[0-9A-Z]{2})/g, "$1  ")
			.replace(/( +),/g, ",$1")*/
			.replace(/\}, \\\n\}/, "}  \\\n\}")
			;


		// error correction
		text_info.value = text_info.value
			//.replace(/x:-[0-9\.]+/g, "x:0")
			//.replace(/[xy]:0,/g, "")
			.replace(/,\n\n+/g, "\n")
			.replace(/, +"h":1\}/g, "}")
			.replace(/, +"w":1\}/g, "}")
			;

		document.getElementById("single").value = text_config.value;
		showField("config");
	}
);
