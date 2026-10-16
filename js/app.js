"use strict";

(() => {
  const config = window.BISD_CIP_CONFIG;
  const form = document.getElementById("cip-form");
  if (!config || !form) return;
  const district = config.DISTRICT_CONFIG;
  // The pure generator reads this questionnaire and DISTRICT_CONFIG directly.
  const GENERATION_READY = true;
  const state = { campus_name: "", campus_id: null, districtCampus: null, reading: null, math: null, optional: Object.create(null) };
  const panels = Array.from(form.querySelectorAll(".form-step"));
  const stepLabels = {
    campus: "Campus Information", demographics: "Demographics",
    academic: "Academic / Accountability", pk2: "PK-2 Growth",
    climate: "Attendance / Climate", implementation: "Implementation",
    program: "Program / Intervention", review: "Review"
  };
  const reviewIndex = panels.length - 1;
  const progressList = document.getElementById("progress-steps");
  panels.forEach((panel, index) => {
    const item = document.createElement("li");
    const number = document.createElement("span");
    number.className = "step-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1);
    const label = document.createElement("span");
    label.textContent = stepLabels[panel.dataset.step];
    item.append(number, label);
    progressList.append(item);
  });
  const progressItems = Array.from(progressList.querySelectorAll("li"));
  const backButton = document.getElementById("back-button");
  const nextButton = document.getElementById("next-button");
  const campusControl = document.getElementById("campus_name");
  const controls = new Map();
  const dateOwners = new Map();
  const displayedFields = [];
  let currentStep = 0;

  function register(control, definition, step, approvalDate, dateContainer) {
    const entry = { control, definition, step, approvalDate, dateContainer };
    controls.set(control.id, entry);
    if (approvalDate) dateOwners.set(approvalDate.id, entry);
  }
  function node(tag, text, className) {
    const item = document.createElement(tag);
    if (text !== undefined) item.textContent = text;
    if (className) item.className = className;
    return item;
  }
  function targetInfo(field) {
    if (!field.targetKey) {
      return field.sourceTargetNA
        ? { text: "N/A", kind: "na", description: "N/A in the source template" }
        : { text: "N/A", kind: "na", description: "Descriptive / program information" };
    }
    const definition = district.targets[field.targetKey];
    const target = definition && { ...definition,
      value: definition.configKey ? district[definition.configKey] : definition.value
    };
    if (!target || target.value === undefined || target.value === null || target.value === district.pending_value || target.value === "") {
      return { text: "District confirmation needed", kind: "pending", description: "District target pending confirmation" };
    }
    let text = String(target.value);
    if (target.format === "percentage") text += "%";
    if (target.format === "percentage-plus") text += "%+";
    text += target.suffix || "";
    return { text, kind: "fixed", description: "Fixed district target" };
  }
  function targetDisplay(field) {
    const target = targetInfo(field);
    const box = node("div", undefined, "field-target target-" + target.kind);
    box.id = field.id + "-target";
    box.append(node("span", district.school_year + " District Target:"));
    box.append(node("strong", target.text));
    box.append(node("small", target.description));
    return box;
  }

  district.campuses.forEach(campus => {
    const option = node("option", campus.campus_name);
    option.value = campus.campus_name;
    campusControl.append(option);
  });
  document.getElementById("campus-config-notice").hidden = !district.campus_list_is_temporary;
  document.getElementById("plan-edition").textContent = district.school_year + " · Elementary";
  register(campusControl, { type: "campus", required: true, stateKey: "campus_name" }, 0);

  function addField(field) {
    const container = document.getElementById(field.group + "-fields");
    const step = panels.findIndex(panel => panel.dataset.step === field.group);
    if (!container || step < 0 || field.enabled !== true) return;
    const wrapper = node("div", undefined, "field");
    const label = node("label", field.label);
    label.htmlFor = field.id;
    label.append(node("span", field.required ? "Required" : "Optional", "required-label"));
    const isSelect = field.type === "select" || field.type === "approval";
    const control = document.createElement(isSelect ? "select" : "input");
    control.id = field.id;
    control.name = field.id;
    if (field.required) control.setAttribute("required", "");
    if (isSelect) {
      const placeholder = node("option", "Select an option");
      placeholder.value = "";
      control.append(placeholder);
      field.options.forEach(item => {
        const option = node("option", item.label);
        option.value = item.value;
        control.append(option);
      });
    } else {
      control.type = field.type === "percentage" ? "number" : field.type;
      if (field.type === "percentage") {
        control.min = "0"; control.max = "100"; control.step = "any";
        control.inputMode = "decimal";
      } else if (field.type === "number") {
        control.step = String(field.step ?? "any");
        control.inputMode = field.step === 1 ? "numeric" : "decimal";
        if (field.min !== undefined) control.min = String(field.min);
        if (field.max !== undefined) control.max = String(field.max);
      } else if (field.maxLength !== undefined) control.maxLength = field.maxLength;
    }
    const help = node("p", field.help, "field-help");
    help.id = field.id + "-help";
    const error = node("p", "", "field-error");
    error.id = field.id + "-error"; error.hidden = true;
    control.setAttribute("aria-describedby", help.id + " " + error.id + (field.targetKey || field.sourceTargetNA ? " " + field.id + "-target" : ""));
    wrapper.append(label);
    if (field.type === "percentage") {
      const percentage = node("div", undefined, "percentage-input");
      const unit = node("span", "%"); unit.setAttribute("aria-hidden", "true");
      percentage.append(control, unit); wrapper.append(percentage);
    } else wrapper.append(control);
    wrapper.append(help);
    let approvalDate, dateContainer;
    if (field.type === "approval") {
      dateContainer = node("div", undefined, "approval-date"); dateContainer.hidden = true;
      approvalDate = document.createElement("input");
      approvalDate.type = "date"; approvalDate.id = field.id + "-date";
      approvalDate.name = field.id + "-date"; approvalDate.disabled = true;
      const dateLabel = node("label", "Confirmed Board approval date");
      dateLabel.htmlFor = approvalDate.id;
      approvalDate.setAttribute("aria-describedby", help.id + " " + error.id);
      dateContainer.append(dateLabel, approvalDate); wrapper.append(dateContainer);
    }
    if (field.targetKey || field.sourceTargetNA) wrapper.append(targetDisplay(field));
    wrapper.append(error);
    container.append(wrapper);
    displayedFields.push(field);
    register(control, field, step, approvalDate, dateContainer);
  }
  config.CAMPUS_FIELDS.forEach(addField);

  function validDate(raw) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
    const date = new Date(raw + "T00:00:00Z");
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === raw;
  }
  function errorFor(entry) {
    const { control, definition } = entry;
    const raw = control.value.trim();
    if (control.validity.badInput) return "Enter a valid number.";
    if (!raw) return definition.required ? "This field is required." : "";
    if (definition.type === "campus") return district.campuses.some(campus => campus.campus_name === raw) ? "" : "Select a campus from the list.";
    if (definition.type === "percentage" || definition.type === "number") {
      const number = Number(raw);
      if (!Number.isFinite(number)) return "Enter a valid number.";
      if (definition.type === "percentage" && (number < 0 || number > 100)) return "Enter a percentage from 0 to 100.";
      if (definition.min !== undefined && number < definition.min) return "Enter a value of " + definition.min + " or more.";
      if (definition.max !== undefined && number > definition.max) return "Enter a value of " + definition.max + " or less.";
      if (definition.step === 1 && !Number.isInteger(number)) return "Enter a whole number.";
    }
    if (definition.type === "text") {
      if (/\b(?:XX(?: TARGET)?|undefined|null|NaN)\b/i.test(raw)) return "Enter the reported value or measure name instead of template placeholder text.";
      if (raw.length > definition.maxLength) return "Use " + definition.maxLength + " characters or fewer.";
      if (!definition.allowNA && /^(?:n\/a|not applicable)$/i.test(raw)) return "Enter the reported value or measure name; N/A is not available for this field.";
    }
    if (definition.type === "select" || definition.type === "approval") {
      if (!definition.options.some(option => option.value === raw)) return "Select a configured option.";
    }
    if (definition.type === "approval" && raw === "Date") {
      if (!entry.approvalDate.value) return "Enter the confirmed Board approval date.";
      if (!validDate(entry.approvalDate.value)) return "Enter a valid calendar date.";
    }
    return "";
  }
  function validate(entry) {
    const message = errorFor(entry);
    const error = document.getElementById(entry.control.id + "-error");
    error.textContent = message; error.hidden = !message;
    const affected = [entry.control, entry.approvalDate].filter(Boolean);
    affected.forEach(control => {
      if (message) control.setAttribute("aria-invalid", "true");
      else control.removeAttribute("aria-invalid");
    });
    return !message;
  }
  function focusEntry(entry) {
    (entry.approvalDate && entry.control.value === "Date" ? entry.approvalDate : entry.control).focus();
  }
  function syncApproval(entry) {
    if (!entry.approvalDate) return;
    const needsDate = entry.control.value === "Date";
    entry.dateContainer.hidden = !needsDate;
    entry.approvalDate.disabled = !needsDate;
    if (needsDate) entry.approvalDate.setAttribute("required", "");
    else { entry.approvalDate.removeAttribute("required"); entry.approvalDate.value = ""; }
  }
  function save(entry) {
    const raw = entry.control.value.trim();
    const numeric = entry.definition.type === "percentage" || entry.definition.type === "number";
    let value = !raw || errorFor(entry) ? null : numeric ? Number(raw) : raw;
    if (value !== null && entry.definition.type === "approval" && raw === "Date") value = entry.approvalDate.value;
    if (entry.definition.stateKey) state[entry.definition.stateKey] = value;
    else state.optional[entry.control.id] = value;
    if (entry.definition.type === "campus") {
      const campus = district.campuses.find(item => item.campus_name === value);
      state.districtCampus = campus || null;
      state.campus_id = campus ? (campus.campus_id || district.pending_value) : null;
      document.getElementById("campus-id-value").textContent = !campus
        ? "Select a campus first" : state.campus_id === district.pending_value ? "District confirmation needed" : state.campus_id;
    }
  }
  function captureInput(event) {
    const entry = controls.get(event.target.id) || dateOwners.get(event.target.id);
    if (!entry) return;
    syncApproval(entry); save(entry);
    if (entry.control.hasAttribute("aria-invalid")) validate(entry);
  }
  function formatValue(field) {
    const entered = field.stateKey ? state[field.stateKey] : state.optional[field.id];
    if (entered === null || entered === undefined || entered === "") return "Not provided";
    if (field.type === "percentage") return entered + "%";
    if (field.format === "currency") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(entered);
    if (field.type === "select") {
      const option = field.options.find(item => item.value === entered);
      return option ? option.label : String(entered);
    }
    return String(entered);
  }
  function renderReview() {
    document.getElementById("review-campus-name").textContent = state.campus_name;
    document.getElementById("review-campus-id").textContent = state.campus_id === district.pending_value ? "District confirmation needed" : state.campus_id;
    const districtBody = document.getElementById("review-district-campus");
    districtBody.replaceChildren();
    const campus = state.districtCampus;
    [
      ["Campus Name", "campus_name"],
      ["TEA Campus ID", "campus_id"],
      ["Intervention Status", "campus_intervention_status"],
      ["TEA Identification / Accountability Indicator(s)", "tea_identification_indicators"],
      ["Board Approval Status", "board_approval_status"],
      ["Submission / Local Maintenance Status", "submission_local_maintenance_status"]
    ].forEach(([label, key]) => {
      const raw = campus && campus[key];
      const missing = raw === undefined || raw === null || String(raw).trim() === "" ||
        String(raw).trim().toLowerCase() === district.pending_value.toLowerCase() ||
        /\b(?:XX(?: TARGET)?|undefined|null|NaN)\b/i.test(String(raw));
      const row = node("tr");
      const heading = node("th", label); heading.setAttribute("scope", "row");
      row.append(heading, node("td", missing ? "District confirmation needed" : String(raw).trim()));
      districtBody.append(row);
    });
    const perceptionBody = document.getElementById("review-district-perception");
    perceptionBody.replaceChildren();
    [
      ["District Stakeholder Perception Survey / Indicator", "perception_indicator_name"],
      ["District perception baseline", "perception_baseline"],
      ["District perception target", "perception_target"]
    ].forEach(([label, key]) => {
      const raw = district[key];
      const pending = raw === undefined || raw === null || String(raw).trim() === "" ||
        String(raw).trim().toLowerCase() === district.pending_value.toLowerCase() ||
        /\b(?:XX(?: TARGET)?|undefined|null|NaN)\b/i.test(String(raw));
      const row = node("tr");
      const heading = node("th", label); heading.setAttribute("scope", "row");
      row.append(heading, node("td", pending ? "District confirmation needed" : String(raw).trim()));
      perceptionBody.append(row);
    });
    const body = document.getElementById("review-metrics");
    body.replaceChildren();
    displayedFields.forEach(field => {
      const row = node("tr");
      const label = node("th", field.label); label.setAttribute("scope", "row");
      const baseline = node("td", formatValue(field), "baseline-value");
      const target = targetInfo(field);
      const targetCell = node("td", undefined, "target-" + target.kind);
      targetCell.append(node("strong", target.text));
      targetCell.append(node("small", target.description));
      row.append(label, baseline, targetCell); body.append(row);
    });
  }
  function showStep(index, focus = true) {
    currentStep = index;
    panels.forEach((panel, position) => { panel.hidden = position !== index; });
    progressItems.forEach((item, position) => {
      if (position === index) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
      item.dataset.complete = String(position < index);
    });
    document.getElementById("step-status").textContent = "Step " + (index + 1) + " of " + panels.length + " · " + stepLabels[panels[index].dataset.step];
    backButton.disabled = index === 0; nextButton.hidden = index === reviewIndex;
    if (index === reviewIndex) renderReview();
    if (focus) panels[index].querySelector("h2").focus();
  }
  form.addEventListener("input", captureInput);
  form.addEventListener("change", captureInput);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (currentStep === reviewIndex) return;
    const entries = Array.from(controls.values()).filter(entry => currentStep === reviewIndex - 1 || entry.step === currentStep);
    let firstInvalid = null;
    entries.forEach(entry => {
      if (!validate(entry) && !firstInvalid) firstInvalid = entry;
      save(entry);
    });
    if (firstInvalid) {
      if (firstInvalid.step !== currentStep) showStep(firstInvalid.step);
      focusEntry(firstInvalid); return;
    }
    showStep(currentStep + 1);
  });
  backButton.addEventListener("click", () => { if (currentStep > 0) showStep(currentStep - 1); });

  const output = document.getElementById("cip-output");
  const fullView = document.getElementById("full-cip-view");
  const guideView = document.getElementById("guide-view");
  const fullViewButton = document.getElementById("full-cip-button");
  const guideButton = document.getElementById("guide-button");
  const copyStatus = document.getElementById("copy-status");
  const copyTimers = new Map();

  // Render text nodes only: campus/optional values can never inject HTML.
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function renderBlocks(container, blocks, headingLevel) {
    blocks.forEach((block) => {
      if (block.type === "paragraph") container.append(element("p", block.text));
      else if (block.type === "heading") container.append(element("h" + Math.min(headingLevel, 6), block.text));
      else if (block.type === "list") {
        const list = element("ul");
        block.items.forEach(item => list.append(element("li", item)));
        container.append(list);
      } else if (block.type === "table") {
        const region = element("div", undefined, "table-scroll");
        region.tabIndex = 0;
        region.setAttribute("role", "region");
        region.setAttribute("aria-label", block.caption);
        const table = element("table", undefined, block.rows[0].length === 6 ? "action-table" : "cip-table");
        table.append(element("caption", block.caption));
        const head = element("thead");
        const body = element("tbody");
        block.rows.forEach((cells, rowIndex) => {
          const row = element("tr");
          const headerRow = block.hasHeader && rowIndex === 0;
          cells.forEach((text, columnIndex) => {
            const cell = element(headerRow || columnIndex === 0 ? "th" : "td", text);
            if (headerRow) cell.setAttribute("scope", "col");
            else if (columnIndex === 0) cell.setAttribute("scope", "row");
            if (text === "District confirmation needed") cell.className = "unresolved-value";
            row.append(cell);
          });
          (headerRow ? head : body).append(row);
        });
        if (block.hasHeader) table.append(head);
        table.append(body);
        region.append(table);
        container.append(region);
      }
    });
  }

  function destinationLabel(destination) {
    const label = element("div", undefined, "plan4learning-destination");
    label.append(element("strong", "COPY/PASTE TO PLAN4LEARNING:"));
    label.append(element("span", destination));
    return label;
  }

  function renderSection(item, parent, level = 3) {
    const section = element("section", undefined, level === 3 ? "cip-section" : "cip-child");
    if (item.id === "identification") section.className += " campus-identification";
    // Retain the official three-level CNA structure. Other entry-block titles
    // are small captions rather than another layer of oversized headings.
    if (level === 3 || !item.destination || item.id === "prioritized-problems" || item.id.startsWith("demographics-") ||
        item.id.startsWith("student-learning-") || item.id.startsWith("school-processes-") ||
        item.id.startsWith("perceptions-")) {
      section.append(element("h" + Math.min(level, 6), item.title));
    } else {
      section.append(element("p", item.title, "cip-block-title"));
    }
    if (item.destination) section.append(destinationLabel(item.destination));
    renderBlocks(section, item.blocks, level + 1);
    item.children.forEach(child => renderSection(child, section, level + 1));
    parent.append(section);
  }

  function selectView(guide) {
    fullView.hidden = guide;
    guideView.hidden = !guide;
    fullViewButton.setAttribute("aria-pressed", String(!guide));
    guideButton.setAttribute("aria-pressed", String(guide));
    copyStatus.textContent = "";
  }

  // Clipboard access is user-initiated and local. No server receives the content.
  async function copySection(text, button, fallback, title) {
    try {
      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try { await navigator.clipboard.writeText(text); copied = true; } catch { /* Try local fallback. */ }
      }
      if (!copied) {
        fallback.hidden = false;
        fallback.value = text;
        fallback.focus();
        fallback.select();
        copied = typeof document.execCommand === "function" && document.execCommand("copy");
      }
      if (!copied) {
        copyStatus.textContent = "Automatic copy is unavailable. The section text is selected below; press Ctrl+C (Command+C on Mac) to copy it.";
        return;
      }
      fallback.hidden = true;
      button.focus();
      button.textContent = "Copied";
      button.setAttribute("aria-label", "Copied " + title);
      copyStatus.textContent = "Copied " + title + ".";
      clearTimeout(copyTimers.get(button));
      copyTimers.set(button, setTimeout(() => {
        button.textContent = "Copy";
        button.setAttribute("aria-label", "Copy " + title);
        copyTimers.delete(button);
      }, 1800));
    } catch {
      fallback.hidden = false;
      fallback.value = text;
      fallback.focus();
      fallback.select();
      copyStatus.textContent = "Select the section text below and press Ctrl+C (Command+C on Mac).";
    }
  }

  function renderGuide(items) {
    const container = document.getElementById("guide-sections");
    container.replaceChildren();
    items.forEach((item) => {
      const card = element("article", undefined, "guide-card");
      card.append(element("h3", item.title));
      if (item.destination) card.append(destinationLabel(item.destination));
      const content = element("div", undefined, "guide-content");
      renderBlocks(content, item.blocks, 4);
      const button = element("button", "Copy", "button-secondary copy-button");
      button.type = "button";
      button.setAttribute("aria-label", "Copy " + item.title);
      const fallback = element("textarea", undefined, "copy-fallback");
      fallback.readOnly = true;
      fallback.hidden = true;
      fallback.rows = 8;
      fallback.setAttribute("aria-label", "Manual copy text for " + item.title);
      button.addEventListener("click", () => copySection(item.text, button, fallback, item.title));
      card.append(content, button, fallback);
      container.append(card);
    });
  }

  document.getElementById("generate-button").addEventListener("click", () => {
    if (!GENERATION_READY || currentStep !== reviewIndex) return;
    // Use the existing validators unchanged; generation cannot bypass the form.
    let firstInvalid = null;
    controls.forEach((entry) => {
      if (!validate(entry) && !firstInvalid) firstInvalid = entry;
      save(entry);
    });
    if (firstInvalid) {
      showStep(firstInvalid.step);
      focusEntry(firstInvalid);
      return;
    }
    const error = document.getElementById("generation-error");
    error.hidden = true;
    try {
      const generated = window.BISD_CIP_GENERATOR.build(state, config);
      copyTimers.forEach(timer => clearTimeout(timer));
      copyTimers.clear();
      fullView.replaceChildren();
      generated.sections.forEach(item => renderSection(item, fullView));
      renderGuide(generated.guide);
      document.getElementById("output-campus-name").textContent = generated.campus;
      document.getElementById("output-school-year").textContent = generated.schoolYear + " Elementary Campus Improvement Plan";
      document.getElementById("draft-status").textContent = generated.status;
      selectView(false);
      form.hidden = true;
      output.hidden = false;
      document.getElementById("output-heading").focus();
    } catch (generationError) {
      error.textContent = "Content could not be generated. Check that generator.js is available and the district configuration is valid.";
      error.hidden = false;
      console.error(generationError);
    }
  });
  document.getElementById("print-button").addEventListener("click", () => {
    if (!output.hidden) window.print();
  });
  fullViewButton.addEventListener("click", () => selectView(false));
  guideButton.addEventListener("click", () => selectView(true));
  document.getElementById("back-to-edit").addEventListener("click", () => {
    output.hidden = true;
    form.hidden = false;
    showStep(reviewIndex);
  });

  document.getElementById("generate-button").disabled = !GENERATION_READY;

  // Clear browser-restored values: each refresh starts a new draft.
  form.reset();
  showStep(0, false);
  document.getElementById("loading-message").hidden = true;
  form.hidden = false;
})();
