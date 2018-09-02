import includePaths from 'rollup-plugin-includepaths';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// './packages/react-swipeable-views-core/src/index.js',
// './packages/react-swipeable-views-utils/src/index.js',

export default {
  input: './packages/react-swipeable-views/src/index.js',
  output: {
    file: 'lib/umd/react-swipeable-views.js',
    format: 'umd',
    name: 'SwipeableViews',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve(),
    includePaths({
      include: {
        'react-swipeable-views-core': 'packages/react-swipeable-views-core/src/index.js',
        'react-swipeable-views-utils': 'packages/react-swipeable-views-utils/src/index.js',
      },
    }),
    commonjs({
      include: [
        'node_modules/**',
        'packages/react-swipeable-views/node_modules/**',
        'packages/react-swipeable-views-core/node_modules/**',
        'packages/react-swipeable-views-utils/node_modules/**',
      ],
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: [
        '@babel/plugin-transform-object-assign',
        '@babel/transform-runtime',
        'transform-react-constant-elements',
        'transform-dev-warning',
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
        // NOTE: rollup warns against using this, but
        // it doesn't work without:
        '@babel/plugin-external-helpers',
      ],
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
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    uglify({
      mangle: false,
      output: {
        comments: true,
        beautify: true,
      },
    }),
  ],
};
