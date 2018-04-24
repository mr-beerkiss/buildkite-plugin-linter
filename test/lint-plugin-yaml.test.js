const assert = require('chai').assert
const lintPluginYaml = require('../lib/linters/lint-plugin-yaml')
const path = require('path')
const fixtures = path.join(__dirname, 'lint-plugin-yaml')

describe('lint-plugin-yaml', () => {
  describe('valid plugin', () => {
    it('should be valid', () => {
      assert(lintPluginYaml('valid-plugin', path.join(fixtures, 'valid-plugin'), {
        silent: true
      }))
    })
  })
  describe('missing name', () => {
    it('should be invalid', () => {
      assert(!lintPluginYaml('missing-name', path.join(fixtures, 'missing-name'), {
        silent: true
      }))
    })
  })
  describe('missing description', () => {
    it('should be invalid', () => {
      assert(!lintPluginYaml('missing-description', path.join(fixtures, 'missing-description'), {
        silent: true
      }))
    })
  })
  describe('missing author', () => {
    it('should be invalid', () => {
      assert(!lintPluginYaml('missing-author', path.join(fixtures, 'missing-author'), {
        silent: true
      }))
    })
  })
  describe('missing requirements', () => {
    it('should be invalid', () => {
      assert(!lintPluginYaml('missing-requirements', path.join(fixtures, 'missing-requirements'), {
        silent: true
      }))
    })
  })
  describe('missing schema', () => {
    it('should be invalid', () => {
      assert(!lintPluginYaml('missing-schema', path.join(fixtures, 'missing-schema'), {
        silent: true
      }))
    })
  })
})