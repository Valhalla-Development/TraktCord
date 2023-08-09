import { platform } from 'node:process';
import path from 'path';
import {
    app, Menu, Tray, nativeImage,
} from 'electron';
import { isLaunchAtLogin, toggleLaunchAtLogin, aboutItem } from './utils.js';

let tray: Tray;

// test

app.whenReady().then(() => {
    if (platform === 'darwin') {
        app.dock.hide();
    }

    const assetsPath = app.isPackaged ? path.join(process.resourcesPath, 'assets') : 'assets';

    const trayIcon = nativeImage.createFromPath(`${assetsPath}/Icon.png`); // TODO this logo is just the Trakt logo, it is a placeholder until I get the custom logo made

    tray = new Tray(trayIcon);

    const quitAccelerator = platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q';

    const contextMenu = Menu.buildFromTemplate([
        { label: 'About TraktCord', type: 'normal', click: () => aboutItem(trayIcon) },
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

    tray.setToolTip('TraktCord'); // TODO This will state the status, paused, not watching, watching, not authorised etc.
    tray.setContextMenu(contextMenu);
});
