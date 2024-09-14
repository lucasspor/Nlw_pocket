const { select, input, checkbox } = require('@inquirer/prompts')
let message = "Bem vindo ao app de metas"
let metas = []

const registerGoals = async () => {
  const meta = await input({ message: "Digite a meta" })

  if (!meta.length) {
    console.log("A meta não pode ser vazia")
    return registerGoals()
  }

  metas.push({ value: meta, checked: false })
}

const listGoals = async () => {
  const replies = await checkbox({
    message: "Use as Setas para selecionar uma meta, o Espaço para marcer ou desmarcar e o Enter para finalizar ",
    choices: [...metas],
    instructions: false
  })

  metas.forEach(m => {
    m.checked = false
  })

  if (!replies.length) {
    message = "Nenhuma meta selecionada"
    return
  }

  replies.forEach(reply => {
    const meta = metas.find(meta => {
      return meta.value == reply
    })


    meta.checked = true
  })

  message = 'Metas concluidas ou não'
}

const goalAccomplished = async () => {
  const accomplish = metas.filter((meta) => {
    return meta.checked
  })

  if (!accomplish.length) {
    message = "nenhuma meta foi realizada"
    return
  }

  await select({
    message: "Esta metas foram realizadas: " +  accomplish.length,
    choices: [...accomplish],
  })
}

const openedGoals = async() => {
  const openeds = metas.filter( (meta) =>{
    return !meta.checked
  } )

  if (!openeds.length) {
    message = "nenhuma meta esta aberta"
    return
  }

  await select({
    message: "Metas Abertas: " + openeds.length,
    choices: [...openeds]
  })
}

const deleteGoals = async () => {
  const uncheckedGoals = metas.map( meta => {
    return {value: meta.value, checked: false}
  })

  const deletedItems = await checkbox({
    message: "Selecione item para deletar",
    choices: [...uncheckedGoals],
  })

  if(!deletedItems.length === 0){
    message = "Não possuem items a serem deletados!"
    return
  }

  deletedItems.forEach(item => {
   metas = metas.filter(meta => {
      return meta.value != item
    })
  })

  message = "Meta(s) deletada(s) com sucesso"
}

const showMessages = () => {
  console.clear()

  if(message != ""){
    console.log(message)
    console.log("")
    message = ""
  }

}

const start = async () => {
 
  while (true) {
    showMessages()

    let opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Metas realizdas",
          value: "metas realizadas"
        },
        {
          name: "Metas abertas",
          value: "metas abertas"
        },
        {
          name: "Deletar metas",
          value: "deletar metas"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })
    switch (opcao) {
      case "cadastrar":
        await registerGoals()
        break
      case "listar":
        await listGoals()
        break
      case "metas realizadas":
        await goalAccomplished()
        break
      case "metas abertas":
        await openedGoals()
        break
      case "deletar metas":
        await deleteGoals()
        break
      case "sair":
        console.log("até a proxima")
        return
    }
  }
}

start()