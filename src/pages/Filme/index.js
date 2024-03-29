import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import {toast} from 'react-toastify'
function Filme(){

    const {id} = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "d77bd05db014b976998a4dcf362430b4",
                    language: "pt-BR",
                }
            })
            .then((response) =>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigate("/", {replace: true})
                return
            })
        }

        loadFilme()

        return ()=> {
             console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme ja esta na sua lista")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="info-filme">
               <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return(
        <div className='info-filme'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed(2)} /10</strong>

            <div className="area-buttons">
               <button onClick={salvarFilme}>Salvar</button>
               <button>
                  <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target='blank' rel='external'>
                     Trailer
                  </a>
               </button>
            </div>
        </div>
    )

}

export default Filme