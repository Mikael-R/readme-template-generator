import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

import { prompt } from 'inquirer'

export interface Question {
  ({
    type, message, defaultValue, choices, pageSize, validate, transformer, customReturn
  }: {
    type?: 'input' | 'number' | 'confirm' | 'list' | 'rawlist' | 'expand'| 'checkbox' | 'password' | 'editor',
    message: string,
    defaultValue?: any,
    choices?: string[] | Function,
    pageSize?: number,
    validate?: Function,
    transformer?: Function,
    customReturn?: Function
  }): any
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const question: Question = async ({
    type = 'input',
    message,
    defaultValue,
    choices,
    pageSize = 5,
    validate,
    transformer,
    customReturn = (value) => value
  }) => {
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

    let returning = customReturn(value) || defaultValue

    returning = typeof returning === 'string' ? returning.trim() : returning

    return returning
  }

  toolbox.question = question
}
