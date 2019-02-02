document.getElementById("c_config").addEventListener(
	"click",
	function(){
		output("config.h")
	}
);
document.getElementById("c_rules").addEventListener(
	"click",
	function(){
		output("rules.mk")
	}
);
document.getElementById("c_board").addEventListener(
	"click",
	function(){
		output("keyboard.h")
	}
);
/*document.getElementById("c_keymap").addEventListener(
	"click",
	function(){
		output("keymap.c")
	}
);*/
document.getElementById("c_info").addEventListener(
	"click",
	function(){
		output("info.json")
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
		console.log( matrix );
		var layoutMacroOutput = [
			"#pragma once",
			"#include \"quantum.h\"",
			"#define _x_ KC_NO",
			"#define LAYOUT( \\",
			") { \\",
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


		/*************
		** config.h **
		*************/
		var configOutput = [
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
		var keymapData = "";
		var keymapOutput = [
			"#include QMK_KEYBOARD_H",
			"",
			"const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {",
		];

		for ( layer=0; layer<=15; layer++ ) {
			//console.log( "Processing Layer "+ layer +"..." );
			var layerData = "  ["+ layer +"] = LAYOUT( \\\n";
			for ( key=0; key<keys; key++ ) {
				var matrixRow = obj.keyboard.keys[key].row
				var matrixCol = obj.keyboard.keys[key].col;
				var keycode = obj.keyboard.keys[key].keycodes[layer].id;
				layerData += keycode +","+ " ".repeat( Math.max(0, (8 - keycode.length) ) );
				matrix[matrixRow][matrixCol] = "K"+ base32hex.substr( obj.keyboard.keys[key].row , 1) + base32hex.substr( obj.keyboard.keys[key].col , 1) +"  ";
			}
			layerData += "\n  ),\n";
			keymapData += layerData;
		}

		keymapOutput.push([
			keymapData,
			"  // keys per layer: " + keys + "",
			"};"
		]);
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
			infojsonOutput.push(
				[
					"{\"label\":\""+ ["K", base32hex.substr(obj.keyboard.keys[key].row, 1), base32hex.substr(obj.keyboard.keys[key].col, 1)].join('') +"\"",
					"\"x\":"+ obj.keyboard.keys[key].state.x,
					"\"y\":"+ obj.keyboard.keys[key].state.y,
					"\"w\":"+ obj.keyboard.keys[key].state.w,
					"\"h\":"+ obj.keyboard.keys[key].state.h +"},"
				].join(', ')
			);
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
			layoutMacroOutput.splice(5, 0, "  {   "+ matrix[i].join(', ').replace(/( +),/g, ",$1") +" }, \\" );
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
				layoutMacroOutput.splice(4, 0, "  "+ layoutString[i].replace(/, $/, "") +"  \\" );
			} else {
				layoutMacroOutput.splice(4, 0, "  "+ layoutString[i] +"" );
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
					infojsonOutput.forEach(
						function(line) {
							//console.log( "typeof line: "+ typeof line );
							if ( typeof line == "string" ) {
								var insLine = document.createElement('code');
								preElement.setAttribute('class', "language-json");
								insLine.innerHTML = line.replace(/^{\"label/, " ".repeat(8) + "{\"label" ) +"\n";
								preElement.appendChild( insLine );
							}
						}
					);
					break;
			}
			var lastLine = document.createElement('code');
			lastLine.innerHTML = "\n";
			preElement.appendChild( lastLine );
			// Rerun Prism syntax highlighting on the element
			Prism.highlightElement(preElement);
		};

		output("config.h");

	}
);
