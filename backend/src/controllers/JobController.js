const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('jobs').count();

        const jobs = await connection('jobs')
            .join('produtores', 'produtores.id', '=', 'jobs.produtor_id')
            .limit(5)
            .offset((page - 1) * 5 )
            .select([
                'jobs.*',
                'produtores.name',
                'produtores.email',
                'produtores.whatsapp',
                'produtores.city',
                'produtores.uf'
            ]);
    
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(jobs);
    },

    async create(request, response) {
        const { title, description, value} = request.body;
        const produtor_id = request.headers.authorization;

        const [id] = await connection('jobs').insert({
            title,
            description,
            value,
            produtor_id,
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const produtor_id = request.headers.authorization;

        const job = await connection('jobs')
            .where('id', id)
            .select('produtor_id')
            .first();

        if (job.produtor_id != produtor_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('jobs').where('id', id).delete();

        return response.status(204).send(); 
    }
};