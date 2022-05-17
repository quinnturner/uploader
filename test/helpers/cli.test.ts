import { addArguments, IYargsObject } from '../../src/helpers/cli.js'
import { describe, test, it} from 'mocha'

describe('CLI Helper', () => {
  it('should be able to add arguments to the "yargsObject: it is passed', () => {
    const fakeYargs: IYargsObject = {
      option: jest.fn(),
    }

    addArguments(fakeYargs)

    expect(fakeYargs.option).toBeCalledWith('build', {
      alias: 'b',
      description: 'Specify the build number manually',
      name: 'build',
    })
  })
})
