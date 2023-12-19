import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.terranadams.terranmobile',
  appName: 'terran-mobile',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;

/*
If XCODE gives 'unable to open configuration settings file', do the following:
Run 'sudo gem install cocoapods'
then run 'npx cap sync'
then 'cd ios/App/' and then run 'pod install'
then return to root and 'npx cap open ios' to test
*/

/*
ng build or ionic build
ionic capacitor copy ios or npx cap sync
npx cap open ios
ionic capacitor run ios will combine the build and copy process, but it doesn’t seem to work for me
*/


/*
To include Capacitor on the Ionic app, we do this:
Install the Capacitor CLI locally: npm install @capacitor/cli
Initialize Capacitor: npx cap init
Build your web assets using the Ionic CLI: ionic build (or ng build, makes the 'www' folder)
Sync your project with Capacitor: npx cap sync (I believe 'ionic capacitor copy ios' does the same thing)
Now the project build is in sync with the ios/xcode version of the project, and can be opened with 'npx cap open ios'
*/
