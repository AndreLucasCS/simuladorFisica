
/* 

    Javascript para a página Sandbox do simulador de física.
    26/09/2026, sábado.

*/



// ===============================================================================

// VARIÁVEIS E ARRAYS GLOBAIS:




// Objetos do DOM ~~~~~~~~~~~~~~~~~~~~~~
const Cabecalho = document.getElementById("Cabecalho");
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
let blocosInclicaveis = true; 

// eventos ~~~~~~~~~~~~~~~~~~~
let clique = false;
let dblclique = false;

// Variáveis globais ~~~~~~~~~~~~~~~~~~~~~
let pecaSelecionada = null;
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (evento) => {
    mouseX = evento.clientX;
    mouseY = evento.clientY;
});

// Arrays globais ~~~~~~~~~~~~~~~~~~~~~
let pecas = [];


// ==============================================================================

// FUNÇÕES GERAIS:




// Funções de criação e descarte de peças ~~~~~~~~~~~~~~~~~~~~
function CriarPeca() { modo = "criar"; // Definindo o sistema para o modo de criação de peças
    
    // **** "essa função apenas cria um objeto representando a nova peça. A peça não será desenhada ainda" ****

    // verifica se a massa foi definida
    if (InputMassa.value && InputMassa.value > 0) {


        // cria um objeto representando a nova peça
        let novaPecaObjt = {

            // propriedades personalizadas:
            massa: parseFloat(InputMassa.value),
            atrito: parseFloat(InputAtrito.value) || 0,
            cor: SelectCor.value || "black",
            textura: SelectTextura.value || null,

            // propriedades físicas:
            position: { x: 100, y: 100 }, // posição inicial (px)
            Fr: { x: 0, y: 0 }, // força resultante (N)
            V: { x: 0, y: 0 }, // velocidade (m/s²)

            // proporções:
            width: 60, // comprimento (px)
            height: 60, // altura (px)

        }

        // adiciona a nova peça ao array de peças
        pecas.push(novaPecaObjt);
        console.log("Peça criada:", novaPecaObjt);
        console.log("Array de peças:", pecas);
        

        // trocar para o modo "mover" para deslocar a peca criada
        modo = "mover";
        pecaSelecionada = pecas.length-1;

        
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


// Funções de interação com o sandbox ~~~~~~~~~~~~~~~~
function InteragirSandbox() {
    interacaoAtiva = true;
    AreaSimulada.style.cursor = "pointer";
}

function NaoInteragirSandbox() {
    interacaoAtiva = false;
    AreaSimulada.style.cursor = "default";
}

function Clicou() {
    clique = true;
}

function DblClicada() {
    dblclique = true
}

function LiberouClique() {
    setTimeout(() => {
        clique = false; dblclique = false
    }, 100);
}

function ClicouPeca() {
    console.log("Clicou na peça! **************************************")
}


// Funções de atualização da renderização e recalculação do motor de física ~~~~~~~~~~~~~~~~~~~~
function recalcularMotorFisico() {

    // recalculando a posição de todos os objetos da lista (array) de peças
    for (let i = 0; i < pecas.length; i++) {
        
        // tratando a peca de maneira diferente se ela for a selecionada
        if (i === pecaSelecionada) {
            
            // verificando se o modo é "mover" para move-la
            if (modo === "mover") {

                pecas[i].position.x = mouseX - (pecas[i].width / 2);
                pecas[i].position.y = mouseY - (pecas[i].height / 2) - Cabecalho.offsetHeight;

                if (clique) {
                    modo = "selecionar";
                }

            }
        }

    }

}

function redesenharTela() {
    
    for (let i = 0; i < pecas.length; i++) {
        
        let pecaCriada = document.createElement("div");

        pecaCriada.style.position = "absolute"
        pecaCriada.style.top = `${pecas[i].position.y}px`;
        pecaCriada.style.left = `${pecas[i].position.x}px`;
        pecaCriada.style.width = `${pecas[i].width}px`;
        pecaCriada.style.height = `${pecas[i].height}px`;
        pecaCriada.style.backgroundColor = pecas[i].cor;
        pecaCriada.style.backgroundBlendMode = "multiply";
        pecaCriada.addEventListener("click", ClicouPeca);

        if (pecas[i].textura !== "none") {
            pecaCriada.style.backgroundImage = `url(${pecas[i].textura})`; 
            pecaCriada.style.backgroundRepeat = "repeat";
        };

        if (blocosInclicaveis === true) {
            pecaCriada.style.pointerEvents = "none";
        };

        AreaSimulada.appendChild(pecaCriada);
        
    }

}

function limpandoTela() {
    AreaSimulada.replaceChildren()
    redesenharTela()
}

function atualizarSimulador() {

    recalcularMotorFisico()
    limpandoTela()

    requestAnimationFrame(atualizarSimulador);

}




// Funções diversas ~~~~~~~~~~~~~~~~~~~~
function PreVisualizar() {
    PreVisualizacao.style.backgroundColor = SelectCor.value;
    PreVisualizacao.style.backgroundImage = SelectTextura.value ? `url(${SelectTextura.value})` : "none";
    PreVisualizacao.style.backgroundBlendMode = "multiply";
};


requestAnimationFrame(atualizarSimulador);