module.exports = (env, options) => ({
        resolve: {
                alias: {
                        interfaces: path.resolve(__dirname, 'src/interfaces'), // added this
                },
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
})
