export function handle(error, res) {
    switch (error.message) {
        case 'CEP não encontrado':
            res.status(404).send({ "erro": error.message })
            break;
        default:
            res.status(400).send({ "erro": error.message });
    }
}