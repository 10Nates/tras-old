const Discord = require('discord.js');
const bot = new Discord.Client();
console.log('Discord.js loaded')
const cmd = require('./cmds');
const talk = require('./speechgen')
console.log('Custom files loaded')
const def = require('word-definition').getDef
const figlet = require('figlet')
const fs = require('fs')
console.log('Other scripts loaded')
const bigOof = 'oof oof oof     oof oof oof     oof oof oof\noof        oof     oof        oof     oof\noof        oof     oof        oof     oof oof oof\noof        oof     oof        oof     oof\noof oof oof     oof oof oof     oof'
const bigF = 'F F F F F F F\nF F \nF F F F F F F\nF F\nF F'

console.log('Starting bot...')
bot.on('ready', () => {
    console.log('Bot Started! ' + `Current time: ${Date().split(' ').slice(1, 5).join(' ')} ${Date().split(' ').slice(6, 7).join(' ')}`)
    console.log('--------------------')
    bot.user.setActivity('Bot.txt Soon Completed')
})

bot.on('message', (message) => {
    //Per-message setup
    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var prefix;
    //Allocate prefix (guild or DM prefix) and run server-based commands
    if (message.guild) {
        'use strict';
        prefix = cmd.getPrefix(message.guild.id)

        //server-based commands
        var servCmds = cmd.servCmds('array', message.guild.id)
        for (i = 0; i < servCmds.length; i++) {
            if (command == `${prefix}${servCmds[i][0]}`) {
                message.channel.send(servCmds[i][1])
                cmd.logmsg(servCmds[i][1], message, bot)
            }
        }
    } else {
        'use strict';
        prefix = cmd.getPrefix(message.author.id)

        //server-based commands
        var servCmds = cmd.servCmds('array', message.author.id)
        for (i = 0; i < servCmds.length; i++) {
            if (command == `${prefix}${servCmds[i][0]}`) {
                message.channel.send(servCmds[i][1])
                cmd.logmsg(servCmds[i][1], message, bot)
            }
        }
    }

    //Run listener function
    cmd.listener('run', message, bot)

    //Manual takeover of bot
    cmd.runHive(message, bot)

    //All commands
    if (command == `${prefix}oof`) {
        message.channel.send(bigOof)
        cmd.logmsg(bigOof, message, bot)
        return
    }

    if (command == `${prefix}f`) {
        message.channel.send(bigF)
        cmd.logmsg(bigF, message, bot)
        return
    }

    if (command == `${prefix}help`) {
        //respond in activated channel
        message.channel.send("I slid a command list into your DMs.")
        //embed of commands
        const embed = new Discord.RichEmbed()
            .setColor(0x0096ff)
            .setAuthor('Commands List', bot.user.avatarURL)
            .setDescription('*Using prefix of server this message was activated from*')
            .addField(`**------------------------**\n_ _\n${prefix}help`, `Summons this help list`)
            .addField(`_ _\n${prefix}emojify`, `Turn all characters into emojis\n*Format: ${prefix}emojify [message]*`)
            .addField(`_ _\n${prefix}ebojify`, `Turn certain characters into 🅱️\n*Format: ${prefix}ebojify [message]*`)
            .addField(`_ _\n${prefix}oof`, `Mega OOF`)
            .addField(`_ _\n${prefix}f`, `Mega F`)
            .addField(`_ _\n${prefix}overcomp`, `Replaces all words with synonyms of the word.\n*Format: ${prefix}overcomp [message]*`)
            .addField(`_ _\n${prefix}wordinfo`, `Get the definition or Part-of-Speech of a word.\n*Format: ${prefix}wordinfo [def|pos] [word]*`)
            .addField(`_ _\n${prefix}asciiart`, `Generate ascii art. Over 15 characters responds with a file.\n*Format: ${prefix}asciiart [message|{Font:[Font (use "_" as space)]}|{getFonts}] [message]*`)
            .addField(`_ _\n${prefix}cmds`, `View and manage custom server commands, managing requires "Manage Messages" perms.\n*Format: ${prefix}cmds [manage|view] [set|delete] [activator] [reply (multiword)]*`)
            .addField(`_ _\n${prefix}prefix`, `Get prefix for any server or set the current server's prefix, setting prefix requires "Manage Messages" perms.\n*Format: ${prefix}prefix [get|set] [server ID|new prefix]*`)
            .addField(`_ _\n${prefix}speak`, `Generate a sentence, repeat messages, toggle and get status of random generated messages, toggling requires "Manage Messages" perms. Random messages off by default.\n*Format: ${prefix}speak [generate|repeat|toggleRandSpeak|randSpeakStatus] [channel ID or channel tag] [message]*`)
            .addField(`_ _\n${prefix}combos`, `Sends file with all possible combinations of the units you have selected and given.\n*Format: ${prefix}combos [words|characters] [items]*`)
            .addField(`_ _\n${prefix}listen`, `Relays text channels into your DMs. Only allows listening to channels everyone can see. Servers are able to individually opt out. Opted in by default.\n*Format: ${prefix}listen [channel ID or channel tag|stop|list|opt] [channel ID or channel tag|set|check] [serverID|in or out]*`)
            .addField(`_ _\nMention me`, `I respond "What's 🅱️oppin'"`)
            .addField(`_ _\nMention me with message "PREFIX"`, `I respond with the server's prefix and the help command.`)
            .addField(`_ _\nGenerated messages`, `Fully generated messages *(not an AI so they're terrible and don't make sense)* that can be toggled to randomly say them in response to other messages. Random messages will not reply to commands.`)
        //send
        message.author.send(embed);
        cmd.logmsg("I slid a command list into your DMs.", message, bot);
        //prevent running unneeded code
        return
    }

    if (command == `${prefix}emojify`) {
        //remove activator
        msg0 = message.content.toLowerCase().replace(`${prefix}emojify `, '');
        //convert
        msg = cmd.emojiconvert(msg0);
        //send
        message.channel.send(msg);
        cmd.logmsg(msg, message, bot);
        //prevent running unneeded code
        return
    }

    if (command == `${prefix}ebojify`) {
        //remove prefix and prepare statement
        msgpre = message.content.toLowerCase().replace(`${prefix}ebojify `, '').replace(/no/g, "yesn't").replace(/yes/g, "non't");
        //replace with 🅱 
        msg = msgpre.replace(/b/g, '🅱️').replace(/p/g, '🅱️').replace(/g/g, '🅱️').replace(/c/g, '🅱️').replace(/d/g, '🅱️');
        //send
        message.channel.send(msg);
        cmd.logmsg(msg, message, bot);
        //prevent running unneeded code
        return
    }

    if (command == `${prefix}overcomp`) {
        //replace with synonyms
        msg = cmd.synonymify(args);
        //send
        message.channel.send(msg);
        cmd.logmsg(msg, message, bot);
        //prevent unneeded code
        return
    }

    if (command == `${prefix}wordinfo`) {
        //prepare
        var lowArgs = args.join(' ').toLowerCase().split(' ')
        //select command
        if (lowArgs[0] == 'def' && args[1]) {
            //grab info
            def(args[1], "en", null, function (Info) {
                //check if valid
                if (Info.definition) {
                    //send
                    message.channel.send(Info.definition)
                    cmd.logmsg(Info.definition, message, bot)
                } else {
                    //fallback
                    message.channel.send('Please use an actual English word.')
                    cmd.logmsg('Please use an actual English word.', message, bot)
                }
            })
        } else if (lowArgs[0] == 'pos' && args[1]) {
            //grab info
            def(args[1], "en", null, function (Info) {
                //check if valid
                if (Info.category) {
                    //send
                    message.channel.send(Info.category)
                    cmd.logmsg(Info.category, message, bot)
                } else {
                    //fallback
                    message.channel.send('Please use an actual English word.')
                    cmd.logmsg('Please use an actual English word.', message, bot)
                }
            })
        } else {
            //fallback
            message.channel.send(`Please use format: ${prefix}wordInfo [def|pos] [word]`)
            cmd.logmsg(`Please use format: ${prefix}wordInfo [def|pos] [word]`, message, bot)
        }
        //prevent unneeded code
        return
    }

    if (command == `${prefix}cmds`) {
        //select command manage
        if (args[0] == 'manage') {
            //test for guild
            if (message.guild) {
                //in server
                //select sub-command & check for perms
                if (args[1] == 'set' && args[2] && args[3] && message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')) {
                    //set or change command
                    cmd.servCmds('set', message.guild.id, args[2].toLowerCase(), args.slice(3, args.length).join(' '))
                    message.channel.send(`Set Command "${args[2].toLowerCase()}".`)
                } else if (args[1] == 'delete' && args[2] && message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')) {
                    //delete command & choose response
                    if (cmd.servCmds('set', message.guild.id, args[2].toLowerCase())) {
                        //command there, deleted
                        msg = `Removed Command "${args[2].toLowerCase()}".`
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                    } else {
                        //command already not there
                        msg = `Command "${args[2].toLowerCase()}" doesn't exist!`
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                    }
                } else {
                    //fallback
                    var msg = `You either don't have permission or did not format the command correctly. The correct format is: \n${prefix}cmds [manage|view] [set|delete] [activator] [reply (multiword)]`
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                }
            } else {
                //in DM
                //select sub-command
                if (args[1] == 'set' && args[2] && args[3]) {
                    //set or change command
                    cmd.servCmds('set', message.author.id, args[2].toLowerCase(), args.slice(3, args.length).join(' '))
                    message.channel.send(`Set Command "${args[2].toLowerCase()}".`)
                } else if (args[1] == 'delete' && args[2]) {
                    //delete command & choose response
                    if (cmd.servCmds('set', message.author.id, args[2].toLowerCase())) {
                        //command there, deleted
                        msg = `Removed Command "${args[2].toLowerCase()}".`
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                    } else {
                        //command already not there
                        msg = `Command "${args[2].toLowerCase()}" doesn't exist!`
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                    }
                } else {
                    //fallback
                    var msg = `You did not format the command correctly. The correct format is: \n${prefix}cmds [manage|view] [set|delete] [activator] [reply (multiword)]`
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                }
            }
            //select command view
        } else if (args[0] == 'view') {
            //test for guild
            if (message.guild) {
                //in server
                var msg = null
                //list serv commands
                if (cmd.servCmds('list', message.guild.id)) {
                    var msg = cmd.servCmds('list', message.guild.id)
                } else {
                    var msg = 'No custom commands on this server.'
                }
                //send
                message.channel.send(msg)
                cmd.logmsg(msg, message, bot)
            } else {
                //in DM
                var msg = null
                //list serv commands
                if (cmd.servCmds('list', message.author.id)) {
                    var msg = cmd.servCmds('list', message.author.id)
                } else {
                    var msg = 'No custom commands on this DM.'
                }
                //send
                message.channel.send(msg)
                cmd.logmsg(msg, message, bot)
            }
        } else {
            //select command fallback
            var msg = `The correct format is: \n${prefix}cmds [manage|view] [set|delete] [activator] [reply (multiword)]`
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
        }
        //prevent unneeded code
        return
    }

    if (command == `${prefix}prefix`) {
        //select command
        if (args[0] == 'get' && args[1]) {
            //grab stored prefix and send
            message.channel.send(`The prefix for the server with ID "${args[1]}" is "${cmd.getPrefix(args[1])}"`)
            cmd.logmsg(`The prefix for the server with ID "${args[1]}" is "${cmd.getPrefix(args[1])}"`, message, bot)
        } else if (args[0] == 'set' && args[1]) {
            //test for guild
            if (message.guild) {
                //in server
                //test for perms
                if (message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')) {
                    //set server prefix
                    cmd.setPrefix(message.guild.id, args[1])
                    message.channel.send(`Prefix set to: "${args[1]}"`)
                    cmd.logmsg(`Prefix set to: "${args[1]}"`, message, bot)
                } else {
                    //fallback
                    message.channel.send(`You don't have the permission: "Manage Messages"`)
                    cmd.logmsg(`You don't have the permission: "Manage Messages"`, message, bot)
                }
            } else {
                //in DM
                //set DM prefix
                cmd.setPrefix(message.author.id, args[1])
                message.channel.send(`Prefix set to: "${args[1]}"`)
                cmd.logmsg(`Prefix set to: "${args[1]}"`, message, bot)
            }
        } else {
            //fallback
            message.channel.send(`Please use format: "${prefix}prefix [get|set] [server ID|new prefix]"`)
            cmd.logmsg(`Please use format: "${prefix}prefix [get|set] [server ID|new prefix]"`, message, bot)
        }
        //prevent unneeded code
        return
    }

    if (command == `${prefix}asciiart`) {
        if (!args[0]) {
            //grab format
            msg = `Format: ${prefix}asciiart [message|{Font:[Font (use "_" as space)]}|{getFonts}] [message]`
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
            //select command
        } else if (args[0].toLowerCase().split(':')[0] == '{font') {
            if (figlet.fontsSync().indexOf(args[0].split(':')[1].replace('}', '').replace('_', ' ')) > -1) {
                var msg = cmd.asciiMake(args.join(' ').replace(args[0], ''), args[0].split(':')[1].replace('}', '').replace('_', ' '))
                console.log(args[0], ''), args[0].split(':')[1].replace('}', '').replace('_', ' ')
                message.channel.send(msg)
                cmd.logmsg(msg, message, bot)
            } else {
                //fallback
                message.channel.send(`Nonexistent Font. Make sure you replaced spaces with "_". To get DM'd the list of fonts, type "${prefix}asciiart {getFonts}"`)
            }
        } else if (args[0].toLowerCase() == '{getfonts}') {
            //sends giant list of fonts through multiple messages due to 2,000 letter cap.
            message.channel.send("I slid a list into your DMs.")
            message.author.send('**Here is a list of all the fonts:** \n1Row, 3-D, 3D Diagonal, 3D-ASCII, 3x5, 4Max, 5 Line Oblique, AMC 3 Line, AMC 3 Liv1, AMC AAA01, AMC Neko, AMC Razor, AMC Razor2, AMC Slash, AMC Slider, AMC Thin, AMC Tubes, AMC Untitled, ANSI Shadow, ASCII New Roman, Acrobatic, Alligator, Alligator2, Alpha, Alphabet, Arrows, Avatar, B1FF, Banner, Banner3-D, Banner3, Banner4, Barbwire, Basic, Bear, Bell, Benjamin, Big Chief, Big Money-ne, Big Money-nw, Big Money-se, Big Money-sw, Big, Bigfig, Binary, Block, Blocks, Bloody, Bolger, Braced, Bright, Broadway KB, Broadway, Bubble, Bulbhead, Caligraphy, Caligraphy2, Calvin S, Cards, Catwalk, Chiseled, Chunky, Coinstak, Cola, Colossal, Computer, Contessa, Contrast, Cosmike, Crawford, Crawford2, Crazy, Cricket, Cursive, Cyberlarge, Cybermedium, Cybersmall, Cygnet, DANC4, DOS Rebel, DWhistled, Dancing Font, Decimal, Def Leppard, Delta Corps Priest 1, Diamond, Diet Cola, Digital, Doh, Doom, Dot Matrix, Double Shorts, Double, Dr Pepper, Efti Chess, Efti Font, Efti Italic, Efti Piti, Efti Robot, Efti Wall, Efti Water, Electronic, Elite, Epic, Fender, Filter, Fire Font-k, Fire Font-s, Flipped, Flower Power, Four Tops, Fraktur, Fun Face, Fun Faces, Fuzzy, Georgi16, Georgia11, Ghost, Ghoulish, Glenyn, Goofy, Gothic, Graceful, Gradient, Graffiti, Greek, Heart Left, Heart Right, Henry 3D, Hex, Hieroglyphs, Hollywood, Horizontal Left, Horizontal Right, ICL-1900, Impossible, Invita, Isometric1, Isometric2, Isometric3, Isometric4, Italic, Ivrit, JS Block Letters, JS Bracket Letters, JS Capital Curves, JS Cursive, JS Stick Letters, Jacky, Jazmine, Jerusalem, Katakana, Kban, Keyboard, Knob, Konto Slant, Konto, LCD, Larry 3D2, Larry 3D, Lean, Letters, Lil Devil, Line Blocks, Linux, Lockergnome, Madrid, Marquee, Maxfour, Merlin1, Merlin2, Mike, Mini, Mirror, Mnemonic, Modular, Morse, Morse2, Moscow, Mshebrew210, Muzzle, NScript, NT Greek, NV Script, Nancyj-Fancy, `(1/2)`')
            message.author.send("Nancyj-Improved, Nancyj-Underlined, Nancyj, Nipples, O8, OS2, Octal, Ogre, Old Banner, Patorjk's Cheese, Patorjk-HeX, Pawp, Peaks Slant, Peaks, Pebbles, Pepper, Poison, Puffy, Puzzle, Pyramid, Rammstein, Rectangles, Red Phoenix, Relief, Relief2,Reverse, Roman, Rot13, Rotated, Rounded, Rowan Cap, Rozzo, Runic, Runyc, S Blood, SL Script, Santa Clara, Script, Serifcap, Shadow, Shimrod, Short, Slant Relief, Slant, Slide, Small Caps, Small Isometric1, Small Keyboard, Small Poison, Small Script, Small Shadow, Small Slant, Small Tengwar, Small, Soft, Speed, Spliff, Stacey, Stampate, Stampatello, Standard, Star Strips, Star Wars, Stellar, Stforek, Stick Letters, Stop, Straight, Stronger Than All, Sub-Zero, Swamp Land, Swan, Sweet, THIS, Tanja, Tengwar, Term, Test1, The Edge, Thick, Thin, Thorned, Three Point, Ticks Slant, Ticks, Tiles, Tinker-Toy, Tombstone, Train, Trek, Tsalagi, Tubular, Twisted, Two Point, USA Flag, Univers, Varsity, Wavy, Weird, Wet Letter, Whimsy, Wow `(2/2)`")
            message.author.send('**Here is a list of my personal favorites:** \nANSI, Shadow, Big (default), Block, Binary, Calvin S, DOS Rebel, Doom, JS Stick Letters')
        } else {
            //no command -> default
            var msg = cmd.asciiMake(args.join(' '), 'Big')
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
        }
        //prevent unneeded code
        return
    }

    if (command == `${prefix}speak`) {
        //lowercase
        var la = args.join(' ').toLocaleLowerCase().split(' ')
        //select command
        if (la[0] == 'generate') {
            var msg = talk.speak()
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
        } else if (la[0] == 'repeat' && la[1]) {
            //remove tag formatting
            var chanID = la[1].replace(/<#|>/g, '')
            //test if valid
            if (bot.channels.get(chanID)) {
                //send message
                msg = args.slice(2, args.length).join(' ')
                bot.channels.get(chanID).send(msg)
                cmd.logmsg(msg, message, bot)
            } else {
                //fallback
                msg = `I either don't have access to that channel or you incorrectly formatted the command. \nFormat: ${prefix}speak [generate|repeat|togglerandspeak|randspeakstatus] [channel ID or channel tag] [message]`
                message.channel.send(msg)
                cmd.logmsg(msg, message, bot)
            }
        } else if (la[0] == 'togglerandspeak') {
            //test for guild
            if (message.guild) {
                //in server
                //test for perms
                if (message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')) {
                    //select outcome and toggle (simultaneous)
                    if (cmd.RandSpk('toggle', message.guild.id) == 'on') {
                        //turned messages on
                        msg = 'Random generated messages turned to ON!'
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                    } else {
                        //turned messages off
                        msg = 'Random generated messages turned to OFF!'
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                    }
                } else {
                    //fallback
                    msg = `You don't have the "Manage Messages" perm.`
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                }
            } else {
                //in DM
                //select outcome and toggle (simultaneous)
                if (cmd.RandSpk('toggle', message.author.id) == 'on') {
                    //turned messages on
                    msg = 'Random generated messages turned to ON!'
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                } else {
                    //turned messages off
                    msg = 'Random generated messages turned to OFF!'
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                }
            }
        } else if (la[0] == 'randspeakstatus') {
            //test for guild
            if (message.guild) {
                //in server
                if (cmd.RandSpk('view', message.guild.id)) {
                    //respond
                    msg = 'Random generated messages currently ON!'
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                } else {
                    //respond
                    msg = 'Random generated messages currently OFF!'
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                }
            } else {
                //in DM
                //test if enabled
                if (cmd.RandSpk('view', message.author.id)) {
                    //respond
                    msg = 'Random generated messages currently ON!'
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                } else {
                    //respond
                    msg = 'Random generated messages currently OFF!'
                    message.channel.send(msg)
                    cmd.logmsg(msg, message, bot)
                }
            }
        } else {
            //fallback
            msg = `Command Format: ${prefix}speak [generate|repeat|togglerandspeak|randspeakstatus] [channel ID or channel tag] [message]`
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
        }
        //prevent unneeded code
        return
    }

    if (command == `${prefix}combos`) {
        //lowercase
        var la = args.join(' ').toLowerCase().split(' ')
        //create higher variable for responses
        var word_chars;
        if (la[0] == 'words') {
            //identify
            word_chars = 'words'
            //create sliced array
            var wrdArray = args.slice(1, args.length)
            //test length
            if (wrdArray.length > 18) {
                //respond
                var msg = `Sorry, this command only works with under 19 ${word_chars} due to processing time and Discord's file limit. \n \n*Please note that it may the limit of words varies due to different word lengths. The number chosen is the absolute maximum.*`
                message.channel.send(msg)
                cmd.logmsg(msg, message, bot)
                //end before completion
                return
            }
            //clean
            for (i = 0; i < wrdArray.length; i++) {
                wrdArray[i] = wrdArray[i] + ' '
            }
            //create combos
            var result = cmd.combos(wrdArray)
            //write file
            fs.writeFileSync('./combos.txt', result.join('\n'))
        } else if (la[0] == 'characters') {
            //identify
            word_chars = 'characters'
            //create sliced array
            var charArray = args.slice(1, args.length).join(' ').split('')
            //test length (supposed to be longer limit than words)
            if (charArray.length > 19) {
                //respond
                var msg = `Sorry, this command only works with under 20 ${word_chars} due to processing time and Discord's file limit.`
                message.channel.send(msg)
                cmd.logmsg(msg, message, bot)
                //end before completion
                return
            }
            //create combos
            var result = cmd.combos(charArray)
            //write file
            fs.writeFileSync('./combos.txt', result.join('\n'))
        } else if (!args[0] || [1]) {
            //fallback
            msg = `Command Format: ${prefix}combos [words|characters] [items]`
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
            //end before completion
            return
        }
        //create response and file embed
        var msg = new Discord.RichEmbed()
            .setColor(0x0096ff)
            .setTitle(`Here's a list of all combinations of the ${word_chars} you have given me.`)
            .attachFile('./combos.txt')
        var if_err;
        //send message
        message.channel.send(msg).catch(err => {
            //respond if filesize too big
            message.channel.send(`Sorry, the ${word_chars} combinations cannot be sent due to Discord's file size limit.`)
            cmd.logmsg(`Sorry, the ${word_chars} combinations cannot be sent due to Discord's file size limit.`, message, bot)
            //disable inaccurate logmsg (needed even with return)
            if_err = true
            //end before completion
            return
        })
        //prevent innaccurate logmsg
        if (!if_err) {
            cmd.logmsg(`File containing all combinations of the ${word_chars}`, message, bot)
        }
        //prevent unneeded code
        return
    }

    if (command == `${prefix}listen`) {
        //create higher variable
        var msg;
        //lowercase
        var la = args.join(' ').toLowerCase().split(' ')
        //test for args
        if (args[0]) {
            //test for sub-commands
            if (la[0] == `stop`) {
                var channelID
                //safely extract channel ID
                if (args[1]) {
                    channelID = args[1].replace(/<#|>/g, '')
                } else { msg2 = msg3 } //fallback
                //set variables
                var getChan = bot.channels.get(channelID)
                var msg2
                var msg3 = `You incorrectly formatted the stop command.\n*Format: ${prefix}listen stop [channel ID or channel tag]*`
                if (!la[1]) { msg2 = msg3 /*fallback*/ } else {
                    //test for valid ChanID
                    if (getChan) {
                        //remove and test outcome
                        if (cmd.listener('remove', message, bot, args)) {
                            //Removed correctly
                            msg2 = `Success! No longer relaying messages from channel <#${channelID}> to your DMs.`
                        } else {
                            //Already nonexistent
                            msg2 = `You are not being relayed channel <#${channelID}>.`
                        }
                    } else { msg2 = msg3 } //fallback
                }
                //send
                message.channel.send(msg2)
                cmd.logmsg(msg2, message, bot)
                //end code
                return
            } else if (la[0] == `list`) {
                //grab Embed for list of relayed channels
                var listEmbed = cmd.listener('list', message, bot, null, prefix)
                //set message
                var msg2 = `I sent a list into your DMs.`
                //send to Embed author
                message.author.send(listEmbed)
                //send other message
                message.channel.send(msg2)
                cmd.logmsg(msg2, message, bot)
                //end code
                return
            } else if (la[0] == `opt`) {
                //set variables and responses
                var serverID
                //safely set server ID
                if (args[2]) {
                    serverID = args[2].replace(/<#|>/g, '')
                }
                var getServ = bot.guilds.get(serverID)
                var msg2 = `You incorrectly formatted the opt command.\n*Format: ${prefix}listen opt [check|set] [in|out|server ID]*`
                var msg3 = `You don't have the permissions to do this command. \n \n*"Manage Messages" is required for opting out, but "Administrator" is required for opting in.*`
                var msg4 = `This server is already opted IN!`
                var msg5 = `This server is already opted OUT!`
                var msg6 = `Server opted OUT!`
                //select sub-sub-command
                if (la[1] == 'check') {
                    //test for server ID
                    if (la[2]) {
                        //test for validity
                        if (getServ) {
                            //check and set response
                            if (cmd.listenerOpt('check', serverID)) {
                                msg2 = `Server "${getServ.name}" is opted IN`
                            } else {
                                msg2 = `Server "${getServ.name}" is opted OUT`
                            }

                        }
                    } else {
                        //check for guild 
                        if (message.guild) {
                            //check current server and set response
                            if (cmd.listenerOpt('check', message.guild.id)) {
                                msg2 = `Current server is opted IN`
                            } else {
                                msg2 = `Current server is opted OUT`
                            }
                        } else {
                            //in DMs
                            msg2 = `Channel ID must be specified in DMs.`
                        }
                    }
                    //send
                    message.channel.send(msg2)
                    cmd.logmsg(msg2, message, bot)
                    //end code
                    return
                    //select sub-sub-command continued
                } else if (la[1] == 'set') {
                    //check if guild
                    if (message.guild) {
                        //check for Admin
                        if (message.guild.member(message.author.id).hasPermission('ADMINISTRATOR')) {
                            //select opting status
                            if (la[2] == 'in') {
                                //set opting status
                                if (!cmd.listenerOpt('check', message.guild.id)) {
                                    cmd.listenerOpt('set', message.guild.id, 'in')
                                    msg2 = `Server opted IN!`
                                } else { msg2 = msg4 } //already set correctly
                            } else if (la[2] == 'out') {
                                //set opting status
                                if (cmd.listenerOpt('check', message.guild.id)) {
                                    cmd.listenerOpt('set', message.guild.id, 'out')
                                    msg2 = msg6
                                } else { msg2 = msg5 } //already set correctly
                            }
                            //send
                            message.channel.send(msg2)
                            cmd.logmsg(msg2, message, bot)
                            //end code
                            return
                            //check for Manage Messages
                        } else if (message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')) {
                            //select opting status
                            if (la[2] == 'out') {
                                //set opting status
                                if (cmd.listenerOpt('check', message.guild.id)) {
                                    cmd.listenerOpt('set', message.guild.id, 'out')
                                    msg2 = msg6
                                } else { msg2 = msg5 } //already set correctly
                            } else if (la[2] == 'in') {
                                //decline opting set
                                if (!cmd.listenerOpt('check', message.guild.id)) {
                                    msg2 = msg3
                                } else { msg2 = msg4 } //already set correctly
                            }
                            //send
                            message.channel.send(msg2)
                            cmd.logmsg(msg2, message, bot)
                            //end code
                            return
                        } else {
                            //send
                            message.channel.send(msg3)
                            cmd.logmsg(msg3, message, bot)
                            //end code
                            return
                        }
                    } else {
                        //in dms
                        msg = `Command only available in servers, as nobody can relay DMs.`
                        //send
                        message.channel.send(msg)
                        cmd.logmsg(msg, message, bot)
                        return
                    }
                }
            }
            //no sub-commands -> default (relay setup)
            var channelID = args[0].replace(/<#|>/g, '')
            var getChan = bot.channels.get(channelID)
            //test if valid channel
            if (getChan) {
                //setup variables
                var getGuildID = getChan.guild.id
                var fullPerm = getChan.guild.roles.get(getGuildID).hasPermission("READ_MESSAGES")
                var chanPerm = getChan.permissionOverwrites.get(getGuildID)
                function succesConfigure() {
                    //executes if permissions are correct
                    //test if server disabled relays 
                    if (cmd.listenerOpt('check', getGuildID)) {
                    //add listener and test for duplicate
                    if (cmd.listener('add', message, bot, args)) {
                        //not duplicate
                        msg = `Success! All messages in <#${channelID}> now get relayed into your DMs.\n \n*To stop relaying messages, use: ${prefix}listen stop [channel ID or tag]*`
                    } else {
                        //duplicate
                        msg = `You're already being relayed <#${channelID}>!\n \n*To stop relaying messages, use: ${prefix}listen stop [channel ID or tag]*`
                    }
                } else {
                    //server disabled
                    msg = `Sorry, the server hosting <#${channelID}> disabled listening.`
                    //remove listener if one already exists
                    cmd.listener('remove', message, bot, ['', channelID])
                }
                }
                //tests perms
                if (chanPerm && fullPerm) {
                    if (chanPerm.deny != 0) {
                        //perms incorrect
                        msg = `Not everyone can read messages for <#${channelID}>, and I won't break any boundaries. Sorry!\n \n*The server the channel given is in allows everyone to see messages, but removes some perms for the channel. There is no way to know what perms it removes.*`
                    } else {
                        //perms correct
                        succesConfigure()
                    }
                }
                if (!fullPerm) {
                    //perms incorrect
                    msg = `The server does not allow everyone on the server to see messages. \n \n*This bot plays it safe, but there's a possibility the server individually enabled reading messages.*`
                } else if (fullPerm && !chanPerm) {
                    //perms correct
                    succesConfigure()
                }
            } else {
                //fallback
                msg = `I either do not have access to the channel you have provided or you did not correctly follow the format.\n*Format: ${prefix}listen [channel ID or channel tag|stop|list|opt] [channel ID or channel tag|set|check] [serverID|in or out]*`
            }
        } else {
            //grab format
            msg = `Format: ${prefix}listen [channel ID or channel tag|stop|list|opt] [channel ID or channel tag|set|check] [serverID|in or out]`
        }
        //respond
        message.channel.send(msg)
        cmd.logmsg(msg, message, bot)
        //prevent unneeded code
        return
    }

    //In development
    if (command == `${prefix}speakalpha`) {
        var msg = talk.speakV2()
        message.channel.send(msg)
        cmd.logmsg(msg, message, bot)
        return
    }

    //Non-triggered and alternatively triggered commands
    if (message.isMemberMentioned(bot.users.get('462051981863682048')) && message.channel.id != '449759068941189151') { //change if changing bot login
        //remove tag and spaces & check if prefix is called
        if (message.content.replace(/<@462051981863682048>| /g, '').toLowerCase() == 'prefix') { //change if changing bot login
            //create higher variable
            var premsg
            //set message with custom response
            if (message.guild) { premsg = `This server's prefix: "${prefix}"` } else { premsg = `This DM's prefix: ${prefix}` }
            //send message
            msg = `${premsg} \nTo get commands, type: ${prefix}help`
            message.channel.send(msg)
            cmd.logmsg(msg, message, bot)
        } else {
            //respond to any mention aside from "prefix"
            message.channel.send("What's 🅱️oppin'")
            cmd.logmsg("What's 🅱️oppin'", message, bot)
        }
        //prevent unneeded code
        return
    }

    //random message responses
    if (message.author.id != '462051981863682048' && message.channel.id != '449759068941189151') { //change if changing bot login
        //randomize
        var r = Math.random() * 100
        if (r < 12) {
            //is responding
            //check for guild
            if (message.guild) {
                //in server
                //check if enabled
                if (cmd.RandSpk('view', message.guild.id)) {
                    console.log('Gen-responding to message...')

                    //start typing
                    message.channel.startTyping(1)
                    //generate
                    msg = talk.speak()
                    //send
                    message.channel.send(msg)
                    //end typing
                    message.channel.stopTyping(true)
                    cmd.logmsg(msg, message, bot)
                }
            } else {
                //in DM
                if (cmd.RandSpk('view', message.author.id)) {
                    console.log('Gen-responding to message...')

                    //start typing
                    message.channel.startTyping(3)
                    //generate
                    msg = talk.speak()
                    //send
                    message.channel.send(msg)
                    //end typing
                    message.channel.stopTyping(true)
                    cmd.logmsg(msg, message, bot)
                }
            }
        }
    }

    //Delete unneeded data
    if (fs.existsSync('./combos.txt')) {
        fs.unlinkSync('./combos.txt')
    }
    if (fs.existsSync('./asciiart.txt')) {
        fs.unlinkSync('./asciiart.txt')
    }

});

bot.login(process.env.Token);