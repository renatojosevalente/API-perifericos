const Periferico = require('../models/perifericos.models.js')

const addPeriferico = async (req, res) => {

    try {

        const {
            produtoTipo,
            modelo,
            marca,
            anoFabricacao,
            caracteristicas
        } = req.body;

        let novoPeriferico = {
            produtoTipo,
            modelo,
            marca,
            anoFabricacao,
            caracteristicas
        }

        const periferico = await Periferico.create(novoPeriferico);

        res.status(200).json(periferico);

    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const getAllPerifericos = async (req, res) => {
     try{

        const perifericos = await Periferico.find();

        res.status(200).json({perifericos});

     } catch(error){
        res.status(500).json({message: error.message});
     }
};

const getOnePeriferico = async (req,res) => {
    try{
        const {id} = req.params;

        const periferico = await Periferico.findById(id);

        res.status(200).json({periferico});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

const deletePeriferico = async (req, res) => {
    try{
        const {id} = req.params;

        const periferico = await Periferico.findByIdAndDelete(id);

        if(!periferico){
            res.status(404).json({message:'periférico não encontrado não entrado'});
        }

        res.status(200).json({message:"Periférido deletado com sucesso"})
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const updatePeriferico = async (req, res) => {

    try{
        const {id} = req.params;

        const periferico = await Periferico.findByIdAndUpdate(id, req.body);
    
        res.status(200).json(periferico);
    
        const updatedPeriferico = await Periferico.findById(id);
    
        res.status(200).json(updatedPeriferico);
    }catch(error){

    }
   
}


module.exports = {addPeriferico, getAllPerifericos, getOnePeriferico, deletePeriferico, updatePeriferico };