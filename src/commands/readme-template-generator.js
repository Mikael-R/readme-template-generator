module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      parameters,
      print: { success },
      template,
      existReadmeFile,
      getCurrentPast,
      ask
    } = toolbox

    if (await existReadmeFile()) {
      const { overwrite } = await ask({
        type: 'confirm',
        name: 'overwrite',
        message: 'There is already a README file in the current directory, do you want to overwrite it?'
      })

      if (!overwrite) return
    }

    const project_name = parameters.first || getCurrentPast()

    const { useHtml } = await ask({
      type: 'select',
      name: 'useHtml',
      message: 'Do you want to use HTML in your README file for best results?',
      choices: ['Yes', 'No']
    })

    await template.generate({
      template: useHtml === 'Yes' ? 'README.md.ejs' : 'README-no-html.md.ejs',
      target: `./README.md`,
      props: { project_name }
    })

    success('Generated README file with success')
  }
}
