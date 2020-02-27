const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
const CracoLessPlugin = require("craco-less");

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  eslint: {
    enable: true /* (default value) */,
    mode: ESLINT_MODES.file,
  },
  plugins: [
  {
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        modifyVars: {
          '@primary-color': '#af3947',
          '@link-color': '#ed939f',
        },
        javascriptEnabled: true
      }
    }
  }
  ]
};
