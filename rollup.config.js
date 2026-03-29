import { swc } from 'rollup-plugin-swc3'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodeEsm from '@trigen/browserslist-config/node-esm'
import node from '@trigen/browserslist-config/node'

const extensions = ['.js', '.ts']
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_)
const plugins = targets => [
  nodeResolve({
    extensions
  }),
  swc({
    tsconfig: false,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true
      },
      externalHelpers: true
    },
    env: {
      targets
    },
    module: {
      type: 'es6'
    },
    sourceMaps: true
  })
]

export default [
  {
    input: './src/index.ts',
    plugins: plugins(nodeEsm.join(', ')),
    external,
    output: {
      file: './dist/index.js',
      format: 'es',
      sourcemap: true
    }
  },
  {
    input: './src/index.ts',
    plugins: plugins(node.join(', ')),
    external,
    output: {
      file: './dist/index.cjs',
      format: 'cjs',
      sourcemap: true
    }
  }
]
