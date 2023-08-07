import { platform } from 'node:process';
import path from 'path';
import {
    app, Menu, nativeImage, Tray,
} from 'electron';

let tray: Tray;

app.whenReady().then(() => {
    if (platform === 'darwin') {
        app.dock.hide();
    }

    const assetsPath = app.isPackaged ? path.join(process.resourcesPath, "assets") : "assets";

    tray = new Tray(`${assetsPath}/Icon.png`);

    const quitAccelerator = platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q';

    const contextMenu = Menu.buildFromTemplate([
        { label: 'placeholder', type: 'normal', click: () => console.log('placeholder clicked') },
        { type: 'separator' },
        { label: 'Quit', accelerator: quitAccelerator, click: () => app.quit() },
    ]);

    tray.setContextMenu(contextMenu);
});
