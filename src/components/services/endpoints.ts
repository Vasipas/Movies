const Endpoints = {
    UPLOAD_FILE: '/movies/import',
    SIGN_UP_USER: '/users',
    SIGN_IN_USER: '/sessions',
    MOVIE: {
        CREATE: '/movies',
        DELETE: (id: string) => `/movies/${id}`,
        UPDATE: (id: string) => `/movies/${id}`,
        SHOW: (id: string) => `/movies/${id}`,
        LIST: '/movies'
    }
}

export {Endpoints}