import { alias, option } from './args'

describe('args', () => {
  describe('option', () => {
    it('should return working string reader', () => {
      const reader = option('otp', String)

      expect(reader('otp', () => '123', {})).toEqual({
        otp: '123'
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })

    it('should return working number reader', () => {
      const reader = option(alias('port', 'p'), Number)

      expect(reader('p', () => '80', {})).toEqual({
        port: 80
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })

    it('should return working array reader', () => {
      const reader = option('plugins', Array)

      expect(reader('plugins', () => 'eslint', {})).toEqual({
        plugins: ['eslint']
      })
      expect(reader('plugins', () => 'eslint,swc', {})).toEqual({
        plugins: ['eslint', 'swc']
      })
      expect(reader('plugins', () => 'typescript', {
        plugins: ['babel']
      })).toEqual({
        plugins: ['babel', 'typescript']
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })

    it('should return working boolean reader', () => {
      const reader = option(alias('verbose', 'v'), Boolean)

      expect(reader('verbose', () => 'oops', {})).toEqual({
        verbose: true
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })
  })
})
