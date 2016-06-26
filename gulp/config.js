var config = {

    /**
     * Fonts
     */
    'fonts': {
        'src': [
            'resources/assets/fonts/**/*.*'
        ],
        'dest': 'public/fonts'
    },

    /**
     * Images
     */
    'images': {
        'src': [
            'resources/assets/images/**/*.{gif,png,jpg,jpeg,svg}'
        ],
        'dest': 'public/images'
    },

    /**
     * Scripts
     */
    'scripts' : {

        /**
         * Scripts > Formatter
         */
        'formatter': {
            'src' : [
                'resources/assets/scripts/**/*.js'
            ],
            'dest': 'resources/assets/scripts'
        },

        /**
         * Scripts > Lint
         */
        'lint': {
            'src': [
                'resources/assets/scripts/**/*.js'
            ]
        },

        /**
         * Scripts > Vueify
         */
        'vueify': {
            'src': 'resources/assets/scripts/components/components.js',
            'dest': 'public/scripts/app.js'
        },

        /**
         * Scripts > Build
         */
        'build': {
            'src': [
                'public/scripts/app.js',
            ],
            'dest': 'public/scripts/app.js'
        }
    },

    /**
     * Styles
     */
    'styles' : {

        /**
         * Styles > Lint
         */
        'lint': {
            'src' : [
                'resources/assets/styles/**/*.scss'
            ]
        },

        /**
         * Styles > Build
         */
        'build': {
            'src': [
                'resources/assets/styles/app.scss'
            ],
            'dest': 'public/styles'
        }
    }
};

module.exports = config;
