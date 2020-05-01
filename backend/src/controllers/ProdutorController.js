const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index  (request, response) {
        const produtores = await connection('produtores').select('*');
    
        return response.json(produtores);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('produtores').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};