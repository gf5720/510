const ENV  = process.env.NODE_ENV;
const srcPath = 'src';
const distPath = 'docs';

module.exports = {
    script: {
        src: `${srcPath}/js/**/*.js`,
        dist: `${distPath}/js/`,
        watch: [
            `${srcPath}/js/**/*.js`,
            `${srcPath}/glsl/**/*.+(vert|frag|glsl)`
        ]
    },
    ejs: {
        src: `${srcPath}/view/**/[!_]*.ejs`,
        dist: distPath,
        watch: `${srcPath}/view/**/*.ejs`,
    },
    pug: {
        src: `${srcPath}/view/**/[!_]*.pug`,
        dist: distPath,
        watch: `${srcPath}/view/**/*.pug`,
    },
    css: {
        src: `${srcPath}/scss/**/*.scss`,
        dist:`${distPath}/css`,
        autoprefixer: {
            browsers: ['last 1 version']
        }
    },
    img: {
        src: `${srcPath}/images/**/*.+(jpeg|jpg|png|gif|svg|mp4|ico)`,
        dist:`${distPath}/images`
    },
    server: {
        server: {
            baseDir: distPath
        }
    },
    copy: {
        base: srcPath,
        src: [
            `${srcPath}/images/**/*.+(jpeg|jpg|png|gif|svg|mp4)`,
            `${srcPath}/font/**/*`
        ],
        dist: `${distPath}`
    },
    clean: {
        dist: `${distPath}`
    }
};
