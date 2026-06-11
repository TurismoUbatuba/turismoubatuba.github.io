(function () {
  "use strict";

  /* ── Sidebar toggle (mobile) ── */
  var sidebar = document.querySelector("[data-sidebar]");
  var overlay = document.querySelector("[data-sidebar-overlay]");
  var toggleBtn = document.querySelector("[data-sidebar-toggle]");
  var closeBtn = document.querySelector("[data-sidebar-close]");

  function toggleSidebar(open) {
    sidebar.classList.toggle("open", open);
    if (overlay) overlay.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      toggleSidebar(true);
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      toggleSidebar(false);
    });
  }
  if (overlay) {
    overlay.addEventListener("click", function () {
      toggleSidebar(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) {
      toggleSidebar(false);
    }
  });

  /* ── Table sorting ── */
  document.querySelectorAll("table[data-sortable]").forEach(function (table) {
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    table.querySelectorAll("th[data-sort]").forEach(function (th) {
      th.addEventListener("click", function () {
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
    });
  });

  /* ── Combined filter (text + select) ── */
  document.querySelectorAll("[data-filter-select]").forEach(function (select) {
    var target = select.getAttribute("data-filter-select");
    var input = document.querySelector("[data-filter-input='" + target + "']");
    var rows = Array.from(document.querySelectorAll("[data-filter-row='" + target + "']"));

    function updateFilter() {
      var query = input ? normalizeText(input.value) : "";
      var statusVal = select.value.toLowerCase();
      var visible = 0;

      rows.forEach(function (row) {
        var textMatch = normalizeText(row.textContent).includes(query);
        var pills = Array.from(row.querySelectorAll(".pill"));
        var statusMatch = !statusVal || pills.some(function (p) {
          return normalizeText(p.textContent).includes(statusVal);
        });
        var show = textMatch && statusMatch;
        row.hidden = !show;
        if (show) visible += 1;
      });

      var empty = document.querySelector("[data-empty-state='" + target + "']");
      if (empty) empty.hidden = visible !== 0;

      var countEl = document.querySelector("[data-table-count]");
      if (countEl) countEl.textContent = visible + " local" + (visible !== 1 ? "is" : "");
    }

    if (input) input.addEventListener("input", updateFilter);
    select.addEventListener("change", updateFilter);
  });

  /* ── Toast on status toggle (app.js já faz o toggle visual) ── */
  document.querySelectorAll("[data-status-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var justApproved = button.getAttribute("aria-pressed") === "true";
      showToast(justApproved ? "Foto aprovada com sucesso" : "Foto marcada como pendente");
    });
  });

  /* ── Photo viewer modal ── */
  var photoModal = document.querySelector("[data-photo-modal]");
  var modalTitle = document.querySelector("[data-photo-modal-title]");
  var modalSub = document.querySelector("[data-photo-modal-sub]");
  var modalToggle = document.querySelector("[data-modal-status-toggle]");
  var sourceToggle = null;

  document.querySelectorAll("[data-photo-viewer]").forEach(function (el) {
    el.addEventListener("click", function () {
      var card = el.closest(".photo-card");
      if (!card || !photoModal) return;

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

  document.querySelectorAll("[data-photo-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (photoModal) photoModal.hidden = true;
      document.body.style.overflow = "";
    });
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
    exportBtn.addEventListener("click", function () {
      showToast("PDF exportado com sucesso");
    });
  }

  /* ── More options ── */
  var moreBtn = document.querySelector("[data-more-options]");
  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      showToast("Opções: editar, duplicar, arquivar");
    });
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

  /* ── Re-export normalizeText if not already defined ── */
  if (typeof normalizeText === "undefined") {
    window.normalizeText = function (value) {
      return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };
  }

  /* ── Checking filter: count badges on tabs ── */
  function updateTabCounts() {
    document.querySelectorAll("[data-tab-group] [data-tab-target]").forEach(function (btn) {
      var target = btn.getAttribute("data-tab-target");
      var panel = document.querySelector("[data-panel-id='" + target + "']");
      var countEl = btn.querySelector(".tab-count");
      if (!panel || !countEl) return;

      var visible = Array.from(panel.querySelectorAll("[data-filter-row]")).filter(function (r) {
        return !r.hidden;
      }).length;

      if (target === "locations" || target === "checking") {
        countEl.textContent = visible || panel.querySelectorAll("[data-filter-row]").length;
      }
    });
  }

  var origFilterSelect = document.querySelectorAll("[data-filter-select]");
  origFilterSelect.forEach(function (s) {
    s.addEventListener("change", updateTabCounts);
  });

  var origFilterInput = document.querySelectorAll("[data-filter-input]");
  origFilterInput.forEach(function (i) {
    i.addEventListener("input", updateTabCounts);
  });

  /* ── Settings modal ── */
  var settingsModal = document.querySelector("[data-settings-modal]");

  document.querySelectorAll("[data-settings-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (settingsModal) settingsModal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll("[data-settings-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (settingsModal) settingsModal.hidden = true;
      document.body.style.overflow = "";
    });
  });

  if (settingsModal) {
    settingsModal.addEventListener("click", function (e) {
      if (e.target === settingsModal) {
        settingsModal.hidden = true;
        document.body.style.overflow = "";
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && settingsModal && !settingsModal.hidden) {
      settingsModal.hidden = true;
      document.body.style.overflow = "";
    }
  });

  var settingsForm = document.querySelector("[data-settings-form]");
  if (settingsForm) {
    settingsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (settingsModal) settingsModal.hidden = true;
      document.body.style.overflow = "";
      showToast("Configurações salvas com sucesso");
    });
  }
})();
