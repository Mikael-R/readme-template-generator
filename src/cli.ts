import { build } from 'gluegun'
import { resolve } from 'path'

import { Options } from 'gluegun/build/types/domain/options'

export async function run (argv: string | Options) {
  const cli = build()
    .brand('readme-template-generator')
    .src(__dirname)
    // .plugins('./node_modules', { matching: 'readme-template-generator-*', hidden: true })
    .plugin(resolve(__dirname, '..', 'node_modules', '@lenne.tech', 'cli-plugin-helper', 'dist'), {
      commandFilePattern: ['*.js'],
      extensionFilePattern: ['*.js']
    })
    .help()
    .version()
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}
