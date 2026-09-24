function updateAnunciantes(jsonName) {
    const sponsorEl = document.getElementById('sponsor');
    if (!sponsorEl) return;
    fetch('/anunciantes/' + jsonName + '.json')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            const anunciantes = data && data.sponsor;
            if (!Array.isArray(anunciantes) || anunciantes.length === 0) {
                sponsorEl.style.display = 'none';
                return;
            }
            const ad =
                anunciantes[Math.floor(
                    Math.random() * anunciantes.length
                )];

            const img =
                sponsorEl.querySelector('img');
            const title =
                sponsorEl.querySelector('.advertiser_title');
            const subtitle =
                sponsorEl.querySelector('.advertiser_subtitle');
            const link =
                sponsorEl.querySelector('a.button-2');

            if (ad.imagem && img) {
                img.src = ad.imagem;
                img.alt = ad.nome || '';
            }

            if (ad.nome && title) {
                title.textContent = ad.nome;
            }

            if (ad.descricao && subtitle) {
                subtitle.textContent = ad.descricao;
            }

            if (ad.link && link) {
                link.href = ad.link;
            }
            if (ad['link-text'] && link) {
                link.textContent = ad['link-text'];
            }
        })
        .catch(function () {
            sponsorEl.style.display = 'none';
        });
};

function renderSponsors(jsonName, jsonLocal, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    var inactive = function () {
        var section = container.closest('section');
        if (section) section.style.display = 'none';
    };
    fetch('/anunciantes/' + jsonName + '/' + jsonLocal + '.json')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            const anunciantes = data && data.sponsor;
            if (!Array.isArray(anunciantes) || anunciantes.length === 0) {
                inactive();
                return;
            }
            const shuffled = anunciantes.slice();
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const tmp = shuffled[i];
                shuffled[i] = shuffled[j];
                shuffled[j] = tmp;
            }
            shuffled.slice(0, 6).forEach(function (ad) {
                const card = document.createElement('article');
                card.className = 'article';

                const image = document.createElement('div');
                image.className = 'article-image ad-image';
                image.style.backgroundImage =
                    "url('" + (ad.imagem || '') + "')";
                card.appendChild(image);

                const content = document.createElement('div');
                content.className = 'article-content';

                const tag = document.createElement('span');
                tag.className = 'article-tag';
                tag.textContent = 'Patrocinado';
                content.appendChild(tag);

                const title = document.createElement('h3');
                title.textContent = ad.nome || '';
                content.appendChild(title);

                const desc = document.createElement('p');
                desc.textContent = ad.descricao || '';
                content.appendChild(desc);

                const link = document.createElement('a');
                link.className = 'read-more';
                link.href = ad.link || '#';
                link.target = '_blank';
                link.rel = 'noopener';
                link.textContent = (ad['link-text'] || 'Conheça') + ' →';
                content.appendChild(link);

                card.appendChild(content);
                container.appendChild(card);
            });
        })
        .catch(function () {
            inactive();
        });
};