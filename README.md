# WARNING: PROJECT DEFUNCT. THIS IS SUPERCEDED BY TRAS 3 WRITTEN IN GO.
*Note: This repo is called tras-old from the getgo because this 
was a private repo up until work had already started on new tras.*

-----

# TRAS
# Text-Based Response Automation System
# Version 2.72
__Made by Nathan B @ https://nate.iunctiozero.com__
----------------------------------

A Discord bot for text-based commands and responses.

This may sound like any other bot at first, but this is **much** more than basic text.

![](https://tras.iunctiozero.com/img/traslogo.png)

----------------------------------
__LIST OF COMMANDS__
*Using default server prefix*
---
>__txt.help__
Summons a help list.
 
>__txt.about__
Gives information about the bot.
 
>__txt.oof__
Mega OOF
 
>__txt.f__
Mega F
 
>__txt.pi__
First 1 million digits of Pi

>__txt.big__
Make a larger verison of word/text made of the word. Starts getting wonky with emojis. Becomes file over 520 characters. You can enable thin letters with -t or --thin.
*Format: txt.big [-t|--thin (pushes other vars forward)] [word] [text (optional)]*
 
>__txt.jumble__
Jumbles the words in a sentence so it's confusing to read.
*Format: txt.jumble [text]*

>__txt.emojify__
Turn all characters into emojis.
*Format: txt.emojify [text]*
 
>__txt.ebojify__
Turn certain characters into 🅱️.
*Format: txt.ebojify [text]*
 
>__txt.flagify__
Turn all letters into regional indicators, creating flags.
*Format: txt.flagidy [text]*

>__txt.superscript__
Turn all numbers and letters plus a few math symbols into superscript. Some letters are always lowercase or replaced with something similar due to Unicode limitations.
*Format: txt.superscript [text]*
 
>__txt.unicodify__
Turn all numbers and letters into a non-Latin equivilant.
*Format: txt.unicodify [text]*
 
>__txt.bold__
Bolds all Latin letters and numbers using Unicode.
*Format: txt.bold [text]*
 
>__txt.replace__
Replaces every appearance of a set item with a set replacement.
*Format: txt.replace [item] [replacement] [text]*
 
>__txt.overcomp__
Replaces all words with synonyms of the word.
*Format: txt.overcomp [text]*
 
>__txt.wordinfo__
Get the definition or Part-of-Speech of a word.
*Format: txt.wordinfo [def|pos] [word]*
 
>__txt.asciiart__
Generate ascii art. Over 15 characters responds with a file.
*Format: txt.asciiart [text|{Font:[Font (use "_" as space)]}|{getFonts}] [text]*
 
>__txt.cmds__
View and manage custom server commands, managing requires "Manage Messages" perms.
*Format: txt.cmds [manage|view] [set|delete] [trigger] [reply]*

>__txt.rank__ 
Shows your rank, lets your reset your rank, and allows you to roll dice for a new rank if it's enabled. Admins get other commands as well. Dice rolling disabled by default.
*Format: txt.rank [info|checkDice|dice|set(admin)|reset(part admin)|diceToggle(admin)] [user(4resetORset,admin)|amount(4set,admin)|-real(4info)] [amount(4set,admin)]*
            
>__txt.prefix__
Get prefix for any server or set the current server's prefix, setting prefix requires "Manage Messages" perms.
*Format: txt.prefix [get|set] [server ID|new prefix]*
 
>__txt.setnick__
Set the bot's Nickname on the server. Reset with "{RESET}". Requires "Manage Messages" or "Change Nicknames".
*Format: txt.setnick [nickname|{RESET}]*
 
>__txt.speak__
Generate a sentence, repeat messages, toggle and get status of random generated messages, toggling requires "Manage Messages" perms. Random messages off by default.
*Format: txt.speak [generate|repeat|toggleRandSpeak|randSpeakStatus] [channel ID or channel tag] [message]*
 
>__txt.combos__
Sends file with all possible combinations of the units you have selected and given.
*Format: txt.combos [words|characters] [items]*
 
>__txt.listen__
Relays text channels into your DMs. Only allows listening to channels everyone can see. Servers are able to individually opt out. Opted in by default.
*Format: txt.listen [channel ID or channel tag|stop|list|opt] [channel ID or channel tag|set|check] [serverID|in or out]*
 
>__Mention bot__
It responds "What's 🅱️oppin'"
 
>__Mention bot with message "PREFIX"__
It responds with the server's prefix and the help command.
 
>__Generated messages__
Fully generated messages (not an AI so they're terrible and don't make sense) that can be toggled to randomly say them in response to other messages. Random messages will not reply to commands.

----------------------------------

GENERAL DETAILS
---
>All data is stored in JSON, despite what some have to say about it. 

>Large items are stored in files.

>Many fallbacks to help you format the command are in place.

>All in-any-way controversial features are toggleable.

>Custom commands are activated like normal commands. | *Ex: txt.[trigger] w/ default prefix*

>ALL commands (except for some modifiers) work with aNY CapItaLIzATIoN.

>All commands work in DMs. (There are some exeptions due to Discord's limits, or having no purpose)

>This bot has 8 different dependencies. (9 counting troubleshooting dependencies)

>Ranking levels are base 2 logirithms of your progress.

----------------------------------

# Copyright (C) 2022 Nathan B (@10Nates)