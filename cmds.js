const moby = require('moby');
const rempunc = require('remove-punctuation')
const figlet = require('figlet')
const Discord = require('discord.js');
const fs = require('fs')

ChanID = '458821920138330115'; //by default goes to a #null-channel

//Normal functions
function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
function getlength(number) {
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
        bot.channels.get('449759068941189151').send(`recieved: ${message.author.username} - ${message.content}`);
        bot.channels.get('449759068941189151').send(`Sent: ${msg}`);
        console.log(message.author.username + ' - ' + message.content);
        console.log(`sent @ ${Date().split(' ').slice(1, 5).join(' ')} ${Date().split(' ').slice(6, 7).join(' ')}: ${msg}`);
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

    emojiconvert: function emojiconvert(msgstart) {
        //replaces all letters with emojis. Really terribly compacted due to age.
        msg1 = msgstart.replace(/a/g, '🅰');
        msg2 = msg1.replace(/b/g, '🅱️');
        msg3 = msg2.replace(/c/g, '©️');
        msg4 = msg3.replace(/d/g, '🇩');
        msg5 = msg4.replace(/e/g, '🇪');
        msg6 = msg5.replace(/f/g, '🇫');
        msg7 = msg6.replace(/g/g, '🇬');
        msg8 = msg7.replace(/h/g, '♓');
        msg9 = msg8.replace(/i/g, 'ℹ️');
        msg10 = msg9.replace(/j/g, '🇯');
        msg11 = msg10.replace(/k/g, '🇰');
        msg12 = msg11.replace(/l/g, '🇱');
        msg13 = msg12.replace(/m/g, '♏️');
        msg14 = msg13.replace(/n/g, '🇳');
        msg15 = msg14.replace(/o/g, '🅾️');
        msg16 = msg15.replace(/p/g, '🅿️');
        msg17 = msg16.replace(/q/g, '🇶');
        msg18 = msg17.replace(/r/g, '®️');
        msg19 = msg18.replace(/s/g, '💲');
        msg20 = msg19.replace(/t/g, '✝️');
        msg21 = msg20.replace(/u/g, '🇺');
        msg22 = msg21.replace(/v/g, '🇻');
        msg23 = msg22.replace(/w/g, '🇼');
        msg24 = msg23.replace(/x/g, '❌');
        msg25 = msg24.replace(/y/g, '🇾');
        msg26 = msg25.replace(/z/g, '🇿');
        msg27 = msg26.replace(/ /g, ' ⬜ ');
        msg28 = msg27.replace(/!/g, '❗️');
        msg29 = msg28.replace('?', '❓');
        msg30 = msg29.replace(/©️🇱/g, '🆑');
        msg31 = msg30.replace(/🅰🅱️/g, '🆎');
        msg32 = msg31.replace(/🅾️🇰/g, '🆗');
        msg33 = msg32.replace(/✝️♏️/g, '™️');
        msg34 = msg33.replace('+', '➕');
        msg35 = msg34.replace(/-/g, '➖');
        msg36 = msg35.replace(/10/g, '🔟');
        msg37 = msg36.replace(/0/g, '0️⃣');
        msg38 = msg37.replace(/1/g, '1️⃣');
        msg39 = msg38.replace(/2/g, '2️⃣');
        msg40 = msg39.replace(/3/g, '3️⃣');
        msg41 = msg40.replace(/4/g, '4️⃣');
        msg42 = msg41.replace(/5/g, '5️⃣');
        msg43 = msg42.replace(/6/g, '6️⃣');
        msg44 = msg43.replace(/7/g, '7️⃣');
        msg45 = msg44.replace(/8/g, '8️⃣');
        msg = msg45.replace(/9/g, '9️⃣');
        return msg
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
            return '```asciidoc\n' + (figlet.textSync(text, {
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
        } else if (Opt == 'run') {
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
        return lOpt(set_check, serverID, in_out)
    }

}