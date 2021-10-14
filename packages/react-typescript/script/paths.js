const path = require('path');
const fs = require('fs');

// Get the working directory of the file executed by node
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolve absolute path from relative path
 */
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// Default module extension
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx'];

/**
 * Resolve module path
 * @param {function} resolveFunction resolve function
 * @param {string} filePath file path
 */
function resolveModule(resolveFunction, filePath) {
  // Check if the file exists
  const extension = moduleFileExtensions.find((ex) =>
    fs.existsSync(resolveFunction(`${filePath}.${ex}`))
  );

  return resolveFunction(`${filePath}.${extension ?? '.ts'}`);
}

module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appIndex: resolveModule(resolveApp, 'src/index'), // Package entry path
  appHtml: resolveApp('public/index.html'),
  appNodeModules: resolveApp('node_modules'), // node_modules path
  appSrc: resolveApp('src'),
  appSrcComponents: resolveApp('src/components'),
  appSrcUtils: resolveApp('src/utils'),
  appProxySetup: resolveModule(resolveApp, 'src/setProxy'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  moduleFileExtensions,
};
