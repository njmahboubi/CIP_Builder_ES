"use strict";

// ================================================================
// DISTRICT_CONFIG — edit district-controlled values in this section.
// No database or live data service is used.
// 1. Replace demo campuses with approved names/IDs. Keep IDs in quotes
//    so leading zeros are preserved. Never invent a campus ID.
// 2. Update target.value when district leadership confirms a target.
//    Percentages are numbers on a 0–100 scale; do not add a percent sign.
// 3. For other measures, include the approved unit in the value if needed.
// 4. Review the working status options below with district leadership.
//    These options do not determine or certify a campus's TEA designation.
// ================================================================
// Campus source: data/Beaumont_ISD_Campuses_TEA_2026.xlsx,
// worksheet "Elementary Builder", rows 2–17.
// Preserve worksheet names and TEA IDs exactly; IDs are strings.
// Only rows marked Yes are approved for the standard elementary dropdown.
const ELEMENTARY_CAMPUSES = Object.freeze([
  {
    "campus_name": "Amelia Elem",
    "campus_id": "123910101",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Bingman PK",
    "campus_id": "123910132",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "notes": "PK-only campus; confirm whether the elementary CIP builder applies unchanged."
  },
  {
    "campus_name": "Blanchette Elem",
    "campus_id": "123910127",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Caldwood Elem",
    "campus_id": "123910104",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Charlton-Pollard Elem",
    "campus_id": "123910130",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Curtis Elem",
    "campus_id": "123910105",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Dishman Elem",
    "campus_id": "123910126",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Dr Mae E Jones-Clark Elem",
    "campus_id": "123910129",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Fehl-Price Elem",
    "campus_id": "123910131",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Fletcher Elem",
    "campus_id": "123910110",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Guess Elem",
    "campus_id": "123910112",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Homer Dr Elem",
    "campus_id": "123910123",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Martin Elem",
    "campus_id": "123910128",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  },
  {
    "campus_name": "Pietzsch/Mac Arthur Elem",
    "campus_id": "123910125",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "notes": "Mixed-grade campus; confirm whether elementary or secondary builder should be used."
  },
  {
    "campus_name": "Regina Howell Elem",
    "campus_id": "123910118",
    "include_status": "Yes",
    "campus_intervention_status": "District confirmation needed",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed"
  }
]);

// Unresolved eligibility: retain exact worksheet status and notes for BISD
// review. These records are neither approved nor rejected by this import.
const ELEMENTARY_CAMPUSES_REVIEW = Object.freeze([
  {
    "campus_name": "Beaumont New El DEAP",
    "campus_id": "123910134",
    "include_status": "Confirm",
    "notes": "Alternative elementary setting; confirm whether to include in standard elementary builder."
  }
]);

