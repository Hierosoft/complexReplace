// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Cast function that will be executed when the command is invoked
function castSelection() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    const config = vscode.workspace.getConfiguration('complexreplace');
    const castString = config.get<string>('cast_string', 'bytearray');
    const castSyntax = config.get<string>('cast_syntax', 'call');
    const extraParenthesis = config.get<boolean>('extra_parenthesis', true);

    let castedText = `${castString}(${selectedText})`;

    if (castSyntax === 'C') {
        if (extraParenthesis) {
            castedText = `(${castString})(${selectedText})`;
        } else {
            castedText = `(${castString})${selectedText}`;
        }
    }

    editor.edit(editBuilder => {
        editBuilder.replace(selection, castedText);
    });
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // based on scaffolding:
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('complexreplace.cast', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from complexReplace!');
	//});
    // based on LLM:
    const disposable = vscode.commands.registerCommand('complexreplace.cast', castSelection);
    context.subscriptions.push(disposable);
    // console.log('Congratulations, your extension "complexreplace" is now active!');
}

// This method is called when your extension is deactivated
export function deactivate() {}
