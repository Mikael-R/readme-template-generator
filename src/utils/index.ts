const replaceAll = (value: any, match: string, replace: string) => {
  if (typeof value !== 'string') return ''
  return value.split(match).join(replace)
}

export { replaceAll}