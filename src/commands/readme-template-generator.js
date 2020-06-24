module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      existingFiles,
      deleteFiles,
      getRepoUrl,
      getLastUrlItem,
      question,
      message,
      generateFile
    } = toolbox

    const additionalFiles = await existingFiles('readme.md')

    if (additionalFiles.length) {
      if (additionalFiles.indexOf('README.md') !== -1) {
        message({
          type: 'warning',
          content: 'If you do not remove README.md, it will be overwritten!'
        })
      }

      const confirmRemove = await question({
        type: 'confirm',
        message: 'There are other readme files, do you want to remove them?'
      })

      if (confirmRemove) deleteFiles(additionalFiles)
    }

    const repositoryUrl = await getRepoUrl('./')

    const projectName = getLastUrlItem(repositoryUrl) || getLastUrlItem('./')

    generateFile({
      template: 'README.md.ejs',
      target: './README.md',
      props: { projectName }
    })
  }
}
