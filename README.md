# Complex Replace for VSCode/Codium

Cast selected code to a specific type using configurable syntax in Visual Studio Code.

## Features

- Configure the type to cast to (e.g., `bytearray`).
- Choose between `call` syntax (`bytearray([...])`) or `C` syntax (`(bytearray)[...]`).
- Optionally add extra parentheses with `C` syntax (`(bytearray)([...])`).

## Settings

- `complexreplace.castString`: The type to cast the selection to (default: `bytearray`).
- `complexreplace.castSyntax`: The syntax for casting:
  - `call`: Adds parentheses for a function call.
  - `C`: Uses C-style casting syntax.
- `complexreplace.extraParenthesis`: Adds extra parentheses when using `C` syntax.

## Usage

1. Select some text in your editor.
2. Press `Alt+B` to cast the selected text.

## Example

### Settings
```json
{
  "complexreplace.castString": "bytearray",
  "complexreplace.castSyntax": "C",
  "complexreplace.extraParenthesis": true
}
```

### Selected Text

`[0x01, 0x04]`

### Output

`(bytearray)([0x01, 0x04])` (with the default settings)

## Installation

1. Clone the repository.
2. Run `npm install` in the project directory.
3. Open the project in VSCode and press `F5` to test the extension.


---

### Testing and Packaging

1. **Install Dependencies**: Run `npm install` in the project directory.
2. **Test the Extension**: Open the extension in VSCode and press `F5` to launch a new VSCode window with the extension active.
3. **Publish**: Use the `vsce` tool to package and publish the extension.
   - Validate your development environment using steps 1 & 2 above first.
```
npm install -g @vscode/vsce
vsce package
vsce publish
```
