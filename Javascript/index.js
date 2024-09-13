const { select, input, checkbox } = require('@inquirer/prompts')

const metas = []

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
    choices: [...metas]
  })

  metas.forEach(m => {
    m.checked = false
  })

  if (!replies.length) {
    console.log("Nenhuma meta selecionada")
    return
  }

  replies.forEach(reply => {
    const meta = metas.find(meta => {
      return meta.value == reply
    })


    meta.checked = true
  })

  console.log('Metas concluidas ou não')
}

const goalAccomplished = async () => {
  const accomplish = metas.filter((meta) => {
    return meta.checked
  })

  if (!accomplish.length) {
    console.log("nenhuma meta foi realizada")
    return
  }

  console.log(accomplish)
}

const openedGoals = async() => {
  const openeds = metas.filter( (meta) =>{
    return !meta.checked
  } )

  if (!openeds.length) {
    console.log("nenhuma metas esta aberta")
    return
  }

  console.log(openeds)
}

const start = async () => {
  while (true) {
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
      case "sair":
        console.log("até a proxima")
        return
    }
  }
}

start()