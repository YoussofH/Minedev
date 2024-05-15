import * as vscode from 'vscode';
import { commands } from 'vscode';
import sendRequest from './remote/sendRequest';
import { posix } from 'path';

export function activate(context: vscode.ExtensionContext) {

    let webview = commands.registerCommand('minedev.reactWebview', async () => {

        //launch webview
        let panel = vscode.window.createWebviewPanel("webview", "Minedev", vscode.ViewColumn.Beside, {
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


        const appendLog = async (writeStr: string) => {
            const folderUri = vscode.workspace.workspaceFolders[0].uri;

            const fileUri = folderUri.with({ path: posix.join(folderUri.path, 'test.txt') });
            let writeData = Buffer.from(writeStr, 'utf8');
            await vscode.workspace.fs.writeFile(fileUri, writeData);
            vscode.window.showTextDocument(fileUri);
        }
        async function getHierarchicalPaths(folderUri: vscode.Uri) {
            const directoryData = {
                name: folderUri.path,
                children: [],
            };

            const items = await vscode.workspace.fs.readDirectory(folderUri);
            for (const [item, type] of items) {
                const fileUri = folderUri.with({ path: posix.join(folderUri.path, item) });

                if (type === vscode.FileType.Directory) {
                    const subFolderData = await getHierarchicalPaths(fileUri);
                    directoryData.children.push(subFolderData);
                } else {
                    directoryData.children.push({ name: item }); // Add file as a child
                }
            }
            return directoryData;
        }

        vscode.commands.registerCommand('minedev.readWriteFile', async function () {
            if (!vscode.workspace.workspaceFolders) {
                return vscode.window.showInformationMessage('No folder or workspace opened');
            }
            const folderUri = vscode.workspace.workspaceFolders[0].uri;
            try {
                const directoryData = await getHierarchicalPaths(folderUri);
                const jsonData = JSON.stringify(directoryData, null, 2); // Pretty-print JSON

                const fileUri = folderUri.with({ path: posix.join(folderUri.path, 'workspace_hierarchy.json') });
                await vscode.workspace.fs.writeFile(fileUri, Buffer.from(jsonData, 'utf8'));

                //vscode.window.showInformationMessage('Workspace hierarchy saved to workspace_hierarchy.json');
                const readData = await vscode.workspace.fs.readFile(fileUri);
                const readStr = Buffer.from(readData).toString('utf8');
                //vscode.window.showInformationMessage(readStr);
                 vscode.commands.executeCommand("minedev.vsToReact", { command: "sendWorkspaceTree", body: readStr });
            } catch (error) {
                vscode.window.showErrorMessage(`Error getting file paths: ${error.message}`);
            }
        });
        commands.registerCommand('minedev.showInfoMessage', (msg) => {
            vscode.window.showInformationMessage(msg);
        });
        commands.registerCommand('minedev.openLink', (link) => {
            vscode.env.openExternal(vscode.Uri.parse(link));
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
                    case 'openLink':
                        vscode.commands.executeCommand('minedev.openLink', msg.link);
                        break;
                    case 'getWorkspaceTree':
                        vscode.commands.executeCommand("minedev.readWriteFile");
                        break;
                    case 'sendRequest':
                        const { method, path, body } = msg.data;
                        const response = await sendRequest(method, path, body);
                        vscode.commands.executeCommand("minedev.vsToReact", { command: "showMessage", body: JSON.stringify(response.data) });//parse string on React side
                        vscode.commands.executeCommand('minedev.showInfoMessage', JSON.stringify(response.data));
                        break;
                }
            });


        setTimeout(function () { vscode.commands.executeCommand("minedev.vsToReact", { command: "showMessage", body: "Welcome back. Happy to meet you again!" }); }, 5000);
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