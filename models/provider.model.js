const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

//DEFINE ESQUEMA->cómo debe ser cada documento de la coleccion
const objectSchema = {
    companyName: { 
        type: String, 
        required: true,
        unique: true 
    },
    url_web: {
        type: String,
        required: true,
        validate: {
            validator: function(url){
                if(url.indexOf('http') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Por favor , introduce una URL válida"
        }
    },
    address:{
        type: String,
        required: true
    },
    cif:{
        type: String,
        required: true,
        validate: {
            validator: function(cif){
                // Expresión regular para validar un CIF español
                const cifRegex = /^[A-HJNP-SUVW]\d{7}[0-9A-J]$/i;
                if (typeof cif !== 'string') {
                    return false; // No es texto
                }else if (cifRegex.test(cif)) {
                    return true; // Cumple el formato
                } else {
                    return false; // No coincide con el patrón
                }
            }, 
            message: "Por favor, introduce un CIF válido (por ejemplo: B12345678)"
        }
    }
};

// Crear el esquema en mongoose
const providerSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const Provider = mongoose.model('Provider', providerSchema);
//exportamos el modelo
module.exports = Provider;


//-------------------------------
//INSERTAR UN PROVEEDOR

// const p = new Provider({
//     companyName: "Viva Gym",
//     url_web: "https://www.vivagym.com/es-es/?utm_source=google&utm_medium=paid_search&utm_campaign=251101_es_gads_always-on-rb_brand-extra-presu-b-c1_all&gad_source=1",
//     address: "Calle de los Vascos",
//     cif:"B40236882"
// });

// // Guardar en la BBDD
// p.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err))

//otro proveedor

// const p2 = new Provider({
//     companyName: "supera",
//     url_web: "https://www.vivagym.com/es-es/?utm_source=google&utm_medium=paid_search&utm_campaign=251101_es_gads_always-on-rb_brand-extra-presu-b-c1_all&gad_source=1",
//     address: "Calle Marcelino fernandez",
//     cif:"J70237882"
// });

// // Guardar en la BBDD
// p2.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err))