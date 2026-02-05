import { useState } from "react"
import type { Cep } from "./types/Cep"
import api from "./services/api"
import "./style.css"

export function Project(){
    const[cep, setCep] = useState<string>("")
    const[endereco, setEndereco] = useState<Cep | null>(null)
    const[erro, setErro] = useState<string>("")

    async function buscarCep() {
        try{
            setErro("")
            const response = await api.get(`/${cep}/json`)
            setEndereco(response.data)
        } 
        catch{
            setErro("CEP Inválido. Digite Novamente!!")
            setEndereco(null)
        }
    }

    return(
        <div className="container">
            <img src=".\public\LogoReact.png" alt="logo" width={200} height={200}/>
            <h1>Busque o seu CEP</h1>
            <input 
            value={cep}
            onChange={e => setCep(e.target.value)}
            placeholder="Digite um CEP Válido"
            />

            <button onClick={buscarCep}>Consultar</button>

            {erro && <p style={{color:"red"}}>{erro}</p>}

            {endereco && (
                <div className="box">
                    <p>Cep: {endereco.cep}</p>
                    <p>Rua: {endereco.logradouro}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>UF: {endereco.uf}</p>
                    <p>Complemento: {endereco.complemento}</p>
                </div>
            )}

        </div>
    )
}