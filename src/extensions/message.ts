import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export interface Message {
  (
    type: 'info' | 'success' | 'warning' | 'error',
    content: string
  ): void
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const message: Message = (type, content) => {
    const {
      print: { info, success, warning, error }
    } = toolbox

    if (type === 'info') info(content)

    if (type === 'success') success(content)

    if (type === 'warning') warning(content)

    if (type === 'error') error(content)
  }

  toolbox.message = message
}
