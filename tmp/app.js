function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

document.querySelectorAll("[data-filter-input]").forEach((input) => {
  const target = input.getAttribute("data-filter-input");
  const rows = Array.from(document.querySelectorAll(`[data-filter-row="${target}"]`));
  const empty = document.querySelector(`[data-empty-state="${target}"]`);

  input.addEventListener("input", () => {
    const query = normalizeText(input.value);
    let visible = 0;

    rows.forEach((row) => {
      const matches = normalizeText(row.textContent).includes(query);
      row.hidden = !matches;
      if (matches) visible += 1;
    });

    if (empty) {
      empty.hidden = visible !== 0;
    }
  });
});

document.querySelectorAll("[data-tab-group]").forEach((group) => {
  const buttons = Array.from(group.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(document.querySelectorAll(`[data-tab-panel="${group.dataset.tabGroup}"]`));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panelId !== target;
      });
    });
  });
});

document.querySelectorAll("[data-copy-report]").forEach((button) => {
  button.addEventListener("click", async () => {
    var data = (function () {
      var el = document.getElementById("campaign-data");
      if (!el) return null;
      try { return JSON.parse(el.textContent); } catch (e) { return null; }
    })();
    var h = data ? data.header : { title: "Verão nas Capitais 2026" };
    var k = data ? data.kpis : [];
    var invested = (k[0] && k[0].value) || "R$ 184.200";
    var impressions = (k[1] && k[1].value) || "3.482.910";
    var locsStr = (k[2] && k[2].value) || "42 / 45";
    var approvedStr = (k[3] && k[3].value) || "87%";
    var text = [
      "Campanha: " + h.title,
      "Investimento: " + invested,
      "Impressões entregues: " + impressions,
      "Locais ativos: " + locsStr,
      "Checking aprovado: " + approvedStr
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Resumo copiado";
      window.setTimeout(() => {
        button.textContent = "Copiar resumo";
      }, 1800);
    } catch {
      button.textContent = "Cópia indisponível";
    }
  });
});

document.querySelectorAll("[data-status-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!current));
    button.textContent = current ? "Marcar aprovado" : "Aprovado";
    button.classList.toggle("btn-primary", !current);
  });
});
