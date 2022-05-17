import { IProvider } from '../types'

import * as providerAppveyorci from './provider_appveyorci.js'
import * as providerAzurepipelines from './provider_azurepipelines.js'
import * as providerBitbucket from './provider_bitbucket.js'
import * as providerBitrise from './provider_bitrise.js'
import * as providerBuildkite from './provider_buildkite.js'
import * as providerCircleci from './provider_circleci.js'
import * as providerCirrus from './provider_cirrus.js'
import * as providerCodeBuild from './provider_codebuild.js'
import * as providerDrone from './provider_drone.js'
import * as providerGitHubactions from './provider_githubactions.js'
import * as providerGitLabci from './provider_gitlabci.js'
import * as providerHerokuci from './provider_herokuci.js'
import * as providerJenkinsci from './provider_jenkinsci.js'
import * as providerLocal from './provider_local.js'
import * as providerTeamCity from './provider_teamcity.js'
import * as providerTravisci from './provider_travisci.js'
import * as providerWercker from './provider_wercker.js'
import * as providerWoodpecker from './provider_woodpecker.js'

// Please make sure provider_local is last
const providerList: IProvider[] = [
  providerAppveyorci,
  providerAzurepipelines,
  providerBitbucket,
  providerBitrise,
  providerBuildkite,
  providerCircleci,
  providerCirrus,
  providerCodeBuild,
  providerDrone,
  providerGitHubactions,
  providerGitLabci,
  providerHerokuci,
  providerJenkinsci,
  providerTeamCity,
  providerTravisci,
  providerWercker,
  providerWoodpecker,
  providerLocal,
]

export default providerList
