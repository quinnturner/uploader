import { UploaderArgs } from "../src/types.js"

import * as td from 'testdouble'
import childProcess from 'child_process'
import { describe, test, it} from 'mocha'

const realLog = console.log

/**
 * Create a full set of uploader args for testing
 */
export function createEmptyArgs(): UploaderArgs {
  return {
    build: '',
    branch: '',
    changelog: '',
    clean: '',
    dir: '',
    dryRun: '',
    env: '',
    feature: '',
    file: '',
    flags: '',
    name: '',
    networkFilter: '',
    networkPrefix: '',
    nonZero: '',
    parent: '',
    pr: '',
    rootDir: '',
    sha: '',
    slug: '',
    source: '',
    tag: '',
    token: '',
    upstream: '',
    url: '',
    verbose: '',
  }
}
