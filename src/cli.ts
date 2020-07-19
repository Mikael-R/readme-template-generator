const { build } = require('gluegun')

async function run (argv) {
  const cli = build()
    .brand('readme-template-generator')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'readme-template-generator-*', hidden: true })
    .help()
    .version()
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
