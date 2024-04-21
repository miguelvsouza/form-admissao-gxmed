// A variável cpfConsultado serve para validar se o usuário não está tentando consultar novamente o mesmo CPF. Isso evita o gasto desnecessário de créditos.
let cpfConsultado = ''

// Formatação do value do campo CPF para o formato "000.000.000-00"
function formatCpf(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.substring(0, 11)
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    return cpf
}

// Formatação do value do campo CEP para o formato "00000-000"
function formatCep(cep) {
    cep = cep.replace(/\D/g, "")
    cep = cep.substring(0, 8)
    if (cep.length >= 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5)
    }

    return cep
}

// Formata uma data de "dd/mm/aaaa" para "yyyy/mm/dd
function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Quando essa função é chamada, realiza um GET na API CpfCnpj e retorna um objeto com informações como nome, data de nascimento, nome da mãe e gênero que são imputadas aos campos do formulário através de um for in
async function consultarCpf(cpf) {
    const response = await (await fetch(`https://api.cpfcnpj.com.br/${tokenApiCpfCnpj}/2/${cpf}`)).json()

    if (response.status == '1') {
        cpfConsultado = cpf
        for (const key in response) {
            if (document.getElementById(key)) {
                const value = key === 'nascimento' ? convertDateFormat(response[key]) : response[key]
                document.getElementById(key).value = value
            }
        }
    } else {
        alert(`Erro: ${response.erro}`)
        const cpf = document.getElementById('cpf')
        cpf.value = ''
        cpf.focus()
    }
}

// Realiza um GET na API viacep e retorna um objeto com informações do endereço que são imputadas em seus respectivos campos. Após, dá foco no campo de número para o usuário continuar o preenchimento.
async function consultarCep(cep) {
    const response = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()

    if (response.erro === true) {
        alert('CEP não encontrado')
    } else {
        for (const key in response) {
            if (document.getElementById(key)) {
                document.getElementById(key).value = response[key]
            }
        }
        document.getElementById('numero').focus()
    }
}

// Event listener para o campo de CPF que chama a função formatCpf
document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = formatCpf(e.target.value)
    const cpf = e.target.value.replace(/\D/g, "")
    if (cpf.length == 11 && cpf != cpfConsultado) {
        consultarCpf(cpf)
    }
})

// Event listener para o campo de CEP que chama a função formatCep e caso o CEP já esteja preenchido chama também a função consultaCep
document.getElementById('cep').addEventListener('input', function (e) {
    e.target.value = formatCep(e.target.value)

    const cep = e.target.value.replace(/\D/g, "")
    if (cep.length == 8) {
        consultarCep(cep)
    }
})