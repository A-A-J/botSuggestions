/************************************************************************************************************************************************************
 * Plugin Name: Language System                                                                                                                             *
 * Plugin Version: 1.0                                                                                                                                      *
 * Plugin Date: 2/11/2022                                                                                                                                   *
 * Plugin Description: Calling the text individually by reading json files, adding an array property followed by % symbol and a serial number from 1 to 9   *
 * Plugin Author: coffee#9708                                                                                                                               *
 * Plugin URL: https://discord.com/users/927741280946094131                                                                                                 *
************************************************************************************************************************************************************/
const config = require('../../config.json');
const chalk = require('chalk');

// Cache language JSON and per-key template metadata to avoid repeated module resolution / regex work.
const path = require('node:path');
const langFileCache = new Map(); // language -> json
const templateCache = new Map(); // `${language}:${word}` -> { value, placeholderCount, isArray }

function getLangFile(language) {
    if (!langFileCache.has(language)) {
        const filePath = path.resolve(__dirname, '..', '..', 'lang', `${language}.json`);
        // require() caches by resolved path; we keep our own map to avoid repeated resolution work.
        // eslint-disable-next-line global-require, import/no-dynamic-require
        langFileCache.set(language, require(filePath));
    }
    return langFileCache.get(language);
}

function getTemplate(language, word, dict) {
    const key = `${language}:${word}`;
    let tpl = templateCache.get(key);
    if (!tpl) {
        const value = dict[word];
        const isArray = Array.isArray(value);
        const placeholderCount =
            typeof value === 'string'
                ? (value.match(/%[0-9]/g)?.length ?? 0)
                : 0;
        tpl = { value, placeholderCount, isArray };
        templateCache.set(key, tpl);
    }
    return tpl;
}
module.exports = () => {
    // Expose as a global helper (used widely across the codebase).
    global.lang = (word, array=null, statusArray=false) => {
        try {
            const language = config.lang;
            const dict = getLangFile(language);
            if(!dict[word]) return console.error(chalk.redBright(new Error(`NOT WORD { ${word} } IN FILE ${language}.JSON `).stack))

            const tpl = getTemplate(language, word, dict);

            if(statusArray == true) return tpl.value
            if(tpl.placeholderCount !== 0){
                if(!Array.isArray(array)) return chalk.redBright(new Error(`NOT WORD array => ${array}!`).stack)
                if(tpl.placeholderCount !== array.length) return chalk.redBright(new Error(`The content in the array is not equal to the number of the content in the language array\nThe number of array must be ${tpl.placeholderCount}`).stack)
                return tpl.value.replace(/%(\d+)/g, (_, n) => array[+n-1])
            }else{
                return tpl.value
            }
        } catch (error) {
            console.error(chalk.redBright(new Error(error).stack))
        }
    }
}