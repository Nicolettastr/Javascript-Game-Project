/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚀',
    'X': '​​👾',
    'I': '⭐',
    'PLAYER': '​👨‍🚀',
    'BOMB_COLLISION': '👽​',
    'GAME_OVER': '🛸​',
    'WIN': '​✔️',
    'HEART': '⭐'
};

const maps = [];
    maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
    
maps.push(`
O--XXXXXXX
X--XXXXXXX
XX----XXXX
X--XX-XXXX
X-XXX--XXX
X-XXXX-XXX
XX--XX--XX
XX--XXX-XX
XXXX---IXX
XXXXXXXXXX
`);

maps.push(`
I-----XXXX
XXXXX-XXXX
XX----XXXX
XX-XXXXXXX
XX-----XXX
XXXXXX-XXX
XX-----XXX
XX-XXXXXXX
XX-----OXX
XXXXXXXXXX
`);

maps.push(`
O-------XX
XXXXXXX-XX
XXXXXXX-XX
XX------XX
XX-XXXXXXX
XX-X----XX
XX-X-IX-XX
XX-XXXX-XX
XX------XX
XXXXXXXXXX
`);

maps.push(`
I-------XX
XX-XXXX-XX
XX-XXXX-XX
XX-X----XX
XX-X---XXX
XX-XXX--XX
XX-X-OX-XX
XX-X----XX
XX-X----XX
XXXXXXXXXX
`);

maps.push(`
OXXXXXXXXX
---------X
XXXXXXXX-X
X--------X
X-XX-XXX-X
X--X-XXX-X
XXXX-X---X
XX---XXXXX
XX-XXXXXXX
XX----IXXX
`);

maps.push(`
XXXXXXXX-I
---------X
-XXXXXXXXX
--------XX
XXXXXXX--X
XXXXXXXX-X
XXXXXX---X
XXXXX----X
XX----XXXX
XX----OXXX
`);

maps.push(`
XXXXXXXX-O
XXXXX----X
XXXXX-XXXX
XXXXX-XXXX
XXXXX-XXXX
X-----XXXX
X--XXXXXXX
XX-------X
I-X---XX-X
X---X----X
`);

maps.push(`
X---XIXXXX
X-X-X-XXXX
--X-X-XXXX
X-X-X-XXXX
--X-X-XXXX
X-X-X-XXXX
--X-X-XXXX
X-X-X-XXXX
O-X-X-XXXX
XXX---XXXX
`);

maps.push(`
XXXXXO----
XXXX-XX-X-
XXX--X--X-
XX--X--XX-
X--X--XXX-
XXX--XXXX-
--X-XXXXX-
-X--XXXXX-
-XXX------
I----XXXX-
`);