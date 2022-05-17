import * as td from 'testdouble'

import providers from '../../src/ci_providers/index.js'
import { UploaderInputs } from '../../src/types.js'
import { createEmptyArgs } from '../test_helpers.js'
import { describe, test, it} from 'mocha'
import { expect } from 'chai'


describe('CI Providers', () => {
  afterEach(() => {
    td.reset()
  })

  describe('check that each provider', () =>
    expect(providers).to.be.instanceOf(Array))
  providers.forEach(provider => {
    it(`${provider.getServiceName()} has a service name`, () => {
      expect(typeof provider.getServiceName()).to.be('string')
      expect(provider.getServiceName()).not.to.be('')
    })

    it(`${provider.getServiceName()} has env var names`, () => {
      const envVarNames = provider.getEnvVarNames()
      expect(typeof envVarNames).to.be('object')
      expect(envVarNames.length).to.be.greaterThan(0)
      for (const envVarName of envVarNames) {
        expect(typeof envVarName).to.be('string')
      }
    })

    describe(`${provider.getServiceName()} can return a ISeviceParams object that`, () => {
      const inputs: UploaderInputs = {
        args: {
          ...createEmptyArgs(),
          ...{
            sha: '123',
            slug: 'testOrg/testRepo',
          },
        },
        environment: {},
      }

      const serviceParams = provider.getServiceParams(inputs)
      expect(serviceParams).not.to.be.null

      it('has a sha', () => {
        expect(serviceParams.commit).to.equal(inputs.args.sha)
      })

      it('has a slug', () => {
        expect(serviceParams.slug).to.equal(inputs.args.slug)
      })
    })
  })
})
