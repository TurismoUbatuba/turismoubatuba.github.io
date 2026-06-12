(function () {
  "use strict";

  /* =============================================
     DATA + RENDER ENGINE
     ============================================= */

  function renderAll(data) {
    renderHeader(data);
    renderKpis(data);
    renderOverview(data);
    if (data.locations) renderLocations(data);
    if (data.formatos) renderFormatos(data);
    if (data.impactos) renderImpactos(data);
    if (data.checking) renderChecking(data);
    if (data.timeline) renderTimeline(data);

    updateTabBadges(data);
    toggleConditionalTabs(data);
  }

 function isNullOrEmptyOrUndefined(value) {
    return value == null || value === "" || (Array.isArray(value) && value.length === 0);
 }

  function loadData() {
    const urlParams = new URLSearchParams(window.location.search);
    var campaignName = urlParams.get('c');
    if (isNullOrEmptyOrUndefined(campaignName)) {
      campaignName = "campaign";
    }
    fetch('https://turismoubatuba.com.br/tmp/api/' + campaignName + '.json')
      .then(function (r) { if (!r.ok) throw new Error('Erro ao carregar campaign.json'); return r.json(); })
      .then(renderAll)
      .catch(function (e) { console.error(e); });
  }

  function renderHeader(data) {
    var h = data.header || {};
    var badges = document.querySelector("[data-header-badges]");
    if (badges) badges.innerHTML = '<span class="pill ' + (h.statusClass || "") + '">' + (h.status || "") + '</span><span class="pill">' + (h.id || "") + '</span>';
    var title = document.querySelector("[data-header-title]");
    if (title) title.textContent = h.title || "";
    var sub = document.querySelector("[data-header-subtitle]");
    if (sub) sub.textContent = h.subtitle || "";
  }

  function renderKpis(data) {
    var c = document.querySelector('[data-render="kpis"]');
    if (!c) return;
    c.innerHTML = (data.kpis || []).map(function (k) {
      if (k.type === "ecpm") {
        return '<article class="card kpi-ecpm"><span class="kpi-label">' + (k.label || "") + '</span><strong class="kpi-value">' + (k.value || "") + '</strong><span class="kpi-note">' + (k.note || "") + '</span></article>';
      }
      var h = '<article class="card kpi"><span class="kpi-label">' + (k.label || "") + '</span>';
      if (k.tooltip) h += '<strong class="kpi-value" data-tooltip="' + k.tooltip + '">' + (k.value || "") + '</strong>';
      else h += '<strong class="kpi-value">' + (k.value || "") + '</strong>';
      if (k.type === "ring") {
        h += '<div class="ring-progress" role="img" aria-label="' + (k.value || "") + ' aprovado" style="--pct:' + (k.pct || 0) + '"><svg viewBox="0 0 40 40" class="ring-svg"><circle class="ring-bg" cx="20" cy="20" r="17"/><circle class="ring-fg" cx="20" cy="20" r="17" style="stroke-dashoffset:calc(106.9 - (106.9 * var(--pct))/100)"/></svg></div>';
      } else {
        h += '<div class="progress' + (k.warn ? " warn" : "") + '" aria-label="' + (k.progress || 0) + '%"><span style="width:' + (k.progress || 0) + '%;"></span></div>';
      }
      var nc = k.type === "ring" ? "kpi-note" : "trend" + (k.warn ? " warn" : "");
      h += '<span class="' + nc + '">' + (k.note || "") + '</span></article>';
      return h;
    }).join("");
  }

  function renderOverview(data) {
    var c = document.querySelector('[data-render="overview"]');
    if (!c) return;
    var o = data.overview || {};
    var h = '<div class="grid-overview"><div class="grid-overview-main">';

    h += '<article><div class="card-title"><h2>Entrega por tela</h2><span class="pill info">Top 4</span></div>';
    (o.topScreens || []).forEach(function (s) {
      h += '<div class="screen-row" data-hover-card><div><strong>' + (s.name || "") + '</strong><p class="muted">' + (s.desc || "") + '</p></div><span class="num">' + (s.formatted || "") + '</span><div class="hover-card">' + (s.hover || "") + '</div></div>';
    });
    h += '</article>';

    h += '<article><div class="card-title"><h2>Impressões por dia</h2><span class="pill info">Últimos 10 dias</span></div><div class="chart-bars" role="img" aria-label="Barras de impressões diárias">';
    (o.dailyImpressions || []).forEach(function (d) {
      h += '<span class="bar" style="height:' + (d.pct || 0) + '%;" data-label="' + (d.date || "") + '"><span class="bar-tooltip">' + (d.value || "") + '</span></span>';
    });
    h += '</div></article></div>';

    h += '<article class="card budget-card"><div class="card-title"><h2>Distribuição de verba</h2><span class="pill">CPM médio ' + (o.cpmMedio || "") + '</span></div>';
    (o.budgetDistribution || []).forEach(function (b) {
      h += '<div class="format-row"><div><strong>' + (b.city || "") + '</strong><div class="format-meter"><span style="width:' + (b.pct || 0) + '%;"></span></div></div><span class="num">' + (b.value || "") + '</span></div>';
    });
    h += '<div class="budget-summary"><div class="budget-summary-item"><span>Total</span><strong>' + (o.totalBudget || "") + '</strong></div><div class="budget-summary-item"><span>Saldo</span><strong class="trend">' + (o.remaining || "") + '</strong></div></div></article></div>';
    c.innerHTML = h;
  }

  function renderLocations(data) {
    var c = document.querySelector('[data-render="locations"]');
    if (!c) return;
    var locs = data.locations || [];
    var h = '<div class="locations-toolbar">';
    h += '<div class="field" style="max-width:360px"><label for="location-search">Buscar local ou tela</label><input class="input" id="location-search" data-filter-input="locations" placeholder="Ex: Paulista, SP-PAUL, Copacabana"/></div>';
    h += '<div class="field" style="max-width:200px"><label for="location-status">Status</label><select class="select" id="location-status" data-filter-select="locations"><option value="">Todos</option><option value="Ativo">Ativo</option><option value="Checking">Checking</option><option value="Pausado">Pausado</option></select></div>';
    h += '<span class="table-meta" data-table-count>' + locs.length + ' locais</span></div>';
    h += '<div class="table-wrap"><table data-sortable><thead><tr>';
    h += '<th data-sort="text">Local <span class="sort-arrow"></span></th><th data-sort="text">Tela <span class="sort-arrow"></span></th><th data-sort="text">Formato / Mídia <span class="sort-arrow"></span></th><th class="num" data-sort="number">Impressões <span class="sort-arrow"></span></th><th class="num" data-sort="number">Impactos <span class="sort-arrow"></span></th><th data-sort="text">Status <span class="sort-arrow"></span></th>';
    h += '</tr></thead><tbody>';
    locs.forEach(function (l) {
      h += '<tr data-filter-row="locations"><td>' + l.local + '</td><td>' + l.tela + '</td><td>' + l.formato + '</td><td class="num">' + l.impressoes + '</td><td class="num">' + l.impactos + '</td><td><span class="pill ' + l.statusClass + '">' + l.status + '</span></td></tr>';
    });
    h += '</tbody></table><div class="empty-state" data-empty-state="locations" ' + (locs.length === 0 ? '' : 'hidden') + '>Nenhum local encontrado.</div></div>';
    c.innerHTML = h;
  }

  function renderFormatos(data) {
    var c = document.querySelector('[data-render="formatos"]');
    if (!c) return;
    var formatos = data.formatos || [];
    var h = '<div class="formatos-table-wrap"><table class="formatos-table"><thead><tr>';
    h += '<th class="thumb-col"></th><th data-sort="text">Mídia <span class="sort-arrow"></span></th><th class="num" data-sort="number">Telas <span class="sort-arrow"></span></th><th class="num" data-sort="number">Impressões <span class="sort-arrow"></span></th><th class="num" data-sort="number">Impactos <span class="sort-arrow"></span></th><th class="num" data-sort="number">CPM <span class="sort-arrow"></span></th>';
    h += '</tr></thead><tbody>';
    formatos.forEach(function (f) {
      h += '<tr class="formato-group-row"><td colspan="6"><strong>' + f.name + '</strong><span class="pill info">' + f.telas + ' telas</span></td></tr>';
      (f.midias || []).forEach(function (m) {
        h += '<tr><td class="thumb-col"><div class="midia-thumb" style="background:' + m.thumb + ';"></div></td>';
        h += '<td><span class="midia-name">' + m.name + '</span></td>';
        h += '<td class="num">' + m.telas + '</td><td class="num">' + m.impressoes + '</td><td class="num">' + m.impactos + '</td><td class="num">' + m.cpm + '</td></tr>';
      });
    });
    h += '</tbody></table></div>';
    c.innerHTML = h;
  }

  function renderImpactos(data) {
    var c = document.querySelector('[data-render="impactos"]');
    if (!c || !data.impactos) return;
    var imp = data.impactos;
    var h = '<div class="grid-impactos">';
    h += '<article class="card impacto-kpi"><span class="kpi-label">Alcance estimado</span><strong class="kpi-value">' + imp.alcance + '</strong><span class="kpi-note">pessoas únicas na área de cobertura</span></article>';
    h += '<article class="card impacto-kpi"><span class="kpi-label">Frequência média</span><strong class="kpi-value">' + imp.frequencia + '</strong><span class="kpi-note">vezes por pessoa</span></article>';
    h += '<article class="card impacto-kpi"><span class="kpi-label">GRP</span><strong class="kpi-value">' + imp.grp + '</strong><span class="kpi-note">da população-alvo impactada</span></article>';
    h += '</div><div class="grid-impactos-two">';

    h += '<article class="card"><div class="card-title"><h2>Faixa etária</h2></div>';
    (imp.faixaEtaria || []).forEach(function (d) {
      h += '<div class="demo-row"><span>' + d.label + '</span><div class="demo-bar"><span style="width:' + d.pct + '%;"></span></div><span class="num">' + d.pct + '%</span></div>';
    });
    h += '</article>';

    h += '<article class="card"><div class="card-title"><h2>Gênero</h2></div>';
    (imp.genero || []).forEach(function (d) {
      h += '<div class="demo-row"><span>' + d.label + '</span><div class="demo-bar"><span style="width:' + d.pct + '%;"></span></div><span class="num">' + d.pct + '%</span></div>';
    });
    h += '<div class="card-title" style="margin-top:20px"><h2>Renda</h2></div>';
    (imp.renda || []).forEach(function (d) {
      h += '<div class="demo-row"><span>' + d.label + '</span><div class="demo-bar"><span style="width:' + d.pct + '%;"></span></div><span class="num">' + d.pct + '%</span></div>';
    });
    h += '</article></div>';

    h += '<article class="card"><div class="card-title"><h2>Performance por período</h2><span class="pill info">Impressões</span></div>';
    h += '<div class="daypart-grid">';
    (imp.daypart || []).forEach(function (d) {
      var bg = d.accent ? 'background:var(--accent);' : '';
      h += '<div class="daypart-item"><div class="daypart-bar" style="height:' + d.pct + '%;' + bg + '"></div><strong>' + d.periodo + '</strong><span class="muted">' + d.horario + '</span><span class="num">' + d.pct + '%</span></div>';
    });
    h += '</div></article>';
    c.innerHTML = h;
  }

  function renderChecking(data) {
    var c = document.querySelector('[data-render="checking"]');
    if (!c) return;
    var checking = data.checking || [];
    var h = '<div class="checking-toolbar">';
    h += '<div class="field" style="max-width:320px"><label for="checking-filter">Filtrar fotos</label><input class="input" id="checking-filter" data-filter-input="checking" placeholder="Local ou criativo"/></div>';
    h += '<div class="field" style="max-width:180px"><label for="checking-status">Aprovação</label><select class="select" id="checking-status" data-filter-select="checking"><option value="">Todas</option><option value="Aprovado">Aprovado</option><option value="Pendente">Pendente</option></select></div>';
    h += '</div><div class="checking-grid" data-checking-grid>';
    checking.forEach(function (ch) {
      var pendingCls = ch.aprovado ? "" : " pending";
      var btnPrimary = ch.aprovado ? " btn-primary" : "";
      var pressed = ch.aprovado ? "true" : "false";
      var btnText = ch.aprovado ? "Aprovado" : "Marcar aprovado";
      h += '<article class="photo-card" data-filter-row="checking">';
      h += '<div class="photo' + pendingCls + '" tabindex="0" role="button" data-photo-viewer>Foto checking</div>';
      h += '<div class="photo-meta"><strong>' + ch.local + '</strong><span class="muted">' + ch.meta + '</span><button class="btn btn-sm' + btnPrimary + '" data-status-toggle aria-pressed="' + pressed + '">' + btnText + '</button></div>';
      h += '</article>';
    });
    h += '</div><div class="empty-state" data-empty-state="checking" ' + (checking.length === 0 ? '' : 'hidden') + '>Nenhuma foto encontrada.</div>';
    c.innerHTML = h;
  }

  function renderTimeline(data) {
    var c = document.querySelector('[data-render="timeline"]');
    if (!c) return;
    var h = '<div class="timeline">';
    (data.timeline || []).forEach(function (t) {
      var dotCls = t.dot ? " " + t.dot : "";
      h += '<div class="timeline-item"><div class="timeline-dot' + dotCls + '"></div><div class="timeline-body"><strong>' + (t.title || "") + '</strong><p class="muted">' + (t.desc || "") + '</p></div><span class="timeline-date">' + (t.date || "") + '</span></div>';
    });
    h += '</div>';
    c.innerHTML = h;
  }

  function updateTabBadges(data) {
    if (!data) return;
    var btns = document.querySelectorAll("[data-tab-group] [data-tab-target]");
    btns.forEach(function (btn) {
      var target = btn.getAttribute("data-tab-target");
      var countEl = btn.querySelector(".tab-count");
      if (!countEl) return;
      if (target === "locations") countEl.textContent = (data.locations || []).length;
      else if (target === "checking") countEl.textContent = (data.checking || []).length;
    });
  }

  function toggleConditionalTabs(data) {
    var tabGroup = document.querySelector('[data-tab-group="campaign"]');
    if (!tabGroup) return;
    var btns = Array.from(tabGroup.querySelectorAll('[data-tab-target]'));

    btns.forEach(function (btn) {
      var target = btn.getAttribute('data-tab-target');
      if (target === 'overview') return;

      var dataValue = data[target];
      var hasContent = dataValue != null;
      if (Array.isArray(dataValue) && dataValue.length === 0) hasContent = false;

      btn.style.display = hasContent ? '' : 'none';

      var panel = document.querySelector('[data-panel-id="' + target + '"]');
      if (panel && !hasContent) panel.hidden = true;
    });

    var activeBtn = tabGroup.querySelector('.tab.active');
    if (activeBtn && activeBtn.style.display === 'none') {
      var firstVisible = tabGroup.querySelector('[data-tab-target]:not([style*="display: none"])');
      if (firstVisible) firstVisible.click();
    }
  }

  /* =============================================
     SIDEBAR TOGGLE (mobile)
     ============================================= */

  var sidebar = document.querySelector("[data-sidebar]");
  var overlay = document.querySelector("[data-sidebar-overlay]");
  var toggleBtn = document.querySelector("[data-sidebar-toggle]");
  var closeBtn = document.querySelector("[data-sidebar-close]");

  function toggleSidebar(open) {
    sidebar.classList.toggle("open", open);
    if (overlay) overlay.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggleBtn) toggleBtn.addEventListener("click", function () { toggleSidebar(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { toggleSidebar(false); });
  if (overlay) overlay.addEventListener("click", function () { toggleSidebar(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) toggleSidebar(false);
  });

  /* =============================================
     EVENT DELEGATION (dynamic elements)
     ============================================= */

  /* ── Table sorting (delegated) ── */
  document.addEventListener("click", function (e) {
    var th = e.target.closest("th[data-sort]");
    if (!th) return;
    var table = th.closest("table");
    if (!table) return;
    var tbody = table.querySelector("tbody");
    if (!tbody) return;
    var rows = Array.from(tbody.querySelectorAll("tr"));

    var type = th.getAttribute("data-sort") || "text";
    var col = Array.from(th.parentNode.children).indexOf(th);
    var isAsc = th.classList.contains("sort-asc");
    var direction = isAsc ? "desc" : "asc";

    table.querySelectorAll("th[data-sort]").forEach(function (h) {
      h.classList.remove("sort-asc", "sort-desc");
    });
    th.classList.add(direction === "asc" ? "sort-asc" : "sort-desc");

    rows.sort(function (a, b) {
      var aVal = (a.children[col] || {}).textContent || "";
      var bVal = (b.children[col] || {}).textContent || "";
      if (type === "number") {
        aVal = parseFloat(aVal.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
        bVal = parseFloat(bVal.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      aVal = aVal.trim().toLowerCase();
      bVal = bVal.trim().toLowerCase();
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    rows.forEach(function (row) { tbody.appendChild(row); });
  });

  /* ── Filter (text + select) ── */
  function applyFilter(target) {
    var input = document.querySelector("[data-filter-input='" + target + "']");
    var select = document.querySelector("[data-filter-select='" + target + "']");
    var rows = Array.from(document.querySelectorAll("[data-filter-row='" + target + "']"));
    var query = input ? normalizeStr(input.value) : "";
    var statusVal = select ? select.value.toLowerCase() : "";
    var visible = 0;

    rows.forEach(function (row) {
      var textMatch = normalizeStr(row.textContent).includes(query);
      var pills = Array.from(row.querySelectorAll(".pill"));
      var statusMatch = !statusVal || pills.some(function (p) { return normalizeStr(p.textContent).includes(statusVal); });
      var show = textMatch && statusMatch;
      row.hidden = !show;
      if (show) visible += 1;
    });

    var empty = document.querySelector("[data-empty-state='" + target + "']");
    if (empty) empty.hidden = visible !== 0;

    var countEl = document.querySelector("[data-table-count]");
    if (countEl) countEl.textContent = visible + " local" + (visible !== 1 ? "is" : "");
  }

  function normalizeStr(v) {
    return String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  document.addEventListener("input", function (e) {
    var input = e.target.closest("[data-filter-input]");
    if (input) applyFilter(input.getAttribute("data-filter-input"));
  });
  document.addEventListener("change", function (e) {
    var select = e.target.closest("[data-filter-select]");
    if (select) applyFilter(select.getAttribute("data-filter-select"));
  });

  /* ── Status toggle (visual + toast) ── */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-status-toggle]");
    if (!btn) return;
    var current = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!current));
    btn.textContent = current ? "Marcar aprovado" : "Aprovado";
    btn.classList.toggle("btn-primary", !current);
    showToast(current ? "Foto marcada como pendente" : "Foto aprovada com sucesso");
  });

  /* ── Photo viewer modal ── */
  var photoModal = document.querySelector("[data-photo-modal]");
  var modalTitle = document.querySelector("[data-photo-modal-title]");
  var modalSub = document.querySelector("[data-photo-modal-sub]");
  var modalToggle = document.querySelector("[data-modal-status-toggle]");
  var sourceToggle = null;

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-photo-viewer]");
    if (!el || !photoModal) return;
    var card = el.closest(".photo-card");
    if (!card) return;

    var title = (card.querySelector(".photo-meta strong") || {}).textContent || "";
    var sub = (card.querySelector(".photo-meta .muted") || {}).textContent || "";
    sourceToggle = card.querySelector("[data-status-toggle]");

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = sub;

    if (modalToggle && sourceToggle) {
      var pressed = sourceToggle.getAttribute("aria-pressed") === "true";
      modalToggle.setAttribute("aria-pressed", String(pressed));
      modalToggle.textContent = pressed ? "Aprovado" : "Marcar aprovado";
      modalToggle.classList.toggle("btn-primary", pressed);
    }

    photoModal.hidden = false;
    document.body.style.overflow = "hidden";
  });

  if (modalToggle) {
    modalToggle.addEventListener("click", function () {
      if (sourceToggle) {
        sourceToggle.click();
        var pressed = sourceToggle.getAttribute("aria-pressed") === "true";
        modalToggle.setAttribute("aria-pressed", String(pressed));
        modalToggle.textContent = pressed ? "Aprovado" : "Marcar aprovado";
        modalToggle.classList.toggle("btn-primary", pressed);
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-photo-close]") && photoModal) {
      photoModal.hidden = true;
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && photoModal && !photoModal.hidden) {
      photoModal.hidden = true;
      document.body.style.overflow = "";
    }
  });

  /* ── Export PDF ── */
  var exportBtn = document.querySelector("[data-export-pdf]");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () { showToast("PDF exportado com sucesso"); });
  }

  /* ── More options ── */
  var moreBtn = document.querySelector("[data-more-options]");
  if (moreBtn) {
    moreBtn.addEventListener("click", function () { showToast("Opções: editar, duplicar, arquivar"); });
  }

  /* ── Toast system ── */
  function showToast(message) {
    var container = document.querySelector("[data-toast]");
    if (!container) return;
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 2600);
  }

  /* ── INIT ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadData);
  } else {
    loadData();
  }

})();
