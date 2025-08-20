// Mapeamento de times para logos
const teamLogos = {
    "ATLETICO MG": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/1200px-Atletico_mineiro_galo.png",
    "ATLÉTICO NACIONAL": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Atl%C3%A9tico_Nacional.png",
    "BOTAFOGO": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_Botafogo.png/800px-Escudo_Botafogo.png",
    "BAHIA": "https://upload.wikimedia.org/wikipedia/pt/9/90/ECBahia.png",
    "CORINTHIANS": "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
    "FLAMENGO": "https://upload.wikimedia.org/wikipedia/commons/2/22/Logo_Flamengo_crest_1980-2018.png",
    "FLUMINENSE": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png",
    "GRÊMIO": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/1718px-Gremio_logo.svg.png",
    "INTERNACIONAL": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/2048px-Escudo_do_Sport_Club_Internacional.svg.png",
    "PALMEIRAS": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/2048px-Palmeiras_logo.svg.png",
    "SANTOS": "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png",
    "SÃO PAULO": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/2054px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
    "SPORT RECIFE": "https://upload.wikimedia.org/wikipedia/pt/1/17/Sport_Club_do_Recife.png",
    "VASCO DA GAMA": "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png",
    "FORTALEZA": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Fortaleza_EC_2018.png",
    "VÉLEZ SÁRSFIELD": "https://upload.wikimedia.org/wikipedia/commons/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg"
};

// Função para obter logo do time
function getTeamLogo(teamName) {
    return teamLogos[teamName.toUpperCase()] || null;
}

// Função para criar elemento de logo do time
function createTeamLogoElement(teamName, teamAbbr, isMainCard = true) {
    const logo = getTeamLogo(teamName);
    const className = isMainCard ? 'team-logo' : 'mini-team-logo';

    if (logo) {
        return `<div class="${className}"><img src="${logo}" alt="${teamName}" /></div>`;
    } else {
        return `<div class="${className}">${teamAbbr}</div>`;
    }
}

// Função para criar um card de transmissão
function createTransmissionCard(data) {
    // Define estilo inline para imagem customizada
    const thumbnailStyle = data.imagem ?
        `background: url('${data.imagem}') center/cover !important;` :
        '';

    const thumbnailContent = data.imagem ?
        `<div class="futplay-brand">FUTPLAY</div>` :
        `<div class="teams-logo">
                    ${createTeamLogoElement(data.time1.nome, data.time1.sigla, true)}
                    <div class="vs-text">X</div>
                    ${createTeamLogoElement(data.time2.nome, data.time2.sigla, true)}
                </div>
                <div class="futplay-brand">FUTPLAY</div>`;

    return `
                <article class="post-card">
                    <div class="post-card-content">
                        <div class="post-thumbnail ${data.imagem ? 'has-custom-image' : ''}" style="${thumbnailStyle}">
                            ${thumbnailContent}
                        </div>
                        <div class="post-info">
                            <h2 class="post-title">
                                <a href="${data.link}">Onde assistir ${data.time1.nome} x ${data.time2.nome} ao vivo - ${data.data}</a>
                            </h2>
                            <div class="post-date">${data.dataPost}</div>
                            <p class="post-excerpt">${data.descricao}</p>
                        </div>
                    </div>
                </article>
            `;
}

// Função para renderizar todos os cards
function renderTransmissions() {
    const postsGrid = document.getElementById('posts-grid');
    let html = '';

    jogosData.forEach((transmission, index) => {
        html += createTransmissionCard(transmission);

        // Adiciona espaço de anúncio após o primeiro card
        /* if (index === 0) {
            html += createAdSpace();
        } */
    });

    postsGrid.innerHTML = html;
}

// Renderizar os cards quando a página carregar
document.addEventListener('DOMContentLoaded', renderTransmissions);