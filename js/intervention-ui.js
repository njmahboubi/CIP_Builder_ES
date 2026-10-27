"use strict";

(() => {
  const model = window.BISD_INTERVENTION;
  const config = window.BISD_CIP_CONFIG;
  if (!model || !config) return;
  const $ = id => document.getElementById(id);
  const node = (tag, text, className) => {
    const item = document.createElement(tag);
    if (text !== undefined) item.textContent = text;
    if (className) item.className = className;
    return item;
  };
  const campusControl = $("campus_name");
  const output = $("intervention-output");
  const districtValues = { ...model.districtDefaults };
  const districtInputs = new Map();
  // Human-entered campus records only; never initialized from district evidence.
  const campusApprovalDates = new Map();
  const campusChecklistMarks = new Map();
  let previousView = null;
  let lastGuide = null;
  const selectedCampus = () => config.DISTRICT_CONFIG.campuses.find(campus => campus.campus_name === campusControl.value);

  for (const field of model.fields) {
    const wrapper = node("div", undefined, "field");
    wrapper.dataset.planType = field.planType || "all";
    const id = "intervention-district-" + field.key;
    const label = node("label", field.section + ". " + field.label);
    label.htmlFor = id;
    const control = document.createElement(field.type === "choice" ? "select" : field.type === "text" || field.type === "checkpoints" ? "textarea" : "input");
    control.id = id;
    control.name = field.key;
    if (field.type === "choice") {
      for (const value of ["", "Yes", "No"]) {
        const option = node("option", value || "District confirmation required");
        option.value = value;
        control.append(option);
      }
    } else if (field.type === "integer" || field.type === "percentage" || field.type === "number") {
      control.type = "number";
      control.min = "0";
      control.step = field.type === "integer" ? "1" : "any";
      if (field.type === "percentage") control.max = "100";
      if (field.max !== undefined) control.max = String(field.max);
    } else if (field.type === "date") control.type = "date";
    else { control.rows = 2; control.maxLength = 2000; }
    const help = node("p", field.help || "Use a confirmed shared district value. Leave blank until confirmed.", "field-help");
    help.id = id + "-help";
    control.setAttribute("aria-describedby", help.id);
    wrapper.append(label, control, help);
    $("intervention-district-fields").append(wrapper);
    districtInputs.set(field.key, { control, wrapper });
  }

  function updateCampus() {
    const campus = selectedCampus();
    $("intervention-summary").hidden = !campus;
    if (!campus) return;
    $("intervention-requirement").textContent = campus.campus_name + " · CDCN " + campus.campus_id + " · Intervention Requirement: " + model.requirement(campus);
    const applicable = ["TIP", "TAP"].includes(campus.intervention_type);
    $("open-intervention-guide").hidden = !applicable;
    if (!applicable) {
      $("intervention-requirement").textContent += campus.intervention_type === "LIP" ? ". This campus is assigned LIP; no TIP/TAP guide is generated." : ". No TIP/TAP assignment is configured.";
    }
  }

  function addCopy(parent, text, title) {
    const button = node("button", "Copy", "button-secondary intervention-copy-button");
    button.type = "button";
    button.setAttribute("aria-label", "Copy " + title);
    const fallback = node("textarea", undefined, "copy-fallback");
    fallback.readOnly = true;
    fallback.hidden = true;
    fallback.rows = 6;
    fallback.setAttribute("aria-label", "Manual copy text for " + title);
    button.addEventListener("click", () => window.BISD_CIP_CLIPBOARD.copySection(text, button, fallback, title, $("intervention-copy-status")));
    parent.append(button, fallback);
  }

  function renderGuide() {
    const campus = selectedCampus();
    if (!campus) return;
    lastGuide = model.build(campus.campus_name, config, districtValues, { board_approval_date: campusApprovalDates.get(campus.campus_id) || "" });
    $("intervention-campus").textContent = lastGuide.campus + " · CDCN " + lastGuide.cdcn + " · " + lastGuide.requirement + " · " + lastGuide.status;
    $("intervention-sections").replaceChildren();
    $("intervention-section-nav").replaceChildren();
    for (const [key, { wrapper }] of districtInputs) {
      const wrongType = wrapper.dataset.planType !== "all" && wrapper.dataset.planType !== lastGuide.type;
      const pkInapplicable = campus.grade_configuration === "pk-only" && (/^(?:math|rla)_(?:curriculum|duration|minutes)/.test(key) || /^202[67]-2[78]_(?:rla|math|overall_staar)_/.test(key));
      wrapper.hidden = wrongType || pkInapplicable;
    }
    // This is defensive: the entry button is hidden for LIP/None campuses.
    if (!lastGuide.available) {
      $("intervention-sections").append(node("p", lastGuide.message, "notice"));
      $("intervention-config").hidden = true;
      return;
    }
    $("intervention-config").hidden = false;
    $("intervention-config-status").textContent = lastGuide.requiredDistrictKeys.length + " shared district values still need confirmation for this guide. Enter each once above; all applicable campuses reuse the value in this tab.";
    for (const group of lastGuide.sections) {
      const link = node("a", group.id + ". " + group.title);
      link.href = "#intervention-section-" + group.id;
      $("intervention-section-nav").append(link);
      const section = node("section", undefined, "cip-section intervention-section");
      section.id = "intervention-section-" + group.id;
      section.append(node("h3", group.id + ". " + group.title));
      for (const entry of group.items) {
        const card = node("article", undefined, "intervention-entry");
        card.dataset.action = entry.action;
        card.dataset.scope = entry.scope;
        if (entry.districtKey) card.dataset.districtKey = entry.districtKey;
        card.append(node("p", entry.scope, "intervention-scope scope-" + entry.scope.toLowerCase().replaceAll(" ", "-")), node("h4", entry.title));
        card.append(node("strong", entry.action + ":", "intervention-action"));
        if (entry.checklist) {
          const list = node("ul", undefined, "verification-checklist");
          for (const check of entry.checklist) {
            const row = node("li");
            const label = node("label");
            const control = document.createElement("input");
            control.type = "checkbox";
            control.dataset.checkKey = check.key;
            control.checked = Boolean(campusChecklistMarks.get(campus.campus_id)?.has(check.key));
            control.addEventListener("change", () => {
              if (!campusChecklistMarks.has(campus.campus_id)) campusChecklistMarks.set(campus.campus_id, new Set());
              const marks = campusChecklistMarks.get(campus.campus_id);
              if (control.checked) marks.add(check.key);
              else marks.delete(check.key);
            });
            label.append(control, node("span", check.label));
            row.append(label);
            list.append(row);
          }
          card.append(list);
        } else if (entry.table) {
          const region = node("div", undefined, "table-scroll");
          region.tabIndex = 0;
          region.setAttribute("role", "region");
          region.setAttribute("aria-label", entry.title);
          const table = node("table", undefined, "intervention-table intervention-table-" + entry.table.headers.length);
          table.append(node("caption", entry.title));
          const head = node("thead");
          const headingRow = node("tr");
          for (const value of entry.table.headers) {
            const th = node("th", value);
            th.scope = "col";
            headingRow.append(th);
          }
          head.append(headingRow);
          const body = node("tbody");
          for (const values of entry.table.rows) {
            const row = node("tr");
            for (const value of values) row.append(node("td", value));
            body.append(row);
          }
          table.append(head, body);
          region.append(table);
          card.append(region);
        } else {
          for (const paragraph of entry.text.split("\n\n")) card.append(node("p", paragraph));
        }
        if (entry.note) card.append(node("p", entry.note, "field-help"));
        if (entry.campusDate) {
          const editor = node("div", undefined, "campus-date-editor");
          const label = node("label", "Actual Board approval date for " + campus.campus_name + " (after approval)");
          label.htmlFor = "intervention-actual-board-date";
          const input = document.createElement("input");
          input.type = "date";
          input.id = label.htmlFor;
          input.value = campusApprovalDates.get(campus.campus_id) || "";
          const today = new Date();
          input.max = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
          const save = node("button", "Save Actual Campus Date", "button-secondary");
          save.id = "intervention-save-board-date";
          save.type = "button";
          const error = node("p", undefined, "field-error");
          error.id = "intervention-board-date-error";
          error.setAttribute("role", "alert");
          error.hidden = true;
          input.setAttribute("aria-describedby", error.id);
          save.addEventListener("click", () => {
            const raw = input.value.trim();
            if (input.validity.badInput || (raw && (!model.validApprovalDate(raw) || raw > input.max))) {
              error.textContent = "Enter a valid actual approval date that is not in the future. A scheduled meeting date is not approval.";
              error.hidden = false;
              return;
            }
            if (raw) campusApprovalDates.set(campus.campus_id, raw);
            else {
              campusApprovalDates.delete(campus.campus_id);
              campusChecklistMarks.get(campus.campus_id)?.delete("approval-date");
            }
            renderGuide();
            $("intervention-copy-status").textContent = "Actual approval date " + (raw ? "saved" : "cleared") + " for " + campus.campus_name + " only. Assurances remain verification items.";
            $("intervention-actual-board-date").focus();
          });
          editor.append(label, input, save, error);
          card.append(editor);
        }
        // Verification/upload reminders are instructions, not completed answers.
        if (["COPY", "ENTER", "SELECT"].includes(entry.action)) addCopy(card, entry.text, group.id + ". " + entry.title);
        section.append(card);
      }
      $("intervention-sections").append(section);
    }
  }

  campusControl.addEventListener("change", updateCampus);
  $("open-intervention-guide").addEventListener("click", () => {
    const campus = selectedCampus();
    if (!campus || !["TIP", "TAP"].includes(campus.intervention_type)) return;
    if (output.hidden) previousView = { formHidden: $("cip-form").hidden, cipHidden: $("cip-output").hidden, scroll: window.scrollY };
    renderGuide();
    $("cip-form").hidden = true;
    $("cip-output").hidden = true;
    output.hidden = false;
    $("intervention-heading").focus();
    output.scrollIntoView();
  });
  $("intervention-back").addEventListener("click", () => {
    output.hidden = true;
    $("cip-form").hidden = previousView ? previousView.formHidden : false;
    $("cip-output").hidden = previousView ? previousView.cipHidden : true;
    window.scrollTo(0, previousView ? previousView.scroll : 0);
    $("open-intervention-guide").focus({ preventScroll: true });
  });
  $("intervention-print").addEventListener("click", () => { if (!output.hidden) window.print(); });
  $("intervention-district-form").addEventListener("submit", event => {
    event.preventDefault();
    const values = Object.fromEntries(Array.from(districtInputs, ([key, { control }]) => [key, control.value.trim()]));
    const errors = model.validateDistrict(values);
    $("intervention-config-error").hidden = errors.length === 0;
    $("intervention-config-error").textContent = errors.join(" ");
    if (errors.length) return;
    Object.assign(districtValues, values);
    renderGuide();
    $("intervention-config-status").textContent = "Confirmed district values applied for this tab. " + $("intervention-config-status").textContent;
    $("intervention-copy-status").textContent = "Guide updated with shared district values.";
  });
  $("intervention-district-form").reset();
  updateCampus();
})();
