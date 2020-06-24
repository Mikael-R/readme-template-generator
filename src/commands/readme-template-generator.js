module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      existingFiles,
      deleteFiles,
      getRepoUrl,
      getLastUrlItem,
      question,
      generateFile
    } = toolbox

    const additionalFiles = await existingFiles('readme.md')

    if (additionalFiles.length) {
      const confirmRemove = await question({
        type: 'confirm',
        message: 'There are other readme files, do you want to remove them?'
      })

      if (confirmRemove) deleteFiles(additionalFiles)
    }

    const repositoryUrl = await getRepoUrl('./')

    const projectName = getLastUrlItem(repositoryUrl) || getLastUrlItem('./')

    const useHtml = await question({
      type: 'select',
      message: 'Do you want to use HTML in your README file for best results?',
      choices: ['Yes', 'No']
    })

    generateFile({
      template: useHtml === 'Yes' ? 'README.md.ejs' : 'README-no-html.md.ejs',
      target: './README.md',
      props: { projectName }
    })
  }
}
