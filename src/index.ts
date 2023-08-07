import { platform } from 'node:process';
import path from 'path';
import {
    app, Menu, Tray,
} from 'electron';

let tray: Tray;

app.whenReady().then(() => {
    // Check if login launch item is enabled
    function isLaunchAtLogin() {
        const settings = app.getLoginItemSettings();
        if (platform === 'darwin') {
            return settings.openAtLogin;
        } if (platform === 'win32') {
            return settings.launchItems.some((item) => item.name === 'TraktCord');
        }
        return false;
    }

    // Login launch item
    function toggleLaunchAtLogin() {
        const settings = app.getLoginItemSettings();
        app.setLoginItemSettings({ openAtLogin: !settings.openAtLogin });
    }

    if (platform === 'darwin') {
        app.dock.hide();
    }

    const assetsPath = app.isPackaged ? path.join(process.resourcesPath, 'assets') : 'assets';

    tray = new Tray(`${assetsPath}/Icon.png`);

    const quitAccelerator = platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q';

    const contextMenu = Menu.buildFromTemplate([
        { label: 'placeholder', type: 'normal', click: () => console.log('placeholder clicked') },
        { type: 'separator' },
        {
            label: 'Launch at login', type: 'checkbox', checked: isLaunchAtLogin(), click: toggleLaunchAtLogin,
        },
        { label: 'Quit', accelerator: quitAccelerator, click: () => app.quit() },
    ]);

    tray.setContextMenu(contextMenu);
});
