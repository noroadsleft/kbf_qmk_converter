function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      var metadata = [
        "name: " + f.name,
        "type: " + f.type,
        "size: " + f.size,
        "starts with: " + contents.substr(1, contents.indexOf("\n"))
      ];
      //console.log( "Got the file:\n"+ metadata.join('\n') );
      document.querySelector('#input').value = contents;
      document.querySelector('#submit').click();
    }
    r.readAsText(f);
    //console.log( typeof r.readAsText(f) );
  } else {
    alert("Failed to load file");
  }
}

document.querySelector('#file-import').addEventListener('change', readSingleFile, false);
