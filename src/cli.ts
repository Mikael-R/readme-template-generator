import { build } from 'gluegun'

import { join } from 'path'

export async function run (argv) {
  const cli = build()
    .brand('readme-template-generator')
    .src(__dirname)
    // .plugins('./node_modules', { matching: 'readme-template-generator-*', hidden: true })
    .plugin(join(__dirname, '..', 'node_modules', '@lenne.tech', 'cli-plugin-helper', 'dist'), {
      commandFilePattern: ['*.js'],
      extensionFilePattern: ['*.js']
    })
    .help()
    .version()
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}
