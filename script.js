
/* 

    Javascript para a página Sandbox do simulador de física.
    26/09/2026, sábado.

*/


// -----------------------------------------------------------------------------

// VARIÁVEIS E ARRAYS GLOBAIS:


// Objetos do DOM ~~~~~~~~~~~~~~~~~~~~~~
const BotaoCriar = document.getElementById("BotaoCriar");
const InputMassa = document.getElementById("InputMassa");
const InputAtrito = document.getElementById("InputAtrito");
const SelectCor = document.getElementById("SelectCor");
const SelectTextura = document.getElementById("SelectTextura");
const PreVisualizacao = document.getElementById("PreVisualizacao");
const BotaoConfig = document.getElementById("BotaoConfiguracoes");
const BotaoDeletar = document.getElementById("BotaoDeletar");
const BotaoSelecionar = document.getElementById("BotaoSelecionar");
const BotaoMover = document.getElementById("BotaoMover");
const BotaoRedimensionar = document.getElementById("BotaoRedimensionar");
const BotaoVisualizar = document.getElementById("BotaoVisualizar");
const AreaSimulada = document.getElementById("AreaSimulada");

// Constantes físicas ~~~~~~~~~~~~~~~~~~~~~
const g = 9.81; // Aceleração da gravidade (m/s²)

// Estados do simulador ~~~~~~~~~~~~~~~~~~~~~
let modo = "selecionar"; // "selecionar", "mover", "redimensionar", "criar" ...
let interacaoAtiva = false;

// Variáveis globais ~~~~~~~~~~~~~~~~~~~~~
let pecaSelecionada = null;

// Arrays globais ~~~~~~~~~~~~~~~~~~~~~
let pecas = [

];


// -----------------------------------------------------------------------------

// FUNÇÕES GERAIS:


// Funções de criação e descarte de peças ~~~~~~~~~~~~~~~~~~~~
function CriarPeca() { modo = "criar";
    
    // Verifica se a massa foi definida
    if (InputMassa.value && InputMassa.value > 0) {


        // Cria um objeto representando a nova peça
        let novaPeca = {

            // Propriedades personalizadas
            massa: parseFloat(InputMassa.value),
            atrito: parseFloat(InputAtrito.value) || 0,
            cor: SelectCor.value || "black",
            textura: SelectTextura.value || null,

            // Propriedades físicas
            posicao: { x: 100, y: 100 }, // Posição inicial (pode ser ajustada)
            forcaResultante: { x: 0, y: 0 }, // Força resultante
            velocidade: { x: 0, y: 0 }, // Velocidade

        }

        // Adiciona a nova peça ao array de peças
        pecas.push(novaPeca);
        console.log("Peça criada:", novaPeca);
        console.log("Array de peças:", pecas);
        
    } else {
        alert("Por favor, defina a massa antes de criar uma peça.");
        modo = "selecionar";
        return;
    }
    
};

function DeletarPeca() { modo = "deletar";
    
};

// Funções de manipulação de peças ~~~~~~~~~~~~~~~~~~~~
function SelecionarPeca() { modo = "selecionar";
    
}

function MoverPeca() { modo = "mover";
    
}

function RedimensionarPeca() { modo = "redimensionar";
    
}


// Funções de renderização e calculos do motor de física ~~~~~~~~~~~~~~~~~~~~
function atualizarTela() {}




// Funções diversas ~~~~~~~~~~~~~~~~~~~~
function PreVisualizar() {
    PreVisualizacao.style.backgroundColor = SelectCor.value;
    PreVisualizacao.style.backgroundImage = SelectTextura.value ? `url(${SelectTextura.value})` : "none";
    PreVisualizacao.style.backgroundSize = "contain";
    PreVisualizacao.style.backgroundBlendMode = "multiply";
};

function PermitirInteracao() {
    interacaoAtiva = true;
    AreaSimulada.style.cursor = "pointer";
}

function BloquearInteracao() {
    interacaoAtiva = false;
    AreaSimulada.style.cursor = "default";
}