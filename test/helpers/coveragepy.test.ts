import path from 'path'
import childProcess from 'child_process'
import * as td from 'testdouble'
import { generateCoveragePyFile } from '../../src/helpers/coveragepy.js'
import * as fileHelpers from '../../src/helpers/files.js'
import { SPAWNPROCESSBUFFERSIZE } from '../../src/helpers/util.js'
import { describe, test, it} from 'mocha'

describe('generateCoveragePyFile()', () => {
    afterEach(() => {
        td.reset()
    })

    it('should run when coveragepy is asked for', async () => {
        const fixturesCoveragePyDir = path.join(
            fileHelpers.fetchGitRoot(),
            'test/fixtures/coveragepy',
        )

        const spawnSync = td.replace(childProcess, 'spawnSync')
        td.when(spawnSync('coverage')).thenReturn({
            stdout: 'coverage installed',
            error: null
        })
        td.when(spawnSync('coverage', td.matchers.contains('xml'), { maxBuffer: SPAWNPROCESSBUFFERSIZE })).thenReturn({
            stdout: 'xml',
            error: null
        })

        expect(await generateCoveragePyFile(fixturesCoveragePyDir, [])).to.be('xml')
    })

    it('should return if a file is provided', async () => {
        const spawnSync = td.replace(childProcess, 'spawnSync')
        td.when(spawnSync('coverage')).thenReturn({
            stdout: 'coverage installed',
            error: null
        })

        const projectRoot = process.cwd()
        expect(await generateCoveragePyFile(projectRoot, ['fakefile'])).to.be('Skipping coveragepy, files already specified')
    })

    it('should return a log when coveragepy is not installed', async () => {
        const spawnSync = td.replace(childProcess, 'spawnSync')
        td.when(spawnSync('coverage')).thenReturn({ error: "command not found: coverage" })

        const projectRoot = process.cwd()
        expect(await generateCoveragePyFile(projectRoot, [])).to.be('coveragepy is not installed')
    })

    it('should return a log when there are no dotcoverage files', async () => {
        const fixturesYamlDir = path.join(
            fileHelpers.fetchGitRoot(),
            'test/fixtures/yaml',
        )

        const spawnSync = td.replace(childProcess, 'spawnSync')
        td.when(spawnSync('coverage')).thenReturn({
            stdout: 'coverage installed',
            error: null
        })

        expect(await generateCoveragePyFile(fixturesYamlDir, [])).to.be('Skipping coveragepy, no .coverage file found.')
    })
})
