import { app } from 'electron';

// Check if login launch item is enabled
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

// Login launch item
export function toggleLaunchAtLogin(appInstance: typeof app) {
    const settings = appInstance.getLoginItemSettings();
    appInstance.setLoginItemSettings({ openAtLogin: !settings.openAtLogin });
}
