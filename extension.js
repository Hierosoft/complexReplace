const vscode = require('vscode');

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "extension.castSelection",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      const config = vscode.workspace.getConfiguration("codeCaster");
      const castString = config.get("castString", "bytearray");
      const castSyntax = config.get("castSyntax", "call");
      const extraParenthesis = config.get("extraParenthesis", true);

      editor.edit((editBuilder) => {
        editor.selections.forEach((selection) => {
          const selectedText = editor.document.getText(selection);

          let castedText;
          if (castSyntax === "call") {
            castedText = `${castString}(${selectedText})`;
          } else if (castSyntax === "C") {
            if (extraParenthesis) {
              castedText = `(${castString})(${selectedText})`;
            } else {
              castedText = `(${castString})${selectedText}`;
            }
          }

          editBuilder.replace(selection, castedText);
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
