import {
    app, dialog, NativeImage, BrowserWindow, ipcMain,
} from 'electron';
import Store from 'electron-store';

/**
 * Checks if the login launch item is enabled.
 *
 * @param {typeof app} appInstance - The Electron app instance.
 * @param {string} platform - The platform name ('darwin' for macOS, 'win32' for Windows).
 * @returns {boolean} True if the launch item is enabled, otherwise false.
 */
export function isLaunchAtLogin(appInstance: typeof app, platform: string): boolean {
    const settings = appInstance.getLoginItemSettings();

    switch (platform) {
    case 'darwin':
        return settings.openAtLogin;
    case 'win32':
        return settings.launchItems.some((item: { name: string }) => item.name === 'TraktCord');
    default:
        return false;
    }
}

/**
 * Toggles the login launch item.
 *
 * @param {typeof app} appInstance - The Electron app instance.
 */
export function toggleLaunchAtLogin(appInstance: typeof app) {
    const settings = appInstance.getLoginItemSettings();
    appInstance.setLoginItemSettings({ openAtLogin: !settings.openAtLogin });
}

/**
 * Displays an "About" dialog.
 *
 * @param {NativeImage} trayIcon - The tray icon image.
 */
export async function aboutItem(trayIcon: NativeImage) {
    const options = {
        message: 'TraktCord',
        type: 'info' as const,
        title: 'About TraktCord',
        detail: `Version 1.0.0\nCopyright ${new Date().getFullYear()} ValhallaDevelopment`,
        icon: trayIcon,
    };

    await dialog.showMessageBox(options);
}

/**
 * Displays an authorization prompt window and returns the Trakt Client ID.
 *
 * @param {Store} store - The Electron store instance.
 * @param {NativeImage} trayIcon - The tray icon image.
 * @returns {Promise<string>} A promise that resolves with the entered Trakt Client ID.
 */
export async function login(store: Store, trayIcon: NativeImage) {
    const promptWindow = new BrowserWindow({
        width: 400,
        height: 200,
        center: true,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: true,
        fullscreenable: false,
        title: 'TraktCord - Authorisation',
        icon: trayIcon,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const html = `
        <html>
            <body>
                <p>What is your Trakt Client ID?</p>
                <p>You can find this ID by <a href="#" onclick="openTraktLink(); return false;">clicking here</a>.</p>
                <input id="traktClientId" type="text" placeholder="Trakt Client ID">
                <button onclick="submit()">Submit</button>
                <div id="errorMessage" style="color: red;"></div>
                <script>
                    function openTraktLink() {
                        require('electron').shell.openExternal('https://trakt.tv/oauth/applications');
                    }

                    function submit() {
                        const traktClientId = document.getElementById('traktClientId').value;
                        
                        if (traktClientId.length < 4) {
                            document.getElementById('errorMessage').textContent = 'Please enter at least 4 characters.';
                            setTimeout(() => {
                                document.getElementById('errorMessage').textContent = '';
                            }, 5 * 1000)
                            return;
                        }
                        
                        require('electron').ipcRenderer.send('submit', traktClientId);
                    }
                </script>
            </body>
        </html>
    `;

    await promptWindow.loadURL(`data:text/html,${encodeURIComponent(html)}`);

    promptWindow.once('ready-to-show', () => {
        promptWindow.show();
    });

    promptWindow.on('close', (event) => {
        event.preventDefault();
        promptWindow.hide();
    });

    return new Promise((resolve) => {
        ipcMain.once('submit', (event, traktClientId) => {
            promptWindow.close();
            resolve(traktClientId);
        });
    });
}
