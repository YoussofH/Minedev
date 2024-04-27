import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "Webview" is up and running now');

    let webview = vscode.commands.registerCommand('minedev.webview', () => {

        let panel = vscode.window.createWebviewPanel("webview", "Web View", {
            viewColumn: vscode.ViewColumn.One,
        }, {
            localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")],
            enableScripts: true
        });

        const scriptPath = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "script.js"));

        const cssStyle = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "vscode.css"));
        const imgSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "github.png"));

        panel.webview.html = `<!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <link rel="stylesheet" type="text/css" href="${cssStyle}" />
                                </head>
                                <body>
                                <div class="container">
                                    <img src="${imgSrc}" width="200" />
                                    <div class="form">
                                        <code>Title</code>
                                        <input />
                                        <code>Code</code>
                                        <textarea></textarea>
                                        <p id="count">0</p>
                                        <button onclick="updateCount()">Count</button>
                                    </div>
                                </div>
                                <script src="${scriptPath}"></script>
                                </body>
                                </html>`;

    });

    context.subscriptions.push(webview);
}

// This method is called when your extension is deactivated
export function deactivate() { }
