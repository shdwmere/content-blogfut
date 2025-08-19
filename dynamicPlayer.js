// ==========================================
// SISTEMA DE PLAYER DINÂMICO
// ==========================================

let currentPlayerIndex = 0;

function renderDynamicPlayers() {
    const { embedLinks } = matchConfig;
    const playerSection = document.getElementById('dynamic-player-section');

    // Se não há links embed, não renderiza nada
    if (!embedLinks || embedLinks.length === 0) {
        playerSection.style.display = 'none';
        return;
    }

    playerSection.style.display = 'block';

    // Gerar HTML do container do player PRIMEIRO
    const playerHTML = `
                <div class="player-container" id="player-container">
                    <div class="player-title" id="player-title">${embedLinks[0].name} — ${embedLinks[0].quality}</div>
                    <iframe id="player-iframe" src="${embedLinks[0].url}" allowfullscreen></iframe>
                </div>
            `;

    // Gerar HTML dos botões DEPOIS (mais bonitos)
    let buttonsHTML = '<div class="player-buttons">';
    embedLinks.forEach((player, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const icon = getPlayerIcon(player.quality);
        buttonsHTML += `
                    <button class="player-btn ${activeClass}" onclick="switchPlayer(${index})" id="player-btn-${index}">
                        <div class="player-btn-text">
                            <span class="btn-icon">${icon}</span>
                            ${player.name} — ${player.quality}
                        </div>
                    </button>
                `;
    });
    buttonsHTML += '</div>';

    // Gerar HTML da informação
    const infoHTML = `
                <div class="player-info">
                    <strong>⚽ Dica:</strong> Se um player não funcionar, teste as outras opções acima. Para melhor experiência, prefira os players <strong>FULL HD</strong> e use conexão estável.
                </div>
            `;

    // Inserir todo o HTML na NOVA ORDEM: Player > Botões > Info
    playerSection.innerHTML = playerHTML + buttonsHTML + infoHTML;
}

function getPlayerIcon(quality) {
    switch (quality.toUpperCase()) {
        case 'FULL HD': return '🔴';
        case 'HD': return '🟠';
        case 'SD': return '🟡';
        default: return '▶️';
    }
}

function switchPlayer(index) {
    const { embedLinks } = matchConfig;

    if (!embedLinks || index >= embedLinks.length) return;

    // Adicionar estado loading no botão clicado
    const clickedBtn = document.getElementById(`player-btn-${index}`);
    clickedBtn.classList.add('loading');

    // Atualizar botões (remover active de todos)
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Atualizar player
    const iframe = document.getElementById('player-iframe');
    const playerTitle = document.getElementById('player-title');
    const playerContainer = document.getElementById('player-container');

    // Adicionar loading no container
    playerContainer.classList.add('loading');

    // Simular loading e trocar iframe com efeitos suaves
    setTimeout(() => {
        iframe.src = embedLinks[index].url;
        playerTitle.textContent = `${embedLinks[index].name} — ${embedLinks[index].quality}`;

        // Remover loading e ativar botão
        clickedBtn.classList.remove('loading');
        clickedBtn.classList.add('active');
        playerContainer.classList.remove('loading');
        currentPlayerIndex = index;

        // Adicionar pequena animação de sucesso
        clickedBtn.style.transform = 'translateY(-3px) scale(1.08)';
        setTimeout(() => {
            clickedBtn.style.transform = '';
        }, 200);

    }, 800); // Tempo um pouco maior para mostrar os efeitos
}

// ==========================================
// SISTEMA DE ATUALIZAÇÃO DINÂMICA
// ==========================================

