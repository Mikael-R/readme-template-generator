export type Images = {
  logo: string,
  screenshots: string[]
}

export type Badges = {
  toSelect: string[],
  selected: string[],
  exists: (badgeName: string) => boolean
}
