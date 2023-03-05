import chalk from 'chalk'

const { log } = console

export const logErrorMessage = (error) => {
  log(`\n${chalk.rgb(255, 255, 255).bgRgb(255, 17, 0)(' ERROR ')} ${chalk.red(`${error}`)}\n`)
}

export const logInfoMessage = (message) => {
  log(`\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(' INFO ')} ${chalk.blue(`${message}`)}`)
}
