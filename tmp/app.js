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
    const text = [
      "Campanha: Verão nas Capitais 2026",
      "Investimento: R$ 184.200,00 de R$ 240.000,00",
      "Impressões entregues: 3.482.910",
      "Locais ativos: 42 de 45",
      "Checking aprovado: 87%"
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