function updatePageContent() {
    const { homeTeam, awayTeam, date, time, category, stadium, city, state, broadcast, ogImage, heroImage, isoDate } = matchConfig;

    // Atualizar título da página - OTIMIZADO PARA SEO
    const pageTitle = `Onde Assistir ${homeTeam.name} x ${awayTeam.name} Ao Vivo Grátis - ${date} | FutPlay`;
    document.getElementById('page-title').textContent = pageTitle;
    document.title = pageTitle;

    // Atualizar meta description - FOCO EM "ONDE ASSISTIR"
    const description = `🔴 ONDE ASSISTIR ${homeTeam.name} x ${awayTeam.name} ao vivo grátis hoje ${date}. Transmissão online HD do ${homeTeam.name} x ${awayTeam.name} na ${category}. Links gratuitos atualizados!`;
    document.getElementById('meta-description').content = description;

    // Atualizar meta keywords - SEO OTIMIZADO
    const keywords = `onde assistir ${homeTeam.name} ao vivo, onde assistir ${awayTeam.name} ao vivo, ${homeTeam.name} x ${awayTeam.name} ao vivo grátis, assistir ${homeTeam.name} online grátis, assistir ${awayTeam.name} online grátis, ${homeTeam.name} ${awayTeam.name} transmissão ao vivo, ${category} ao vivo grátis, futebol ao vivo online`;
    document.getElementById('meta-keywords').content = keywords;

    // Atualizar Open Graph - SEO OTIMIZADO
    document.getElementById('og-title').content = `🔴 Onde Assistir ${homeTeam.name} x ${awayTeam.name} Ao Vivo Grátis - ${date}`;
    document.getElementById('og-description').content = `Transmissão ao vivo gratuita de ${homeTeam.name} x ${awayTeam.name}. Links atualizados para assistir online em HD!`;
    if (ogImage) {
        document.getElementById('og-image').content = ogImage;
    }

    // Atualizar Schema Markup
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": `${homeTeam.name} x ${awayTeam.name}`,
        "description": `Onde assistir jogo do ${homeTeam.name} ao vivo`,
        "startDate": isoDate || date,
        "location": {
            "@type": "Place",
            "name": stadium
        },
        "competitor": [
            {
                "@type": "SportsTeam",
                "name": homeTeam.name
            },
            {
                "@type": "SportsTeam",
                "name": awayTeam.name
            }
        ],
        "sport": "Futebol"
    };
    document.getElementById('schema-markup').textContent = JSON.stringify(schemaData, null, 4);

    // Atualizar conteúdo da página - SEO FOCADO
    document.getElementById('main-title').textContent = `Onde Assistir ${homeTeam.name} x ${awayTeam.name} Ao Vivo Grátis - ${date}`;
    document.getElementById('match-date').textContent = date;

    // Atualizar Hero Image
    if (heroImage) {
        document.getElementById('hero-image').style.backgroundImage = `url('${heroImage}')`;
    }
    document.getElementById('hero-home-logo').textContent = homeTeam.abbreviation;
    document.getElementById('hero-home-name').textContent = homeTeam.name;
    document.getElementById('hero-away-logo').textContent = awayTeam.abbreviation;
    document.getElementById('hero-away-name').textContent = awayTeam.name;
    document.getElementById('hero-category').textContent = category;
    document.getElementById('hero-details').textContent = `${date} - ${time} - ${stadium}`;

    // Atualizar Seção de Destaque
    document.getElementById('highlight-title').textContent = `Assista ${homeTeam.name} x ${awayTeam.name} Ao Vivo!`;
    document.getElementById('highlight-text').textContent = `Não perca este grande confronto entre ${homeTeam.name} e ${awayTeam.name}. Nossa plataforma oferece transmissão gratuita em alta qualidade para você acompanhar todos os lances.`;

    // Atualizar TV Broadcast
    document.getElementById('tv-broadcast').textContent = `Além da transmissão online gratuita, você pode acompanhar também pela ${broadcast}.`;

    // Atualizar FAQ
    document.getElementById('faq-q1').textContent = `Como assistir ${homeTeam.name} x ${awayTeam.name} gratuitamente?`;
    document.getElementById('faq-a1').textContent = `Para assistir ${homeTeam.name} x ${awayTeam.name} ao vivo e grátis, basta acessar nossa página no horário do jogo e clicar em um dos players disponíveis. Não é necessário cadastro ou pagamento.`;

    // Atualizar descrição do jogo - FOCADA EM SEO "ONDE ASSISTIR"
    let matchDescription = `<strong>Onde assistir ${homeTeam.name} x ${awayTeam.name} ao vivo grátis?</strong> O grande confronto `;
    matchDescription += `entre <strong>${homeTeam.name}</strong> e <strong>${awayTeam.name}</strong> válido pela <strong>${category}</strong> `;
    matchDescription += `acontece no dia <strong>${date}</strong> às <strong>${time}</strong> (horário de Brasília) `;
    matchDescription += `no <strong>${stadium}</strong>`;
    if (city && state) {
        matchDescription += ` em ${city}/${state}`;
    }
    matchDescription += `. Você pode assistir <strong>${homeTeam.name} x ${awayTeam.name} ao vivo e totalmente grátis</strong> `;
    matchDescription += `através do nosso player online, além da transmissão oficial pela ${broadcast}.`;
    document.getElementById('match-description').innerHTML = matchDescription;

    // Atualizar informações detalhadas
    document.getElementById('info-date').textContent = date;
    document.getElementById('info-time').textContent = time;
    document.getElementById('info-stadium').textContent = stadium;
    document.getElementById('info-category').textContent = category;
    document.getElementById('info-broadcast').textContent = broadcast;
}

document.addEventListener('DOMContentLoaded', function () {
    // Atualizar conteúdo da página
    updatePageContent();

    // Renderizar players dinâmicos
    renderDynamicPlayers();
});