import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

import { replaceAll } from '../utils'

export interface GenerateFile {
  ({
    template,
    target,
    props,
  }: {
    template: string
    target: string
    props: {}

    trim?: boolean
  }): Promise<void>
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.generateFile = async ({ template, target, props, trim = true }) => {
    const {
      template: { generate },
      filesystem: { read, write },
    } = toolbox

    const trimFile = () => {
      let fileText = read(target)

      // Remove the whitespace at the beginning and end of the string
      fileText = fileText.trim()

      // Removes whitespace at the beginning and end of each line in the str
      fileText = fileText
        .split('\n')
        .map(line => line.trim())
        .join('\n')

      // Removes blank lines, starting from two or more
      fileText = fileText.replace(/[\r\n]{2,}/g, '\n\n')

      // create end blank line
      fileText += '\n'

      // replace temporary character to normal spaces
      fileText = replaceAll(fileText, '¨', ' ')

      write(target, fileText)
    }

    // replace spaces to temporary characters
    if (trim) {
      const propsContentsInArray = Object.entries(props)

      for (const content of propsContentsInArray) {
        props[content[0]] = replaceAll(content[1], ' ', '¨')
      }
    }

    await generate({ template, target, props })

    if (trim) trimFile()
  }
}
