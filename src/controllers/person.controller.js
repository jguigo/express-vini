const Person = require("../models/Person");
const { Op } = require("sequelize");

const PersonController = {
   async listar(req, res) {
      // //person?nome=vinny
      // req.query;

      // //params /person/:nome
      // req.params.nome //normalmente quando quero pegar um id... NORMALMENTE!

      // //req.body.nome

      const { termo, page = 1, limit = 10 } = req.query;
      //fazer esse page = 1, garante que se não passar nada então ele fica como 1, isso é chamado de valor padrão!
      //isso aqui adiciona uma páginação
      const offset = parseInt(limit) * (parseInt(page) - 1);

      let filter = {
         limit: parseInt(limit),
         offset,
         attributes: ["person_name"] //especifico o que eu quero que retorne separando em um array, como se eu estivesse selecionando a coluna que eu quero no SQL!
      };

      if (termo) {
         //faz um push no objeto
         Object.assign(filter, {
            where: {
               //person_name: { [Op.like]: `%${termo}%` },
               person_name: { [Op.substring]: termo },
            },
         });
      }
      const persons = await Person.findAll(filter);

      res.json(persons);
   },
   async listar100(req, res) {
      const persons = await Person.findAll({
         limit: 100, //limit vai limitar o numero da busca -> vai exibir neste caso apenas 100
      });

      res.json(persons);
   },

   //ESTUDAR PORQUE ESSE AQUI NÃO FOI
   //ESSE AQUI ESTRANHOOOOO
   // async atualizar(req, res){
   //     const { id } = req.params;
   //     const { nome } = req.body;

   //     const personUpdated = await Person.update({
   //         person_name: nome
   //     },
   //     {
   //         where:{
   //             person_id: id
   //         }
   //     });

   //     if(personUpdated[0] > 1){
   //         return res.json(nome)
   //     }
   // }

   async atualizar(req, res) {
      const { id } = req.params;
      const { nome } = req.body;

      await Person.update(
         {
            person_name: nome,
         },
         {
            where: {
               person_id: id,
            },
         }
      );
      const personUpdated = await Person.findByPk(id);

      return res.json(personUpdated);
   },
};

module.exports = PersonController;
