interface ReplaceAll {
  (text: string, values: { toReplace: string[] | string, replacer: string }): string
}

const replaceAll: ReplaceAll = (text, { toReplace, replacer }) => {
  if (typeof text !== 'string') return text

  if (typeof toReplace === 'string') toReplace = [toReplace]

  for (const value of toReplace) {
    const searchRegex = new RegExp(value)

    text = text
      .split('\n')
      .map(line => line.replace(searchRegex, replacer))
      .join('\n')
  }

  return text
}

export default replaceAll
