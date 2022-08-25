let generalLightSwitch = document.getElementById('general_light_switch');
let moon = document.getElementById('moon');
let sun = document.getElementById('sun_light');

let popup_turn_on = document.getElementById('turn_on');
let popup_turn_off = document.getElementById('turn_off');

let clicked = false;

function LEDon() {
    const turnon = new Uint8Array([0xcc, 0x23, 0x33]);
    return myCharacteristic.writeValue(turnon);
};

function LEDoff() {
    const turnoff = new Uint8Array([0xcc, 0x24, 0x33]);
    return myCharacteristic.writeValue(turnoff);
}

generalLightSwitch.addEventListener('click', () => {
    if (clicked == false) {
        moon.style.display = 'none';
        sun.style.display = 'block';
        generalLightSwitch.children[2].innerHTML = "On";


        popup_turn_on.style.display = 'flex';
        popup_turn_on.classList.add('popup');
        setTimeout(() => {
            popup_turn_on.classList.add('popout');
            setTimeout(() => {
                popup_turn_on.style.display = 'none';
            }, 100);
        } , 2000);

        LEDon();

        clicked = true;
    } else {
        moon.style.display = 'block';
        sun.style.display = 'none';
        generalLightSwitch.children[2].innerHTML = "Off";

        popup_turn_off.style.display = 'flex';
        popup_turn_off.classList.add('popup');
        setTimeout(() => {
            popup_turn_off.classList.add('popout');
            setTimeout(() => {
                popup_turn_off.style.display = 'none';
            }, 100);
        }, 2000);

        LEDoff();

        clicked = false;
    }
})






//Clock Part

let clock_btn = document.getElementById('clock_btn');
let clock_popup = document.getElementById('clock_popup');

let hoursPicker = document.getElementById('hours_picker');
let hours = document.getElementById('hours');
let minutesPicker = document.getElementById('minutes_picker');
let minutes = document.getElementById('minutes');


let confirm_clock = document.getElementById('confirm_clock');
let plus = document.getElementById('plus');

clock_btn.addEventListener('click', (e) => {
    clock_popup.style.display = 'block';
    plus.style.backgroundColor = '#0006';
    plus.style.pointerEvents = 'all';    
});

document.body.addEventListener('click', (e) => {
    switch (e.target) {
        case plus:
            clock_popup.style.display = 'none';
            plus.style.background = "transparent";            
            plus.style.pointerEvents = 'none';                   
            hours.style.display = 'none';                   
            minutes.style.display = 'none';
            break;
        case hours:
        case hoursPicker:
            if (hours.style.display == 'none' || hours.style.display == '') {
                hours.style.display = 'grid';
                minutes.style.display = 'none';
            } else {
                hours.style.display = 'none';
            };
            break;
        case minutes:
        case minutesPicker:
            if (minutes.style.display == 'none' || minutes.style.display == '') {
                minutes.style.display = 'grid';        
                hours.style.display = 'none';
            } else {
                minutes.style.display = 'none';
            };
            break;
        case confirm_clock:
            clock_popup.style.display = 'none';
            plus.style.background = "transparent";            
            plus.style.pointerEvents = 'none';                   
            hours.style.display = 'none';                   
            minutes.style.display = 'none';
            alert('confirmed');
            break;
        default:
            hours.style.display = 'none';
            minutes.style.display = 'none';
    };
});

for (let i = 0; i < hours.children.length; i++) {
    hours.children[i].addEventListener('click', (e) => {
        hoursPicker.innerHTML = hours.children[i].innerHTML;
        e.stopPropagation();
    }, true);
};

for (let i = 0; i < minutes.children.length; i++) {
    minutes.children[i].addEventListener('click', (e) => {
        minutesPicker.innerHTML = minutes.children[i].innerHTML;
        e.stopPropagation();
    }, true);
};

//Don't let user select "Everyday" and particular day(s) 

let checkbox_everyday = document.getElementById('checkbox_everyday');
let inputDays = document.querySelectorAll('#fieldset input');
let arrInputDays = Array.from(inputDays);

arrInputDays.forEach((element) => {
    element.addEventListener('click', () => {
        if (checkbox_everyday.children[0].hasAttribute("checked")) {
            checkbox_everyday.children[0].checked = false;
        }
    });
});

checkbox_everyday.addEventListener('click', () => {
    arrInputDays.forEach((element) => { element.checked = false; });
});





// Kebab Menu
let kebab_menu_icon = document.getElementById('kebab_menu_icon');
let opened_kebab_menu = document.getElementById('opened_kebab_menu');

kebab_menu_icon.addEventListener('click', () => {
    opened_kebab_menu.classList.toggle('block');
})

let close_kebab = document.getElementById('close_kebab');

close_kebab.addEventListener('click', () => {
    opened_kebab_menu.classList.toggle('block');
})

let add_devices = document.getElementById('add_devices');

add_devices.addEventListener('click', () => {
    connection_page.classList.toggle("toggleDisplay");
    home_page.classList.toggle("toggleDisplay");    
    opened_kebab_menu.classList.toggle('block');
});