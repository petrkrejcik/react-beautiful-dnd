/* eslint-disable flowtype/require-valid-file-annotation */

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import strip from 'rollup-plugin-strip';
import yargs from 'yargs';
import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';

const args = yargs.argv;

export default {
  input: './lib/index.js',
  output: {
    file: `dist/react-beautiful-dnd${args.min ? '.min' : ''}.js`,
    format: 'umd',
    name: 'ReactBeautifulDnd',
    globals: { react: 'React' },
  },
  plugins: [
    babel({ exclude: 'node_modules/**', babelrc: false }),
    resolve(),
    commonjs({
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
        'prop-types': Object.keys(propTypes),
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    strip({
      debugger: true,
    }),
  ].concat(
    args.min ? uglify() : []
  ),
  external: ['react'],
};
