const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''
let gameEnded = false
function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() { 
    // Inicializa as variáveis globais 
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    gameEnded = false
    // Ajusta o título da página (caso seja necessário)
    document.querySelector('h2').innerHTML = 'Vez de <span id="turnPlayer"></span>'
    updateTitle()
    // Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
    boardRegions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]) //verificando se a posição esta vazia - vBoard[0][0] && vBoard[0][0]
      winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

// Desabilita uma região do tabuleiro para que não seja mais clicável, //função para não clicar duas vezes
function disableRegion(element) {
    element.classList.remove('cursor-pointer') //reomvendo a class css q deixa com o cursor pointer
    element.removeEventListener('click', handleBoardClick)
} 


// Pinta as regiões onde o jogador venceu e mostra seu nome na tela
function handleWin(regions) {
    regions.forEach(function (region) { //função de callback - region
        document.querySelector('[data-region="' + region + '"]').classList.add('win') //selecionando o elemento da região e classList pegando a classe win do css
    })  
    const playerName = document.getElementById(turnPlayer).value //selecionando o nome do jogador
    document.querySelector('h2').innerHTML = playerName + ' venceu!' //exibindo o nome do jogandor na tela
    gameEnded = true
}

function handleBoardClick(ev){
  // Verifica se os nomes dos jogadores foram preenchidos
  const player1Name = document.getElementById('player1').value
  const player2Name = document.getElementById('player2').value
  if (player1Name.trim() === '' || player2Name.trim() === '') {
      alert('Por favor, preencha os nomes dos jogadores antes de começar o jogo.')
      return
  }  
  // Obtém os índices da região clicada   
    const span = ev.currentTarget
    const region = span.dataset.region // N.N
    const rowColumnPair = region.split('.') //split serve para dividir uma string e transforma-la em array, nesse caso vai quebrar a string quando tiver um ponto
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if (gameEnded) {
      return;
    }
    // Marca a região clicada com o símbolo do jogador
    if (turnPlayer === 'player1') {
        span.innerText = 'X'
        vBoard[row][column] = 'X'
        span.setAttribute("style", "color: #2AC3BE;")
      } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
        span.setAttribute("style", "color: #F2B336;")
    }

    console.clear()  // Limpa o console e exibe nosso tabuleiro virtual
    console.table() //pega um dado/informação e tenta mostrar em uma tabela 
    // Desabilita a região clicada
    disableRegion(span)

    // Verifica se alguém venceu
    const winRegions = getWinRegions()
    if (winRegions.length > 0){ //verificando se tem alguma coisa dentro do winRegions
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')) { //esse if ta verificando se tem algum espaço vazio (depois de verificar se alguém venceu)//flat retorna um novo array com todos os elementos (subarrays) concatenados em um único array, unidimensional
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1' //if ternario (de uma linha só) se a vez do jogador for do player1 vai atribuir ao player2 se não, atribui ao player1
        updateTitle() //para trocar o titulo
    }else { //se ngm venceu e não tem mais nenhuma região vazia é pq deu empate
        document.querySelector('h2').innerHTML = 'Empate!' //innerHTML no lugar de innerText vai remover todo o conteudo do html
      }
}

function resetGame(){ 
  document.getElementById('player1').value = ''
  document.getElementById('player2').value = ''
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  gameEnded = false
  document.querySelector('h2').innerHTML = 'Vez de <span id="turnPlayer"></span>'
    boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
  })
}

// Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)

document.getElementById('reset').addEventListener('click', resetGame)