const DISTRICT_CONFIG = Object.freeze({
  school_year: "2026-27",
  baseline_year: 2026,
  pending_value: "DISTRICT CONFIRMATION NEEDED",
  campus_list_is_temporary: false,
  campuses: ELEMENTARY_CAMPUSES,
  // District-owned survey instrument/indicator, respondent group, scale and period.
  // Supply approved display units with the baseline/target when appropriate.
  // No campus questionnaire may select or redefine these values.
  perception_indicator_name: "District confirmation needed",
  perception_baseline: "District confirmation needed",
  perception_target: "District confirmation needed",
  // Assign per-campus board_approval_status only after BISD confirms applicability.
  // No campus is assumed to require approval solely from its name/designation.
  board_approval_values: {
    required: "Pending Board Approval — November 19, 2026",
    not_required: "Not required",
    unconfirmed: "District confirmation needed"
  },
  targets: {
    // Ten current project-owner decisions. None is a campus question.
    reading_target: { label: "Grade 3 Reading Meets+", value: 32, format: "percentage" },
    math_target: { label: "Grade 3 Mathematics Meets+", value: 27, format: "percentage" },
    attendance_ada_target_pct: { label: "Attendance / ADA", value: 95, format: "percentage" },
    accountability_target_display: { label: "Overall Accountability", value: "C or better", format: "text" },
    rla_fidelity_target_pct: { label: "RLA Instructional Fidelity", value: 90, format: "percentage-plus" },
    math_fidelity_target_pct: { label: "Mathematics Instructional Fidelity", value: 90, format: "percentage-plus" },
    improvement_milestones_target_pct: { label: "Improvement Milestones On Track", value: 90, format: "percentage-plus", suffix: " each review cycle" },
    enrollment_target: { label: "Enrollment", value: "N/A", format: "text" },
    iss_target: { label: "In-School Suspension (ISS)", value: "Decrease from 2025-26 baseline", format: "text" },
    oss_target: { label: "Out-of-School Suspension (OSS)", value: "Decrease from 2025-26 baseline", format: "text" },

    // Six district decisions still pending. Replace only value when approved;
    // confirm the corresponding measure/unit and adjust format if necessary.
    domain1_target_score: { label: "Domain 1 / Student Achievement", value: "DISTRICT CONFIRMATION NEEDED", format: "number" },
    closing_gaps_target_score: { label: "Closing the Gaps", value: "DISTRICT CONFIRMATION NEEDED", format: "number" },
    chronic_absenteeism_target_pct: { label: "Chronic Absenteeism", value: "DISTRICT CONFIRMATION NEEDED", format: "percentage" },
    priority_survey_target: { label: "District Stakeholder Perception Survey / Indicator", configKey: "perception_target", format: "text" },
    pk2_literacy_eoy_target: { label: "PK-2 Literacy EOY", value: "DISTRICT CONFIRMATION NEEDED", format: "text" },
    pk2_math_eoy_target: { label: "PK-2 Mathematics EOY", value: "DISTRICT CONFIRMATION NEEDED", format: "text" }
  },
  // Working choices based on the source's LIP/TIP/TAP terminology.
  // District leadership should replace/approve the exact option wording.
  intervention_status_options: [
    { value: "Not applicable", label: "Not applicable" },
    { value: "LIP", label: "LIP" },
    { value: "TIP", label: "TIP" },
    { value: "TAP", label: "TAP" },
    { value: "LIP / TIP", label: "LIP / TIP" },
    { value: "LIP / TAP", label: "LIP / TAP" },
    { value: "TIP / TAP", label: "TIP / TAP" },
    { value: "LIP / TIP / TAP", label: "LIP / TIP / TAP" },
    { value: "DISTRICT CONFIRMATION NEEDED", label: "District confirmation needed" }
  ],
  // Working workflow labels, not a claim about official TEA portal statuses.
  // Adjust these to the district-approved submission/maintenance workflow.
  submission_status_options: [
    { value: "Not applicable", label: "Not applicable" },
    { value: "Not yet submitted", label: "Not yet submitted" },
    { value: "Submitted", label: "Submitted" },
    { value: "Maintained locally", label: "Maintained locally" },
    { value: "DISTRICT CONFIRMATION NEEDED", label: "District confirmation needed" }
  ],
  board_approval_options: [
    { value: "Not Required", label: "Not Required" },
    { value: "Not Yet Approved", label: "Not Yet Approved" },
    { value: "Date", label: "Date" }
  ]
});

