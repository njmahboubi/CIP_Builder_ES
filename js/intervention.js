"use strict";

(() => {
  const PENDING = "District confirmation required";
  // Exact labels supplied from visual verification of the 2026-27 interface.
  const TIP_CHECKPOINTS = Object.freeze(["December 2026", "May 2027", "August 2027"]);
  const TAP_CHECKPOINTS = Object.freeze([...TIP_CHECKPOINTS, "December 2027", "May 2028", "August 2028"]);
  // Confirmed district curriculum decisions.
  const CONFIRMED_CURRICULUM = Object.freeze({
    math_curriculum: "Bluebonnet Learning Math Grades K-5 / Aprendizaje Bluebonnet Matemáticas K-5, Edición 1",
    math_duration: "Yes",
    math_minutes_sufficient: "Yes",
    rla_curriculum: "Bluebonnet Learning K-5 Reading Language Arts / Aprendizaje Bluebonnet Artes del lenguaje y lectura K-5, Edición 1",
    rla_duration: "Yes",
    rla_minutes_sufficient: "Yes"
  });
  const CONFIRMED_INSTRUCTION = Object.freeze({
    math_minutes: "375-525 minutes per week",
    rla_minutes: "525-675 minutes per week",
    instructional_days: "175"
  });
  // Additional Plan4Learning planning layer; never overwrites CIP targets/baselines.
  // Each subject is ordered Approaches, Meets, Masters.
  const OUTCOME_TARGETS = Object.freeze({
    "2026-27": { rla: [60, 32, 15], math: [55, 27, 12], overall_staar: [58, 30, 14] },
    "2027-28": { rla: [65, 37, 20], math: [60, 32, 17], overall_staar: [63, 35, 19] }
  });
  const field = (key, section, label, type = "text", extra = {}) => ({ key, section, label, type, ...extra });
  // One district register, reused across campuses. Empty means unconfirmed.
  const fields = [
    field("tea_programs_interest", "B", "Programs of interest · exact district-approved choices"),
    field("capacity_staff_count", "B", "District staff responsible for capacity building · count", "integer"),
    field("implementation_costs", "B", "District projected cost · numeric value only if Plan4Learning requires it", "number", { help: "Leave blank until the numeric projected cost is confirmed. Do not enter zero merely because cost is unknown. Use the supplied narrative where the module permits it." }),
    field("assessment_schedule", "C", "Additional assessment names, reporting periods and frequencies beyond confirmed NWEA MAP")
  ];
  for (const year of ["2026-27", "2027-28"]) {
    const planType = year === "2027-28" ? "TAP" : undefined;
    fields.push(field(`${year}_domain_iii`, "G", `${year} Domain III Academic Achievement Component Points target`, "text", { planType }));
    fields.push(field(`${year}_elp`, "G", `${year} ELP Component Points target`, "text", { planType }));
  }
  const districtDefaults = Object.freeze(Object.fromEntries(fields.map(item => [item.key, ""])));

  function validateDistrict(values) {
    const errors = [];
    for (const definition of fields) {
      const raw = values[definition.key];
      if (raw === undefined || raw === null || String(raw).trim() === "") continue;
      const value = String(raw).trim();
      if (value.length > 2000 || /\b(?:XX|undefined|null|NaN)\b|district confirmation (?:required|needed)/i.test(value)) {
        errors.push(definition.label + ": enter a confirmed value, not placeholder text.");
      } else if (definition.type === "percentage" && (!Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > 100)) {
        errors.push(definition.label + ": use a percentage from 0 to 100.");
      } else if (definition.type === "number" && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
        errors.push(definition.label + ": enter a confirmed nonnegative numeric amount, or leave blank.");
      } else if (definition.type === "integer" && (!Number.isSafeInteger(Number(value)) || Number(value) < 0 || (definition.max !== undefined && Number(value) > definition.max))) {
        errors.push(definition.label + ": enter a nonnegative whole number within the displayed range.");
      } else if (definition.type === "date") {
        const date = new Date(value + "T00:00:00Z");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) errors.push(definition.label + ": enter a valid date.");
      } else if (definition.type === "choice" && !["Yes", "No"].includes(value)) {
        errors.push(definition.label + ": select Yes or No only after verification.");
      }
    }
    return errors;
  }

  function requirement(campus) {
    if (campus.intervention_type === "TAP") return campus.intervention_status === "continuing" ? "Turnaround Plan (Continuing)" : "Turnaround Plan (TAP)";
    if (campus.intervention_type === "TIP") return "Targeted Improvement Plan (TIP)";
    if (campus.intervention_type === "LIP") return "Local Improvement Plan (LIP)";
    return "No TIP/TAP configured";
  }

  function validApprovalDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return false;
    const date = new Date(value + "T00:00:00Z");
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function build(campusName, config, districtValues = {}, campusValues = {}) {
    const campus = config.DISTRICT_CONFIG.campuses.find(item => item.campus_name === campusName);
    if (!campus) throw new Error("Select a configured campus.");
    const available = ["TIP", "TAP"].includes(campus.intervention_type);
    const result = { available, campus: campus.campus_name, cdcn: campus.campus_id, type: campus.intervention_type,
      status: campus.intervention_status, requirement: requirement(campus), sections: [], milestones: [], outcomeYears: [], requiredDistrictKeys: [] };
    if (!available) {
      result.message = campus.intervention_type === "LIP"
        ? "This campus is assigned a Local Improvement Plan (LIP). No TIP/TAP entry guide is generated."
        : "No TIP/TAP assignment is configured for this campus. No TIP/TAP entry guide is generated.";
      return result;
    }
    const errors = validateDistrict(districtValues);
    if (errors.length) throw new Error(errors.join("\n"));
    const core = window.BISD_CIP_GENERATOR.getInterventionCore();
    const districtTarget = key => {
      const target = config.DISTRICT_CONFIG.targets[key];
      if (!target || target.value === undefined || target.value === null || String(target.value).trim() === "" || /district confirmation/i.test(String(target.value))) return PENDING;
      return String(target.value) + (target.format === "percentage-plus" ? "%+" : target.format === "percentage" ? "%" : "") + (target.suffix || "");
    };
    const unknown = new Set();
    const item = (title, action, text, scope = "DISTRICT STANDARD", extra = {}) => ({ title, action, text, scope, ...extra });
    const copy = (title, text, extra) => item(title, "COPY", text, "DISTRICT STANDARD", extra);
    const verify = (title, text) => item(title, "VERIFY", text, "VERIFY");
    const entry = (key, title, action = "ENTER", note = "") => {
      if (Object.hasOwn(CONFIRMED_INSTRUCTION, key)) return item(title, "ENTER", CONFIRMED_INSTRUCTION[key], "DISTRICT STANDARD", { note });
      if (Object.hasOwn(CONFIRMED_CURRICULUM, key)) return item(title, "SELECT", CONFIRMED_CURRICULUM[key], "DISTRICT STANDARD", { note });
      const definition = fields.find(field => field.key === key);
      const raw = Object.hasOwn(districtValues, key) ? districtValues[key] : "";
      if (raw === null || raw === undefined || String(raw).trim() === "") {
        unknown.add(key);
        return item(title, "VERIFY", PENDING + " — use the single district input: " + definition.label + "." + (note ? " " + note : ""), "VERIFY", { districtKey: key });
      }
      const text = String(raw).trim() + (definition.type === "percentage" ? "%" : "");
      return item(title, action, text, "DISTRICT STANDARD", { districtKey: key, note });
    };
    const section = (id, title, items) => ({ id, title, items });
    const SUPPORTING = "PREFILLED SUPPORTING INFORMATION";
    const CAMPUS_VERIFY = "VERIFY — CAMPUS-SPECIFIC";
    const DOCUMENT = "DOCUMENT / DATE REQUIRED";
    const assurance = (title, text, note = "") => item(title, "VERIFY", text, CAMPUS_VERIFY, { note });
    const pkOnly = campus.grade_configuration === "pk-only";
    const mixed = campus.grade_configuration === "mixed-unconfirmed";
    const approvalDate = campusValues.board_approval_date || "";
    if (approvalDate && !validApprovalDate(approvalDate)) throw new Error("Enter a valid actual Board approval date for the selected campus.");
    const approval = item("Actual Board approval date", approvalDate ? "ENTER" : "DATE REQUIRED", approvalDate || "Enter the actual Board approval date after approval occurs.", approvalDate ? SUPPORTING : DOCUMENT, {
      campusDate: true,
      note: "Use the actual approval record for this campus and plan. A scheduled Board meeting or planning date is not approval. Entering a date does not certify any assurance."
    });
    const checklist = [
      ["needs-assessment", "Required campus needs assessment completed"],
      ["needs-documentation", "Needs-assessment documentation retained"],
      ["exchange", "Texas Exchange / observation-system assurance confirmed"],
      ["public-meeting", "Required campus public meeting completed"],
      ["participants", "Required participants represented"],
      ["parent-notice", "Parent/public meeting notice provided"],
      ["website-notice", "Campus website notice posted"],
      ["board-hearing", "Board public hearing completed"],
      ["plan-posting", "Plan posted before Board hearing where required"],
      ["board-approval", "Board approval completed"],
      ["approval-date", "Actual Board approval date entered"],
      ["stakeholder-records", "Stakeholder/public-comment documentation available"],
      ...(result.type === "TAP" ? [
        ["tap-upload", "TAP stakeholder documentation uploaded"],
        ["tap-no-comments", "If no TAP comments were received, no-comments documentation uploaded"]
      ] : [])
    ].map(([key, label]) => ({ key, label }));
    const a = section("A", "Needs Assessment, Stakeholder Engagement, and Additional Assurances", [
      item("Campus name", "ENTER", campus.campus_name, SUPPORTING),
      item("CDCN", "ENTER", campus.campus_id, SUPPORTING),
      item("Intervention requirement", "ENTER", result.requirement + " · " + result.status, SUPPORTING),
      assurance("On-site needs assessment assurance", "Confirm that this campus completed the required campus/on-site needs assessment and that supporting documentation is maintained locally."),
      item("Supporting campus planning context", "COPY", "Use this campus's confirmed performance baselines, STAAR/student outcomes, attendance, OSS and instructional-implementation evidence when reviewing the needs assessment. District-standard planning already includes NWEA MAP, DOL progress monitoring, PLCs and targeted instructional/student supports. These data and practices provide context; their existence does not satisfy the statutory needs-assessment assurance.", SUPPORTING),
      assurance("Locally conducted needs assessment assurance", "Confirm that the locally conducted needs assessment meets the applicable requirements and that documentation is maintained locally and available upon request."),
      assurance("Texas Exchange / Instructional Insights App assurance", "Confirm whether the campus/district will opt into the Texas Exchange for the Instructional Insights application for 2026-27 or otherwise meets the applicable observation/feedback-system requirement."),
      item("Observation-system supporting context", "COPY", "BISD uses District Spot Observation Forms, regular classroom observations, instructional feedback/coaching and AIM implementation monitoring. These practices are supporting context, not proof of the specific Texas Exchange assurance; confirm the required Plan4Learning response.", SUPPORTING),
      assurance("Campus Intervention Team public meeting assurance", "Confirm that the required public meeting was conducted specifically for this campus with the required campus and community participants."),
      item("Districtwide engagement supporting note", "COPY", "Districtwide stakeholder engagement included Community Action Series Meeting #2 on September 15, 2026, with survey follow-up through September 16, 2026. This engagement may be used as supporting stakeholder evidence but should not be treated as confirmation of the campus-specific statutory public-meeting assurance without verification.", SUPPORTING),
      assurance("Written notice of public meeting assurance", "Confirm that written notice of the required campus public meeting was provided to parents and that the notice was posted as required, including the meeting date, time, and location."),
      item("Public-meeting notice / posting evidence", "DOCUMENT REQUIRED", "Public-meeting notice / posting evidence.", DOCUMENT),
      assurance("Board public hearing assurance", "Confirm that the Board conducted the required public hearing for this campus and that all applicable notice, plan-posting, public-comment, and hearing requirements were satisfied.", "A scheduled Board meeting, CIP/DIP presentation, preparation of Board materials or districtwide Board action is not proof of this campus assurance unless the district confirms coverage."),
      approval,
      item("Public-comment / stakeholder-document upload", result.type === "TAP" ? "UPLOAD REQUIRED" : "UPLOAD OPTIONAL", "Stakeholder feedback / engagement documentation.", DOCUMENT, {
        required: result.type === "TAP",
        note: (result.type === "TAP" ? "If no comments were submitted, upload documentation explaining the public-comment process and that no comments were received." : "Optional for TIP where the current Plan4Learning form identifies the upload as optional.") + " September 15-16 districtwide evidence may support the upload but does not by itself establish campus-specific statutory compliance."
      }),
      item("Available Supporting Evidence", "COPY", "", SUPPORTING, { table: { headers: ["Evidence", "Known supporting information"], rows: [
        ["Engagement", "Community Action Series Meeting #2"],
        ["Date", "September 15, 2026"],
        ["Survey follow-up", "Through September 16, 2026"],
        ["Purpose", "District/community stakeholder engagement informing 2026-27 improvement planning."],
        ["Recurring themes identified through stakeholder feedback", "family/community partnership; clear and proactive communication; attendance/barriers; student belonging/engagement; mentoring/volunteering; behavior/student support; safe/supportive environments; staffing/support capacity; enrichment/engaging learning"],
        ["Evidence boundary", "SUPPORTING EVIDENCE — Does not automatically satisfy campus-specific statutory assurances."]
      ] } }),
      item("Campus-specific verification checklist", "VERIFY", checklist.map(entry => "[ ] " + entry.label).join("\n"), CAMPUS_VERIFY, { checklist, note: "All items start unchecked for each campus. Mark only after verifying campus evidence. These are local tracking marks, not Plan4Learning assurance answers or certification. TIP upload remains optional; TAP-only upload checks appear only for TAP." })
    ]);
    const staffCount = entry("capacity_staff_count", "Number of district staff responsible for capacity building");
    if (staffCount.action === "VERIFY") staffCount.text = "District staff count required.";
    const numericCost = entry("implementation_costs", "Numeric projected cost (if required)", "ENTER", "Use only if Plan4Learning requires a numeric cost. Where a narrative is permitted, use the confirmed cost/funding response. Do not enter zero for an unknown cost.");
    if (numericCost.action === "VERIFY") numericCost.text = "District projected cost required.";
    const b = section("B", "SI Strategy", [
      item("Overall school-improvement strategy", "SELECT", "Intensive Curriculum & Instruction Improvements", "DISTRICT STANDARD", { note: "Confirmed district selection for applicable Elementary TIP/TAP campuses." }),
      copy("School-improvement strategy narrative", "The district and campus will implement the established AIM instructional model, including Bluebonnet Learning in applicable K–5 grades, DOL implementation and progress monitoring, PLCs, Spot Observations and actionable instructional feedback. DOL results, NWEA MAP student-growth evidence and classroom observations will inform differentiated instructional support and coaching aligned to identified student and teacher needs."),
      item("Current program engagement", "ENTER", "EDF-A", "DISTRICT STANDARD", { note: "SELECT EDF-A if it is a named option. If not, SELECT Other + ENTER EDF-A only where Plan4Learning provides an accompanying program-name field. Do not substitute another program." }),
      verify("EDF-A control mapping", "Verify the actual control: named EDF-A, or Other with accompanying EDF-A text. If neither configuration is available, the control conflict is that confirmed EDF-A cannot be represented by the available options; obtain district/Plan4Learning direction before completing that field."),
      entry("tea_programs_interest", "Programs the system is interested in", "SELECT"),
      item("Organizations supporting capacity building", "SELECT", "MGT", "DISTRICT STANDARD", { note: "Confirmed organization supporting district/campus capacity building for this work. No additional external organization is selected." }),
      staffCount,
      copy("Projected costs / funding narrative", "Implementation will be supported through existing district resources, available program or grant funds, and contracted support aligned to the district's school-improvement priorities. Specific expenditures will be determined through the district's established budgeting and resource-allocation processes based on identified campus needs."),
      item("Funding source categories (where required)", "ENTER", "existing district resources; available grant/program funds; contracted district support"),
      numericCost,
      copy("Contingency if grant funding is unavailable", "If grant or supplemental funding is unavailable, the district will prioritize the highest-need improvement activities within available district resources and adjust the scope, sequencing, or source of support as necessary while maintaining the core instructional improvement strategy."),
      copy("Redistribution of talent and resources", "The district and campus will regularly review student, instructional, staffing, and implementation needs and allocate personnel, coaching, instructional supports, and other available resources based on identified need. Resources will be adjusted as needs change to ensure campuses requiring greater support receive proportionate access to district and campus capacity.")
    ]);
    const curriculum = [];
    if (pkOnly) curriculum.push(verify("PK-only campus", "Bingman PK is configured as PK-only. Confirm the module's PK-specific curriculum and outcome fields; do not enter K–5 or STAAR targets as PK results."));
    if (mixed) curriculum.push(verify("Mixed-grade campus", "Confirm Pietzsch/Mac Arthur's actual grade span and applicability of K–5, 6–8 and 9–12 fields. Elementary common content covers the elementary portion only."));
    for (const subject of ["math", "rla"]) {
      const label = subject === "math" ? "Mathematics" : "RLA";
      for (const [suffix, title, action] of [["curriculum", "adopted curriculum", "ENTER"], ["duration", "curriculum remains for the duration of the plan", "SELECT"], ["minutes", "instructional minutes per week", "ENTER"], ["minutes_sufficient", "minutes meet required/recommended amount", "SELECT"]]) {
        if (pkOnly) curriculum.push(item("K–5 " + label + " " + title, "SELECT", "Not applicable — if this option is available for the PK-only campus; otherwise verify the required PK entry with the district.", "CAMPUS DATA"));
        else curriculum.push(entry(subject + "_" + suffix, "K–5 " + label + " " + title, action, mixed ? "Verify this campus serves the applicable grade band before using the district value." : "Verify shared curriculum/schedule applicability to this campus."));
      }
    }
    for (const band of ["6–8", "9–12"]) {
      curriculum.push(mixed ? verify(band + " curriculum fields", "Confirm this campus's grades, adopted curriculum, duration, minutes and sufficiency before selecting an answer. Do not automatically select Not applicable for a mixed-grade campus.")
        : item(band + " Mathematics and RLA curriculum / duration / minutes fields", "SELECT", "Not applicable — if that option is available for this elementary campus. Verify any different required control in Plan4Learning.", "CAMPUS DATA"));
    }
    curriculum.push(entry("instructional_days", "2026-27 instructional days"), entry("assessment_schedule", "Additional assessment / progress-monitoring calendar", "ENTER"));
    const assessmentRows = [
      ["NWEA MAP", "District", "Three times annually: Beginning of Year (BOY), Middle of Year (MOY), and End of Year (EOY)", "Track student progress and growth across the school year and use results to identify needs and inform targeted instructional supports."],
      ["Demonstrations of Learning", "Campus", "Daily", "Identify mastery and misconceptions; determine same-day second teach or acceleration."],
      ["District/local assessments", "District / Campus", "Per approved district assessment calendar; see the single district assessment input", "Review achievement, subgroup outcomes and instructional response."],
      ["PK–2 literacy/numeracy progress monitoring", "Campus / District", "BOY to EOY growth; ongoing monitoring per approved assessment calendar", "Monitor foundational readiness and adjust early support."],
      ["STAAR and accountability results (tested grades only)", "District / Campus", "Per state reporting/administration calendar; verify applicable dates", "Review achievement and accountability indicators by student group."]
    ];
    curriculum.push(copy("Assessment plan rows", "", { table: { headers: ["Type of Assessment", "Campus or District", "Frequency", "Purpose"], rows: pkOnly ? assessmentRows.filter(row => !row[0].startsWith("STAAR")) : assessmentRows } }),
      copy("System for monitoring student growth", "NWEA MAP results will be reviewed at the beginning, middle, and end of the year to monitor student growth and progress. District and campus teams will use the results to identify student needs, monitor progress over time, and provide targeted instructional supports."),
      copy("Students below grade level and special populations", "Use DOL and progress-monitoring evidence to provide purposeful differentiation, same-day second teach and acceleration. Disaggregate outcomes for economically disadvantaged students, emergent bilingual students, students receiving special education services and students experiencing mobility or attendance barriers. Coordinate academic, language, disability-related, attendance and family supports through existing campus teams and monitor the response to support."),
      item("Will the campus implement a PLC structure?", "SELECT", "Yes"),
      copy("PLC implementation", "Use weekly PLCs to internalize upcoming district-provided lessons, anticipate misconceptions, plan engagement and differentiation, calibrate student work and DOL evidence, and determine re-teach or extension before delivery. Weekly Demo Day rehearsal provides practice and feedback on modeling, pacing, transitions and engagement. Document preparation, rehearsal and instructional follow-up through existing agendas and artifacts."));
    const c = section("C", "Curriculum and Instruction", curriculum);
    const d = section("D", "Capacity Building", [
      copy("Capacity-building table", "", { table: { headers: ["Role", "Training/PD Description", "Delivered By", "Attended By"], rows: [
        ["Teachers", "AIM Instructional Model and Lesson Execution: Training on consistent implementation of the Accelerated Instructional Model (AIM), including standards-aligned lesson delivery, checks for understanding, and use of Demonstrations of Learning (DOLs) at the end of core-content lessons to assess student mastery and inform next instructional steps.", "District and campus instructional leaders", "Core-content teachers"],
        ["Principals / Campus Administrators", "AIM Instructional Leadership and Spot Observations: Training on the AIM instructional model and use of the district spot-observation process to identify evidence of instructional fidelity, provide actionable feedback, and monitor consistent implementation across classrooms.", "District instructional leadership", "Principals, assistant principals, and other campus instructional leaders"],
        ["Teachers / Instructional Staff", "Using Student Evidence to Adjust Instruction: Training and job-embedded support on using DOL results, NWEA MAP data, and other classroom evidence to identify learning gaps, plan targeted supports, and monitor student progress through PLCs.", "District and campus instructional leaders", "Teachers, instructional coaches, and campus administrators"],
        ["Teachers / Administrators", "Supporting Students in Special Populations: Training and job-embedded support focused on understanding student needs, IEP requirements and implementation, instructional accommodations, and effective supports for students receiving special education and other specialized services.", "District and campus special-program and instructional staff", "Teachers, instructional staff, and campus administrators"]
      ] } }),
      copy("Differentiation for inexperienced or ineffective teachers/leaders", "Teachers and leaders who are new to their roles or demonstrate a need for additional support will receive differentiated, job-embedded coaching at both the campus and district levels. Support may include more frequent classroom observations, one-on-one coaching and feedback, modeling of AIM-aligned instructional practices, support with lesson preparation and DOL implementation, and targeted follow-up through PLCs. Campus and district leaders will use observation and student-learning evidence to identify specific areas of need and adjust the intensity of support accordingly."),
      item("Implementation-evaluation tool", "ENTER", "District Spot Observation Form / classroom spot observations"),
      copy("Implementation monitoring", "Implementation will be monitored through classroom walkthroughs using the district's Spot Observation Form. Spot observations will assess fidelity to AIM-aligned instructional practices and provide evidence for actionable feedback, coaching, and monitoring of implementation across classrooms."),
      copy("Specific instructional look-fors", "Instructional expectations already represented in the Elementary CIP include district-provided curriculum, common learning objectives, gradual release, intentional engagement, a daily DOL, purposeful differentiation and same-day second teach/acceleration. Apply the district's monitored-classroom fidelity targets: RLA " + districtTarget("rla_fidelity_target_pct") + "; Mathematics " + districtTarget("math_fidelity_target_pct") + ".", { note: "These are supported instructional expectations, not a newly defined official Spot Observation Form rubric." }),
      item("Observation frequency", "SELECT", "Other"),
      item("Observation frequency · Other response", "ENTER", "Each teacher will receive at least two spot observations during each nine-week grading period. Additional observations and coaching may be provided based on implementation needs and observation results."),
      copy("Capacity supports for special populations", "Teachers and administrators will receive targeted professional learning and job-embedded support focused on meeting the needs of students in special populations, with particular emphasis on special education. Support will include understanding and implementing IEP requirements, providing required accommodations and supports, aligning instruction to individual student needs, and monitoring whether students are making progress. Campus and district staff will provide follow-up coaching and technical assistance as needed to strengthen implementation.")
    ]);
    const firstYear = [
      ["Document aligned RLA/Mathematics curriculum, learning objectives, DOL routines and protected instructional schedules.", "Principal / RLA and Mathematics Teams", "Curriculum/lesson artifacts; approved schedules; DOL samples", "District curriculum guidance and schedule review", "1.1, 2.1, 4.1"],
      ["Establish weekly PLC preparation and Demo Day rehearsal; retain agendas, rehearsal feedback and calibrated student-work samples.", "Principal / Leadership Team / Teachers", "PLC/Demo Day agendas; lesson artifacts; feedback records", "Leadership calibration and rehearsal support", "1.3–1.4, 2.3–2.4"],
      ["Complete an initial scored spot-observation/coaching review and assign differentiated follow-up for identified practice gaps.", "Principal / APs", "Observation/coaching tracker; follow-up assignments", "District-approved rubric and coaching support", "1.6, 2.6, 4.2"],
      ["Review applicable PK–2 progress and DOL response; document second-teach/acceleration adjustments and resulting student evidence.", "Principal / PK–2 Team / Teachers", "Progress-monitoring records; DOL samples; instructional response records", "Approved assessments and instructional support", "1.2, 1.5, 2.2, 2.5"],
      ["Audit attendance outreach, intervention follow-through and behavior/student-support evidence, including OSS trends; close assigned gaps.", "Principal / Attendance Team / Counselor", "Attendance/outreach logs; intervention records; OSS trends; follow-up tracker", "Attendance workflow and student-support coordination", "3.1–3.3, 3.6"],
      ["Review family communication and recurring stakeholder themes; document attendance/support outreach and mentoring or volunteer connections.", "Principal / Staff / Campus Team", "Family communication records; partnership/outreach evidence; assigned follow-up", "District communication and community-partnership coordination", "3.5; stakeholder planning implications"],
      ["Compile year-end academic and subgroup evidence and record instructional adjustments for off-trajectory grades or groups.", "Principal / Campus Team", "Reading/Mathematics and applicable PK–2 results; campus scorecard; corrective actions", "District assessment and data-review support", "1.7, 2.7, 4.4"],
      ["Evaluate monitored-classroom RLA/Mathematics fidelity against existing district expectations and document next-cycle coaching priorities.", "Principal / APs / District Support", "Scored observations; fidelity summary; differentiated support assignments", "Rubric calibration and district support", "1.6, 2.6, 4.2"],
      ["Complete the annual summative/milestone evidence review and next-cycle action assignments; evaluate on-track progress against the district target of " + districtTarget("improvement_milestones_target_pct") + ".", "Principal / District Support / Campus Team", "Plan4Learning review; evidence index; milestone status; next-cycle actions", "District review of compliance, resources and improvement priorities", "4.4–4.5; annual program evaluation"]
    ];
    const secondYear = [
      ["Use year-one findings to refine curriculum implementation, differentiation and schedules; document which barriers were addressed.", "Principal / RLA and Mathematics Teams", "Revised lesson/schedule artifacts; prior-year findings; barrier/action record", "District curriculum and implementation support", "1.1, 2.1, 4.1"],
      ["Calibrate PLC/Demo Day practice across teams using year-one student evidence and verify follow-through on revised rehearsal priorities.", "Principal / Leadership Team / Teachers", "Calibration artifacts; revised PLC agendas; rehearsal/follow-up records", "District calibration and leadership coaching", "1.3–1.4, 2.3–2.4"],
      ["Reassign differentiated coaching and support using sustained practice gaps, staffing continuity and first-year subgroup evidence.", "Principal / APs / District Support", "Differentiated coaching assignments; staffing/support review; evidence of follow-up", "District Schools/HR and coaching coordination", "1.6, 2.6, 4.2–4.3"],
      ["Evaluate whether revised second-teach/acceleration responses improve applicable foundational and grade-level progress; refine ineffective responses.", "Principal / Teachers / PK–2 Team", "Comparison of progress-monitoring cycles; revised response records; student work", "Approved assessment and instructional support", "1.2, 1.5, 2.2, 2.5"],
      ["Evaluate sustained attendance, OSS and student-support trends; revise outreach and escalation where barriers persist.", "Principal / Attendance Team / Counselor", "Two-year attendance/OSS trend review; intervention follow-through; revised actions", "Attendance and student-support coordination", "3.1–3.3, 3.6"],
      ["Evaluate family communication and partnership follow-through against recurring feedback; document adjustments to engagement and support pathways.", "Principal / Staff / Campus Team", "Family outreach/feedback review; partnership follow-up; improvement actions", "District communication and community-partnership support", "3.5; stakeholder planning implications"],
      ["Complete a two-year academic/subgroup review and document which instructional responses should be sustained, intensified or revised.", "Principal / Campus Team / District Support", "Two-year campus scorecard; student-group evidence; assigned instructional decisions", "District data analysis and performance review", "1.7, 2.7, 4.4"],
      ["Validate sustained RLA/Mathematics fidelity and leadership monitoring; assign continuing support for remaining implementation gaps.", "Principal / APs / District Support", "Fidelity trends; calibrated observations; continuing support assignments", "Rubric calibration and district support", "1.6, 2.6, 4.2"],
      ["Complete the two-year summative review, evidence index and continuation decisions, retaining campus-specific compliance and next-cycle responsibilities.", "Principal / District Support / Campus Team", "Plan4Learning summative review; complete milestone evidence; continuation actions", "District review of campus requirements and sustainable resources", "4.4–4.5; annual program evaluation"]
    ];
    const checkpoints = result.type === "TIP" ? TIP_CHECKPOINTS : TAP_CHECKPOINTS;
    const milestoneData = result.type === "TAP" ? [...firstYear, ...secondYear] : firstYear;
    result.milestones = milestoneData.map((row, index) => {
      const checkpoint = Math.floor(index / 3);
      const timeline = checkpoints[checkpoint];
      return { description: row[0], timeline, roles: row[1], evidence: row[2], support: row[3], sourceActions: row[4] };
    });
    const eItems = [];
    if (result.type === "TIP") eItems.push(item("One-year implementation period", "ENTER", "August 2026–August 2027"));
    eItems.push(item(result.type === "TAP" ? "Two-year TAP checkpoint schedule" : "TIP checkpoint schedule", "ENTER", checkpoints.join("; "), "DISTRICT STANDARD", { note: "Exact checkpoint labels verified from the live 2026-27 Plan4Learning interface." }));
    eItems.push(copy("Milestone rows · " + (result.type === "TIP" ? "2026-27" : "2026-27 and 2027-28"), "", { table: { headers: ["Description", "Timeline / checkpoint", "Responsible role(s)", "Evidence of completion", "Support needed"], rows: result.milestones.map(row => [row.description, row.timeline, row.roles, row.evidence, row.support]) } }));
    const e = section("E", "Milestones", eItems);
    const f = section("F", "Performance Management", [
      copy("Monitoring successful implementation", "District and campus leaders will monitor implementation through regular review of Spot Observation data, Demonstrations of Learning (DOL) results, and related instructional progress indicators. Campus leaders will use these data within PLCs and instructional leadership routines to identify implementation trends, determine where additional support is needed, and adjust coaching or instructional supports. District leaders will use the same evidence to monitor implementation across campuses and identify system-level areas requiring follow-up."),
      copy("Who reviews milestone progress", "The Office of School Effectiveness, principals, and campus instructional leaders will review progress toward milestones. The Office of School Effectiveness will monitor campus-level implementation and milestone progress, while principals and campus leaders will review instructional progress through PLCs, Spot Observation results, DOL evidence, and related campus implementation data."),
      item("Milestone review roles", "ENTER", "Office of School Effectiveness; Principal; Campus Instructional Leaders"),
      item("Review frequency", "SELECT", "Other"),
      item("Review frequency · Other response", "ENTER", "Weekly"),
      copy("Formal progress-review cadence", "Progress will be formally reviewed weekly using available implementation and student-learning evidence. Daily DOL data and ongoing Spot Observations will inform the weekly review cycle."),
      copy("Collection of milestone progress data", "Milestone progress data will be collected through district dashboards and established monitoring tools, including Spot Observation data and DOL progress-monitoring results. Campus and district leaders will use these data, along with milestone evidence identified in the plan, to document implementation progress and identify areas requiring additional support."),
      copy("Sharing progress with leadership and stakeholders", "Progress will be shared through regular district leadership meetings, campus leadership and PLC structures, and appropriate stakeholder-engagement opportunities. District leadership will review implementation trends and next steps internally and cascade relevant information and expectations to principals and campus leaders. Progress and key updates will also be communicated to families and community stakeholders through community meetings and other district outreach channels.", { note: "Share aggregate progress and appropriate updates with families and community stakeholders; do not disclose confidential student-level information." })
    ]);
    result.outcomeYears = result.type === "TAP" ? ["2026-27", "2027-28"] : ["2026-27"];
    const gItems = [copy("District outcome-target guidance", "These are district-standard Plan4Learning outcome targets, an additional entry-guide layer that does not overwrite or rename existing CIP measures. The 2026-27 RLA Meets 32% and Mathematics Meets 27% targets are anchored to the confirmed Elementary Reading and Mathematics Meets+ targets. Approaches, Masters and Overall STAAR values are district planning targets, not historical performance or observed baseline data." + (result.type === "TAP" ? " The 2027-28 TAP planning targets represent a five-percentage-point improvement from the 2026-27 planning targets." : ""))];
    if (mixed) gItems.push(verify("Outcome scope and applicability", "Confirm the mixed-grade campus's tested-grade scope and component applicability. These shared targets cover the applicable Elementary portion of the campus plan."));
    for (const year of result.outcomeYears) {
      for (const subject of ["rla", "math", "overall_staar"]) {
        for (const [index, level] of ["approaches", "meets", "masters"].entries()) {
          const title = `${year} ${subject === "rla" ? "RLA" : subject === "math" ? "Mathematics" : "Overall STAAR"} · ${level[0].toUpperCase() + level.slice(1)}`;
          if (pkOnly) gItems.push(verify(title, "PK-only campus: confirm the appropriate non-tested-grade entry with the district and Plan4Learning. Select Not applicable only if supported by the module; do not use a K–5 STAAR goal as a PK goal."));
          else {
            const scope = year === "2026-27" && level === "meets" && subject !== "overall_staar" ? "CONFIRMED DISTRICT TARGET" : "DISTRICT PLANNING TARGET";
            gItems.push(item(title, "ENTER", OUTCOME_TARGETS[year][subject][index] + "%", scope));
          }
        }
      }
      const domainGoal = entry(`${year}_domain_iii`, year + " Domain III Academic Achievement Component Points target", "ENTER", "Confirm independently; do not derive Component Points from STAAR percentages.");
      if (domainGoal.action === "VERIFY") domainGoal.text = "District Domain III Academic Achievement Component Points target required.";
      const elpGoal = entry(`${year}_elp`, year + " ELP Component Points target", "ENTER", "Confirm independently; do not infer ELP points from RLA or STAAR outcomes or presume Not applicable.");
      if (elpGoal.action === "VERIFY") elpGoal.text = "District ELP Component Points target required.";
      gItems.push(domainGoal, elpGoal);
      gItems.push(mixed ? verify(year + " Graduation-class applicability", "Confirm the mixed-grade campus's grade configuration and whether it has a graduating class; do not infer No from the elementary portion alone.") : item(year + " Graduation-class applicability", "SELECT", "No", "CAMPUS DATA"));
    }
    const g = section("G", "Student Outcome Goals", gItems);
    const h = section("H", "Additional Info", [verify("Additional questions in the campus module", "No additional questions are established by the supplied workflow or controlling reference. Review the actual campus module before entry; no extra answers have been invented."),
      copy("Existing campus completion guidance", "Retain campus-specific TEA identification, assurances, public meeting/hearing documentation, cost/funding information and Plan4Learning submission information in the applicable campus module. The common Elementary framework supports shared public review while each campus retains its own identity, baselines, needs and required compliance fields.")]);
    result.sections = [a, b, c, d, e, f, g, h];
    for (const group of result.sections) {
      for (const entry of group.items) {
        if (entry.table) entry.text = entry.table.headers.join("\t") + "\n" + entry.table.rows.map(row => row.join("\t")).join("\n");
      }
    }
    result.requiredDistrictKeys = Array.from(unknown);
    result.fullText = result.sections.map(group => group.id + ". " + group.title + "\n\n" + group.items.map(entry => entry.scope + "\n" + entry.title + "\n" + entry.action + ": " + entry.text + (entry.note ? "\n" + entry.note : "")).join("\n\n")).join("\n\n");
    return result;
  }
  window.BISD_INTERVENTION = Object.freeze({ fields, districtDefaults, validateDistrict, validApprovalDate, requirement, build });
})();
