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
    const disposable = vscode.commands.registerCommand('complexreplace.cast', castSelection);

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
