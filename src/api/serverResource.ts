interface Login {
    method: 'POST';
    endpoint: 'login',
    req: {
        username: string;
        password: string;
    }
    res: {
        accessToken: string;
        refreshToken: string;
    }
}

export interface PostResource {
    login: Login
}