
function PreVisualizacao() {
    const PreVisualizacao = document.getElementById("PreVisualizacao");
    const SelectCor = document.getElementById("SelectCor");
    const SelectTextura = document.getElementById("SelectTextura");

    PreVisualizacao.style.backgroundColor = SelectCor.value;
    PreVisualizacao.style.backgroundImage = SelectTextura.value ? `url(${SelectTextura.value})` : "none";
    PreVisualizacao.style.backgroundSize = "contain";
    PreVisualizacao.style.backgroundBlendMode = "multiply";
}