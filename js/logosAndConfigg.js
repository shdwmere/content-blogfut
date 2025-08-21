// ==========================================
// BANCO DE DADOS DOS TIMES
// ==========================================

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
    "LDU QUITO": {
        name: "LDU Quito",
        abbreviation: "LDU",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Liga_de_Quito_deportiva.png"
    }
};

// Compatibilidade com código legado
const teamLogos = {};
Object.keys(teamsDatabase).forEach(key => {
    teamLogos[key] = teamsDatabase[key].logo;
});

// ==========================================
// SISTEMA DE TIMES - FUNÇÕES UTILITÁRIAS
// ==========================================

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

// ==========================================
// SISTEMA DE ATUALIZAÇÃO DINÂMICA
// ==========================================

function updateAllContent() {
    updateTeamLogos();
    updateMetaTags();
    updatePageContent();
}

function updateTeamLogos() {
    const homeTeamName = matchConfig.homeTeam.name;
    const awayTeamName = matchConfig.awayTeam.name;

    const homeLogoElement = document.getElementById('hero-home-logo');
    const awayLogoElement = document.getElementById('hero-away-logo');

    if (!homeLogoElement || !awayLogoElement) {
        console.log('Logo elements not found, retrying in 100ms...');
        setTimeout(updateAllContent, 100);
        return;
    }

    const homeLogo = getTeamLogo(homeTeamName);
    const awayLogo = getTeamLogo(awayTeamName);

    if (homeLogo) {
        homeLogoElement.innerHTML = `<img src="${homeLogo}" alt="${homeTeamName}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 8px; background: rgba(255,255,255,0.9); padding: 3px;">`;
    } else {
        homeLogoElement.textContent = matchConfig.homeTeam.abbreviation;
    }

    if (awayLogo) {
        awayLogoElement.innerHTML = `<img src="${awayLogo}" alt="${awayTeamName}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 8px; background: rgba(255,255,255,0.9); padding: 3px;">`;
    } else {
        awayLogoElement.textContent = matchConfig.awayTeam.abbreviation;
    }
}

function updateMetaTags() {
    const matchTitle = `${matchConfig.homeTeam.name} x ${matchConfig.awayTeam.name}`;
    const pageTitle = `Onde assistir ${matchTitle} ao vivo | FutPlay`;
    const description = `Onde assistir ${matchTitle} ao vivo grátis. Links diretos para transmissão online.`;
    const ogTitle = `Onde assistir ${matchTitle} ao vivo`;
    const ogDescription = `Links para assistir ${matchTitle} ao vivo e grátis`;

    // Atualizar meta tags
    document.getElementById('page-title').textContent = pageTitle;
    document.title = pageTitle;
    document.getElementById('meta-description').setAttribute('content', description);
    document.getElementById('og-title').setAttribute('content', ogTitle);
    document.getElementById('og-description').setAttribute('content', ogDescription);

    if (matchConfig.ogImage) {
        document.getElementById('og-image').setAttribute('content', matchConfig.ogImage);
    }

    // Atualizar Schema markup
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": `${matchTitle} - ${matchConfig.category}`,
        "description": description,
        "startDate": matchConfig.isoDate || new Date().toISOString(),
        "location": {
            "@type": "Place",
            "name": matchConfig.stadium
        },
        "competitor": [
            {
                "@type": "SportsTeam",
                "name": matchConfig.homeTeam.name
            },
            {
                "@type": "SportsTeam",
                "name": matchConfig.awayTeam.name
            }
        ],
        "sport": "Futebol"
    };

    document.getElementById('schema-markup').textContent = JSON.stringify(schema, null, 4);
}

