import chalk from 'chalk';

// Create an echo object with log, warn, and error methods
export const echo = {
  log: (message: string): void => {
    console.log(chalk.white(message));
  },

  warn: (message: string): void => {
    console.log(chalk.yellow(message));
  },

  error: (message: string): void => {
    console.log(chalk.red(message));
  },

  good: (message: string): void => {
    console.log(chalk.green(message));
  },
  info: (message: string): void => {
    console.log(chalk.blue(message));
  },
};

export const em = (message: string) => chalk.bold(message);

export const notice = (message: string) => chalk.magenta(message);
