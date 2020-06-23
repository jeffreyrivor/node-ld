const readline = require('readline');
const ld = require('../');

const rl = readline.createInterface(process.stdin);

const page36 = Buffer.alloc(4);
const page37 = Buffer.alloc(4);
const page38 = Buffer.alloc(4);
const page39 = Buffer.alloc(4);

rl.question('Enter Vehicle ID: ', (input) => {
    const id = parseInt(input, 10);

    page36.writeUInt16LE(id);

    // Initialize the toypad. By default it tries loading the HID transport on Windows and Mac, and LibUSB on linux
    // (libusb-1.0 must be installed for both hid and libusb transports on linux)
    const toypad = new ld.ToyPad();

    toypad.on('ready', () => {
        toypad.on('event', (ev) => {
            if (ev.dir) {
                return;
            }

            console.log('Starting write for', ev.uid.toString('hex'));

            toypad.write(0, 0x24, page36, () => {
                toypad.color(1, '#FFFFFF');
                toypad.write(0, 0x25, page37, () => {
                    toypad.color(2, '#FFFFFF');
                    toypad.write(0, 0x26, page38, () => {
                        toypad.color(3, '#FFFFFF');
                        toypad.write(0, 0x27, page39, () => {
                            toypad.color(0, '#00FF00');
                            console.log('Vehicle written to tag', ev.uid.toString('hex'));

                            rl.close();
                        });
                    });
                });
            });
        });

        // Wake the toypad, it will not respond to commands at all unless woken
        toypad.wake(() => {
            toypad.color(0, '#00FF00');

            console.log('Place tag on toypad.');
        });
    });
});
