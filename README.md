# API DE PERIFÉRICOS PARA COMPUTADOR
Esta API é utilizada para o gerenciamento de catálogo de equipamentos periférico para PC, permitindo operações de CRUD (criar, ler, atualizar, deletar).

## Endpoints
### - POST/periferico
Este Endpoint é responsável pelo cadastro de novos periféricos no banco de dados da API.
#### Parâmetros:

produtoTipo: Tipo de periférico <br>
modelo: Modelo do periférico<br>
marca:   Marca do periférico <br>
anoFabricação: Ano de fabricação do periférico <br>
caracteristicas: Descrição especifíca do periférico <br>

#### Exemplo de requisição:
```
{
	"produtoTipo": "Mouse",
	"modelo": "M711",
	"marca": "Redragon",
	"price":178.99,
	"caracteristicas":[{
		"cor":"Preto",
		"peso":7,
		"dimensao":[{
			"altura":4,
			"largura":6.6,
			"comprimento":12.7
		}]
	}]
}

````
#### Respostas de status:
##### OK! 200
Caso esta resposta aconteça, um novo periférico foi adicionado com sucesso no banco de dados da API.

##### Erro! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.


### GET/periferico
Este Endpoint é responsável por mostrar ao usuário todos os periféricos cadastrados no banco de dados.
````
const getAllPerifericos = async (req, res) => {
     try{

        const perifericos = await Periferico.find();

        res.status(200).json({perifericos});

     } catch(error){
        res.status(500).json({message: error.message});
     }
};

````
### GET/periferico/:id
Este endpoint é responsável por mostrar apenas um periférico selecionado pelo usuário.

````
const getOnePeriferico = async (req,res) => {
    try{
        const {id} = req.params;

        const periferico = await Periferico.findById(id);

        res.status(200).json({periferico});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

````
### DELETE/periferico/:id
Este endpoint é responsável por excluir um periférico cadastrado no banco de dados.

````
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

````

### PUT/periferico/:id
Este endpoint é responsável por modificar as características do periférico selecionado.


````
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
````












