const perfil = Vue.createApp({
    data(){
        return{
            edit: "Editar",
            pago: "Metodos de pago",
            img: 'https://cdn.discordapp.com/attachments/629532011148607499/931379101833527366/20220113_204305.jpg',
            bucld1:[
                { datos:"Nombre" },
                { datos:"Diego Rodriguez" },
            ],
            bucld2:[
                { datos:"Correo" },
                { datos:"A01197185@tec.mx" },
            ],
            bucld3:[
                { datos:"Fecha de nacimiento" },
                { datos:"31 de agosto de 1999" },
            ],
            bucl2:[
                { balance:"Balance" },
                { balance:"$100" },
            ],
            bucl3:[
                { creados:"Tickets Creados" },
                { creados:"3" },
            ],
            bucl4:[
                { resueltos:"Tickets Resueltos" },
                { resueltos:"10" },
            ],   
        }
    }
 });
 perfil.mount('#perfil')