// Form schema: every baseline/current/program value is collected once.
// Measure descriptions supply context without inventing assessment definitions.
const CAMPUS_FIELDS = Object.freeze([
  { id: "enrollment_baseline", sourceId: "U01", group: "demographics", label: "Current enrollment", type: "number", min: 0, step: 1, targetKey: "enrollment_target", required: true, enabled: true, help: "Enter current aggregate campus enrollment as a whole number." },
  { id: "economically_disadvantaged_pct", sourceId: "U02", group: "demographics", label: "Economically Disadvantaged (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported campus percentage from 0 to 100." },
  { id: "emergent_bilingual_pct", sourceId: "U03", group: "demographics", label: "Emergent Bilingual (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported campus percentage from 0 to 100." },
  { id: "special_education_pct", sourceId: "U04", group: "demographics", label: "Special Education (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported campus percentage from 0 to 100." },
  { id: "attendance_ada_baseline_pct", sourceId: "U05", group: "demographics", label: "Attendance / ADA baseline (%)", type: "percentage", targetKey: "attendance_ada_target_pct", required: true, enabled: true, help: "Enter the reported campus attendance percentage, not an attendance count." },
  { id: "mobility_baseline_pct", sourceId: "U06", group: "demographics", label: "Mobility (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported aggregate campus mobility rate." },

  { id: "accountability_baseline_display", sourceId: "D03", group: "academic", label: DISTRICT_CONFIG.baseline_year + " Overall Accountability rating / score", type: "text", maxLength: 40, targetKey: "accountability_target_display", required: true, enabled: true, help: "Copy the official rating, score, or combined result in its reported format." },
  { id: "grade3_reading_meets_baseline_pct", sourceId: "U07", group: "academic", stateKey: "reading", label: DISTRICT_CONFIG.baseline_year + " Grade 3 Reading Meets+ (%)", type: "percentage", targetKey: "reading_target", required: true, enabled: true, help: "Meets Grade Level or Above. Enter the baseline only; the target is set by the district." },
  { id: "grade3_math_meets_baseline_pct", sourceId: "U08", group: "academic", stateKey: "math", label: DISTRICT_CONFIG.baseline_year + " Grade 3 Mathematics Meets+ (%)", type: "percentage", targetKey: "math_target", required: true, enabled: true, help: "Meets Grade Level or Above. Enter the baseline only; the target is set by the district." },
  { id: "domain1_baseline_score", sourceId: "U11", group: "academic", label: DISTRICT_CONFIG.baseline_year + " Domain 1 / Student Achievement score", type: "number", step: "any", targetKey: "domain1_target_score", required: true, enabled: true, help: "Copy the official reported score. Do not calculate a new score." },
  { id: "closing_gaps_baseline_score", sourceId: "U17", group: "academic", label: DISTRICT_CONFIG.baseline_year + " Closing the Gaps score", type: "number", step: "any", targetKey: "closing_gaps_target_score", required: true, enabled: true, help: "Copy the official reported score." },

  { id: "pk2_literacy_measure", group: "pk2", label: "PK-2 Literacy measure / assessment name", type: "text", maxLength: 200, required: true, enabled: true, help: "Name the approved assessment. Include its unit/scale and BOY reporting period so the baseline is understandable." },
  { id: "pk2_literacy_boy_baseline", sourceId: "U09", group: "pk2", label: "PK-2 Literacy BOY baseline", type: "number", step: "any", targetKey: "pk2_literacy_eoy_target", required: true, enabled: true, help: "Enter the aggregate BOY result using the assessment and scale named above. No individual student results." },
  { id: "pk2_math_measure", group: "pk2", label: "PK-2 Mathematics measure / assessment name", type: "text", maxLength: 200, required: true, enabled: true, help: "Name the approved assessment. Include its unit/scale and BOY reporting period." },
  { id: "pk2_math_boy_baseline", sourceId: "U10", group: "pk2", label: "PK-2 Mathematics BOY baseline", type: "number", step: "any", targetKey: "pk2_math_eoy_target", required: true, enabled: true, help: "Enter the aggregate BOY result using the assessment and scale named above." },

  { id: "chronic_absenteeism_baseline_pct", sourceId: "U13", group: "climate", label: "Chronic Absenteeism baseline (%)", type: "percentage", targetKey: "chronic_absenteeism_target_pct", required: true, enabled: true, help: "Enter the reported aggregate campus chronic absenteeism rate." },

  { id: "iss_baseline_pct", sourceId: "U14-ISS", group: "climate", label: "2025-26 In-School Suspension (ISS) rate %", type: "percentage", targetKey: "iss_target", required: true, enabled: true, help: "Enter the reported aggregate campus ISS rate for 2025-26, from 0 to 100." },
  { id: "oss_baseline_pct", sourceId: "U14-OSS", group: "climate", label: "2025-26 Out-of-School Suspension (OSS) rate %", type: "percentage", targetKey: "oss_target", required: true, enabled: true, help: "Enter the reported aggregate campus OSS rate for 2025-26, from 0 to 100." },

  { id: "rla_fidelity_baseline_pct", sourceId: "U15", group: "implementation", label: "RLA Instructional Fidelity baseline (%)", type: "percentage", targetKey: "rla_fidelity_target_pct", required: true, enabled: true, help: "Use the approved observation rubric, monitored-classroom denominator, and reporting period." },
  { id: "math_fidelity_baseline_pct", sourceId: "U16", group: "implementation", label: "Mathematics Instructional Fidelity baseline (%)", type: "percentage", targetKey: "math_fidelity_target_pct", required: true, enabled: true, help: "Use the approved observation rubric, monitored-classroom denominator, and reporting period." },
  { id: "improvement_milestones_baseline_pct", sourceId: "U18", group: "implementation", label: "Improvement Milestones On Track baseline (%)", type: "percentage", targetKey: "improvement_milestones_target_pct", required: true, enabled: true, help: "Use the required milestone set and current review cycle. Enter the percentage currently on track." },

  { id: "sce_allocation_amount", sourceId: "D16", group: "program", label: "Total SCE allocation", type: "number", format: "currency", min: 0, step: "any", required: true, enabled: true, help: "Enter the confirmed campus allocation in dollars. Use zero only for a confirmed zero allocation." },
]);

