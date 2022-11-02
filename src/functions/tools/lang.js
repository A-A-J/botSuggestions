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
module.exports = () => {
    lang = (word, array=null, statusArray=false) => {
        try {
            const language = config.lang;
            const lang = require(`../../lang/${language}.json`)
            if(!lang[word]) return console.error(chalk.redBright(new Error(`NOT WORD { ${word} } IN FILE ${language}.JSON `).stack))
            if(statusArray == true) return lang[word]
            let countNumberc = lang[word].split(/%[0-9]/).length-1;
            if(countNumberc !== 0){
                if(!Array.isArray(array)) return chalk.redBright(new Error(`NOT WORD array => ${array}!`).stack)
                if(countNumberc !== array.length) return chalk.redBright(new Error(`The content in the array is not equal to the number of the content in the language array\nThe number of array must be ${countNumberc}`).stack)
                return lang[word].replace(/%(\d+)/g, (_, n) => array[+n-1])
            }else{
                return lang[word]
            }
        } catch (error) {
            console.error(chalk.redBright(new Error(error).stack))
        }
    }
}