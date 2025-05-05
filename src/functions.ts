import * as vscode from "vscode";
import { sendRefactorCodeRequest } from "./utils";

export async function refactorCode(
  stream: vscode.ChatResponseStream,
  request: vscode.ChatRequest,
  token: vscode.CancellationToken
) {
  const activeEditor = vscode.window.activeTextEditor;
  stream.progress("Analyzing...");

  if (activeEditor) {
    const selection = activeEditor.selection;
    const selectedText = activeEditor.document.getText(selection);

    if (!selectedText?.length) {
      stream.markdown(
        "Please select a line or block of code for the assistant to analyze."
      );
      return;
    }
    try {
      const response = await sendRefactorCodeRequest(
        selectedText,
        request,
        token,
        stream
      );

      stream.markdown(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        stream.markdown(`Error: ${error.message}`);
      } else {
        stream.markdown(`An unknown error occurred. Please try again.`);
      }
    }
  } else {
    stream.markdown("No active editor found.");
  }
}
