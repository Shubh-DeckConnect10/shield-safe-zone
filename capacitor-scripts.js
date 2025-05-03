
// This file contains helper scripts for Capacitor

const fs = require('fs');
const { exec } = require('child_process');

console.log('Preparing Capacitor project...');

// Function to run a command and log its output
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      if (error) {
        console.error(`Error: ${error}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Main function to prepare capacitor
async function prepareCapacitor() {
  try {
    // Check if Android platform is already added
    const androidExists = fs.existsSync('./android');
    
    if (!androidExists) {
      // Add Android platform
      await runCommand('npx cap add android');
    } else {
      console.log('Android platform already exists');
    }

    // Update dependencies
    await runCommand('npx cap update android');
    
    console.log('✅ Capacitor setup completed successfully!');
    console.log('\nTo build your app:');
    console.log('1. Run "npm run build" to build your web assets');
    console.log('2. Run "npx cap sync" to sync web assets to Android');
    console.log('3. Run "npx cap open android" to open the project in Android Studio');
    console.log('4. In Android Studio, select Build > Build Bundle(s) / APK(s) > Build APK(s)');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the setup
prepareCapacitor();
