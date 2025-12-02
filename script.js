// script.js

// Função para lidar com a compra de produtos
function comprar(produto, url) {
    if (produto && url) {
        // Para produtos com parâmetros específicos (como o Samsung S24 Ultra)
        const confirmacao = confirm(`Você deseja comprar o ${produto}?`);
        if (confirmacao) {
            alert(`Compra do ${produto} realizada com sucesso! Redirecionando para a página de pagamento.`);
            // Simula redirecionamento (substitua pela URL real se necessário)
            window.location.href = url;
        }
    } else {
        // Para produtos sem parâmetros (como iPhone e Xiaomi)
        const confirmacao = confirm("Você deseja comprar este produto?");
        if (confirmacao) {
            alert("Compra realizada com sucesso! (Simulação - em um site real, isso levaria a um checkout)");
            // Aqui você poderia adicionar lógica para adicionar ao carrinho, enviar dados para um servidor, etc.
        }
    }
}

// Adiciona interatividade aos links de navegação (scroll suave para seções)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove o '#'
            
            let targetSection;
            if (targetId === 'Inicio') {
                targetSection = document.querySelector('header'); // Vai para o topo
            } else if (targetId === 'Produtos') {
                targetSection = document.querySelector('.produtos');
            } else if (targetId === 'Promocoes') {
                targetSection = document.querySelector('.propaganda');
            } else if (targetId === 'Contato') {
                targetSection = document.querySelector('footer');
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Adiciona efeito de hover nos cards de produtos para melhor interatividade
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
// script.js

// Carrinho de compras (array de objetos)
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto, preco, url) {
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === produto);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome: produto, preco: parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.')), quantidade: 1, url: url });
    }
    atualizarCarrinho();
    alert(`${produto} adicionado ao carrinho!`);
}

// Função para remover produto do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-container');
    if (!carrinhoContainer) return;

    const listaItens = document.getElementById('carrinho-itens');
    const totalElement = document.getElementById('carrinho-total');
    const contador = document.getElementById('carrinho-contador');

    listaItens.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${(item.preco * item.quantidade).toFixed(2)}
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        listaItens.appendChild(li);
        total += item.preco * item.quantidade;
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    contador.textContent = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
}

// Função para mostrar/esconder a barra do carrinho
function toggleCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.classList.toggle('ativo');
}

// Função para lidar com a compra (agora adiciona ao carrinho)
function comprar(produto, url) {
    let preco = '';
    if (produto === 'Samsung S24 Ultra') {
        preco = '4799.00';
    } else if (produto === 'Produto 1') {
        preco = '5000.00'; // Exemplo, já que não há preço no HTML
    } else if (produto === 'produto 3') {
        preco = '9179.99';
    } else {
        preco = '0.00'; // Fallback
    }
    adicionarAoCarrinho(produto, preco, url);
}

// Inicializa o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Cria a barra lateral do carrinho dinamicamente
    const carrinhoHTML = `
        <div id="carrinho-container" class="carrinho-barra">
            <button id="carrinho-toggle" onclick="toggleCarrinho()">Carrinho (<span id="carrinho-contador">0</span>)</button>
            <div id="carrinho-conteudo">
                <h3>Seu Carrinho</h3>
                <ul id="carrinho-itens"></ul>
                <p id="carrinho-total">Total: R$ 0.00</p>
                <button onclick="finalizarCompra()">Finalizar Compra</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', carrinhoHTML);

    // Adiciona estilos básicos para a barra (pode ser movido para CSS)
    const style = document.createElement('style');
    style.textContent = `
        .carrinho-barra {
            position: fixed;
            top: 0;
            right: -300px;
            width: 300px;
            height: 100%;
            background-color: #f4f4f4;
            border-left: 1px solid #ccc;
            transition: right 0.3s ease;
            z-index: 1000;
            padding: 20px;
            box-sizing: border-box;
        }
        .carrinho-barra.ativo {
            right: 0;
        }
        #carrinho-toggle {
            position: absolute;
            left: -50px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px 0 0 5px;
        }
        #carrinho-conteudo h3 {
            margin-top: 0;
        }
        #carrinho-itens li {
            margin-bottom: 10px;
        }
        #carrinho-itens button {
            margin-left: 10px;
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Interatividade na navegação (mantido do código anterior)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            let targetSection;
            if (targetId === 'Inicio') {
                targetSection = document.querySelector('header');
            } else if (targetId === 'Produtos') {
                targetSection = document.querySelector('.produtos');
            } else if (targetId === 'Promoções') {
                targetSection = document.querySelector('.propaganda');
            } else if (targetId === 'Contato') {
                targetSection = document.querySelector('footer');
            }
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Efeitos nos cards (mantido)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Função para finalizar a compra (simulação)
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada! (Simulação - em um site real, isso levaria ao checkout)');
    carrinho = [];
    atualizarCarrinho();
}