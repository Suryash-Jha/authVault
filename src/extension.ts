import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Auth Vault" is now active!');
    vscode.window.showInformationMessage("Extension activated!");

    let webViewButton = vscode.window.registerWebviewViewProvider("authVaultView", {
        resolveWebviewView(webviewView) {
            console.log(webviewView, '---+++')
            console.log("Resolving webview for Activity Bar...");
            webviewView.webview.options = {
                enableScripts: true,
            };

            webviewView.webview.html = `
                <h1>Activity Bar Webview</h1>
                <p>Accessed from Activity Bar!</p>`;
        },
    });

    let webviewPanelCommand = vscode.commands.registerCommand('auth-vault.webview', () => {
        console.log("Opening a Webview Panel...");
        let panel = vscode.window.createWebviewPanel(
            "webview", 
            "Web View", 
            vscode.ViewColumn.One, 
            { enableScripts: true }
        );

        panel.webview.html = `
            <h1>Webview Panel</h1>
            <p>Accessed via command.</p>`;
    });

    context.subscriptions.push(webViewButton);
    context.subscriptions.push(webviewPanelCommand);
}

export function deactivate() {
    console.log('Extension "Auth Vault" has been deactivated.');
}
