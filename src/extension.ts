import * as vscode from 'vscode';

// Cast function that will be executed when the command is invoked
function castSelection() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    const config = vscode.workspace.getConfiguration('complexReplace');
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

// Register the command
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('complexReplace.cast', castSelection);

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
