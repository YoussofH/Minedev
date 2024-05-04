import * as vscode from 'vscode';
import { commands } from 'vscode';
import sendRequest from './remote/sendRequest';

export function activate(context: vscode.ExtensionContext) {

    let webview = commands.registerCommand('minedev.reactWebview', async () => {

        let panel = vscode.window.createWebviewPanel("webview", "Minedev", vscode.ViewColumn.One, {
            enableScripts: true, retainContextWhenHidden: false
        });

        let scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js"));
        let cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.css"));
        panel.iconPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'logo.png');

        panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;

        context.subscriptions.push(webview);

        panel.webview.onDidReceiveMessage(
            (msg) => {
                switch (msg.command) {
                    case 'showInfoMessage':
                        vscode.commands.executeCommand('minedev.showInfoMessage', msg.data);
                        break;
                }
            });

        const getMessages = async () => {
            try {
                const response = await sendRequest('GET', 'messages', {}); // No body required for GET requests
                return response.data;
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        const messages = await getMessages();


        let disposable = vscode.commands.registerCommand('minedev.vsToReact', () => {
            panel.webview.postMessage(
                {
                    command: "showMessage",
                    content: messages[0].message
                });
        });
        context.subscriptions.push(disposable);
        setTimeout(function () { vscode.commands.executeCommand("minedev.vsToReact"); }, 5000);

        panel.onDidDispose(
            () => {
                disposable.dispose();
            },
            null,
            context.subscriptions
        );

    });


    commands.registerCommand('minedev.showInfoMessage', (msg) => {
        vscode.window.showInformationMessage(msg);
    });
}

export function deactivate() { }