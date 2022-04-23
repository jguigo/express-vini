const Gender = require("../models/Gender");

const GenderController = {
    async listar(req, res){
        const genders = await Gender.findAll(
        // { essa perte seria pra especificar
        //     where:{gender_id:1}
        // }
        );

        res.json(genders);
    }
};

module.exports = GenderController;