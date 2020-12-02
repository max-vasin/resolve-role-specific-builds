import {
  defaultResolveConfig,
  build,
  start,
  watch,
  runTestcafe,
  merge,
  stop,
  reset,
  importEventStore,
  exportEventStore,
} from 'resolve-scripts'

import webClientNodeConfig from './config.web-client-node'
import commandNodeConfig from './config.command-node'
import queryNodeConfig from './config.query-node'

import platformConfig from './config.platform'

const launchMode = process.argv[2]

void (async () => {
  try {
    switch (launchMode) {
      case 'build-command-node': {
        const platform = {
          ...platformConfig
        }
        delete platform.readModelConnectors
        await build(merge(defaultResolveConfig, commandNodeConfig, platform))
        break
      }

      case 'build-query-node': {
        await build(merge(defaultResolveConfig, queryNodeConfig, platformConfig))
        break
      }

      case 'build-web-client-node': {
        await start(merge(defaultResolveConfig, webClientNodeConfig, platformConfig))
        break
      }

      case 'reset': {
        const resolveConfig = merge(defaultResolveConfig, appConfig, devConfig)
        await reset(resolveConfig, {
          dropEventStore: false,
          dropEventBus: true,
          dropReadModels: true,
          dropSagas: true,
        })

        break
      }

      case 'import-event-store': {
        const resolveConfig = merge(defaultResolveConfig, appConfig, devConfig)

        const importFile = process.argv[3]

        await importEventStore(resolveConfig, { importFile })
        break
      }

      case 'export-event-store': {
        const resolveConfig = merge(defaultResolveConfig, appConfig, devConfig)

        const exportFile = process.argv[3]

        await exportEventStore(resolveConfig, { exportFile })
        break
      }

      case 'test:e2e': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          testFunctionalConfig
        )

        await reset(resolveConfig, {
          dropEventStore: true,
          dropEventBus: true,
          dropReadModels: true,
          dropSagas: true,
        })

        await runTestcafe({
          resolveConfig,
          functionalTestsDir: 'test/functional',
          browser: process.argv[3],
          customArgs: ['--stop-on-first-fail'],
        })
        break
      }

      default: {
        throw new Error('Unknown option')
      }
    }
    await stop()
  } catch (error) {
    await stop(error)
  }
})()
