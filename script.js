document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       1. CONTROLE DE TAMANHO DA FONTE (A- / A / A+)
       ======================================================== */
    const htmlElement = document.documentElement;
    const btnAumentar = document.getElementById("btn-aumentar-fonte");
    const btnDiminuir = document.getElementById("btn-diminuir-fonte");
    const btnReset = document.getElementById("btn-reset-fonte");
  
    let tamanhoFonteAtual = 20;
    const limiteMinimo = 16;
    const limiteMaximo = 32;
  
    function atualizarTamanhoFonte(novoTamanho) {
      tamanhoFonteAtual = novoTamanho;
      htmlElement.style.fontSize = `${tamanhoFonteAtual}px`;
    }
  
    if (btnAumentar && btnDiminuir && btnReset) {
      btnAumentar.addEventListener("click", () => {
        if (tamanhoFonteAtual < limiteMaximo) {
          atualizarTamanhoFonte(tamanhoFonteAtual + 2);
        }
      });
  
      btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonteAtual > limiteMinimo) {
          atualizarTamanhoFonte(tamanhoFonteAtual - 2);
        }
      });
  
      btnReset.addEventListener("click", () => {
        atualizarTamanhoFonte(20);
      });
    }
  
    /* ========================================================
       2. CONTROLE DE ALTO CONTRASTE
       ======================================================== */
    const btnContraste = document.getElementById("btn-contraste");
  
    if (btnContraste) {
      btnContraste.addEventListener("click", () => {
        document.body.classList.toggle("alto-contraste");
      });
    }
  
    /* ========================================================
       3. LEITURA EM VOZ ALTA (TEXT-TO-SPEECH)
       ======================================================== */
    const btnOuvir = document.getElementById("btn-ouvir-site");
    let lendo = false;
  
    if (btnOuvir) {
      btnOuvir.addEventListener("click", () => {
        // Se já estiver lendo, cancela a leitura
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          lendo = false;
          atualizarBotaoOuvir(false);
          return;
        }
  
        // Coleta o texto do banner e dos cards
        const bannerText = document.querySelector(".hero-conteudo")?.innerText || "";
        const conteudoText = document.querySelector(".conteudo-principal")?.innerText || "";
        const textoCompleto = `${bannerText}. ${conteudoText}`;
  
        if ('speechSynthesis' in window) {
          const mensagem = new SpeechSynthesisUtterance(textoCompleto);
          mensagem.lang = 'pt-BR';
          mensagem.rate = 0.9; // Velocidade levemente reduzida para facilitar o entendimento
  
          mensagem.onend = () => {
            lendo = false;
            atualizarBotaoOuvir(false);
          };
  
          mensagem.onerror = () => {
            lendo = false;
            atualizarBotaoOuvir(false);
          };
  
          window.speechSynthesis.speak(mensagem);
          lendo = true;
          atualizarBotaoOuvir(true);
        } else {
          alert("Seu navegador não suporta a leitura em voz alta.");
        }
      });
    }
  
    function atualizarBotaoOuvir(estaLendo) {
      const txtBtn = btnOuvir.querySelector(".txt-btn");
      if (estaLendo) {
        if (txtBtn) txtBtn.textContent = "Parar Leitura";
        btnOuvir.style.backgroundColor = "#dc2626";
      } else {
        if (txtBtn) txtBtn.textContent = "Ouvir Site";
        btnOuvir.style.backgroundColor = "#8b5cf6";
      }
    }
  
    /* ========================================================
       4. CONTROLE DO MODAL DE AJUDA
       ======================================================== */
    const modalAjuda = document.getElementById("modal-ajuda");
    const btnAbrirModal = document.getElementById("btn-abrir-modal");
    const btnFecharModal = document.getElementById("btn-fechar-modal");
    const btnFecharX = document.getElementById("btn-fechar-x");
  
    function abrirModal() {
      if (modalAjuda) modalAjuda.classList.add("ativo");
    }
  
    function fecharModal() {
      if (modalAjuda) modalAjuda.classList.remove("ativo");
    }
  
    if (btnAbrirModal) btnAbrirModal.addEventListener("click", abrirModal);
    if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModal);
    if (btnFecharX) btnFecharX.addEventListener("click", fecharModal);
  
    if (modalAjuda) {
      modalAjuda.addEventListener("click", (e) => {
        if (e.target === modalAjuda) {
          fecharModal();
        }
      });
    }
  
  });