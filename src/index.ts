import { platform } from 'node:process';
import path from 'path';
import {
    app, Menu, Tray,
} from 'electron';

let tray: Tray;

app.whenReady().then(() => {
    if (platform === 'darwin') {
        app.dock.hide();
    }

    const icon = path.join(__dirname, '..', 'assets', 'Icon.png');

    tray = new Tray(icon);

    const quitAccelerator = platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q';

    const contextMenu = Menu.buildFromTemplate([
        { label: 'placeholder', type: 'normal', click: () => console.log('placeholder clicked') },
        { type: 'separator' },
        { label: 'Quit', accelerator: quitAccelerator, click: () => app.quit() },
    ]);

    tray.setContextMenu(contextMenu);
});
