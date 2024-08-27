import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.terranadams.terranmobile',
  appName: 'terran-mobile',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
/*
---WHEN MAKING CHANGES---
ng build or ionic build
ionic capacitor copy ios or npx cap sync
(ionic capacitor run ios will combine the build and copy process, but it doesn’t seem to work for me)

---WHEN BOOTING UP---
npx cap open ios
to successfully run, make sure you're signed into your dev account on app 'Signing and Capabilities'.
also ensure that XCode is updated to the latest.
if codesign keeps prompting for a password, enter password then click "Always Allow"



OLD
If XCODE gives 'unable to open configuration settings file', do the following:
Run 'sudo gem install cocoapods'
then run 'npx cap sync'
then 'cd ios/App/' and then run 'pod install'
then return to root and 'npx cap open ios' to test

Issue previously occurred when running 'ionic capacitor copy ios', it gave this output:
> capacitor copy ios
[capacitor] [warn] The bundledWebRuntime configuration option has been deprecated. Can be safely deleted.
[capacitor] ✔ Copying web assets from www to ios/App/App/public in 435.71ms
[capacitor] ✔ Creating capacitor.config.json in ios/App/App in 755.25μs
[capacitor] [info] Found 3 Cordova plugins for ios:
[capacitor]        cordova-file-transfer@2.0.0
[capacitor]        cordova-plugin-file@5.0.0
[capacitor]        cordova-plugin-screen-orientation@3.0.3
[capacitor] ✔ copy ios in 499.49ms

Manually removing all references of the three cordova plugins prior to running 'npm i' after reinstalling app resolved the issue.
*/




/*
To include Capacitor on the Ionic app, we do this:
Install the Capacitor CLI locally: npm install @capacitor/cli
Initialize Capacitor: npx cap init
Build your web assets using the Ionic CLI: ionic build (or ng build, makes the 'www' folder)
Sync your project with Capacitor: npx cap sync (I believe 'ionic capacitor copy ios' does the same thing)
Now the project build is in sync with the ios/xcode version of the project, and can be opened with 'npx cap open ios'
*/
