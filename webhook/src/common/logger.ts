import Pino from 'pino';

const pino = Pino();

const logLevels = ['info', 'error', 'debug', 'fatal', 'warn', 'trace'] as const;
type LogLevel = typeof logLevels[number];

const adaptPino = (method: LogLevel): Pino.BaseLogger[LogLevel] => pino[method].bind(pino);

type Logger = { readonly [K in LogLevel]: Pino.BaseLogger[K] };

const defaultLogger: { readonly [K in LogLevel]: Pino.BaseLogger[K] } = logLevels.reduce(
    (acc, level) => {
        return {
            ...acc,
            [level]: adaptPino(level),
        };
    },
    {} as Logger,
);

export const logger = defaultLogger;
