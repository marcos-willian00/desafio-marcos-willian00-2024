class RecintosZoo {
    constructor() {
        this.animaisPermitidos = [
            { especie: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true },
            { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true },
            { especie: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true },
            { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            { especie: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false },
            { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        ];

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        const animalInfo = this.animaisPermitidos.find(a => a.especie === animal);
        if (!animalInfo) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const tamanhoNecessario = quantidade * animalInfo.tamanho;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            if (!animalInfo.biomas.includes(recinto.bioma) &&
                !(animal === "HIPOPOTAMO" && recinto.bioma === "savana e rio")) {
                continue;
            }

            const espacoOcupado = recinto.animais.reduce((total, a) => {
                const especie = this.animaisPermitidos.find(e => e.especie === a.especie);
                return total + (a.quantidade * especie.tamanho);
            }, 0);

            const outrasEspecies = recinto.animais.some(a => a.especie !== animal);

            const espacoExtra = outrasEspecies ? 1 : 0;

            const espacoLivre = recinto.tamanho - espacoOcupado - espacoExtra;

            if (animalInfo.carnivoro && recinto.animais.some(a => this.animaisPermitidos.find(e => e.especie === a.especie).carnivoro && a.especie !== animal)) {
                continue;
            }

            if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio" && recinto.animais.length > 0) {
                continue;
            }

            if (animal === "MACACO" && recinto.animais.length === 0) {
                continue;
            }

            if (espacoLivre >= tamanhoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoNecessario} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length > 0) {
            return { erro: null, recintosViaveis };
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
    }
}

export { RecintosZoo as RecintosZoo };
