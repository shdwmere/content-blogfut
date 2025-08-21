// Banco de dados dos times com informações completas
const teamsDatabase = {
    "ATLETICO MG": {
        name: "Atlético Mineiro",
        abbreviation: "CAM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/1200px-Atletico_mineiro_galo.png"
    },
    "ATLÉTICO NACIONAL": {
        name: "Atlético Nacional",
        abbreviation: "NAC",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Atl%C3%A9tico_Nacional.png"
    },
    "BOTAFOGO": {
        name: "Botafogo",
        abbreviation: "BOT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_Botafogo.png/800px-Escudo_Botafogo.png"
    },
    "BAHIA": {
        name: "Bahia",
        abbreviation: "BAH",
        logo: "https://upload.wikimedia.org/wikipedia/pt/9/90/ECBahia.png"
    },
    "CORINTHIANS": {
        name: "Corinthians",
        abbreviation: "COR",
        logo: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png"
    },
    "FLAMENGO": {
        name: "Flamengo",
        abbreviation: "FLA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Logo_Flamengo_crest_1980-2018.png"
    },
    "FLUMINENSE": {
        name: "Fluminense",
        abbreviation: "FLU",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png"
    },
    "GRÊMIO": {
        name: "Grêmio",
        abbreviation: "GRE",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/1718px-Gremio_logo.svg.png"
    },
    "INTERNACIONAL": {
        name: "Internacional",
        abbreviation: "INT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/2048px-Escudo_do_Sport_Club_Internacional.svg.png"
    },
    "PALMEIRAS": {
        name: "Palmeiras",
        abbreviation: "PAL",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/2048px-Palmeiras_logo.svg.png"
    },
    "SANTOS": {
        name: "Santos",
        abbreviation: "SAN",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png"
    },
    "SÃO PAULO": {
        name: "São Paulo",
        abbreviation: "SAO",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/2054px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png"
    },
    "SPORT RECIFE": {
        name: "Sport Recife",
        abbreviation: "SPT",
        logo: "https://upload.wikimedia.org/wikipedia/pt/1/17/Sport_Club_do_Recife.png"
    },
    "LDU QUITO": {
        name: "LDU Quito",
        abbreviation: "LDU",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Liga_de_Quito_deportiva.png"
    },
    "VASCO DA GAMA": {
        name: "Vasco da Gama",
        abbreviation: "VAS",
        logo: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png"
    },
    "FORTALEZA": {
        name: "Fortaleza",
        abbreviation: "FOR",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Fortaleza_EC_2018.png"
    },
    "VÉLEZ SÁRSFIELD": {
        name: "Vélez Sársfield",
        abbreviation: "VEL",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg"
    },
    "UNIVERSITARIO": {
        name: "Universitario",
        abbreviation: "UNI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Logo_oficial_de_Universitario.png"
    },
    "CRUZEIRO": {
        name: "Cruzeiro",
        abbreviation: "CRU",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1996.png"
    },
};

// Compatibilidade com código legado
const teamLogos = {};
Object.keys(teamsDatabase).forEach(key => {
    teamLogos[key] = teamsDatabase[key].logo;
});

// Funções utilitárias para obter dados dos times
function getTeamData(teamName) {
    return teamsDatabase[teamName.toUpperCase()] || null;
}

function getTeamLogo(teamName) {
    const teamData = getTeamData(teamName);
    return teamData ? teamData.logo : null;
}

function getTeamAbbreviation(teamName) {
    const teamData = getTeamData(teamName);
    return teamData ? teamData.abbreviation : teamName.substring(0, 3).toUpperCase();
}

function getTeamFullName(teamName) {
    const teamData = getTeamData(teamName);
    return teamData ? teamData.name : teamName;
}

// Função para criar elemento de logo do time
function createTeamLogoElement(teamName, teamAbbr = null, isMainCard = true) {
    const teamData = getTeamData(teamName);
    const logo = teamData ? teamData.logo : null;
    const abbreviation = teamAbbr || (teamData ? teamData.abbreviation : teamName.substring(0, 3).toUpperCase());
    const className = isMainCard ? 'team-logo' : 'mini-team-logo';

    if (logo) {
        return `<div class="${className}"><img src="${logo}" alt="${teamName}" /></div>`;
    } else {
        return `<div class="${className}">${abbreviation}</div>`;
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