function createResolverOptions(palette) {
    return {
        getColorByAppearance({ dark, light }, appearance = palette.appearance) {
            switch (appearance) {
                case "dark":
                    return dark;
                case "light":
                    return light;
                default:
                    return dark;
            }
        },
    };
}

module.exports = {
    createResolverOptions,
};
