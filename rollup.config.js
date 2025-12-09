import terser from '@rollup/plugin-terser';

const banner = `/*!
 * Vecburner v1.0.0
 * Just-so-so bitmap to vector graphics engine
 * https://github.com/Feather-2/vecburner
 * 
 * @license MIT
 * Copyright (c) 2024 Paper Burner Team
 */`;

export default [
  // ES Module (for bundlers)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vecburner.esm.js',
      format: 'esm',
      banner,
      sourcemap: true,
      inlineDynamicImports: true
    }
  },
  // ES Module minified
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vecburner.esm.min.js',
      format: 'esm',
      banner,
      sourcemap: true,
      inlineDynamicImports: true
    },
    plugins: [terser()]
  },
  // CommonJS (for Node.js)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vecburner.cjs.js',
      format: 'cjs',
      banner,
      sourcemap: true,
      exports: 'named',
      inlineDynamicImports: true
    }
  },
  // UMD (for browsers / CDN)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vecburner.umd.js',
      format: 'umd',
      name: 'Vecburner',
      banner,
      sourcemap: true,
      exports: 'named',
      inlineDynamicImports: true
    }
  },
  // UMD minified (for production CDN)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vecburner.umd.min.js',
      format: 'umd',
      name: 'Vecburner',
      banner,
      sourcemap: true,
      exports: 'named',
      inlineDynamicImports: true
    },
    plugins: [terser()]
  }
];
