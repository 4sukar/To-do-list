class Tarefa {
    constructor(titulo, responsavel, prioridade, inicio, fim, observacao) {
      this.id = Date.now();
      this.titulo = titulo;
      this.responsavel = responsavel;
      this.prioridade = prioridade;
      this.inicio = inicio;
      this.fim = fim;
      this.observacao = observacao;
      this.concluida = false;
    }
  }
  
  class App {
    constructor() {
      this.tarefas = [];
      this.carregarEventos();
    }
  
    carregarEventos() {
      document.querySelector("#formTarefa").addEventListener("submit", e => {
        e.preventDefault();
        this.adicionarTarefa();
      });
  
      document.querySelector("#btnGravar").addEventListener("click", () => this.gravarDados());
      document.querySelector("#btnRecuperar").addEventListener("click", () => this.recuperarDados());
      document.querySelector("#btnLimpar").addEventListener("click", () => this.limparDados());
    }
    
    adicionarTarefa() {
      const titulo = document.querySelector("#titulo").value.trim();
      const responsavel = document.querySelector("#responsavel").value.trim();
      const prioridade = document.querySelector("#prioridade").value;
      const inicio = document.querySelector("#inicio").value;
      const fim = document.querySelector("#fim").value;
      const observacao = document.querySelector("#observacao").value.trim();
  
      if (!titulo || !responsavel || !prioridade || !inicio || !fim) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
  
      const tarefa = new Tarefa(titulo, responsavel, prioridade, inicio, fim, observacao);
      this.tarefas.push(tarefa);
      this.atualizarLista();
      document.querySelector("#formTarefa").reset();
    }
  
    atualizarLista() {
      const pendentes = document.querySelector("#listaPendentes");
      const concluidas = document.querySelector("#listaConcluidas");
      pendentes.innerHTML = "";
      concluidas.innerHTML = "";
  
      this.tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.className = "list-group-item";
  
        li.innerHTML = `
          <div>
            <strong>${tarefa.titulo}</strong> <small>(${tarefa.responsavel})</small><br>
            <small>📅 ${tarefa.inicio} → ${tarefa.fim} | 🔺${tarefa.prioridade}</small><br>
            <small>${tarefa.observacao}</small>
          </div>
          <div>
            ${
              tarefa.concluida
                ? `<button class="btn btn-danger btn-sm" data-id="${tarefa.id}" data-acao="excluir">Excluir</button>`
                : `<button class="btn btn-success btn-sm" data-id="${tarefa.id}" data-acao="concluir">Concluir</button>`
            }
          </div>
        `;
  
        if (tarefa.concluida) concluidas.appendChild(li);
        else pendentes.appendChild(li);
      });
  
      document.querySelectorAll("button[data-acao]").forEach(btn => {
        btn.addEventListener("click", e => {
          const id = Number(e.target.dataset.id);
          const acao = e.target.dataset.acao;
          if (acao === "concluir") this.concluirTarefa(id);
          else this.excluirTarefa(id);
        });
      });
    }
  
    concluirTarefa(id) {
      const tarefa = this.tarefas.find(t => t.id === id);
      if (tarefa) tarefa.concluida = true;
      this.atualizarLista();
    }
  
    excluirTarefa(id) {
      this.tarefas = this.tarefas.filter(t => t.id !== id);
      this.atualizarLista();
    }
  
    gravarDados() {
      localStorage.setItem("tarefasEvento", JSON.stringify(this.tarefas));
      alert("Dados gravados com sucesso!");
    }
  
    recuperarDados() {
      const dados = localStorage.getItem("tarefasEvento");
      if (dados) {
        this.tarefas = JSON.parse(dados);
        this.atualizarLista();
        alert("Dados recuperados!");
      } else {
        alert("Nenhum dado encontrado.");
      }
    }
  
    limparDados() {
      localStorage.removeItem("tarefasEvento");
      this.tarefas = [];
      this.atualizarLista();
      alert("Dados limpos!");
    }
  }
  
  const app = new App();
  