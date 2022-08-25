let bluetooth_btn = document.getElementById("blth_btn");
let ttl_two =  document.getElementById('ttl_two');
let blth = document.getElementById('blth');
let blth_searching = document.getElementById('blth_searching');

const trnn_blth = "TURN ON BLUETOOTH";
const srch = "SEARCHING...";
let active = false;

let connection_page = document.getElementById('connection_page');
let home_page = document.getElementById('home_page');

bluetooth_btn.addEventListener('click', () => {
    
    if (active == false) {
        bluetooth_btn.classList.toggle('pulse');
        ttl_two.innerHTML = srch;
        blth.style.display = 'none';
        blth_searching.style.display = 'block';

 
        navigator.bluetooth.requestDevice(
            {
                acceptAllDevices:true,
                optionalServices: [0xffe5, 0xffe9, '0000ffe5-0000-1000-8000-00805f9b34fb', '0000ffe9-0000-1000-8000-00805f9b34fb']
            })
            .then(device => {
                console.log('> Found ' + device.name);

                
                console.log(device);
                console.log(typeof device);
                console.log(Object.getOwnPropertyNames(device));

                console.log('Connecting to GATT Server.');
                return device.gatt.connect();
            })
            .then(server => {
                console.log('Getting Service 0xffe5 - Light control.');
                return server.getPrimaryService(0xffe5);
            })
            .then(service => {
                console.log('Getting Characteristic 0xffe9 - Light control.');
                return service.getCharacteristic(0xffe9);
            })
            .then(characteristic => {
                myCharacteristic = characteristic;
                //Remplacer ca par une fonction dans un import
                connection_page.classList.toggle("toggleDisplay");
                home_page.classList.toggle("toggleDisplay");
                noSearching();
            })
            .catch(error => {
                console.log('Argh! ' + error);
                noSearching();
            });
    } else {
        ttl_two.innerHTML = trnn_blth;
        blth.style.display = 'block';
        blth_searching.style.display = 'none';
        active = false;
    }
});

function noSearching() {
    ttl_two.innerHTML = trnn_blth;
    blth.style.display = 'block';
    blth_searching.style.display = 'none';
    bluetooth_btn.classList.toggle('pulse');
    active = false;
}

let back_to_homepage = document.getElementById('back_to_homepage');

back_to_homepage.addEventListener('click', () => {
    connection_page.classList.toggle("toggleDisplay");
    home_page.classList.toggle("toggleDisplay");
});