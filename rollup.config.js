import swc from 'rollup-plugin-swc'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodeEsm from '@trigen/browserslist-config/node-esm'
import node from '@trigen/browserslist-config/node'
import pkg from './package.json'

const extensions = ['.js', '.ts']
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_)
const plugins = targets => [
  nodeResolve({
    extensions
  }),
  swc({
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
    input: pkg.exports,
    plugins: plugins(nodeEsm.join(', ')),
    external,
    output: {
      file: pkg.publishConfig.exports.import,
      format: 'es',
      sourcemap: true
    }
  },
  {
    input: pkg.exports,
    plugins: plugins(node.join(', ')),
    external,
    output: {
      file: pkg.publishConfig.exports.require,
      format: 'cjs',
      sourcemap: true
    }
  }
]
