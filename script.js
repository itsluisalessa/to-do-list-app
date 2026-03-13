let tarefas = [];

let tarefasSalvas = localStorage.getItem("tarefas");
if(tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
}

let botaoTarefa = document.getElementById("botao-tarefa");
let lista = document.getElementById("lista");

botaoTarefa.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {
    
    let tarefa = document.getElementById("tarefa").value.trim();

    if (tarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }

    let novaTarefa = {
    texto: tarefa,
    concluida: false
    };

    tarefas.push(novaTarefa);
    salvarTarefas();
    renderizarTarefas();

    document.getElementById("tarefa").value = "";

}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {

    lista.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {

        let item = document.createElement("li");

        let texto = document.createElement("span");
        texto.textContent = tarefas[i].texto;

        if (tarefas[i].concluida) {
            texto.style.textDecoration = "line-through";
            texto.style.color = "gray";
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefas[i].concluida;

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";

        checkbox.addEventListener("change", function() {
        tarefas[i].concluida = checkbox.checked;
        salvarTarefas();
        renderizarTarefas();
        });
        
        botaoRemover.addEventListener("click", function () {
            removerTarefa(i);
        });

        item.appendChild(texto);
        item.appendChild(checkbox);
        item.appendChild(botaoRemover);
        lista.appendChild(item);

    }

    

}

function removerTarefa(index) {
    tarefas.splice(index, 1);

    salvarTarefas();
    renderizarTarefas();
}



renderizarTarefas();
