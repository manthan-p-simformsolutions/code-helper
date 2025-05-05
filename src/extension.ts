import * as vscode from "vscode";
import { refactorCode } from "./functions";

export function activate(context: vscode.ExtensionContext) {
  const handler: vscode.ChatRequestHandler = async (
    request: vscode.ChatRequest,
    _context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ) => {
    const currentFile = vscode.window.activeTextEditor?.document.uri.fsPath;

    if (!currentFile) {
      stream.markdown(
        "Please open a file in the editor to proceed with assistance."
      );
      return;
    }

    try {
      if (request.command === "refactor") {
        await refactorCode(stream, request, token);
      } else {
        stream.markdown("Please select a valid command to proceed.");
        return;
      }
    } catch (error) {
      stream.markdown(`An error occurred: ${(error as Error).message}`);
    }
  };

  const converter = vscode.chat.createChatParticipant("code-helper", handler);

  converter.iconPath = vscode.Uri.joinPath(context.extensionUri, "logo.png");
}

export function deactivate() {}
