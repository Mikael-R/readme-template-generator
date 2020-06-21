const getCurrentPast = require('../extensions/getCurrentPast')
const existReadmeFile = require('../extensions/existReadmeFile')

module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      parameters,
      print: { success, error, info },
      template,
    } = toolbox

    const project_name = parameters.first || getCurrentPast()

    if (await existReadmeFile(toolbox)) {
      error('Readme file alredy exists in current dir')
      return
    }

    await template.generate({
      template: 'README.md.ejs',
      target: './README.md',
      props: { project_name }
    })

    success('Generated README file with success')
  }
}
