import * as fs from "fs";
import * as crypto from "crypto";
import * as vscode from "vscode";
import { refactorCodeUserPrompt, refactorCodeSystemPrompt } from "./prompts";

export function calculateFileSHA(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      const sha = hash.digest("hex");
      resolve(sha);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}

export function isNullOrEmpty(value: string): boolean {
  if (value === null || value === undefined) {
    return true;
  } else if (value.trim().length === 0 && !value.includes("\n")) {
    return true;
  } else {
    return false;
  }
}

export async function sendRefactorCodeRequest(
  selectedText: string,
  request: vscode.ChatRequest,
  token: vscode.CancellationToken,
  stream: vscode.ChatResponseStream
): Promise<string> {
  const msgs = [
    vscode.LanguageModelChatMessage.Assistant(refactorCodeSystemPrompt()),
    vscode.LanguageModelChatMessage.User(
      refactorCodeUserPrompt(selectedText, request.prompt)
    ),
  ];
  const result = await request.model.sendRequest(msgs, {}, token);
  stream.progress("Generating...");

  let response = "";
  for await (const fragment of result.text) {
    response += fragment;
  }

  return response;
}
