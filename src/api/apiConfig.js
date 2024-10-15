const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'ca2e05915b06777298f36ad34f4d1e93',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;