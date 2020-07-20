// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface GenerateFile {
  (
    { template, target, props, trim }:
    { template: string, target: string, props: Object, trim?: boolean}
  ): void
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const generateFile: GenerateFile = ({ template, target, props, trim = true }) => {
    const {
      template: { generate },
      filesystem: { read, write }
    } = toolbox

    const trimFile = (str: string) => {
      // Remove the whitespace at the beginning of the string
      str = str.trim()

      // Removes whitespace at the beginning and end of each line in the str
      str = str
        .split('\n')
        .map(line => line.trim())
        .join('\n')

      // Removes blank lines, starting from two or more
      str = str.replace(/[\r\n]{2,}/g, '\n\n')

      return str
    }

    generate({ template, target, props })

    if (trim) {
      const data: string = trimFile(read(target))

      write(target, data)
    }
  }

  toolbox.generateFile = generateFile
}
