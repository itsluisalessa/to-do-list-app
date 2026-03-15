let tarefas = [];

let tarefasSalvas = localStorage.getItem("tarefas");
if(tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
}

let botaoTarefa = document.getElementById("botao-tarefa");
let lista = document.getElementById("lista");
let inputTarefa = document.getElementById("tarefa");

botaoTarefa.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

function adicionarTarefa() {
    
    let tarefa = inputTarefa.value.trim();

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
            texto.classList.add("concluida");
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefas[i].concluida;

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";

        checkbox.addEventListener("change", function() {
        tarefas[i].concluida = checkbox.checked;
        if (checkbox.checked) {
        texto.classList.add("concluida");
        } else {
        texto.classList.remove("concluida");
        }
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

    let contador = document.getElementById("contador");

    let totalTarefas = tarefas.length;
    
    let concluidas = 0;

    tarefas.forEach(tarefa => {
        if (tarefa.concluida) {
        concluidas++;
        }
    });

    let pendentes =  totalTarefas - concluidas;

    contador.textContent = `Total: ${totalTarefas} | Concluídas: ${concluidas} | Pendentes: ${pendentes}`;
}

function removerTarefa(index) {
    tarefas.splice(index, 1);

    salvarTarefas();
    renderizarTarefas();
}

renderizarTarefas();