function updatePageContent() {
    const matchTitle = `${matchConfig.homeTeam.name} x ${matchConfig.awayTeam.name}`;
    const matchDateTime = `${matchConfig.date} - ${matchConfig.time}`;

    // Breadcrumb
    const breadcrumbSpan = document.querySelector('.breadcrumb span');
    if (breadcrumbSpan) {
        breadcrumbSpan.textContent = matchTitle;
    }

    // Título principal e data
    const mainTitle = document.getElementById('main-title');
    if (mainTitle) {
        mainTitle.textContent = `Onde assistir ${matchTitle} ao vivo`;
    }

    const matchDate = document.getElementById('match-date');
    if (matchDate) {
        matchDate.textContent = matchConfig.date;
    }

    // Hero section
    const heroHomeName = document.getElementById('hero-home-name');
    const heroAwayName = document.getElementById('hero-away-name');
    const heroCategory = document.getElementById('hero-category');
    const heroDetails = document.getElementById('hero-details');

    if (heroHomeName) heroHomeName.textContent = matchConfig.homeTeam.name;
    if (heroAwayName) heroAwayName.textContent = matchConfig.awayTeam.name;
    if (heroCategory) heroCategory.textContent = matchConfig.category;
    if (heroDetails) heroDetails.textContent = matchDateTime;

    // Seção de destaque
    const highlightTitle = document.getElementById('highlight-title');
    const highlightText = document.getElementById('highlight-text');

    if (highlightTitle) {
        highlightTitle.textContent = `Assista ${matchTitle} Ao Vivo!`;
    }

    if (highlightText) {
        highlightText.textContent = `Não perca este grande confronto entre ${matchConfig.homeTeam.name} e ${matchConfig.awayTeam.name}. Nossa plataforma oferece transmissão gratuita em alta qualidade para você acompanhar todos os lances.`;
    }

    // Descrição principal
    const matchDescription = document.getElementById('match-description');
    if (matchDescription) {
        matchDescription.innerHTML = `<strong>Onde assistir ${matchTitle} ao vivo grátis?</strong> O grande confronto entre <strong>${matchConfig.homeTeam.name}</strong> e <strong>${matchConfig.awayTeam.name}</strong> válido pela <strong>${matchConfig.category}</strong> acontece no dia <strong>${matchConfig.date}</strong> às <strong>${matchConfig.time}</strong> (horário de Brasília) no <strong>${matchConfig.stadium}</strong>. Você pode assistir <strong>${matchTitle} ao vivo e totalmente grátis</strong> através do nosso player online.`;
    }

    // Informações do jogo
    const infoDate = document.getElementById('info-date');
    const infoTime = document.getElementById('info-time');
    const infoStadium = document.getElementById('info-stadium');
    const infoCategory = document.getElementById('info-category');

    if (infoDate) infoDate.textContent = matchConfig.date;
    if (infoTime) infoTime.textContent = matchConfig.time;
    if (infoStadium) infoStadium.textContent = matchConfig.stadium;
    if (infoCategory) infoCategory.textContent = matchConfig.category;
    if (infoBroadcast) infoBroadcast.textContent = matchConfig.broadcast;

    // TV Broadcast
    const tvBroadcast = document.getElementById('tv-broadcast');
    if (tvBroadcast) {
        tvBroadcast.textContent = `Além da transmissão online gratuita, você pode acompanhar também pela ${matchConfig.broadcast}.`;
    }

    // FAQ
    const faqQ1 = document.getElementById('faq-q1');
    const faqA1 = document.getElementById('faq-a1');

    if (faqQ1) {
        faqQ1.textContent = `Como assistir ${matchTitle} gratuitamente?`;
    }

    if (faqA1) {
        faqA1.textContent = `Para assistir ${matchTitle} ao vivo e grátis, basta acessar nossa página no horário do jogo e clicar em um dos players disponíveis. Não é necessário cadastro ou pagamento.`;
    }
}

// Executar quando a página carregar
function initPage() {
    console.log('Initializing dynamic content...');
    updateAllContent();
}

// Múltiplas formas de garantir que execute
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// Fallback adicional
window.addEventListener('load', function () {
    setTimeout(updateAllContent, 500);
});

// ==========================================
// FIM DA CONFIGURAÇÃO
// ==========================================