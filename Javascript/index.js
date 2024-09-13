const { select, input } = require('@inquirer/prompts')
const metas = []


const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta" })

  if (!meta.length) {
    console.log("A meta não pode ser vazia")
    return cadastrarMeta()
  }
  
  metas.push({ value: meta, checked: false })
}

const listItens = () => {
  console.log(metas)
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
        await cadastrarMeta()
        break
      case "listar":
        listItens()
        break
      case "sair":
        console.log("até a proxima")
        return
    }
  }
}

start()