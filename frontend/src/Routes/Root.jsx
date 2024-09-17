import { useEffect, useState } from "react";
import CardPerifericos from "../Components/CardPerifericos";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";

export default function Root() {
    const navigate = useNavigate();
    const [perifericos, setPerifericos] = useState([]);

    const fetchPerifericos = async () => {
        try {
            const response = await fetch("http://localhost:5000/periferico/", {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setPerifericos(data.perifericos || []);
            } else {
                console.error("Erro ao buscar periféricos");
            }
        } catch (error) {
            console.error("Erro ao buscar periféricos:", error);
        }
    };

    const deletePeriferico = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/periferico/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                // Atualiza a lista de periféricos após exclusão
                setPerifericos((prevPerifericos) => 
                    prevPerifericos.filter((periferico) => periferico._id !== id)
                );
                alert("Periférico deletado com sucesso!");
            } else {
                console.error("Erro ao deletar periférico");
            }
        } catch (error) {
            console.error("Erro ao deletar periférico:", error);
        }
    };

    useEffect(() => {
        fetchPerifericos();
    }, []);

    return (
        <div className="flex flex-col w-full sm:items-center">
            <div className="flex flex-col mb-10">
                <button
                    onClick={() => navigate("/createPeriferico")} 
                    className="self-center w-32 bg-green-500 border-1 border-green-600 p-2 rounded cursor-pointer"
                >
                    Criar periférico
                </button>
            </div>
            <div className="flex flex-col gap-3">
                {perifericos.map((periferico) => (
                    <div key={periferico._id} className="flex gap-1">
                        <CardPerifericos
                            key={periferico._id}
                            id={periferico._id}
                            nome={periferico.produtoNome}
                            modelo={periferico.modelo}
                            marca={periferico.marca}
                            preco={periferico.preco}
                        />
                        <div className="flex flex-col self-end gap-1">
                            <button 
                                onClick={() => navigate(`/editPeriferico/${periferico._id}`)}
                                className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded"
                            >
                                <FaPen className=""/>
                            </button>
                            <button 
                                onClick={() => deletePeriferico(periferico._id)}
                                className="flex items-center justify-center w-8 h-8 bg-red-500 rounded"
                            >
                                <FaRegTrashAlt className=""/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
