const { response,request } =  require('express')
const express =  require('express')
const app = express()
app.use(express.json())
const uuid = require('uuid')

let prova = [{id:uuid.v4(),nome:'Emanuel',funcao:'Programador',salario:3001,inss:360,irf:210,fgts:240,salariototal:2431},

            {id:uuid.v4(),nome:'Maria',funcao:'Vendedora',salario:4500,inss:540,irf:315,fgts:360,salariototal:3645}]

            
            const checkID = (request, response, next) => {
                const{id} = request.params
                const existeID = prova.find(check => check.id === id)
                if (!existeID){
                    return response
                        .status(400)
                        .json({Error: 'ID Inexistente'})
                }
                return next()
            }
                const verificaDados = (request, response, next) => {
                    const{nome, funcao, salario, inss, irf, fgts, salariototal} = request.body
                    if (!nome || !funcao || !salario ){
                        return response
                        .status(400)
                        .json({Erro:'Por favor, verique as informações pois algum campo está em branco ou errado.'})
                    }
                    return next()
                }
            app.post('/funcionarios', verificaDados , (request,response) => {
                const{nome,funcao,salario, inss, irf , fgts, salariototal} = request.body
                const analise = {
                    id:uuid.v4(),
                    nome,
                    funcao,
                    salario,
                    inss,
                    irf,
                    fgts,
                    salariototal,
                }
                prova = [...prova,analise]
                return response
                .status(400)
                .json(analise)
            })

        app.get('/funcionarios', (request, response) => {
            return response
            .status(200)
            .json (prova)
        })
    
        app.get('/funcionarios/:id', checkID , (request, response) => {
            const{id} = request.params
            const listandoid = prova.filter (idzinho => idzinho.id === id)
            return response
            .status(200)
            .json(listandoid)
        })

        app.delete('/funcionarios/:id', checkID , (request,response)=> {
            const{id} = request.params
            let apagaid = prova.findIndex(indice => indice.id === id)
            prova.splice(apagaid,1)
            return response
            .status(200)
            .json({Finalizado:"ID deletado com sucesso!"})
        })
        
        app.put('/funcionario/:id', checkID , verificaDados , (request,response) => {
            const {nome, funcao ,salario , inss , irf , fgts , salariototal} = request.body
            const {id} = request.params
            let alterarDados = prova.findIndex(gast => gast.id === id)
            const alterarFunc = {
                id,
                nome,
                funcao,
                salario,
                inss,
                irf,
                fgts,
                salariototal,
            }
            prova.splice(alterarDados, 1 , alterarFunc)
            return response
            .status(200)
            .json(alterarFunc)

        })

        app.get('/funcionario/folhaindividual', (request, response) => {
            const { nome } = request.query
            const retornarNome = prova.filter(resp => resp.nome === nome)
            return response
                .status(200)
                .json(retornarNome)
        })

      app.get('/funcionario/gastototal', (request,response) => {
          const {salario} = request.body
          const somaValor = prova.reduce((soma,valor) => {
              return soma + valor.salariototal
          }, 0)

          return response
          .status(200)
          .json({"Gasto Total": somaValor})
      })










































app.listen (3333, () => {
console.log('servidor rodando!!!')})
