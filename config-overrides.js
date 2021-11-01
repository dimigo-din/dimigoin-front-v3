/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  addBabelPreset,
  addExternalBabelPlugins,
} = require('customize-cra');

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addExternalBabelPlugins('@babel/plugin-proposal-class-properties'),
);
