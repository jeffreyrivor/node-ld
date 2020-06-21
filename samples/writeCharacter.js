const readline = require('readline');
const fs = require('fs');
const ld = require('../');

const characters = JSON.parse(fs.readFileSync('../data/charactermap.json', 'utf8'));
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter Character ID: ', (id) => {
    const character = characters.find(c => c.id == id);

    if (!character) {
        console.error('Character not found.');
        return;
    }

    var cc = new ld.CharCrypto();

    const toypad = new ld.ToyPad();

    toypad.on('ready', () => {
        toypad.wake();
        toypad.color(0, '#00FF00');

        console.log('Place tag(s).');

        toypad.on('event', (ev) => {
            if (ev.dir) {
                return;
            }

            toypad.fade(ev.pad, 5, 1, '#FF0000');

            console.log('Starting write for', ev.uid.toString('hex'));

            var characterCode = cc.encrypt(ev.uid, character.id);
            var page36 = characterCode.slice(0, 4);
            var page37 = characterCode.slice(4);
            var page38 = Buffer.alloc(4);

            var pwdString = ld.PWDGen(ev.uid);
            var page43 = Buffer.from(pwdString, 'hex');

            console.log('Page 36', page36);
            console.log('Page 37', page37);
            console.log('Page 43', page43);

            toypad.write(0, 0x25, page36, () => {
                toypad.color(1, '#FFFFFF');
                toypad.write(0, 0x26, page37, () => {
                    toypad.color(2, '#FFFFFF');
                    toypad.write(0, 0x27, page38, () => {
                        toypad.color(3, '#FFFFFF');
                        toypad.write(0, 0x2B, page43, () => {
                            toypad.color(0, '#00FF00');
                            console.log('Character written to tag');
                        });
                    });
                });
            });
        });
    });
});
