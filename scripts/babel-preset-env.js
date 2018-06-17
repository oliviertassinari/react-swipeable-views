const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: 11,
          edge: 14,
          firefox: 45,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
        modules: 'commonjs',
      },
    ],
  ],
};

module.exports = () => config;
