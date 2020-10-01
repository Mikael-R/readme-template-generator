export interface Images {
  logo: string
  screenshots: string[]
}

export interface Badges {
  toSelect: string[]
  selected: string[]
  exists: (badgeName: string) => boolean
}

export interface Features {
  exists: boolean
  finished: string[]
  pendent: string[]
}

export interface Author {
  exists: boolean
  name: string
  github: string
  twitter: string
  website: string
  linkedin: string
}

export interface License {
  name: string
  url: string
}

export interface Contribute {
  tutor: {
    show: boolean
  }
  contributors: {
    users: {}[]
    show: boolean
  }
}
