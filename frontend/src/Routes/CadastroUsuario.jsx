import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

export default function CadastroUsuario() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/usuario/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                navigate("/");
            } else {
                const error = await response.json();
                alert("Erro ao cadastrar. Tente novamente. " + error);
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar: " + error);
        }
    };

    return (
        <div className="flex flex-col px-10 items-center gap-2">
            <button
                onClick={() => navigate("/")}
                className="h-9 bg-zinc-700 mb-5 self-start border rounded border-zinc-600 px-2 "
            >
                <MdKeyboardBackspace size={20} className="font-light text-slate-300" />
            </button>
            <p className="text-6xl font-extrabold mb-10">Cadastro</p>
            <p className="font-bold text-zinc-500">
                Preencha os dados para criar sua conta
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-80 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-80 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className="w-80 h-9 p-2 rounded bg-zinc-700 border border-zinc-600 text-sm shadow focus:outline-none focus:border-2 focus:border-green-500 transition duration-200"
                />
                <input
                    type="submit"
                    value="Cadastrar"
                    className="w-full h-9 rounded cursor-pointer bg-green-500 font-bold md:self-end md:w-24 focus:border-2 focus:border-green-500"
                />
            </form>
        </div>
    );
}
