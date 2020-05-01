//responsavel pelo perfil de um produtor
//retorna os jobs especificos de um produtor

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const produtor_id = request.headers.authorization;

        const jobs = await connection('jobs')
            .where('produtor_id', produtor_id)
            .select('*');

        return response.json(jobs);
    }
};