// Every original FIELD_MAP source definition has an explicit binding. Metadata
// measure-name questions add context; they are not extra source placeholders.
const SOURCE_BINDINGS = {
  U01: { input: "enrollment_baseline" }, U02: { input: "economically_disadvantaged_pct" },
  U03: { input: "emergent_bilingual_pct" }, U04: { input: "special_education_pct" },
  U05: { input: "attendance_ada_baseline_pct" }, U06: { input: "mobility_baseline_pct" },
  U07: { input: "grade3_reading_meets_baseline_pct" }, U08: { input: "grade3_math_meets_baseline_pct" },
  U09: { input: "pk2_literacy_boy_baseline" }, U10: { input: "pk2_math_boy_baseline" },
  U11: { input: "domain1_baseline_score" }, U12: { district: "perception_baseline" },
  U13: { input: "chronic_absenteeism_baseline_pct" }, U14: { inputs: ["iss_baseline_pct", "oss_baseline_pct"] },
  U15: { input: "rla_fidelity_baseline_pct" }, U16: { input: "math_fidelity_baseline_pct" },
  U17: { input: "closing_gaps_baseline_score" }, U18: { input: "improvement_milestones_baseline_pct" },
  U19: { campusProperty: "submission_local_maintenance_status" },
  D01: { input: "campus_name" }, D02: { campusProperty: "campus_id" },
  D03: { input: "accountability_baseline_display" },
  D04: { target: "enrollment_target" }, D05: { target: "attendance_ada_target_pct" },
  D06: { target: "accountability_target_display" }, D07: { target: "reading_target" },
  D08: { target: "math_target" }, D09: { target: "pk2_literacy_eoy_target" },
  D10: { target: "pk2_math_eoy_target" }, D11: { target: "domain1_target_score" },
  D12: { target: "priority_survey_target" }, D13: { target: "chronic_absenteeism_target_pct" },
  D14: { targets: ["iss_target", "oss_target"] }, D15: { target: "closing_gaps_target_score" },
  D16: { input: "sce_allocation_amount" }, D17: { campusProperty: "campus_intervention_status" },
  D18: { campusProperty: "tea_identification_indicators" }, D19: { campusProperty: "board_approval_status" },
  C01: { targets: ["rla_fidelity_target_pct", "math_fidelity_target_pct"] },
  C02: { target: "improvement_milestones_target_pct" }
};
// The eight identity/roster definitions remain outside this application's scope.
// Their explicit pending/external completion state is not a request for names.
for (let i = 1; i <= 8; i += 1) {
  SOURCE_BINDINGS["X" + String(i).padStart(2, "0")] = {
    value: DISTRICT_CONFIG.pending_value,
    completion: "Completed directly in Plan4Learning / district systems; not collected in this application."
  };
}

window.BISD_CIP_CONFIG = Object.freeze({
  DISTRICT_CONFIG, CAMPUS_FIELDS, SOURCE_BINDINGS,
  // Compatibility aliases for the unchanged legacy working-draft generator.
  // Preview generation stays paused until its mappings are updated separately.
  ELEMENTARY_CAMPUSES, ELEMENTARY_CAMPUSES_REVIEW,
  DISTRICT_TARGETS: Object.freeze({
    reading: DISTRICT_CONFIG.targets.reading_target.value,
    math: DISTRICT_CONFIG.targets.math_target.value
  }),
  OPTIONAL_FIELDS: CAMPUS_FIELDS,
  campusListIsTemporary: DISTRICT_CONFIG.campus_list_is_temporary
});
