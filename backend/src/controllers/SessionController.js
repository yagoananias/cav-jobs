const connection = require('../database/connection');
module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const produtor = await connection('produtores')
            .where('id', id)
            .select('name')
            .first();
        if (!produtor) {
            return response.status(400).json({ error: 'No PRODUTOR found with this ID'});
        }
        
        return response.json(produtor);
    }   
};