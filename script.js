let botaoTarefa = document.getElementById("botao-tarefa");
let lista = document.getElementById("lista");

botaoTarefa.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {
    
    let tarefa = document.getElementById("tarefa").value.trim();

    if (tarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }

    let novaTarefa = document.createElement("li");
    novaTarefa.textContent = tarefa;

    lista.appendChild(novaTarefa);

    document.getElementById("tarefa").value = "";

    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    
    botaoRemover.addEventListener("click", removerTarefa);

    novaTarefa.appendChild(botaoRemover);
    
}

function removerTarefa() {
        this.parentElement.remove();
}
