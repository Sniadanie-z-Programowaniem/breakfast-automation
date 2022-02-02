declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV?: 'production' | 'development';
    }
}
