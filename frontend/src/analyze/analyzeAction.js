import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'


const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {name: "", telephone: "", city: "", propertyname: ""}//ARRUMAR.. TÁ ERRADO
var id;

// export function getList() {
//     const request = axios.get(`${BASE_URL}/analyzes`)
//     return {
//         type: 'NAME_FETCHED',
//         payload: request    //dentro do request eu tenho um atributo chamado .data
//     }
// }

export function getListHistory() {
    //console.log("getListHistory", value)
    return dispatch => {
        const request = axios.get(`${BASE_URL}/analyzes`)
            .then(resp => dispatch({ type: 'ANALYZE__FETCHED', payload: resp }))
    }
}

export const searchAnalyze = (id_client) => {  //vai buscar os serviços no backend
    return (dispatch, getState) => {
        console.log("searchAnalyze", id_client)
        const search = id_client ? `&id_client__regex=/${id_client}/` : ''
        const request = axios.get(`${BASE_URL}/analyzes/?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'ANALYZE__FETCHED', payload: resp}))
    }
}

export function create(values) {
    //console.log("create", values)
    return submit(values, 'post')

}

export function update(values) {
    console.log(values)
    return submit(values,'put')
}

export function remove(values) {
    return submit(values,'delete')
}

function submit(values, method) {
    return dispatch => {
        console.log("Value", values)
        const id = values._id ? values._id : ''
        const clientsOranalyzes = values.id_client ? 'analyzes' : 'clients' // PENSAR.. PENSAR..
        console.log("clientsOranalyzes", clientsOranalyzes)

        axios[method](`${BASE_URL}/${clientsOranalyzes}/${id}`, values) //executa o post e depois realiza as ações
        .then(resp => {
            toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
            dispatch(init())
        })
        .catch(e => {   //qdo o banco acusar algum erro
            e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
        })
    }
}

/**************************************************************************************************/

export const changeName = (event) => ({
    type: 'NAME_CHANGED',
    payload: event.target.value // valor que tá no campo input no momento que o evento é disparado
})                               //só cria o evento, não dispara o evento pra chamar o reducer.. dispatch que chama..

export const search = () => {  //vai buscar os serviços no backend
    return (dispatch, getState) => {
        const searchingName = getState().analyze.searchingName
        console.log(searchingName)
        const search = searchingName ? `&name__regex=/${searchingName}/` : ''
        const request = axios.get(`${BASE_URL}/clients/?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'NAME_FETCHED', payload: resp}))
    }
}

export const clear = () => {
    return [{ type: 'NAME_CLEAR' }, search()]
}

/**************************************************************************************************/

export function showUpdate(analyze) {
    return [
        console.log("showUpdate", analyze),
        { type: 'FORM_FORMNEW', payload: analyze},
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('analyzeForm', analyze) //inicializar o formulário com dados já cadastrados
    ]
}

export function showDelete(analyze) { //refazer, colocar o id da aba.. o código está duplicado
    return [
        console.log("showDelete", analyze),
        { type: 'FORM_FORMNEW', payload: analyze},
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('analyzeForm', analyze) //inicializar o formulário com dados já cadastrados
    ]
}

export function showHistory(analyze) { 
    // buscar o cara que ta logado
     if(analyze._id != undefined)
     id = analyze._id;
    return [
        console.log('Valor='+id),
        searchAnalyze(id),
        showTabs('tabHistory'),
        selectTab('tabHistory'),
        { type: 'ID_CHANGED', payload: id }
    ]
}

export function showNew() { //como vou linkar o id do usuário com o id_client ???????
    return [

        showTabs('tabNew'),
        selectTab('tabNew'),
        //initialize('NewAnalyzeForm', id)
    ]
}

export function init(){
    return [
        showTabs('tabList','tabCreate'),
        selectTab('tabList'),
        search(),
        initialize('analyzeForm', INITIAL_VALUES) //inicializar o formulário com dados já cadastrados
    ]
}
