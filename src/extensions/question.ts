import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

import { prompt } from 'inquirer'

export interface Question {
  ({
    type,
    message,
    defaultValue,
    choices,
    pageSize,
    validate,
    transformer,
    customReturn,
  }: {
    prefix?: string
    type?: any
    message: string
    defaultValue?: any
    choices?: string[] | Function
    pageSize?: number
    validate?: any
    transformer?: any
    customReturn?: Function
  }): any
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const question: Question = async ({
    prefix = '',
    type = 'input',
    message,
    defaultValue,
    choices,
    pageSize = 5,
    validate,
    transformer,
    customReturn = value => value,
  }) => {
    const { value } = await prompt({
      prefix,
      type,
      name: 'value',
      message,
      default: defaultValue,
      choices,
      pageSize,
      validate,
      transformer: transformer || customReturn,
    })

    let returning = customReturn(value) || defaultValue

    returning = typeof returning === 'string' ? returning.trim() : returning

    return returning
  }

  toolbox.question = question
}
