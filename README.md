# Code Helper

This Visual Studio Code extension assists developers by providing coding suggestions and refactoring support with github copilot chat.

## Features

- Offers intelligent code refactoring suggestions to improve code quality.

## Commands

- `/refactor`: Provides refactoring suggestions for the currently selected code.

## Installation

### Using VSIX File

1. You can download the extension directly from the following link: [Download Extension](./code-helper-0.0.1.vsix)
2. Open Visual Studio Code.
3. Press `Ctrl+Shift+X` to open the Extensions view.
4. Click on the `...` icon in the top-right corner of the Extensions view and select **Install from VSIX...**.
5. Select the downloaded `.vsix` file and click **Install**.

Alternatively, you can install the extension using the command line:

```sh
code --install-extension path/to/code-helper-0.0.1.vsix
```

To uninstall the extension, you can use the command line:

```sh
code --uninstall-extension path/to/code-helper-0.0.1.vsix
```

### Using Code

1. Install the required dependencies:
   ```sh
   npm install
   ```
2. Compile the extension:
   ```sh
   npm run compile
   ```
3. Open the project in Visual Studio Code:
   ```sh
   code .
   ```
4. Press `F5` to launch and debug the extension.

## Usage

1. Open file in Visual Studio Code.
2. Open the GitHub Copilot Chat panel.
3. Select a file and highlight the code you want to refactor.
4. Type @code-helper in github copilot chat with ask mode.
5. Type command `/refactor` in the chat to receive refactoring suggestions.
