import { platform } from 'node:process';
import path from 'path';
import {
    app, Menu, Tray,
} from 'electron';
import { isLaunchAtLogin, toggleLaunchAtLogin } from './utils.js';

let tray: Tray;

app.whenReady().then(() => {
    if (platform === 'darwin') {
        app.dock.hide();
    }

    const assetsPath = app.isPackaged ? path.join(process.resourcesPath, 'assets') : 'assets';

    tray = new Tray(`${assetsPath}/Icon.png`);

    const quitAccelerator = platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q';

    const contextMenu = Menu.buildFromTemplate([
        { label: 'About TraktCord', type: 'normal' },
        { label: 'Check for Update...', type: 'normal' },
        { type: 'separator' },
        { label: 'Status: (watching...)', enabled: false, type: 'normal' },
        { type: 'separator' },
        {
            label: 'Authorise...', type: 'normal', enabled: true, click: () => console.log('placeholder clicked'),
        },
        {
            label: 'Launch at Login', type: 'checkbox', checked: isLaunchAtLogin(app, platform), click: () => toggleLaunchAtLogin(app),
        },
        { label: 'Logout', type: 'normal', enabled: false },
        { type: 'separator' },
        { label: 'Quit TraktCord', accelerator: quitAccelerator, click: () => app.quit() },
    ]);

    tray.setContextMenu(contextMenu);
});
