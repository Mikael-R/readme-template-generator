import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

import { say } from 'cfonts'

export interface ShowBanner {
  ({
    text,
    font,
    align,
    colors,
    background,
    letterSpacing,
    lineHeight,
    space,
    maxLength,
    gradient,
    independentGradient,
    transitionGradient,
    env
  }: {
    text: string
    font?: string
    align?: string
    colors?: string[]
    background?: string,
    letterSpacing?: number,
    lineHeight?: number,
    space?: boolean,
    maxLength?: string,
    gradient?: boolean,
    independentGradient?: boolean,
    transitionGradient?: boolean,
    env?: string
  }): void
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const showBanner: ShowBanner = ({
    text = '',
    font = 'tiny',
    align = 'center',
    colors = ['system'],
    background = 'transparent',
    letterSpacing = 1,
    lineHeight = 1,
    space = true,
    maxLength = '0',
    gradient = false,
    independentGradient = false,
    transitionGradient = false,
    env = 'node'
  }): void => {
    say(text, {
      font, // define the font face
      align, // define text alignment
      colors, // define all colors
      background, // define the background color, you can also use `backgroundColor` here as key
      letterSpacing, // define letter spacing
      lineHeight, // define the line height
      space, // define if the output text should have empty lines on top and on the bottom
      maxLength, // define how many character can be on one line
      gradient, // define your two gradient colors
      independentGradient, // define if you want to recalculate the gradient for each new line
      transitionGradient, // define if this is a transition between colors directly
      env // define the environment CFonts is being executed in
    })
  }

  toolbox.showBanner = showBanner
}
