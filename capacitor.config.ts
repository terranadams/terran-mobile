import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.terranadams.terranmobile',
  appName: 'terran-mobile',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
// ionic capacitor add ios
// ng build
// ionic capacitor copy ios
// npx cap open ios

// ionic capacitor run ios will combine the build and copy process, but it doesn't seem to work for me
