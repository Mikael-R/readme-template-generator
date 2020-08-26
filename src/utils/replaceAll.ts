interface ReplaceAll {
  (text: string, search: string, replace: string): string
}

const replaceAll: ReplaceAll = (text, search, replace) => {
  if (typeof text !== 'string') return text

  return text.split(search).join(replace)
}

export default replaceAll
