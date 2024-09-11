# API DE PERIFÉRICOS PARA COMPUTADOR
Esta API é utilizada para o gerenciamento de catálogo de equipamentos periférico para PC, permitindo operações de CRUD (criar, ler, atualizar, deletar).

## Endpoints
### - GET/perifericos

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
