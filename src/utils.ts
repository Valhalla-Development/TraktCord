import { app } from 'electron';

// Check if login launch item is enabled
export function isLaunchAtLogin(appInstance: typeof app, platform: string) {
    const settings = appInstance.getLoginItemSettings();
    if (platform === 'darwin') {
        return settings.openAtLogin;
    } if (platform === 'win32') {
        return settings.launchItems.some((item: { name: string }) => item.name === 'TraktCord');
    }
    return false;
}

// Login launch item
export function toggleLaunchAtLogin(appInstance: typeof app) {
    const settings = appInstance.getLoginItemSettings();
    appInstance.setLoginItemSettings({ openAtLogin: !settings.openAtLogin });
}
