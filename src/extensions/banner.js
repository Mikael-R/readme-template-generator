module.exports = toolbox => {
  const { say } = require('cfonts')

  const banner = ({
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
  }) => {
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

  toolbox.banner = banner
}
