const fs = require('fs');
const readline = require('readline');

// 전설
const legendaryPokemonIds = [144, 145, 146, 
    
    
let pokemonList = [];
fs.readFile('./pokemon.json', 'utf8', (err, data) => {
    if (err) {
        console.error('포켓몬 데이터를 불러오는 중 오류 발생:', err);
        return;
    }
    try {
        pokemonList = JSON.parse(data);
        console.log(`총 ${pokemonList.length}개의 포켓몬을 불러왔습니다.`);
    } catch (parseErr) {
        console.error('포켓몬 데이터를 파싱하는 중 오류 발생:', parseErr);
    }
});

//
function getPokemonLevel(isLegendary) {
    if (isLegendary) {
        return Math.floor(Math.random() * (51 - 40)) + 40;
    } else {
        const rand = Math.random();
        if (rand < 0.950) return Math.floor(Math.random() * (10 - 1)) + 1;
        if (rand < 0.980) return Math.floor(Math.random() * (20 - 1)) + 1;
        if (rand < 0.990) return Math.floor(Math.random() * (30 - 1)) + 1;
        if (rand < 0.991) return Math.floor(Math.random() * (40 - 1)) + 1;
        return Math.floor(Math.random() * (50 - 1)) + 1;
    }
}

//
function getFleeChance(isLegendary) {
    return isLegendary ? 0.90 : 0.30;
}

//
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function explore() {
    if (pokemonList.length === 0) {
        console.log('포켓몬 데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    } else {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = pokemonList[randomIndex];
        
        const isLegendary = legendaryPokemonIds.includes(randomIndex + 1) && Math.random() < 0.001;

        const level = getPokemonLevel(isLegendary);

        console.log(`앗! 야생의 ${randomPokemon}을(를) 발견했다! (Lv.${level})`);

        rl.question('무엇을 하시겠습니까? (포획/도망): ', (answer) => {
            if (answer.toLowerCase() === '포획') {
                const isCaptured = Math.random() < 0.5;

                if (isCaptured) {
                    console.log(`신난다~! ${randomPokemon}을(를) 잡았다!`);
                } else {
                    const fleeChance = getFleeChance(isLegendary);
                    const hasFled = Math.random() < fleeChance;

                    if (hasFled) {
                        console.log(`${randomPokemon}이(가) 도망쳤습니다.`);
                    } else {
                        console.log(`${randomPokemon}을(를) 잡지 못했습니다.`);
                    }
                }
            } else {
                console.log('성공적으로 도망쳤습니다!');
            }

            promptForCommand();
        });
    }
}

function promptForCommand() {
    rl.question('탐사를 시작하려면 "탐사"를 입력하세요 (종료하려면 "exit" 입력): ', (input) => {
        if (input.toLowerCase() === '탐사') {
            explore();
        } else if (input.toLowerCase() === 'exit') {
            console.log('Exit . . .');
            rl.close();
        } else {
            console.log('잘못된 입력입니다. 다시 시도해주세요.');
            promptForCommand();
        }
    });
}

console.log('Running . . .');
promptForCommand();
