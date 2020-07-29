import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export type Question =
  ({
    type, message, defaultValue, choices, pageSize, validate, transformer, customReturn
  }: {
    type?: 'input' | 'number' | 'confirm' | 'list' | 'rawlist' | 'expand'| 'checkbox' | 'password' | 'editor',
    message: string,
    defaultValue?: any,
    choices?: any[] | Function,
    pageSize?: number,
    validate?: Function,
    transformer?: Function,
    customReturn?: Function
  }) => any

export default (toolbox: ExtendedGluegunToolbox) => {
  const question: Question = async ({
    type = 'input',
    message,
    defaultValue,
    choices,
    pageSize = 5,
    validate,
    transformer,
    customReturn = (value: string) => value
  }) => {
    const { prompt } = require('inquirer')

    const { value } = await prompt({
      type,
      name: 'value',
      message,
      default: defaultValue,
      choices,
      pageSize,
      validate,
      transformer: transformer || customReturn
    })

    return customReturn(value) || defaultValue
  }

  toolbox.question = question
}
