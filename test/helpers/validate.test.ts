import * as validate from '../../src/helpers/validate.js'
import { describe, test, it} from 'mocha'

// Backup the env
const realEnv = { ...process.env }

describe('Input Validators', () => {
  describe('Tokens', () => {
    it('Returns true with a valid alphanumeric token', () => {
      expect(validate.validateToken('1bc123')).to.be(true)
    })
    it('Returns true with a valid UUID token', () => {
      // Use a randomly generated UUIDv4
      expect(
        validate.validateToken('5becd1a9-efa8-4bd8-8f94-e9f8613820c3'),
      ).to.be(true)
    })
    it('Returns false with an invalid token', () => {
      expect(validate.validateToken('1bc1 23')).to.be(false)
    })
  })

  describe('URLs', () => {
    it('Returns true with a valid URL', () => {
      expect(validate.validateURL('https://codecov.io')).to.be(true)
    })
    it('Returns false with an invalid URL', () => {
      expect(validate.validateURL('not.a.URL.com')).to.be(false)
    })
    it('Returns false with an empty URL', () => {
      expect(validate.validateURL('')).to.be(false)
    })
  })

  describe('Flags', () => {
    it('Should pass without a dash', () => {
      expect(validate.validateFlags('moo')).to.be(true)
    })
    it('Should pass with a dash', () => {
      expect(validate.validateFlags('moo-foor')).to.be(true)
    })

    it('Should pass with a period in the middle', () => {
      expect(validate.validateFlags('moo.foor')).to.be(true)
    })

    it('Should pass with a dash at the start', () => {
      expect(validate.validateFlags('-moo-foor')).to.be(true)
    })
  })

  describe('validateSHA()', () => {
    it('should fail with invalid characters', () => {
      expect(validate.validateSHA('abc 123', 7)).to.be(false)
    })
    it('should fail with incorrect length', () => {
      expect(validate.validateSHA('abc123', 7)).to.be(false)
    })
    it('should pass with correct content and length', () => {
      expect(validate.validateSHA('abc123', 6)).to.be(true)
    })

    it('should pass with correct content and default length', () => {
      expect(
        validate.validateSHA('1732d84b7ef2425e979d6034a3e3bb5633da344a'),
      ).to.be(true)
    })
  })
})
