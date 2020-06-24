module.exports = toolbox => {
  const {
    template: { generate },
    print: { success, error }
  } = toolbox

  const generateFile = ({ template, target, props }) => {
    generate({ template, target, props })
      .then(() => success(`Generated ${target} with success`))

      .catch(err => error(err))
  }

  toolbox.generateFile = generateFile
}
