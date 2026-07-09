import { defineConfig } from '@trigen/oxlint'
import baseConfig from '@trigen/oxlint-config'
import moduleConfig from '@trigen/oxlint-config/module'
import tsTypeCheckedConfig from '@trigen/oxlint-config/typescript-type-checked'
import testConfig from '@trigen/oxlint-config/test'

export default defineConfig({
  ignorePatterns: ['**/dist/', '**/package/', '**/coverage/'],
  options: {
    typeAware: true,
    typeCheck: true
  },
  env: {
    node: true
  },
  extends: [
    baseConfig,
    moduleConfig,
    tsTypeCheckedConfig,
    testConfig
  ],
  rules: {
    'eslint/no-console': 'off'
  }
})
