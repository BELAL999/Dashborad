const menu_but = document.querySelector('.js-menu-but');
const close = document.getElementById('close-btn');
const aside = document.querySelector('aside');
const light_mode = document.querySelector('.nav__light');
const dark_mode = document.querySelector('.nav__dark');

console.log(light_mode);
console.log(menu_but);
console.log(close);
menu_but.addEventListener(('click'),()=>{
   aside.style.display = 'block'
});
close.addEventListener(('click'),()=>{
   aside.style.display = 'none'
});
dark_mode.addEventListener(('click'),()=>{
    document.body.classList.add('dark-mode-variables');
    light_mode.style.background = 'transparent';
    dark_mode.style.background = '#6c9bcf';
    dark_mode.style.borderRadius = '0.4rem'
});
light_mode.addEventListener(('click'),()=>{
    if(document.body.classList.contains('dark-mode-variables')){
        document.body.classList.remove('dark-mode-variables');
        dark_mode.style.background = 'transparent';
        light_mode.style.background = '#6c9bcf';
        light_mode.style.borderRadius = '0.4rem'
    }
});


