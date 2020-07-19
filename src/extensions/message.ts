// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface Message {
  (
    toolbox: ExtendedGluegunToolbox,
    type: 'info' | 'success' | 'warning' | 'error',
    content: string
  ): void
}

const message: Message = (toolbox, type, content) => {
  const {
    print: { info, success, warning, error }
  } = toolbox

  if (type === 'info') info(content)

  if (type === 'success') success(content)

  if (type === 'warning') warning(content)

  if (type === 'error') error(content)
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.message = message
}
