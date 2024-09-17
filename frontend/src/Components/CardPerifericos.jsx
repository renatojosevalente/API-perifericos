import { useNavigate } from "react-router-dom";

export default function CardPerifericos({ id, nome, modelo, marca, preco }) {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/periferico/${id}`)} className="w-[85%] sm:w-96 h-20 p-2 px-4 items-center justify-between flex border-2 hover:bg-zinc-700 transition border-zinc-700 rounded">
            <div className="text-start">
                <p className="">{nome}</p>
                <p className="text-sm">{marca}</p>
            </div>
            <span className="">R${preco}</span>
        </button>
    )
}