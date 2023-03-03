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
// ionic capacitor open ios

// ionic capacitor run ios will combine the build and copy process
