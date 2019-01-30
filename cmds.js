const moby = require('moby');
const rempunc = require('remove-punctuation')
const figlet = require('figlet')
const Discord = require('discord.js');
const fs = require('fs')

ChanID = '458821920138330115'; //by default goes to a #null-channel

//Normal functions
function cleanArray(actual) {
    //not made by me lol
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
function getlength(number) {
    //just returns length
    return number.toString().length;
}

//functions used inside the exports that also export
function lOpt(set_check, serverID, in_out) {
    //select JSON file
    eJF = new require('edit-json-file')
    jfile = eJF('data.json')
    //set & shorten variables
    var cmds = set_check
    var io = in_out
    var get = jfile.get(`listener.optOut.${serverID}`)
    //select command
    if (cmds == 'set') {
        //check opting
        if (io == 'out') {
            //if opted in
            if (!get) {
                //opt out
                jfile.set(`listener.optOut.${serverID}`, true)
                jfile.save()
                return true
            } else { return false } //already opted out
        } else if (io == 'in') {
            //if opted out
            if (get) {
                //opt in
                jfile.set(`listener.optOut.${serverID}`, undefined)
                jfile.save()
                return true
            } else { return false } //already opted in
        }
    } else if (cmds == 'check') {
        if (!get) {
            return true //opted in
        } else {
            return false //opted out & fallback
        }
    }
}

function getPrefix(serverID) {
    //select JSON file
    eJF = new require('edit-json-file')
    jfile = eJF('data.json')
    //check for custom prefix
    if (jfile.get(`prefix.${serverID}`)) {
        //returns custom prefix
        return jfile.get(`prefix.${serverID}`)
    } else {
        //returns default prefix
        return jfile.get('prefix.default')
    }
}

//exports
module.exports = {

    logmsg: function logmsg(msg, message, bot) {
        //logs messages
        bot.channels.get('449759068941189151').send(`recieved: ${message.author.tag} - ${message.content}`);
        bot.channels.get('449759068941189151').send(`Sent: ${msg}`);
        console.log(message.author.tag + ' - ' + message.content);
        console.log(`sent: ${msg}`);
        //@ ${Date().split(' ').slice(1, 5).join(' ')} unneeded w/ SystemD
    },

    runHive: function runHive(message, bot) {
        //full message split
        const argz = message.content.split(/ +/g);
        //test if me and in console channel
        if (message.author.id == '186507006008360960' && message.channel.id == '449759045491097610') {
            //test if first word is channel ID
            if (getlength(argz[0]) == 18 && parseInt(argz[0])) {
                //grab message
                msg = message.content.replace(argz[0] + ' ', '');
                //send
                bot.channels.get(argz[0]).send(msg);
                //log
                bot.channels.get('449759068941189151').send(`recieved: ${message.author.username} - ${message.content}`);
                bot.channels.get('449759068941189151').send(`Sent: ${msg} to <#${argz[0]}>`);
                console.log(message.author.username + ' - ' + message.content);
                console.log(`Sent: ${msg} to <#${argz[0]}>`);
                //prime channel
                ChanID = argz[0];
            } else {
                //send
                bot.channels.get(ChanID).send(message.content);
                //log
                bot.channels.get('449759068941189151').send(`recieved: ${message.author.username} - ${message.content}`);
                bot.channels.get('449759068941189151').send(`Sent: ${message.content} to <#${ChanID}>`);
                console.log(message.author.username + ' - ' + message.content);
                console.log(`Sent: ${message.content} to <#${ChanID}>`);
            }
        }
    },

    emojiconvert: function emojiconvert(text) {
        //replaces all letters with emojis.
        set = text.replace(/a/g, '🅰').replace(/b/g, '🅱️').replace(/c/g, '©️').replace(/d/g, '🇩')
            .replace(/e/g, '🇪').replace(/f/g, '🇫').replace(/g/g, '🇬').replace(/h/g, '♓').replace(/i/g, 'ℹ️')
            .replace(/j/g, '🇯').replace(/k/g, '🇰').replace(/l/g, '🇱').replace(/m/g, '♏️').replace(/n/g, '🇳')
            .replace(/o/g, '🅾️').replace(/p/g, '🅿️').replace(/q/g, '🇶').replace(/r/g, '®️').replace(/s/g, '💲')
            .replace(/t/g, '✝️').replace(/u/g, '🇺').replace(/v/g, '🇻').replace(/w/g, '🇼').replace(/x/g, '❌')
            .replace(/y/g, '🇾').replace(/z/g, '🇿').replace(/ /g, ' ⬜ ').replace(/!/g, '❗️').replace('?', '❓')
            .replace(/©️🇱/g, '🆑').replace(/🅰🅱️/g, '🆎').replace(/🅾️🇰/g, '🆗').replace(/✝️♏️/g, '™️')
            .replace('+', '➕').replace(/-/g, '➖').replace(/10/g, '🔟').replace(/0/g, '0️⃣').replace(/1/g, '1️⃣')
            .replace(/2/g, '2️⃣').replace(/3/g, '3️⃣').replace(/4/g, '4️⃣').replace(/5/g, '5️⃣').replace(/6/g, '6️⃣')
            .replace(/7/g, '7️⃣').replace(/8/g, '8️⃣').replace(/9/g, '9️⃣')
        return set
    },

    synonymify: function synonymify(text) {
        //set variables
        var midtext = rempunc(text.join(' ')).split(' ')
        var posttext = midtext

        //replaces every word with random synonym
        for (i = 0; i < text.length; i++) {
            'use strict';
            //grab synonyms
            var searcher = moby.search(midtext[i]);
            //select random synonym
            var randomizer = searcher[Math.floor(Math.random() * searcher.length)];
            //failsafe for words without synonyms
            if (randomizer != null) {
                //place in array
                onlypunct = text[i].replace(midtext[i], '')
                posttext[i] = randomizer + onlypunct;
            }
        }
        //Turn into string & return
        var finaltext = posttext.join(' ');
        return (finaltext);

    },

    getPrefix: function getPrefixEport(serverID) {
        return getPrefix(serverID)
    },

    setPrefix: function setPrefix(serverID, prefix) {
        //set prefix to lowercase
        prefix = prefix.toLowerCase()
        //select JSON file
        eJF = new require('edit-json-file')
        jfile = eJF('data.json')
        if (jfile.get('prefix.default') == prefix) {
            //delete data if unneeded
            prefix = undefined
        }
        //set file & save
        jfile.set(`prefix.${serverID}`, prefix)
        jfile.save()
    },

    asciiMake: function asciiMake(text, setFont) {
        //test length  
        if (getlength(text) > 15) {
            //over 15 chars
            //make asciiArt
            var asciiart = (figlet.textSync(text, {
                font: setFont,
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }))
            //write file
            fs.writeFileSync('./asciiart.txt', asciiart)
            //create embed & return
            var embed = new Discord.RichEmbed()
                .setColor(0x0096ff)
                .setTitle('The text given is over 15 characters, so I made it a file.')
                .attachFile('./asciiart.txt')
            return embed
        } else {
            //Under 15 chars
            console.log(`Font Given: ${setFont}`)
            //create asciiArt & return
            return '```\n' + (figlet.textSync(text, {
                font: setFont,
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })) + '```\n'
        }
    },

    servCmds: function servCmds(list_array_set, serverID, trigger, reply) {
        //select JSON file
        eJF = new require('edit-json-file')
        jfile = eJF('data.json')
        //test for command
        if (list_array_set == 'list' || list_array_set == 'array') {
            //similar process so combined both and split at end
            //grab section from file
            if (jfile.get(`cmds.${serverID}`)) {
                var cmds = jfile.get(`cmds.${serverID}`)
                //make array
                var cmdsArray = Object.keys(cmds).map(function (key) {
                    return [String(key), cmds[key]];
                })
                var cmdsList = []
                //Make humanly readable
                for (i = 0; i < cmdsArray.length; i++) {
                    "use strict";
                    cmdsList[i] = `Command #${i + 1}: "${cmdsArray[i][0]}", returns: "${cmdsArray[i][1]}"`
                }
                //split into returns
                if (list_array_set == 'list') {
                    return cmdsList.join('\n')
                } else if (list_array_set == 'array') {
                    return cmdsArray
                } else { return false } //fallback
            } else { return false } //fallback
            //test for command continued
        } else if (list_array_set == 'set') {
            //set and save file as "trigger":"reply"
            if (jfile.get(`cmds.${serverID}.${trigger}`) == reply) {
                console.log(jfile.get(`cmds.${serverID}.${trigger}`))
                return false
            } else {
                jfile.set(`cmds.${serverID}.${trigger}`, reply)
                jfile.save()
                return true
            }
        }
    },

    RandSpk: function RandSpk(view_toggle, serverID) {
        //select file
        eJF = new require('edit-json-file')
        jfile = eJF('data.json')
        //select command
        if (view_toggle == 'view') {
            //test if exists (on)
            if (jfile.get(`randSpk.${serverID}`)) {
                //found, is on
                return true
            } else {
                //didn't find, is off
                return false
            }
            //select command continued
        } else if (view_toggle == 'toggle') {
            //test for existence
            if (jfile.get(`randSpk.${serverID}`)) {
                //exists, set to not exist
                jfile.set(`randSpk.${serverID}`, undefined)
                jfile.save()
                //return situation
                return 'off'
            } else {
                //doesn't exist, set to exist
                jfile.set(`randSpk.${serverID}`, true)
                jfile.save()
                //return situation
                return 'on'
            }
        }
    },

    combos: function combos(chars) {
        var result = [];
        //not a clue what this does but works really well (taken from net & slighly altered)
        function f(prefix, chars) {
            for (var i = 0; i < chars.length; i++) {
                result.push(prefix + chars[i]);
                f(prefix + chars[i], chars.slice(i + 1));
            }
        }
        //activate function
        f('', chars);
        //return
        return result;
    },

    listener: function listener(add_remove_run_list, message, bot, args, prefix) {
        //select JSOn file
        eJF = new require('edit-json-file')
        jfile = eJF('data.json')
        //set variables
        var authID = message.author.id
        var channelID
        //set channelID safely
        if (args) {
            channelID = args[0].replace(/<#|>/g, '')
        }
        //set other variables
        var get = jfile.get(`listener.relays.${authID}`)
        var Opt = add_remove_run_list.toLowerCase()
        //turn JSON into array, taken from the net
        function listArray(json) {
            var listArray = Object.keys(json).map(function (key) {
                return [String(key), json[key]];
            })
            return listArray
        }
        //test for command
        if (Opt == 'add') {
            //test for existence
            if (get) {
                //get array
                var authChanArray = get.split('|')
                //check array & stop function if in array
                if (authChanArray.indexOf(channelID) > -1) { return false }
                jfile.set(`listener.relays.${authID}`, `${get}${channelID}|`)
            } else {
                //set starting object in array
                jfile.set(`listener.relays.${authID}`, `${channelID}|`)
            }
            jfile.save()
            return true //return success
        } else if (Opt == 'remove') {
            //test for existence
            if (get) {
                //exists, removing
                var NewChannelID = args[1].replace(/<#|>/g, '')
                var RemovedChan = get.replace(NewChannelID + '|', '').replace('||', '|')
                //set to undefined if nothing
                if (RemovedChan === '') {
                    RemovedChan = undefined
                }
                //write and save
                jfile.set(`listener.relays.${authID}`, RemovedChan)
                jfile.save()
                return true //return success
            } else { return false } //doesn't exist, does nothing & returns scenario
        } else if (Opt == 'list') {
            //tests if exists
            if (get) {
                //exists - get, split
                var authChanArray = cleanArray(get.split('|'))
                var formatAuthChanArray = []
                //formats correctly
                for (i = 0; i < authChanArray.length; i++) {
                    //show opt status
                    if (bot.channels.get(authChanArray[i])) {
                        if (lOpt('check', bot.channels.get(authChanArray[i]).guild.id)) {
                            OPTstat = 'IN'
                        } else {
                            OPTstat = 'OUT'
                        }
                    }
                    //set new format
                    formatAuthChanArray[i] = `#${bot.channels.get(authChanArray[i]).name} | ID: ${authChanArray[i]} | Opt Status: ${OPTstat}`
                }
                //makes string
                var FormatACstring = formatAuthChanArray.join('\n')
                //creates embed and returns
                var embed = new Discord.RichEmbed()
                    .setColor(0x0096ff)
                    .setAuthor('List of Channels Reing Relayed to Your DMs', bot.user.avatarURL)
                    .setTitle('_ _\n' + FormatACstring)
                return embed
            } else {
                //doesn't exist
                //create Embed for scenario & return
                var embed = new Discord.RichEmbed()
                    .setColor(0x0096ff)
                    .setAuthor('List of Channels Reing Relayed to Your DMs', bot.user.avatarURL)
                    .setTitle("_ _\nYou aren't being relayed any channels.")
                    .setDescription(`_ _\n*To relay a channel, use: ${prefix}listen [channel ID or channel tag|stop|list] [channel ID or channel tag]*`)
                return embed
            }
        } else if (Opt == 'run' && jfile.get(`listener.relays`)) {
            //checks for Guild, disables DMs
            if (message.guild) {
                //make array
                var guildArray = listArray(jfile.get(`listener.relays`))
                var cIDbundle = []
                //compact item
                for (i = 0; i < guildArray.length; i++) {
                    cIDbundle[i] = guildArray[i][1]
                }
                //set vars
                var cIDstring = cIDbundle.join('')
                var cIDarray = cIDstring.split('|')
                //test if channel is relayed
                if (cIDarray.indexOf(message.channel.id) > -1) {
                    var uIDbundle = []
                    //loop until all users covered
                    for (i = 0; i < guildArray.length; i++) {
                        uIDbundle[i] = guildArray[i][0]
                        //test if user requests relay
                        if (jfile.get(`listener.relays.${uIDbundle[i]}`).split('|').indexOf(message.channel.id) > -1) {
                            //test if user still exists
                            if (bot.users.get(uIDbundle[i])) {
                                //creates embed of message
                                var msg
                                if (lOpt('check', message.guild.id)) {
                                    var embed = new Discord.RichEmbed()
                                        .setColor(0x0096ff)
                                        .setAuthor('Chat Listener', bot.user.avatarURL)
                                        .addField('_ _\nServer:', `${message.guild.name} | ID: ${message.guild.id}`)
                                        .addField('_ _\nChannel:', `<#${message.channel.id}> | ID: ${message.channel.id}`)
                                        .addField('_ _\nAuthor:', `<@${message.author.id}> | ID: ${message.author.id}`)
                                        .addField('_ _\nMessage:', message.content)
                                    //send user message
                                    bot.users.get(uIDbundle[i]).send(embed)
                                    //set message to log and log message
                                    msg = `Forwarded message to the DM of user ${bot.users.get(uIDbundle[i]).username}`
                                } else {
                                    var embed = new Discord.RichEmbed()
                                        .setColor(0x0096ff)
                                        .setAuthor('Chat Listener', bot.user.avatarURL)
                                        .setTitle('_ _\nUnfortunately, the server of the channel you are being relayed has opted out of chat listening.')
                                        .setDescription(`_ _\n*To stop this message from appearing, use format: ${getPrefix(uIDbundle[i])}listen stop ${message.channel.id}*`)
                                    //send user message
                                    bot.users.get(uIDbundle[i]).send(embed)
                                    //set message to log and log message
                                    msg = `${bot.users.get(uIDbundle[i]).username} told the server of <#${message.channel.id}> opted out.`
                                }
                                bot.channels.get('449759068941189151').send(`recieved: ${message.author.username} - ${message.content}`);
                                bot.channels.get('449759068941189151').send(`Sent: ${msg}`);
                                console.log(message.author.username + ' - ' + message.content);
                                console.log(`sent @ ${Date().split(' ').slice(1, 5).join(' ')} ${Date().split(' ').slice(6, 7).join(' ')}: ${msg}`);
                            }
                        }
                    }
                }
            }
        }
    },

    listenerOpt: function lOptExport(set_check, serverID, in_out) {
        //relay command used in-file
        return lOpt(set_check, serverID, in_out)
    },

    superScript: function superScript(text) {
        //replace 4 math
        var math = text.replace(/0/g, '⁰').replace(/1/g, '¹').replace(/2/g, '²').replace(/3/g, '³')
            .replace(/4/g, '⁴').replace(/5/g, '⁵').replace(/6/g, '⁶').replace(/7/g, '⁷').replace(/8/g, '⁸')
            .replace(/9/g, '⁹').replace(/\+/g, '⁺').replace(/-/g, '⁻').replace(/=/g, '⁼').replace(/\(/g, '⁽')
            .replace(/\)/g, '⁾')
        //replace for lowercase english
        var enLower = math.replace(/a/g, 'ᵃ').replace(/b/g, 'ᵇ').replace(/c/g, 'ᶜ').replace(/d/g, 'ᵈ')
            .replace(/e/g, 'ᵉ').replace(/f/g, 'ᶠ').replace(/g/g, 'ᵍ').replace(/h/g, 'ʰ').replace(/i/g, 'ⁱ')
            .replace(/j/g, 'ʲ').replace(/k/g, 'ᵏ').replace(/l/g, 'ˡ').replace(/m/g, 'ᵐ').replace(/n/g, 'ⁿ')
            .replace(/o/g, 'ᵒ').replace(/p/g, 'ᵖ').replace(/q/g, 'ᵠ').replace(/r/g, 'ʳ').replace(/s/g, 'ˢ')
            .replace(/t/g, 'ᵗ').replace(/u/g, 'ᵘ').replace(/v/g, 'ᵛ').replace(/w/g, 'ʷ').replace(/x/g, 'ˣ')
            .replace(/y/g, 'ʸ').replace(/z/g, 'ᶻ')
        //replace for uppercase english
        var enUpper = enLower.replace(/A/g, 'ᴬ').replace(/B/g, 'ᴮ').replace(/C/g, 'ᶜ').replace(/D/g, 'ᴰ')
            .replace(/E/g, 'ᴱ').replace(/F/g, 'ᶠ').replace(/G/g, 'ᴳ').replace(/H/g, 'ᴴ').replace(/I/g, 'ᴵ')
            .replace(/J/g, 'ᴶ').replace(/K/g, 'ᴷ').replace(/L/g, 'ᴸ').replace(/M/g, 'ᴹ').replace(/N/g, 'ᴺ')
            .replace(/O/g, 'ᴼ').replace(/P/g, 'ᴾ').replace(/Q/g, 'ᵠ').replace(/R/g, 'ᴿ').replace(/S/g, 'ˢ')
            .replace(/T/g, 'ᵀ').replace(/U/g, 'ᵁ').replace(/V/g, 'ⱽ').replace(/W/g, 'ᵂ').replace(/X/g, 'ˣ')
            .replace(/Y/g, 'ʸ').replace(/Z/g, 'ᶻ')
        //return
        return enUpper
    },

    unicodify: function unicodify(text) {
        //replace for numbers
        var num = text.replace(/0/g, '𝟢').replace(/1/g, '𝟣').replace(/2/g, '𝟤').replace(/3/g, '𝟥')
            .replace(/4/g, '𝟦').replace(/5/g, '𝟧').replace(/6/g, '𝟨').replace(/7/g, '𝟩').replace(/8/g, '𝟪')
            .replace(/9/g, '𝟫')
        //replace for lowercase english
        var enLower = num.replace(/a/g, 'а').replace(/b/g, '𝖻').replace(/c/g, 'с').replace(/d/g, '𝖽')
            .replace(/e/g, 'е').replace(/f/g, '𝖿').replace(/g/g, '𝗀').replace(/h/g, '𝗁').replace(/i/g, '𝗂')
            .replace(/j/g, '𝗃').replace(/k/g, '𝗄').replace(/l/g, '❘').replace(/m/g, '𝗆').replace(/n/g, '𝗇')
            .replace(/o/g, 'о').replace(/p/g, 'р').replace(/q/g, '𝗊').replace(/r/g, '𝗋').replace(/s/g, 'ѕ')
            .replace(/t/g, '𝗍').replace(/u/g, '𝗎').replace(/v/g, '𝗏').replace(/w/g, '𝗐').replace(/x/g, '𝗑')
            .replace(/y/g, '𝗒').replace(/z/g, '𝗓')
        //replace for uppercase english
        var enUpper = enLower.replace(/A/g, 'А').replace(/B/g, 'В').replace(/C/g, 'С').replace(/D/g, '𝖣')
            .replace(/E/g, 'Е').replace(/F/g, '𝖥').replace(/G/g, '𝖦').replace(/H/g, '𝖧').replace(/I/g, 'І')
            .replace(/J/g, '𝖩').replace(/K/g, '𝖪').replace(/L/g, '𝖫').replace(/M/g, '𝖬').replace(/N/g, '𝖭')
            .replace(/O/g, 'О').replace(/P/g, 'Р').replace(/Q/g, '𝖰').replace(/R/g, '𝖱').replace(/S/g, 'Ѕ')
            .replace(/T/g, '𝖳').replace(/U/g, '𝖴').replace(/V/g, '𝖵').replace(/W/g, '𝖶').replace(/X/g, '𝖷')
            .replace(/Y/g, '𝖸').replace(/Z/g, '𝖹')
        //return
        return enUpper
    },

    bold: function bold(text) {
        //array of ascii & unicode counterparts
        var repArr = [['A', '𝗔'], ['B', '𝗕'], ['C', '𝗖'], ['D', '𝗗'], ['E', '𝗘'], ['F', '𝗙'], ['G', '𝗚'],
        ['H', '𝗛'], ['I', '𝗜'], ['J', '𝗝'], ['K', '𝗞'], ['L', '𝗟'], ['M', '𝗠'], ['N', '𝗡'], ['O', '𝗢'],
        ['P', '𝗣'], ['Q', '𝗤'], ['R', '𝗥'], ['S', '𝗦'], ['T', '𝗧'], ['U', '𝗨'], ['V', '𝗩'], ['W', '𝗪'],
        ['X', '𝗫'], ['Y', '𝗬'], ['Z', '𝗭'], ['a', '𝗮'], ['b', '𝗯'], ['c', '𝗰'], ['d', '𝗱'], ['e', '𝗲'],
        ['f', '𝗳'], ['g', '𝗴'], ['h', '𝗵'], ['i', '𝗶'], ['j', '𝗷'], ['k', '𝗸'], ['l', '𝗹'], ['m', '𝗺'],
        ['n', '𝗻'], ['o', '𝗼'], ['p', '𝗽'], ['q', '𝗾'], ['r', '𝗿'], ['s', '𝘀'], ['t', '𝘁'], ['u', '𝘂'],
        ['v', '𝘃'], ['w', '𝘄'], ['x', '𝘅'], ['y', '𝘆'], ['z', '𝘇'], ['0', '𝟬'], ['1', '𝟭'], ['2', '𝟮'],
        ['3', '𝟯'], ['4', '𝟰'], ['5', '𝟱'], ['6', '𝟲'], ['7', '𝟳'], ['8', '𝟴'], ['9', '𝟵']]
        //define str
        var str = text
        //for each letter & number
        for (i = 0; i < repArr.length; i++) {
            //replace on every character
            str = str.replace(new RegExp(repArr[i][0], 'g'), repArr[i][1])
        }
        //return
        return str
    },

    replace: function replace(item, replacement, text) {
        //replace on every character
        var str = text.replace(new RegExp(item, 'g'), replacement)
        //return
        return str
    },

    evalCode: function evalCode(get_set) {
        //select JSON file
        eJF = new require('edit-json-file')
        jfile = eJF('data.json')

        if (get_set == 'get') {
            return jfile.get('evalCode')
        } else if (get_set == 'set') {
            //gen taken from internet, gets random item from string & adds to code
            function genCode() {
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=+[]{}";
                var code = "";
                for (var i = 0; i < 7; i++)
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                return code;
            }
            const newCode = genCode()
            jfile.set('evalCode', newCode)
            jfile.save()
            return newCode
        }
    },

    big: function big(word, text, thin) {
        //select JSON file
        eJF = new require('edit-json-file')
        jfile = eJF('bigtype.json')

        //set variables 
        var ltrs = text.split('')
        var fltrs = ltrs
        //filer text to remove unreplaceable items
        for (i = 0; i < ltrs.length; i++) {
            //test for unsupported object & replace with identifier
            if (!jfile.get(ltrs[i]) && ltrs[i] != ' ' && ltrs[i] != '.') {
                fltrs[i] = '⛝'
            } else if (ltrs[i] == '.') {
                //replace period with json-usable replacement
                fltrs[i] = '․'
            }
        }
        //set vars
        var inchar = ' '.repeat(word.length)
        var space = ' '.repeat((word.length * 2))
        var midchar = ''
        var r1 = ''
        var r2 = ''
        var r3 = ''
        var r4 = ''
        var r5 = ''
        //construct 5 layers, combining to form text
        for (i = 0; i < fltrs.length; i++) {
            if (i == 1) {
                midchar = ' '.repeat(word.length + 1)
                if (thin) { midchar = ' '.repeat(word.length) }
            }
            if (!thin) {
                if (fltrs[i] != ' ') {
                    r1 = r1 + midchar + jfile.get(`${fltrs[i]}.1`).replace(/_/g, inchar).replace(/c/g, word)
                    r2 = r2 + midchar + jfile.get(`${fltrs[i]}.2`).replace(/_/g, inchar).replace(/c/g, word)
                    r3 = r3 + midchar + jfile.get(`${fltrs[i]}.3`).replace(/_/g, inchar).replace(/c/g, word)
                    r4 = r4 + midchar + jfile.get(`${fltrs[i]}.4`).replace(/_/g, inchar).replace(/c/g, word)
                    r5 = r5 + midchar + jfile.get(`${fltrs[i]}.5`).replace(/_/g, inchar).replace(/c/g, word)
                } else {
                    r1 = r1 + space
                    r2 = r2 + space
                    r3 = r3 + space
                    r4 = r4 + space
                    r5 = r5 + space
                }
            } else {
                if (fltrs[i] != ' ') {
                    r1 = r1 + midchar + jfile.get(`${fltrs[i]}.1`).replace(/ /g, '').replace(/_/g, inchar).replace(/c/g, word)
                    r2 = r2 + midchar + jfile.get(`${fltrs[i]}.2`).replace(/ /g, '').replace(/_/g, inchar).replace(/c/g, word)
                    r3 = r3 + midchar + jfile.get(`${fltrs[i]}.3`).replace(/ /g, '').replace(/_/g, inchar).replace(/c/g, word)
                    r4 = r4 + midchar + jfile.get(`${fltrs[i]}.4`).replace(/ /g, '').replace(/_/g, inchar).replace(/c/g, word)
                    r5 = r5 + midchar + jfile.get(`${fltrs[i]}.5`).replace(/ /g, '').replace(/_/g, inchar).replace(/c/g, word)
                } else {
                    r1 = r1 + space
                    r2 = r2 + space
                    r3 = r3 + space
                    r4 = r4 + space
                    r5 = r5 + space
                }
            }
        }

        //connect all 5 layers & return
        var string = `${r1}\n${r2}\n${r3}\n${r4}\n${r5}`
        fs.writeFileSync('./big.txt', string)

        if (string.length > 520) {
            var embed = new Discord.RichEmbed()
                .setColor(0x0096ff)
                .setTitle('The result is over 520 characters, so I made it a file.')
                .attachFile('./big.txt')

            return embed
        } else {
            return '```\n' + string + '\n```'
        }
    },

    version: function version() {
        //set json file
        eJF = new require('edit-json-file')
        jfile = eJF('package.json')
        //return verison
        return jfile.get('version')
    },

    jumble: function jumble(text) {
        //set vars
        var s = text.split(' ');
        var j = s.join(' ')

        //loop for every word & make sure it jumbles
        while (j == text && s.length != 1) {
            for (i = 0; i < s.length; i++) {
                //randomizer with catches
                if (Math.random() >= 0.5 && i < s.length - 1) {
                    //swaps 0 with 1
                    var b = s[i + 1]
                    s[i + 1] = s[i]
                    s[i] = b

                } else if (i > 0) {
                    //swaps 0 with -1
                    var b = s[i - 1]
                    s[i - 1] = s[i]
                    s[i] = b
                }
            }
            j = s.join(' ')
        }
        return j
    },

    rank: function rank(run_get_set_reset_dice_diceToggle_checkDice, msg, resetID, setNum) {
        //load importand vars
        var cmd = run_get_set_reset_dice_diceToggle_checkDice
        var eJF = new require('edit-json-file')
        var jfile = eJF('ranks.json')

        //create some shortcuts
        var data = {}
        data.progress = jfile.get(`${msg.guild.id}.${msg.author.id}.prog`)
        function lvl(prog) {
            var lvl = Math.floor(Math.log10(prog))
            if (!lvl || lvl == -Infinity || lvl == Infinity) { lvl = 0 }
            return lvl
        }
        data.lvl = lvl(data.progress)
        data.lastMsg = jfile.get(`${msg.guild.id}.${msg.author.id}.lastMsg`)

        var diceActive = jfile.get(`${msg.guild.id}.dice`)
        function setProg(set) { jfile.set(`${msg.guild.id}.${msg.author.id}.prog`, set) }
        function setLastMsg(set) { jfile.set(`${msg.guild.id}.${msg.author.id}.lastMsg`, set) }

        if (!data.progress) {
            //create profile if there is none
            setProg(0)
            jfile.save()
        }

        if (cmd == 'diceToggle') {
            //ripped from randspeak - test for existence
            if (jfile.get(`${msg.guild.id}.dice`)) {
                //exists, set to not exist
                jfile.set(`${msg.guild.id}.dice`, undefined)
                jfile.save()
                //return situation
                return 'OFF'
            } else {
                //doesn't exist, set to exist
                jfile.set(`${msg.guild.id}.dice`, true)
                jfile.save()
                //return situation
                return 'ON'
            }
        }

        if (cmd == 'run') {
            //tracking & adding
            var msgArr = msg.content.split(/ +/g);
            if (msgArr.length < 2) { return }

            //handle last message
            var checkLast = false
            if (data.lastMsg) { checkLast = true }
            setLastMsg(msg.content)
            jfile.save()

            if (!checkLast) {
                msg.channel.fetchMessages({ limit: 4 }).then(pastMsgs => {
                    //filter to only author
                    var fil = pastMsgs.filter(lsMsg => lsMsg.author.id == msg.author.id)
                    //get name & grab correct
                    var fils = fil.keyArray()
                    var prevMsg = fil.get(fils[1])
                    if (!prevMsg) { prevMsg = {}; prevMsg.content = ' ' } //fallback w/ code reuse

                    //semi-simple filter
                    if (prevMsg.content == msg.content) { return }

                    //advanced filter
                    var lastMsgArr = prevMsg.content.split(/ +/g);
                    var c = 0;
                    for (i = 0; i < msgArr.length; i++) {
                        if (msgArr[i] == lastMsgArr[i]) {
                            c += 1
                        }
                    }
                    var threshold = Math.floor(msgArr.length * 0.85)
                    if (c >= threshold) { return }

                    //remove duplicates from https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array - I also added item.length
                    var cleanArr = msgArr.filter(function (item, pos) {
                        return msgArr.indexOf(item) == pos || item.length != 1;
                    })

                    //find ratio & multiply
                    var recieve = Math.round(cleanArr.length * (cleanArr.length / msgArr.length))
                    var setD = data.progress + recieve
                    if (!setD) { setD = 0 } //fallback

                    setProg(setD)
                    jfile.save()
                })
            } else {
                var prevMsg = {} //reuse code
                prevMsg.content = data.lastMsg //set prevMsg

                //semi-simple filter
                if (prevMsg.content == msg.content) { return }

                //advanced filter
                var lastMsgArr = prevMsg.content.split(/ +/g);
                var c = 0;
                for (i = 0; i < msgArr.length; i++) {
                    if (msgArr[i] == lastMsgArr[i]) {
                        c += 1
                    }
                }
                var threshold = Math.floor(msgArr.length * 0.85)
                if (c >= threshold) { return }


                //remove duplicates from https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array - I also added item.length
                var cleanArr = msgArr.filter(function (item, pos) {
                    return msgArr.indexOf(item) == pos || item.length != 1;
                })

                //find ratio & multiply
                var recieve = Math.round(cleanArr.length * (cleanArr.length / msgArr.length))
                var setD = data.progress + recieve
                if (!setD) { setD = 0 } //fallback

                setProg(setD)
                jfile.save()
            }
        } else if (cmd == 'get') {
            //returns current lvl & progress
            return [data.lvl, data.progress]

        } else if (cmd == 'set') {
            //sets level & progress
            var progress = setNum
            var lvl = lvl(progress)
            setProg(progress)
            jfile.save()
            return [lvl, progress]

        } else if (cmd == 'reset') {
            //resets specific user's rank
            jfile.set(`${msg.guild.id}.${resetID}.prog`, 0)
            jfile.save()

        } else if (cmd == 'dice' && diceActive) {
            //gives random lvl between 0 and 100, then sets the progress appropriately
            const lvl = Math.round(Math.random() * 100)
            var progress = Math.ceil(Math.pow(10, lvl)) + Math.ceil(Math.random() * 9)
            setProg(progress)
            jfile.save()
            return [lvl, progress]

        } else if (cmd == 'dice' && !diceActive) {
            return false
        } else if (cmd == 'checkDice') {
            if (jfile.get(`${msg.guild.id}.dice`)) {
                return "ON"
            } else {
                return "OFF"
            }
        }
    }
}