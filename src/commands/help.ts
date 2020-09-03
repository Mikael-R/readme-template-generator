import yargs from 'yargs'

import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'help',
  run: () => {
    yargs
      .usage('Usage: $0 <command> [options]')
      .command('$0', 'Generate readme')

      .string('path-target')
      .alias('p', 'path-target')
      .describe(
        'path-target',
        'Set a path to save README.md file | ./README.md'
      )

      .alias('v', 'version')
      .alias('h', 'help')

      .parse()
  },
}

export default command
