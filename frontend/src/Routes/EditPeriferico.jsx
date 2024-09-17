import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

export default function EditPeriferico() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nome: "",
        tipo: "",
        modelo: "",
        marca: "",
        preco: "",
        cor: "",
        peso: "",
        altura: "",
        largura: "",
        comprimento: "",
        quantidade: "",
        imagemUrl: ""
    });

    useEffect(() => {
        const fetchPeriferico = async () => {
            try {
                const response = await fetch(`http://localhost:5000/periferico/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const periferico = data.periferico;
                    setFormData({
                        nome: periferico.produtoNome,
                        tipo: periferico.produtoTipo,
                        modelo: periferico.modelo,
                        marca: periferico.marca,
                        preco: periferico.preco,
                        cor: periferico.caracteristicas[0].cor,
                        peso: periferico.caracteristicas[0].peso,
                        altura: periferico.caracteristicas[0].dimensao[0].altura,
                        largura: periferico.caracteristicas[0].dimensao[0].largura,
                        comprimento: periferico.caracteristicas[0].dimensao[0].comprimento,
                        quantidade: periferico.quantidade,
                        imagemUrl: periferico.imagemUrl
                    });
                } else {
                    console.error("Erro ao buscar periférico");
                }
            } catch (error) {
                console.error("Erro ao buscar periférico:", error);
            }
        };

        fetchPeriferico();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            produtoNome: formData.nome,
            produtoTipo: formData.tipo,
            modelo: formData.modelo,
            marca: formData.marca,
            preco: parseFloat(formData.preco),
            quantidade: parseInt(formData.quantidade, 10),
            imagemUrl: formData.imagemUrl,
            caracteristicas: [
                {
                    cor: formData.cor,
                    peso: parseFloat(formData.peso),
                    dimensao: [
                        {
                            altura: parseFloat(formData.altura),
                            largura: parseFloat(formData.largura),
                            comprimento: parseFloat(formData.comprimento)
                        }
                    ]
                }
            ]
        };

        try {
            const response = await fetch(`http://localhost:5000/periferico/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                alert("Periférico atualizado com sucesso!");
                navigate("/");
            } else {
                const error = await response.json();
                alert("Erro ao atualizar periférico: " + error.message);
            }
        } catch (error) {
            console.error("Erro ao atualizar periférico:", error);
        }
    };

    return (
        <div className="flex w-full flex-col items-center">
            <div className="w-full flex flex-col items-center">
                <button onClick={() => navigate("/")} className="h-9 bg-zinc-700 mb-5 self-start border rounded border-zinc-600 px-2 ">
                    <MdKeyboardBackspace size={20} className="font-light text-slate-300" />
                </button>
                <p className="text-2xl font-semibold mb-5">Editar periférico</p>
                <form className="w-full sm:w-auto flex flex-col gap-3" onSubmit={handleSubmit}>
                    <p>Informações gerais:</p>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="tipo"
                        placeholder="Tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="modelo"
                        placeholder="Modelo"
                        value={formData.modelo}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="marca"
                        placeholder="Marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="preco"
                        placeholder="Preço"
                        value={formData.preco}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <p>Características do periférico:</p>
                    <input
                        type="text"
                        name="cor"
                        placeholder="Cor"
                        value={formData.cor}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="peso"
                        placeholder="Peso"
                        value={formData.peso}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <p>Dimensões do periférico:</p>
                    <input
                        type="text"
                        name="altura"
                        placeholder="Altura"
                        value={formData.altura}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="largura"
                        placeholder="Largura"
                        value={formData.largura}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="comprimento"
                        placeholder="Comprimento"
                        value={formData.comprimento}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="quantidade"
                        placeholder="Quantidade em estoque"
                        value={formData.quantidade}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="imagemUrl"
                        placeholder="Imagem"
                        value={formData.imagemUrl}
                        onChange={handleInputChange}
                        className="w-full sm:w-96 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                    />
                    <input
                        type="submit"
                        value="Atualizar"
                        className="w-full h-9 rounded cursor-pointer bg-green-500 font-bold md:self-end md:w-24 focus:border-2 focus:border-green-500"
                    />
                </form>
            </div>
        </div>
    );
}
