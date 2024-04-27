import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "Webview" is up and running now');

    let webview = vscode.commands.registerCommand('helloworld.webview', () => {

        let panel = vscode.window.createWebviewPanel("webview", "Web View", {
            viewColumn: vscode.ViewColumn.One,
        });

        // will set the html here
        panel.webview.html = `<h1>This is Heading 1</h1>
                                <h2>This is Heading 2</h2>
                                <h3>This is Heading 3</h3>
                                <h4>This is Heading 4</h4>
                                <h5>This is Heading 5</h5>`;
    });

    context.subscriptions.push(webview);
}

// This method is called when your extension is deactivated
export function deactivate() { }
