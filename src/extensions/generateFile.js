module.exports = toolbox => {
  const {
    template: { generate },
    filesystem: { read, write }
  } = toolbox

  const generateFile = async ({ template, target, props, trim = true }) => {
    const trimSpaces = str => {
      // Remove the whitespace at the beginning and end of the string
      str = str.replace(/^\s+|\s+$/g, '')

      // Removes whitespace at the beginning and end of each line in the str
      str = str
        .split('\n')
        .map(line => line.replace(/^\s+|\s+$/g, ''))
        .join('\n')

      // Removes blank lines, starting from two or more
      str = str.replace(/[\r\n]{2,}/g, '\n\n')

      return str
    }

    await generate({ template, target, props })

    if (trim) write(target, trimSpaces(read(target)))
  }

  toolbox.generateFile = generateFile
}
