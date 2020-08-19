import { build } from 'gluegun'
import { resolve } from 'path'

import { Options } from 'gluegun/build/types/domain/options'

export async function run (argv: string | Options) {
  const cli = build()
    .exclude([
      'strings',
      'prompt',
      'patching'
    ])
    .brand('readme-template-generator')
    .src(__dirname)
    .plugin(resolve(__dirname, '..', 'node_modules', '@lenne.tech', 'cli-plugin-helper', 'dist'), {
      commandFilePattern: ['*.js'],
      extensionFilePattern: ['*.js']
    })
    .help()
    .version()
    .checkForUpdates(40)
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}
