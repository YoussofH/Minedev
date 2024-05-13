import * as vscode from 'vscode';
import { commands } from 'vscode';
import sendRequest from './remote/sendRequest';

export function activate(context: vscode.ExtensionContext) {

    let webview = commands.registerCommand('minedev.reactWebview', async () => {

        //launch webview
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

        commands.registerCommand('minedev.showInfoMessage', (msg) => {
            vscode.window.showInformationMessage(msg);
        });

        //register VS to React command
        let disposable = vscode.commands.registerCommand('minedev.vsToReact', async ({ command, body }) => {
            panel.webview.postMessage(
                {
                    command: command,
                    content: body
                });
        });
        context.subscriptions.push(disposable);

        //React To VS Event Handler
        panel.webview.onDidReceiveMessage(
            async (msg) => {
                switch (msg.command) {
                    case 'showInfoMessage':
                        vscode.commands.executeCommand('minedev.showInfoMessage', msg.data);
                        break;
                    case 'sendRequest':
                        const { method, path, body } = msg.data;
                        const response = await sendRequest(method, path, body);
                        vscode.commands.executeCommand("minedev.vsToReact", { command: "showMessage", body: JSON.stringify(response.data) });//parse string on React side
                        vscode.commands.executeCommand('minedev.showInfoMessage', JSON.stringify(response.data));
                        break;
                }
            });
        //test API
        const getMockAPIMessages = async () => {
            try {
                const response = await sendRequest('GET', 'plans', {}); // No body required for GET requests
                return response.data;
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        const messages = await getMockAPIMessages();
        setTimeout(function () { vscode.commands.executeCommand("minedev.vsToReact", { command: "showMessage", body: "Welcome back. Happy to see you again!" }); }, 5000);
        //end of logic part

        panel.onDidDispose(
            () => {
                disposable.dispose();
            },
            null,
            context.subscriptions
        );

    });
}

export function deactivate() { }