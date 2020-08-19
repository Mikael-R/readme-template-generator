export interface PackageJSON {
  name?: string
  version?: string
  description?: string
  keywords?: string[]
  homepage?: any
  bugs?: any
  license?: string
  author?: any
  contributors?: any[]
  maintainers?: any[]
  files?: string[]
  main?: string
  bin?: any
  interfaces?: string
  typings?: string
  man?: string[]
  directories?: any
  repository?: any
  scripts?: {
      [k: string]: string
  }
  config?: {
      [k: string]: any
  }
  dependencies?: any
  devDependencies?: any
  optionalDependencies?: any
  peerDependencies?: any
  resolutions?: any
  engines?: {
      [k: string]: string
  }
  private?: boolean
  [k: string]: any
}

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
