// Help functions from: https://github.com/gowravshekar/font-awesome-webpack/issues/33

function encodeLoader(loader) {
    if (typeof loader === 'string') {
        return loader;
    }

    if (typeof loader.options !== 'undefined') {
        const query = Object
            .keys(loader.options)
            .map((param) => {
                return `${encodeURIComponent(param)}=${encodeURIComponent(loader.options[param])}`;
            })
            .join('&');
        return `${loader.loader}?${query}`;
    }
    return loader.loader;
}

module.exports = function buildExtractStylesLoader(loaders) {
    const extractTextLoader = encodeLoader(loaders[0]);
    const fallbackLoader = encodeLoader(loaders[1]);

    const restLoaders = loaders
        .slice(2)
        .map(
            (loader) => {
                if (typeof loader === 'string') {
                    return loader;
                }
                return encodeLoader(loader);
            }
        );

    return [
        extractTextLoader,
        fallbackLoader,
        ...restLoaders,
    ].join('!');
};
