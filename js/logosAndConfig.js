// ==========================================
// BANCO DE LOGOS DOS TIMES
// ==========================================

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

// ==========================================
// SISTEMA DE LOGOS
// ==========================================

function getTeamLogo(teamName) {
    return teamLogos[teamName.toUpperCase()] || null;
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
    const infoBroadcast = document.getElementById('info-broadcast');

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