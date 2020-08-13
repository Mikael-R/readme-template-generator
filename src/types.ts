export type Images = {
  logo: string,
  screenshots: string[]
}

export type Badges = {
  toSelect: string[],
  selected: string[],
  exists: (badgeName: string) => boolean
}

export type Features = {
  finished: string[],
  pendent: string[]
}

export type Author = {
  exists: boolean,
  name: string,
  github: string,
  twitter: string,
  website: string,
  linkedin: string
}

export type License = {
  name: string,
  url: string
}
