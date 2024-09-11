# API DE PERIFÉRICOS PARA COMPUTADOR
Esta API é utilizada para o gerenciamento de catálogo de equipamentos periférico para PC, permitindo operações de CRUD (criar, ler, atualizar, deletar).

## Endpoints
### - POST/cadastrar
Este Endpoint é responsável pela adição de novos games no banco de dados da API.

```
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
````
#### Respostas de status:
##### OK! 200
Caso esta resposta aconteça, um novo jogo foi adicionado no banco de dados da API.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.









