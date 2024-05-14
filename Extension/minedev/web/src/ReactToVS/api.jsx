
export const vsShowInfoMessage = (vscode, data) => {
    vscode.postMessage({ command: 'showInfoMessage', data });
};

export const vsOpenLink = (vscode, link) => {
    vscode.postMessage({ command: 'openLink', link });
};

export const vsSendRequest = (vscode, method, path, body) => {
    const data = {
        method,
        path,
        body
    }
    vscode.postMessage({ command: 'sendRequest', data });
};