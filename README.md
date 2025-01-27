# Complex Replace for VSCode/Codium

Transform code in syntax-aware ways.

## Features
### Cast Selection
(Shift+Alt+C, or shift+cmd+c on Mac)
Wrap a nested structure or long literal collection in a call or cast. Example: `[0xFF, 0x00]` (selected), result: `bytearray([0xFF, 0x00])`. Settings:
- Configure the type to cast to (e.g., `bytearray` (default) or `int`).
- Choose between `call` syntax (`int([...])`) or `C` syntax (`(int)[...]`).
- (enabled by default) Optionally still add parentheses around the argument when using `C` syntax (`(bytearray)([...])`).


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
```
code --extensionDevelopmentPath=.
#\
#--extensionTestsPath=<TEST-RUNNER-SCRIPT-PATH>
```
or install "Extension Test Runner" extension for VSCode (recommended by VSCode when opening a scaffolded project (created via `yo code`)

Use the [Node.js compatibility table](https://code.visualstudio.com/api/working-with-extensions/testing-extension#nodejs)
and install a version of Node.js that is compatible with the electron version that was used to create your version VS Code.

1. **Install Dependencies**: Run `npm install` in the project directory.
2. **Test the Extension**: Open the extension in VSCode and press `F5` to launch a new VSCode window with the extension active.
3. **Build from source**
```
npm install -g @vscode/vsce
vsce package
```
4. **Install from source** (optional)
   - Open VSCode/Codium
   - Extensions
   - "..." button
   - "Install from VSIX..."
   - Choose the file built above (present in repo folder if step 3 was successful)
5. **Publish**: Use the `vsce` tool to package and publish the extension.
   - Validate your development environment using steps 1 & 2 above first.
```
vsce publish
```
