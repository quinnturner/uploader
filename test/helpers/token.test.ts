import path from 'path'

import * as fileHelpers from '../../src/helpers/files.js'
import * as tokenHelpers from '../../src/helpers/token.js'
import { UploaderArgs, UploaderInputs } from '../../src/types.js'
import { DEFAULT_UPLOAD_HOST } from '../../src/helpers/constansts.js'
import { createEmptyArgs } from '../test_helpers.js'
import { describe, test, it} from 'mocha'

describe('Get tokens', () => {
  const fixturesDir = path.join(
    fileHelpers.fetchGitRoot(),
    'test/fixtures/yaml',
  )
  const invalidFixturesDir = path.join(
    fileHelpers.fetchGitRoot(),
    'test/fixtures/invalid_yaml',
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('From yaml', () => {
    it('Returns empty with no yaml file', () => {
      expect(tokenHelpers.getTokenFromYaml('.')).to.be('')
    })

    it('Returns the correct token from file', () => {
      expect(tokenHelpers.getTokenFromYaml(fixturesDir)).to.be('faketoken')
    })

    it('Returns deprecation error from codecov_token', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        // Intentionally empty
      })
      expect(tokenHelpers.getTokenFromYaml(invalidFixturesDir)).to.be('')

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("'codecov_token' is a deprecated field"),
      )
    })
  })

  describe('From right source', () => {
    it('Returns from args', () => {
      const inputs: UploaderInputs = {
        args: { ...createEmptyArgs(), ...{ token: 'argtoken' } },
        environment: { CODECOV_TOKEN: 'envtoken' },
      }
      expect(tokenHelpers.getToken(inputs, fixturesDir)).to.be('argtoken')
    })

    it('Returns from env', () => {
      const inputs: UploaderInputs = {
        args: {...createEmptyArgs(),},
        environment: { CODECOV_TOKEN: 'envtoken' },
      }
      expect(tokenHelpers.getToken(inputs, fixturesDir)).to.be('envtoken')
    })

    it('Returns from env', () => {
      const inputs: UploaderInputs = {
        args: {...createEmptyArgs(),},
        environment: {},
      }
      expect(tokenHelpers.getToken(inputs, fixturesDir)).to.be('faketoken')
    })

    it('Returns from no source', () => {
      const inputs: UploaderInputs = {
        args: {...createEmptyArgs(), },
        environment: {},
      }
      expect(tokenHelpers.getToken(inputs, '.')).to.be('')
    })
  })

  it('should return token correctly from args when `-u` differs from default host', () => {
    const inputs: UploaderInputs = {
      args: {...createEmptyArgs(), ...{
        url: 'dummy.local',
        token: 'goodToken',
      }},
      environment: {
        CODECOV_TOKEN: 'badToken',
      },
    }
    expect(tokenHelpers.getToken(inputs, fixturesDir)).to.be('goodToken')
  })

  it('should return token correctly from env when `-u` differs from default host', () => {
    const inputs: UploaderInputs = {
      args: {...createEmptyArgs(), ...{
        url: 'dummy.local',
      }},
      environment: {
        CODECOV_TOKEN: 'goodT----oken',
      },
    }
    expect(tokenHelpers.getToken(inputs, fixturesDir)).to.be('goodT----oken')
  })

  it('should fail validation when an invalid token is passed and host is not changed', () => {
    const inputs: UploaderInputs = {
      args: {...createEmptyArgs(), ...{
        url: DEFAULT_UPLOAD_HOST,
      }},
      environment: {
        CODECOV_TOKEN: 'bad------Token',
      },
    }
    expect(() => tokenHelpers.getToken(inputs, fixturesDir)).toThrowError(
      /Token found by environment variables with length 14 did not pass validation/,
    )
  })
})
