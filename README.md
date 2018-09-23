# TRAS
# Text-Based Response Automation System
# Made by Nathan B @ https://nate.illegaldomain.com

A Discord bot for text-based commands and responses.

This may sound like any other bot at first, but this is much more than basic text.

----------------------------------

LIST OF COMMANDS
*Using prefix of server this message was activated from*
---
>txt.help
Summons this help list
 
>txt.emojify
Turn all characters into emojis
*Format: txt.emojify [message]*

>txt.ebojify
Turn certain characters into :b:️
*Format: txt.ebojify [message]*
 
>txt.oof
Mega OOF
 
>txt.f
Mega F
 
>txt.overcomp
Replaces all words with synonyms of the word.
*Format: txt.overcomp [message]*
 
>txt.wordinfo
Get the definition or Part-of-Speech of a word.
*Format: txt.wordinfo [def|pos] [word]*
 
>txt.asciiart
Generate ascii art. Over 15 characters responds with a file.
*Format: txt.asciiart [message|{Font:[Font (use "_" as space)]}|{getFonts}] [message]*
 
>txt.cmds
View and manage custom server commands, managing requires "Manage Messages" perms.
*Format: txt.cmds [manage|view] [set|delete] [activator] [reply (multiword)]*
 
>txt.prefix
Get prefix for any server or set the current server's prefix, setting prefix requires "Manage Messages" perms.
*Format: txt.prefix [get|set] [server ID|new prefix]*
 
>txt.speak
Generate a sentence, repeat messages, toggle and get status of random generated messages, toggling requires "Manage Messages" perms. Random messages off by default.
*Format: txt.speak [generate|repeat|toggleRandSpeak|randSpeakStatus] [channel ID or channel tag] [message]*
 
>txt.combos
Sends file with all possible combinations of the units you have selected and given.
*Format: txt.combos [words|characters] [items]*
 
>txt.listen
Relays text channels into your DMs. Only allows listening to channels everyone can see. Servers are able to individually opt out. Opted in by default.
*Format: txt.listen [channel ID or channel tag|stop|list|opt] [channel ID or channel tag|set|check] [serverID|in or out]*
 
>Mention me
I respond "What's :b:️oppin'"
 
>Mention me with message "PREFIX"
I respond with the server's prefix and the help command.
 
>Generated messages
Fully generated messages (not an AI so they're terrible and don't make sense) that can be toggled to randomly say them in response to other messages. Random messages will not reply to commands.

----------------------------------

GENERAL DETAILS
---
>All data is stored in JSON, despite what some have to say about it.
>Large items are stored in files.
>Many fallbacks to help you format the command are in place.
>All in-any-way controversial features are toggleable.
>Custom commands are activated like normal commands. | *Ex: txt.[trigger] w/ default prefix*
>"@bot PREFIX" works with aNy cApITalIzaTiOn.
>All commands work in DMs. (Except for the opt function in DMs, as it's not needed)
>This bot has 8 different dependencies.

----------------------------------

# Copyright (C) 2018, 2018 Nathan B (@10Nates)
# This file is part of TRAS.
#
# TRAS is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# TRAS is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.