
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
let estiloCursor = "auto"

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




// Funções de manipulação de peças ~~~~~~~~~~~~~~~~~~~~
function SelecionarPeca() { modo = "selecionar";

    console.log("Modo selecionar -------------------")
    estiloCursor = "default";

}

function MoverPeca() { modo = "mover";

    console.log("Modo mover -------------------")
    pecaSelecionada = null;
    estiloCursor = "grab";

}

function RedimensionarPeca() { modo = "redimensionar";

    console.log("Modo redimencionar -------------------")
    estiloCursor = "move";
    
}


// Funções de interação com o sandbox ~~~~~~~~~~~~~~~~
function InteragirSandbox() {
    interacaoAtiva = true;
}

function NaoInteragirSandbox() {
    interacaoAtiva = false;
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
}


// Funções de criação e descarte de peças ~~~~~~~~~~~~~~~~~~~~
function CriarPeca() { modo = "criar"; // Definindo o sistema para o modo de criação de peças

    // verifica se a massa foi definida antes de iniciar o processo 
    if (InputMassa.value && InputMassa.value > 0) {


        // criando um objeto representante da nova peça
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
            width: 100, // comprimento (px)
            height: 75, // altura (px)

        }

        // adiciona a nova peça ao array de peças
        pecas.push(novaPecaObjt);
        console.log("Peça criada:", novaPecaObjt);
        console.log("Array de peças:", pecas);


        // desenhando a peça como objeto DOM
        let pecaCriada = document.createElement("div");

        // ajustando suas propriedades
        pecaCriada.style.position = "absolute"
        pecaCriada.style.top = `${novaPecaObjt.position.y}px`;
        pecaCriada.style.left = `${novaPecaObjt.position.x}px`;
        pecaCriada.style.width = `${novaPecaObjt.width}px`;
        pecaCriada.style.height = `${novaPecaObjt.height}px`;
        pecaCriada.style.backgroundColor = novaPecaObjt.cor;
        pecaCriada.style.backgroundBlendMode = "multiply";
        pecaCriada.style.pointerEvents = "none";
        pecaCriada.addEventListener("click", ClicouPeca);
        if (novaPecaObjt.textura) {
            pecaCriada.style.backgroundImage = `url(${novaPecaObjt.textura})`; 
            pecaCriada.style.backgroundRepeat = "repeat";
            console.log("textura:", novaPecaObjt.textura)
        };

        // inserindo ela na área simulada
        AreaSimulada.appendChild(pecaCriada);


        // trocar para o modo "mover" para deslocar a peca criada
        MoverPeca()
        pecaSelecionada = pecas.length-1;

    } else {
        alert("Por favor, defina a massa antes de criar uma peça.");
        SelecionarPeca();
        return;
    }
    
};

function DeletarPeca() { modo = "deletar";
    
};


// Funções de atualização da renderização e recalculação do motor de física ~~~~~~~~~~~~~~~~~~~~

// **** "Essa função recalcula a posição das peças apartir do motor de física do simulador" ****
function recalcularMotorFisico() {

    // recalculando a posição de todos os objetos da lista (array) de peças
    for (let i = 0; i < pecas.length; i++) {
        
        // tratando a peca de maneira diferente se ela for a selecionada
        if (i === pecaSelecionada) {
            
            // verificando se o modo é "mover" para move-la
            if (modo === "mover") {

                estiloCursor = "grabbing";
                pecas[i].position.x = mouseX - (pecas[i].width / 2);
                pecas[i].position.y = mouseY - (pecas[i].height / 2) - Cabecalho.offsetHeight;

                if (clique) {
                    MoverPeca();
                    return
                }

            }
        }

    }

}

// **** "Essa função é responsável por traduzir todos as informações matemáticas em algo visível e interagível pelos usuários" ****
function redesenharTela() {
    
    for (let i = 0; i < pecas.length; i++) {
        
        // redefinindo posição e proporção
        AreaSimulada.children[i].style.left = `${pecas[i].position.x}px`;
        AreaSimulada.children[i].style.top = `${pecas[i].position.y}px`;
        AreaSimulada.children[i].style.width = `${pecas[i].width}px`;
        AreaSimulada.children[i].style.height = `${pecas[i].height}px`;
        
    }

    // ajustando propriedades
    AreaSimulada.style.cursor = estiloCursor

}


// **** "Essa função invoca as funções de redesenho e de recalculação em um loop rápido, atualizando o simulador" ****
function atualizarSimulador() {

    recalcularMotorFisico()
    redesenharTela()

    // agendando ciclo
    requestAnimationFrame(atualizarSimulador);

}




// Funções diversas ~~~~~~~~~~~~~~~~~~~~
function PreVisualizar() {

    if (SelectCor && SelectCor.value) {
        PreVisualizacao.style.backgroundColor = SelectCor.value;
    }

    if (SelectTextura && 
        SelectTextura.value && 
        SelectTextura.value !== "none" && 
        SelectTextura.value !== "") {
        
        PreVisualizacao.style.backgroundImage = `url('${SelectTextura.value}')`;
    } else {
        PreVisualizacao.style.backgroundImage = "none";
    }

    PreVisualizacao.style.backgroundBlendMode = "multiply";

}


requestAnimationFrame(atualizarSimulador);