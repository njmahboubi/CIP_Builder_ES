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
    "campus_intervention_status": "TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TAP",
    "intervention_status": "new",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Bingman PK",
    "campus_id": "123910132",
    "include_status": "Yes",
    "campus_intervention_status": "TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "notes": "PK-only campus; confirm whether the elementary CIP builder applies unchanged.",
    "intervention_type": "TAP",
    "intervention_status": "new",
    "grade_configuration": "pk-only"
  },
  {
    "campus_name": "Blanchette Elem",
    "campus_id": "123910127",
    "include_status": "Yes",
    "campus_intervention_status": "TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TAP",
    "intervention_status": "new",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Caldwood Elem",
    "campus_id": "123910104",
    "include_status": "Yes",
    "campus_intervention_status": "LIP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "LIP",
    "intervention_status": "not configured",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Charlton-Pollard Elem",
    "campus_id": "123910130",
    "include_status": "Yes",
    "campus_intervention_status": "Continuing TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TAP",
    "intervention_status": "continuing",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Curtis Elem",
    "campus_id": "123910105",
    "include_status": "Yes",
    "campus_intervention_status": "LIP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "LIP",
    "intervention_status": "not configured",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Dishman Elem",
    "campus_id": "123910126",
    "include_status": "Yes",
    "campus_intervention_status": "TIP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TIP",
    "intervention_status": "new",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Dr Mae E Jones-Clark Elem",
    "campus_id": "123910129",
    "include_status": "Yes",
    "campus_intervention_status": "TIP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TIP",
    "intervention_status": "new",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Fehl-Price Elem",
    "campus_id": "123910131",
    "include_status": "Yes",
    "campus_intervention_status": "Continuing TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TAP",
    "intervention_status": "continuing",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Fletcher Elem",
    "campus_id": "123910110",
    "include_status": "Yes",
    "campus_intervention_status": "None",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "None",
    "intervention_status": "not configured",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Guess Elem",
    "campus_id": "123910112",
    "include_status": "Yes",
    "campus_intervention_status": "TIP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TIP",
    "intervention_status": "new",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Homer Dr Elem",
    "campus_id": "123910123",
    "include_status": "Yes",
    "campus_intervention_status": "Continuing TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TAP",
    "intervention_status": "continuing",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Martin Elem",
    "campus_id": "123910128",
    "include_status": "Yes",
    "campus_intervention_status": "Continuing TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "TAP",
    "intervention_status": "continuing",
    "grade_configuration": "elementary"
  },
  {
    "campus_name": "Pietzsch/Mac Arthur Elem",
    "campus_id": "123910125",
    "include_status": "Yes",
    "campus_intervention_status": "Continuing TAP",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "notes": "Mixed-grade campus; confirm whether elementary or secondary builder should be used.",
    "intervention_type": "TAP",
    "intervention_status": "continuing",
    "grade_configuration": "mixed-unconfirmed"
  },
  {
    "campus_name": "Regina Howell Elem",
    "campus_id": "123910118",
    "include_status": "Yes",
    "campus_intervention_status": "None",
    "tea_identification_indicators": "District confirmation needed",
    "board_approval_status": "District confirmation needed",
    "submission_local_maintenance_status": "District confirmation needed",
    "intervention_type": "None",
    "intervention_status": "not configured",
    "grade_configuration": "elementary"
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
    // Nine confirmed district target settings. None is a campus question.
    reading_target: { label: "Grade 3 Reading Meets+", value: 32, format: "percentage" },
    math_target: { label: "Grade 3 Mathematics Meets+", value: 27, format: "percentage" },
    attendance_ada_target_pct: { label: "Attendance / ADA", value: 95, format: "percentage" },
    accountability_target_display: { label: "Overall Accountability", value: "C or better", format: "text" },
    rla_fidelity_target_pct: { label: "RLA Instructional Fidelity", value: 90, format: "percentage-plus" },
    math_fidelity_target_pct: { label: "Mathematics Instructional Fidelity", value: 90, format: "percentage-plus" },
    improvement_milestones_target_pct: { label: "Improvement Milestones On Track", value: 90, format: "percentage-plus", suffix: " each review cycle" },
    enrollment_target: { label: "Enrollment", value: "N/A", format: "text" },
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

// Published TEA planning baselines supplied and verified by district direction.
// CDCN is authoritative. These records are historical, never live SIS values.
const PUBLIC_BASELINES = Object.freeze(Object.fromEntries(Object.entries({
  "123910101": {
    "sourceYear": 2026,
    "enrollment": 645,
    "economicallyDisadvantaged": 86.0,
    "emergentBilingual": 9.9,
    "specialEducation": 16.0,
    "overall": {
      "rating": "D",
      "score": 60
    },
    "studentAchievement": {
      "rating": "F",
      "score": 56
    },
    "academicGrowth": {
      "rating": "D",
      "score": 60
    },
    "relativePerformance": {
      "rating": "F",
      "score": 57
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 61
    },
    "mobility": 23.0,
    "attendance": {
      "value": 93.2,
      "sourceYear": "2023-24"
    },
    "chronicAbsenteeism": {
      "value": 20.7,
      "sourceYear": "2023-24"
    },
    "accountabilityAttendanceIndicator": {
      "value": 93.9,
      "sourceYear": 2026
    }
  },
  "123910132": {
    "sourceYear": 2026,
    "enrollment": 509,
    "economicallyDisadvantaged": 100.0,
    "emergentBilingual": null,
    "specialEducation": null,
    "overall": {
      "rating": "D",
      "score": 69
    },
    "studentAchievement": {
      "rating": "Not Rated",
      "score": null
    },
    "academicGrowth": {
      "rating": "Not Rated",
      "score": null
    },
    "relativePerformance": {
      "rating": "Not Rated",
      "score": null
    },
    "closingTheGaps": {
      "rating": "Not Rated",
      "score": null
    },
    "mobility": null
  },
  "123910127": {
    "sourceYear": 2026,
    "enrollment": 426,
    "economicallyDisadvantaged": 97.4,
    "emergentBilingual": 9.6,
    "specialEducation": 16.7,
    "overall": {
      "rating": "F",
      "score": 59
    },
    "studentAchievement": {
      "rating": "F",
      "score": 52
    },
    "academicGrowth": {
      "rating": "F",
      "score": 57
    },
    "relativePerformance": {
      "rating": "F",
      "score": 54
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 62
    },
    "mobility": 24.1,
    "attendance": {
      "value": 91.9,
      "sourceYear": "2023-24"
    },
    "chronicAbsenteeism": {
      "value": 30.8,
      "sourceYear": "2023-24"
    }
  },
  "123910104": {
    "sourceYear": 2026,
    "enrollment": 564,
    "economicallyDisadvantaged": 88.7,
    "emergentBilingual": 41.7,
    "specialEducation": 13.5,
    "overall": {
      "rating": "D",
      "score": 61
    },
    "studentAchievement": {
      "rating": "F",
      "score": 58
    },
    "academicGrowth": {
      "rating": "D",
      "score": 60
    },
    "relativePerformance": {
      "rating": "D",
      "score": 60
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 63
    },
    "mobility": 22.7,
    "attendance": {
      "value": 93.6,
      "sourceYear": "2023-24"
    },
    "chronicAbsenteeism": {
      "value": 21.8,
      "sourceYear": "2023-24"
    },
    "accountabilityAttendanceIndicator": {
      "value": 94.2,
      "sourceYear": 2026
    }
  },
  "123910130": {
    "sourceYear": 2026,
    "enrollment": 417,
    "economicallyDisadvantaged": 89.7,
    "emergentBilingual": 16.8,
    "specialEducation": 13.2,
    "overall": {
      "rating": "F",
      "score": 57
    },
    "studentAchievement": {
      "rating": "F",
      "score": 52
    },
    "academicGrowth": {
      "rating": "F",
      "score": 51
    },
    "relativePerformance": {
      "rating": "F",
      "score": 54
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 64
    },
    "mobility": 20.3,
    "attendance": {
      "value": 92.2,
      "sourceYear": "2023-24"
    },
    "chronicAbsenteeism": {
      "value": 31.4,
      "sourceYear": "2023-24"
    },
    "accountabilityAttendanceIndicator": {
      "value": 92.7,
      "sourceYear": 2026
    }
  },
  "123910105": {
    "sourceYear": 2026,
    "enrollment": 490,
    "economicallyDisadvantaged": 64.1,
    "emergentBilingual": 8.0,
    "specialEducation": 18.4,
    "overall": {
      "rating": "D",
      "score": 64
    },
    "studentAchievement": {
      "rating": "D",
      "score": 65
    },
    "academicGrowth": {
      "rating": "F",
      "score": 53
    },
    "relativePerformance": {
      "rating": "D",
      "score": 60
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 63
    },
    "mobility": 15.9
  },
  "123910126": {
    "sourceYear": 2026,
    "enrollment": 508,
    "economicallyDisadvantaged": 92.1,
    "emergentBilingual": 11.8,
    "specialEducation": 16.7,
    "overall": {
      "rating": "F",
      "score": 54
    },
    "studentAchievement": {
      "rating": "F",
      "score": 54
    },
    "academicGrowth": {
      "rating": "F",
      "score": 55
    },
    "relativePerformance": {
      "rating": "F",
      "score": 56
    },
    "closingTheGaps": {
      "rating": "F",
      "score": 48
    },
    "mobility": 16.3,
    "accountabilityAttendanceIndicator": {
      "value": 94.3,
      "sourceYear": 2026
    }
  },
  "123910129": {
    "sourceYear": 2026,
    "enrollment": 504,
    "economicallyDisadvantaged": 94.4,
    "emergentBilingual": 20.6,
    "specialEducation": 13.1,
    "overall": {
      "rating": "F",
      "score": 41
    },
    "studentAchievement": {
      "rating": "F",
      "score": 44
    },
    "academicGrowth": {
      "rating": "F",
      "score": 45
    },
    "relativePerformance": {
      "rating": "F",
      "score": 45
    },
    "closingTheGaps": {
      "rating": "F",
      "score": 30
    },
    "mobility": 31.7
  },
  "123910131": {
    "sourceYear": 2026,
    "enrollment": 318,
    "economicallyDisadvantaged": 85.2,
    "emergentBilingual": 8.2,
    "specialEducation": 9.4,
    "overall": {
      "rating": "F",
      "score": 46
    },
    "studentAchievement": {
      "rating": "F",
      "score": 46
    },
    "academicGrowth": {
      "rating": "F",
      "score": 49
    },
    "relativePerformance": {
      "rating": "F",
      "score": 47
    },
    "closingTheGaps": {
      "rating": "F",
      "score": 38
    },
    "mobility": 41.9
  },
  "123910110": {
    "sourceYear": 2026,
    "enrollment": 576,
    "economicallyDisadvantaged": 95.3,
    "emergentBilingual": 56.8,
    "specialEducation": 13.9,
    "overall": {
      "rating": "C",
      "score": 73
    },
    "studentAchievement": {
      "rating": "D",
      "score": 69
    },
    "academicGrowth": {
      "rating": "C",
      "score": 76
    },
    "relativePerformance": {
      "rating": "C",
      "score": 76
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 66
    },
    "mobility": 13.3
  },
  "123910112": {
    "sourceYear": 2026,
    "enrollment": 698,
    "economicallyDisadvantaged": 78.7,
    "emergentBilingual": 6.9,
    "specialEducation": 17.8,
    "overall": {
      "rating": "F",
      "score": 59
    },
    "studentAchievement": {
      "rating": "F",
      "score": 56
    },
    "academicGrowth": {
      "rating": "F",
      "score": 59
    },
    "relativePerformance": {
      "rating": "F",
      "score": 57
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 68
    },
    "mobility": 16.7
  },
  "123910123": {
    "sourceYear": 2026,
    "enrollment": 427,
    "economicallyDisadvantaged": 94.4,
    "emergentBilingual": 3.5,
    "specialEducation": 11.5,
    "overall": {
      "rating": "F",
      "score": 44
    },
    "studentAchievement": {
      "rating": "F",
      "score": 45
    },
    "academicGrowth": {
      "rating": "F",
      "score": 50
    },
    "relativePerformance": {
      "rating": "F",
      "score": 46
    },
    "closingTheGaps": {
      "rating": "F",
      "score": 30
    },
    "mobility": 37.2
  },
  "123910128": {
    "sourceYear": 2026,
    "enrollment": 530,
    "economicallyDisadvantaged": 93.6,
    "emergentBilingual": 7.4,
    "specialEducation": 12.5,
    "overall": {
      "rating": "F",
      "score": 51
    },
    "studentAchievement": {
      "rating": "F",
      "score": 48
    },
    "academicGrowth": {
      "rating": "F",
      "score": 54
    },
    "relativePerformance": {
      "rating": "F",
      "score": 50
    },
    "closingTheGaps": {
      "rating": "F",
      "score": 43
    },
    "mobility": 23.5
  },
  "123910125": {
    "sourceYear": 2026,
    "enrollment": 1179,
    "economicallyDisadvantaged": 94.8,
    "emergentBilingual": 28.5,
    "specialEducation": 13.5,
    "overall": {
      "rating": "F",
      "score": 59
    },
    "studentAchievement": {
      "rating": "F",
      "score": 47
    },
    "academicGrowth": {
      "rating": "F",
      "score": 55
    },
    "relativePerformance": {
      "rating": "F",
      "score": 49
    },
    "closingTheGaps": {
      "rating": "D",
      "score": 67
    },
    "mobility": 26.1
  },
  "123910118": {
    "sourceYear": 2026,
    "enrollment": 718,
    "economicallyDisadvantaged": 60.2,
    "emergentBilingual": 15.3,
    "specialEducation": 14.9,
    "overall": {
      "rating": "C",
      "score": 71
    },
    "studentAchievement": {
      "rating": "C",
      "score": 72
    },
    "academicGrowth": {
      "rating": "D",
      "score": 65
    },
    "relativePerformance": {
      "rating": "C",
      "score": 70
    },
    "closingTheGaps": {
      "rating": "C",
      "score": 70
    },
    "mobility": null
  }
}).map(([id, record]) => [id, Object.freeze({ ...record,
  ...Object.fromEntries(["overall", "studentAchievement", "academicGrowth", "relativePerformance", "closingTheGaps"].map(key => [key, Object.freeze(record[key])]))
})])));
const PUBLIC_BASELINE_METRICS = Object.freeze([
  ["Enrollment", "enrollment", "number"],
  ["Economically Disadvantaged", "economicallyDisadvantaged", "percentage"],
  ["Emergent Bilingual", "emergentBilingual", "percentage"],
  ["Special Education", "specialEducation", "percentage"],
  ["Overall Accountability", "overall", "rating"],
  ["Student Achievement", "studentAchievement", "rating"],
  ["Academic Growth", "academicGrowth", "rating"],
  ["Relative Performance", "relativePerformance", "rating"],
  ["Closing the Gaps", "closingTheGaps", "rating"],
  // Mobility source: 2026 TEA Campus Comparison Group, supplied district-verified rates.
  ["Mobility", "mobility", "percentage"]
].map(([label,key,type]) => Object.freeze({label,key,type})));
const REVIEW_BASELINE_FIELDS = Object.freeze([
  "grade3_reading_meets_baseline_pct", "grade3_math_meets_baseline_pct",
  "attendance_ada_baseline_pct", "chronic_absenteeism_baseline_pct", "oss_baseline_pct", "mobility_baseline_pct"
]);
const PUBLIC_BASELINE_BINDINGS = Object.freeze({
  attendance_ada_baseline_pct: ["attendance"], chronic_absenteeism_baseline_pct: ["chronicAbsenteeism"],
  grade3_reading_meets_baseline_pct: ["grade3ReadingMeets"], grade3_math_meets_baseline_pct: ["grade3MathMeets"],
  oss_baseline_pct: ["oss"],
  mobility_baseline_pct: ["mobility"],
  enrollment_baseline: ["enrollment"], economically_disadvantaged_pct: ["economicallyDisadvantaged"],
  emergent_bilingual_pct: ["emergentBilingual"], special_education_pct: ["specialEducation"],
  accountability_baseline_display: ["overall", "display"], domain1_baseline_score: ["studentAchievement", "score"],
  closing_gaps_baseline_score: ["closingTheGaps", "score"]
});
const publicBaselineLabel = record => record.sourceYear + " TEA Published Baseline";
function publicBaselineRows(cdcn, localValues = {}) {
  const record = PUBLIC_BASELINES[cdcn];
  if (!record) return [];
  const rows = PUBLIC_BASELINE_METRICS.filter(metric => metric.key !== "mobility").map(metric => {
    const raw = record[metric.key];
    const display = raw === null ? "VERIFY — Public baseline not yet loaded" : metric.type === "rating"
      ? raw.rating + (raw.score === null ? "" : " / " + raw.score)
      : metric.type === "percentage" ? raw.toFixed(1) + "%" : String(raw);
    return [metric.label, display, raw === null ? "VERIFY" : publicBaselineLabel(record)];
  });
  for (const fieldId of REVIEW_BASELINE_FIELDS) {
    const field = CAMPUS_FIELDS.find(item => item.id === fieldId);
    const info = getBaselineReview(cdcn, fieldId);
    const local = localValues[fieldId];
    const hasLocal = info.status === "verify" && typeof local === "number" && Number.isFinite(local) && local >= 0 && local <= 100;
    rows.push([field.label, hasLocal ? local + "%" : info.text,
      hasLocal ? "LOCAL ENTRY — verify source and year" : info.sourceLabel || info.status.toUpperCase()]);
  }
  if (record.accountabilityAttendanceIndicator) {
    rows.push(["Accountability attendance indicator (separate context)", record.accountabilityAttendanceIndicator.value.toFixed(1) + "%", publicBaselineLabel(record.accountabilityAttendanceIndicator)]);
  }
  return rows;
}
function getPublishedBaseline(cdcn, fieldId) {
  const binding = PUBLIC_BASELINE_BINDINGS[fieldId];
  if (!binding) return undefined;
  const record = PUBLIC_BASELINES[cdcn];
  if (!record) return REVIEW_BASELINE_FIELDS.includes(fieldId) ? undefined : {value:null, sourceLabel:"Published Baseline unavailable — VERIFY"};
  let value = record[binding[0]];
  if (REVIEW_BASELINE_FIELDS.includes(fieldId) && value == null) return undefined;
  const source = value && typeof value === "object" && Object.hasOwn(value, "sourceYear") ? value : record;
  if (source !== record) value = value.value;
  if (binding[1]) value = binding[1] === "display" ? value.rating + (value.score === null ? "" : " / " + value.score) : value.score === null ? value.rating : value.score;
  return {value, sourceYear:source.sourceYear, sourceLabel:publicBaselineLabel(source)};
}
function getBaselineReview(cdcn, fieldId) {
  const campus = DISTRICT_CONFIG.campuses.find(item => item.campus_id === cdcn);
  const grade3 = /^grade3_(reading|math)_meets_baseline_pct$/.test(fieldId);
  if (grade3 && campus?.grade_configuration === "pk-only") return {status:"not applicable",text:"Not Applicable — campus grade span"};
  const published = getPublishedBaseline(cdcn, fieldId);
  if (published && published.value !== null) {
    const field = CAMPUS_FIELDS.find(item => item.id === fieldId);
    return {status:"published baseline",text:String(published.value) + (field?.type === "percentage" ? "%" : ""),sourceLabel:published.sourceLabel};
  }
  if (published || REVIEW_BASELINE_FIELDS.includes(fieldId)) return {
    status:"verify",text:grade3 ? "VERIFY — Grade 3 campus Meets+ public baseline not yet loaded"
      : fieldId === "oss_baseline_pct" ? "VERIFY — TEA campus OSS baseline not yet loaded"
      : "VERIFY — Public baseline not yet loaded"
  };
  return undefined;
}

// Form schema: published fields are review-only; local values are entered once.
// Measure descriptions supply context without inventing assessment definitions.
const CAMPUS_FIELDS = Object.freeze([
  { id: "enrollment_baseline", sourceId: "U01", group: "demographics", label: "Enrollment Published Baseline", type: "number", min: 0, step: 1, targetKey: "enrollment_target", required: true, enabled: true, help: "Loaded from the published TEA campus record." },
  { id: "economically_disadvantaged_pct", sourceId: "U02", group: "demographics", label: "Economically Disadvantaged (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported campus percentage from 0 to 100." },
  { id: "emergent_bilingual_pct", sourceId: "U03", group: "demographics", label: "Emergent Bilingual (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported campus percentage from 0 to 100." },
  { id: "special_education_pct", sourceId: "U04", group: "demographics", label: "Special Education (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "Enter the reported campus percentage from 0 to 100." },
  { id: "attendance_ada_baseline_pct", sourceId: "U05", group: "climate", label: "Attendance / ADA baseline (%)", type: "percentage", targetKey: "attendance_ada_target_pct", required: true, enabled: true, help: "Enter the reported campus attendance percentage, not an attendance count." },
  { id: "mobility_baseline_pct", sourceId: "U06", group: "climate", label: "Mobility (%)", type: "percentage", sourceTargetNA: true, required: true, enabled: true, help: "VERIFY / manual entry required only when no verified published mobility baseline is available. Enter the verified aggregate campus rate." },

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

  { id: "oss_baseline_pct", sourceId: "U14-OSS", group: "climate", label: "2025-26 Out-of-School Suspension (OSS) rate %", type: "percentage", targetKey: "oss_target", required: true, enabled: true, help: "Enter the reported aggregate campus OSS rate for 2025-26, from 0 to 100." },

  { id: "rla_fidelity_baseline_pct", sourceId: "U15", group: "implementation", label: "RLA Instructional Fidelity baseline (%)", type: "percentage", targetKey: "rla_fidelity_target_pct", required: true, enabled: true, help: "Use the approved observation rubric, monitored-classroom denominator, and reporting period." },
  { id: "math_fidelity_baseline_pct", sourceId: "U16", group: "implementation", label: "Mathematics Instructional Fidelity baseline (%)", type: "percentage", targetKey: "math_fidelity_target_pct", required: true, enabled: true, help: "Use the approved observation rubric, monitored-classroom denominator, and reporting period." },
  { id: "improvement_milestones_baseline_pct", sourceId: "U18", group: "implementation", label: "Improvement Milestones On Track baseline (%)", type: "percentage", targetKey: "improvement_milestones_target_pct", required: true, enabled: true, help: "Use the required milestone set and current review cycle. Enter the percentage currently on track." },

  { id: "sce_allocation_amount", sourceId: "D16", group: "program", label: "Total SCE allocation", type: "number", format: "currency", min: 0, step: "any", required: true, enabled: true, help: "Enter the confirmed campus allocation in dollars. Use zero only for a confirmed zero allocation." },
].map(field => Object.freeze(Object.hasOwn(PUBLIC_BASELINE_BINDINGS, field.id) && !REVIEW_BASELINE_FIELDS.includes(field.id)
  ? {...field, required:false, publicBaseline:true, help:"Read-only published TEA baseline; review the source year for the selected campus."}
  : REVIEW_BASELINE_FIELDS.includes(field.id)
    ? {...field, required:false, baselineReview:true, group:"campus", help:"Optional: enter only a verified local baseline if the public value is not loaded. Leave blank to retain VERIFY; do not enter a target, estimate or a different measure."}
    : field)));

// Every original FIELD_MAP source definition has an explicit binding. Metadata
// measure-name questions add context; they are not extra source placeholders.
const SOURCE_BINDINGS = {
  U01: { input: "enrollment_baseline" }, U02: { input: "economically_disadvantaged_pct" },
  U03: { input: "emergent_bilingual_pct" }, U04: { input: "special_education_pct" },
  U05: { input: "attendance_ada_baseline_pct" }, U06: { input: "mobility_baseline_pct" },
  U07: { input: "grade3_reading_meets_baseline_pct" }, U08: { input: "grade3_math_meets_baseline_pct" },
  U09: { input: "pk2_literacy_boy_baseline" }, U10: { input: "pk2_math_boy_baseline" },
  U11: { input: "domain1_baseline_score" }, U12: { district: "perception_baseline" },
  U13: { input: "chronic_absenteeism_baseline_pct" }, U14: { input: "oss_baseline_pct" },
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
  D14: { target: "oss_target" }, D15: { target: "closing_gaps_target_score" },
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
  PUBLIC_BASELINES, PUBLIC_BASELINE_METRICS, PUBLIC_BASELINE_BINDINGS, REVIEW_BASELINE_FIELDS, publicBaselineRows, getPublishedBaseline, getBaselineReview,
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
