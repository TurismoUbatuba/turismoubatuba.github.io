function updateAnunciantes(jsonName) {
    const sponsorEl = document.getElementById('sponsor');
    if (!sponsorEl) return;
    fetch('/anunciantes/" + jsonName + ".json')
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
