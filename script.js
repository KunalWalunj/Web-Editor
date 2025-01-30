// Initialize Ace editors
var htmlEditor = ace.edit("htmlEditor");
htmlEditor.setTheme("ace/theme/github");
htmlEditor.session.setMode("ace/mode/html");

var cssEditor = ace.edit("cssEditor");
cssEditor.setTheme("ace/theme/github");
cssEditor.session.setMode("ace/mode/css");

 // Enable code autocompletion
 cssEditor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  });

  // Optional: Custom CSS autocompletion
  var cssCompleter = {
    getCompletions: function(editor, session, position, prefix, callback) {
      var completions = [
        { caption: 'color', value: 'color', meta: 'property' },
        { caption: 'background', value: 'background', meta: 'property' },
        { caption: 'font-size', value: 'font-size', meta: 'property' },
        { caption: 'margin', value: 'margin', meta: 'property' }
      ];
      callback(null, completions);
    }
  };

  ace.require('ace/ext/language_tools').addCompleter(cssCompleter);

var jsEditor = ace.edit("jsEditor");
jsEditor.setTheme("ace/theme/github");
jsEditor.session.setMode("ace/mode/javascript");

// Hide all editors initially
document.getElementById("htmlEditor").style.display = "none";
document.getElementById("cssEditor").style.display = "none";
document.getElementById("jsEditor").style.display = "none";

// Function to switch between editors
function openEditor(editorType) {
    document.getElementById("htmlEditor").style.display = "none";
    document.getElementById("cssEditor").style.display = "none";
    document.getElementById("jsEditor").style.display = "none";

    if (editorType === 'html') {
        document.getElementById("htmlEditor").style.display = "block";
    } else if (editorType === 'css') {
        document.getElementById("cssEditor").style.display = "block";
    } else if (editorType === 'js') {
        document.getElementById("jsEditor").style.display = "block";
    }
}

// Function to preview the result
function runCode() {
    var htmlCode = htmlEditor.getValue();
    var cssCode = cssEditor.getValue();
    var jsCode = jsEditor.getValue();

    var previewFrame = document.getElementById("preview");
    var previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    // Clear previous content
    previewDoc.open();
    previewDoc.close();

    // Set HTML, CSS, and JS in the iframe
    previewDoc.open();
    previewDoc.write(`
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `);
    previewDoc.close();
}
