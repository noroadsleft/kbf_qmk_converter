console.log( "Running showOutput3.js..." );

document.querySelector('#copy').addEventListener(
    "click",
    function() {
        var selectedTabCode = document.querySelector('.tab-pane.active code');
        navigator.clipboard.writeText(selectedTabCode.textContent).then(function() {
            var selectedTabName = document.querySelector('.nav-link.active').textContent;
            document.querySelector('#status').classList.remove('d-none');
            document.querySelector('#copied-filename').textContent = selectedTabName;
        });
    }
);

document.querySelector('#submit').addEventListener(
    "click",
    function() {
        var jsonData = document.querySelector('#input').value;

        // create an object of our JSON data
        var obj = JSON.parse(JSON.stringify(eval("(" + jsonData + ")")));

        /**********************************************
        ** Output the resultant text to the textarea **
        **********************************************/
        document.querySelector('#output-rules').textContent = '# This file intentionally left blank\n';
        document.querySelector('#output-keymap').textContent = kbfKeymapC(obj.keyboard);
        document.querySelector('#output-info').textContent = JSON.stringify(kbfInfoJson(obj.keyboard), null, " ".repeat(4) )
            // Polish the output of layouts tree
            .replace(/\n {20,}/g, " ")
            .replace(/\n {16,}\}/g, " }")
            .replace(/\{ "label"/g, "{\"label\"")
            .replace(/([0-9\.]+) \}/g, "$1}")
            // Polish the output of matrix_pins tree
            .replace(/\n {12}"([BCDEF][0-7])"/g, " \"$1\"")
            .replace(/"\n +\]/g, "\" ]")
            .replace(/\[ /g, "[")
            .replace(/ \]/g, "]");

        hljs.highlightAll();
        document.querySelector('#output-card').classList.remove('d-none');
    }
);
