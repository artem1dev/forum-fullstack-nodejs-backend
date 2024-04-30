const apiUrl = "http://localhost:8080/api"

export default {
    registerPath: () => [apiUrl, 'auth', 'register'].join('/'),
    authPath: () => [apiUrl, 'auth', 'login'].join('/'),
    getUserById: (id, token) => [apiUrl, 'v1.1', 'users', id, token].join('/'),
    getAllUsers: () => [apiUrl, 'v1.1', 'users'].join('/'),
    allUser: (token) => [apiUrl, 'v1.1', 'users', token].join('/'),
    allPost: () => [apiUrl, 'v1.1', 'posts'].join('/'),
    getPostsById: (id, token) => [apiUrl, 'v1.1', 'posts', id, token].join('/'),
    createPost: (token) => [apiUrl, 'v1.1', 'posts', token].join('/'),
    likesPost: (id) => [apiUrl, 'v1.1', 'posts', id, 'like'].join('/'),
    commentsPost: (id) => [apiUrl, 'v1.1', 'posts', id, 'comments', 'aboba'].join('/'),
    createPostcomment: (id, token) => [apiUrl, 'v1.1', 'posts', id, 'comments', token].join('/'),
    createPostLike: (id, token) => [apiUrl, 'v1.1', 'posts', id, 'like', token].join('/'),
    deletePostLike: (id, token) => [apiUrl, 'v1.1', 'posts', id, 'like', token].join('/'),
    countLike: (id) => [apiUrl, 'v1.1', 'countlike', id].join('/'),
    countComment: (id) => [apiUrl, 'v1.1', 'countComment', id].join('/'),
    getPhoto: (name) => ["http://localhost:8080", 'avatars', name].join('/'),
} 