import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

export default function PerifericoPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [periferico, setPeriferico] = useState(null);

    useEffect(() => {
        const fetchPeriferico = async () => {
            try {
                const response = await fetch(`http://localhost:5000/periferico/${id}`, {
                    method: "GET"
                });

                if (response.ok) {
                    const data = await response.json();
                    setPeriferico(data.periferico);
                } else {
                    console.error("Erro ao buscar periférico");
                }
            } catch (error) {
                console.error("Erro ao buscar periférico:", error);
            }
        };

        fetchPeriferico();
    }, [id]);

    if (!periferico) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="flex flex-col w-full sm:items-center">
            <div>
                <button onClick={() => navigate("/")} className="h-9 bg-zinc-700 mb-5 self-start border rounded border-zinc-600 px-2 ">
                    <MdKeyboardBackspace size={20} className="font-light text-slate-300" />
                </button>
                <div className="sm:flex sm:flex-row sm:gap-8">
                    <img
                        src={periferico.imagemUrl}
                        className="w-full sm:w-64 h-64 rounded object-cover"
                        alt={periferico.nome}
                    />
                    <div className="sm:self-end mt-4">
                        <p className="font-bold text-2xl">{periferico.produtoNome}</p>
                        <p className="text-sm text-zinc-500">{periferico.modelo}</p>
                        <div className="mt-1">
                            <span className="text-sm p-1 rounded bg-green-500">{periferico.produtoTipo}</span>
                        </div>
                        <p className="mt-3 text-4xl font-bold">R${periferico.preco}</p>
                    </div>
                </div>
                <div className="px-5 mt-10 w-full flex flex-col bg-zinc-700 rounded p-2 gap-">
                    <span className="font-semibold">Características: </span>
                    <div className="w-[80%] flex flex-col justify-between">
                        {periferico.caracteristicas.map((caracteristica, index) => (
                            <div key={index} className="mb-4">
                                <div>
                                    <span>Cor: </span>
                                    <span>{caracteristica.cor}</span>
                                </div>
                                <div>
                                    <span>Peso: </span>
                                    <span>{caracteristica.peso}g</span>
                                </div>
                                <div className="mt-3">
                                    <span className="font-semibold ">Dimensões: </span>
                                    {caracteristica.dimensao.map((dimensao, dimIndex) => (
                                        <div key={dimIndex}>
                                            <div>
                                                <span>Altura: </span>
                                                <span>{dimensao.altura}cm</span>
                                            </div>
                                            <div>
                                                <span>Largura: </span>
                                                <span>{dimensao.largura}cm</span>
                                            </div>
                                            <div>
                                                <span>Comprimento: </span>
                                                <span>{dimensao.comprimento}cm</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
