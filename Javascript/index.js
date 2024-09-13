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

  if(!replies.length){
    return console.log("Nenhuma meta selecionada")
  }

  replies.forEach(reply => {
    const meta = metas.find(meta => {
      return meta.value == reply
    })

    meta.checked = true
  })

  console.log('Metas concluidas ou não')
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
      case "sair":
        console.log("até a proxima")
        return
    }
  }
}

start()