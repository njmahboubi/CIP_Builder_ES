"use strict";

(() => {
  // Source: reference/2026-27 SAMPLE Elementary CIP.docx.
  // P/T keys are stable application IDs; current DOCX locators are in FIELD_MAP.md.
  // Fixed language/action rows are retained;
  // controlled values are resolved once from the questionnaire and DISTRICT_CONFIG.
  const SOURCE = {
  "paragraphs": {
    "P016": "This document is designed to function as the campus working source for Plan4Learning. BISD pre-populates the common CNA narrative, strengths, problem statements, root causes, goals, strategies, action steps, owners, evidence, and review cadence. Before the plan is sent to the campus, the district should also pre-populate campus identifiers and any metrics already available from confirmed TEA or district sources. Campus leaders should update only the remaining blue-shaded metric fields, review the completed plan for accuracy, and then COPY AND PASTE the finished content into the matching Plan4Learning fields.",
    "P017": "Campus leader task: Complete only the remaining blue-shaded metric fields. Do not rewrite the common district language. After all metrics are confirmed, COPY AND PASTE the completed content section-by-section into Plan4Learning.",
    "P024": "This campus serves students in elementary grade levels within Beaumont ISD and operates within a districtwide transformation model centered on instructional excellence, leadership density, and operational coherence. The campus community includes students from multiple racial/ethnic groups and special populations, including economically disadvantaged students, emergent bilingual students, students receiving special education services, and students who may experience mobility or attendance barriers. Campus planning will disaggregate academic, attendance, behavior, and implementation outcomes by student group so that supports can be differentiated while maintaining a common instructional model. The campus will use current TEA, PEIMS, attendance, staffing, and local assessment data to monitor whether all students have equitable access to grade-level instruction and acceleration.",
    "P053": "The campus is supported by a coherent districtwide instructional and school-effectiveness model rather than a collection of disconnected campus initiatives.",
    "P054": "District systems provide common expectations for curriculum, lesson preparation, formative assessment, observation, coaching, attendance, student support, and leadership routines.",
    "P055": "Campus leaders have access to district and campus data that can be disaggregated by student group and used to identify students requiring additional academic, attendance, or behavioral support.",
    "P058": "Student needs vary across demographic and special-population groups, requiring differentiated support while maintaining consistent access to strong Tier 1 instruction.",
    "P060": "Variation in attendance, mobility, academic readiness, language needs, disability status, and other student factors increases the need for consistent progress monitoring and rapid assignment of targeted supports.",
    "P063": "Staffing stability and adult capacity can constrain sustained improvement at high-need campuses.",
    "P065": "Vacancies, certification gaps, variation in teacher experience/effectiveness, and inconsistent access to differentiated coaching can limit reliable implementation of the BISD instructional model.",
    "P070": "Student learning priorities are anchored in Beaumont ISD Board Outcome Goals for Grade 3 Reading and Mathematics and in the district expectation that strong PK-2 foundational literacy and numeracy prepare students for Grade 3 success. The campus will use STAAR, district/local assessments, Demonstrations of Learning, progress-monitoring measures, student work, and subgroup data to identify strengths, gaps, and required instructional responses. Campus data reviews will connect student outcomes to evidence of curriculum implementation, PLC preparation, differentiation, intervention, and coaching.",
    "P093": "The district has established a common instructional model with clear expectations for curriculum, lesson preparation, gradual release, engagement, DOL use, differentiation, and teacher feedback.",
    "P094": "PLC and Demo Day structures provide recurring opportunities to internalize lessons, anticipate misconceptions, rehearse delivery, and calibrate student evidence before instruction.",
    "P095": "District and campus performance reviews create a recurring structure for identifying off-trajectory grades, student groups, classrooms, and individual students and assigning follow-up actions.",
    "P098": "Grade 3 literacy and mathematics outcomes require accelerated improvement to meet Board expectations.",
    "P100": "Inconsistent fidelity to AIEF, district-provided curriculum, PLC/Demo Day preparation, DOL-driven differentiation, same-day second teach, and coaching creates variability in instructional quality.",
    "P103": "Foundational PK-2 literacy and numeracy must more consistently translate into Grade 3 readiness.",
    "P105": "Progress monitoring, vertical alignment, and targeted acceleration are not yet consistently used to adjust instruction early enough for all students.",
    "P110": "The campus will implement the Beaumont ISD instructional and operational model as the primary structure for improvement rather than treating the CIP as a separate initiative. Instructional work will be organized through the Accelerated Instructional Excellence Framework (AIEF), district-provided curriculum, weekly PLC preparation, Demo Day rehearsal, gradual release, intentional engagement, daily Demonstrations of Learning, purposeful differentiation, same-day second teach/acceleration, Coaching in the Moment, and scored spot observations. Campus leadership will use recurring administrative huddles, performance reviews, attendance routines, and student-support systems to protect instructional time and address implementation barriers. Where the campus is subject to LIP, TIP, or TAP requirements, those requirements will be integrated into this same improvement architecture.",
    "P112": "A common district instructional framework provides clear, observable expectations for classroom practice and adult development.",
    "P113": "Campus leaders have structured routines for PLCs, Demo Day, classroom observation, coaching, administrative huddles, and performance monitoring.",
    "P114": "District support can be differentiated by campus need without requiring campuses to design separate improvement systems.",
    "P117": "Campus improvement depends on consistent implementation of the district instructional model across classrooms, grade levels, and content areas.",
    "P119": "Required routines are not yet implemented with consistent fidelity, frequency, and follow-through in every classroom.",
    "P122": "Improvement planning, intervention requirements, and daily campus work can become fragmented if managed as separate compliance processes.",
    "P124": "CIP/LIP/TIP/TAP requirements, academic monitoring, staffing, attendance, and instructional implementation have not always been managed through one integrated performance-management routine.",
    "P129": "The campus will use student, family, and staff feedback; attendance and engagement indicators; discipline and safety data; family communication records; and available climate/perception measures to understand the experience of the campus community. The district expectation is that students are safe, supported, engaged in learning, and able to develop self-management skills. Family communication should connect directly to attendance, academic progress, behavior expectations, student support, and intervention needs.",
    "P146": "The district has established common expectations for student behavior, family communication, attendance support, and protection of instructional time.",
    "P147": "Campus leaders have multiple channels for gathering student, family, and staff input and for communicating expectations and supports.",
    "P148": "Attendance, behavior, and perception data can be incorporated into recurring campus performance reviews rather than treated as isolated measures.",
    "P151": "Attendance, student engagement, school climate, and stakeholder perception can reduce instructional time and weaken connection to school when concerns are not addressed quickly.",
    "P153": "Attendance outreach, behavior supports, family communication, and student-support follow-up are not yet implemented with sufficient consistency for every student requiring intervention.",
    "P172": "Campus Goal: The campus will improve early literacy outcomes and increase Grade 3 Reading achievement while strengthening PK-2 foundational literacy and Grade 3 readiness.",
    "P173": "District / Board Alignment: Beaumont ISD Board Outcome Goal 1: Grade 3 Reading Meets+ increases from 27% in 2026 to 32% in 2027 and toward 65% by August 2031.",
    "P174": "Problem Statement: Grade 3 Reading performance and PK-2 readiness require accelerated improvement to meet district and campus expectations.",
    "P176": "Implementation of AIEF, district-provided RLA curriculum, and common lesson-delivery expectations is not yet sufficiently consistent across all classrooms.",
    "P177": "DOL evidence and differentiated responses such as same-day second teach and acceleration are not yet used consistently enough to adjust instruction in real time.",
    "P178": "Coaching in the Moment, scored spot observations, PLC preparation, and Demo Day rehearsal are not yet fully embedded as one coherent adult-development cycle.",
    "P179": "PK-2 foundational literacy requires sustained Project Acceleration, Science of Reading practice, frequent progress monitoring, and vertical alignment to Grade 3 expectations.",
    "P248": "Campus Goal: The campus will improve early mathematics outcomes and increase Grade 3 Mathematics achievement while strengthening PK-2 foundational numeracy and Grade 3 readiness.",
    "P249": "District / Board Alignment: Beaumont ISD Board Outcome Goal 2: Grade 3 Mathematics Meets+ increases from 23% in 2026 to 27% in 2027 and toward 60% by August 2031.",
    "P250": "Problem Statement: Grade 3 Mathematics performance and PK-2 numeracy require stronger core instruction, formative response, and targeted acceleration.",
    "P252": "Implementation of AIEF, district-provided mathematics curriculum, and common lesson-delivery expectations is not yet sufficiently consistent across all classrooms.",
    "P253": "DOL evidence does not yet consistently lead to same-day instructional adjustment, second teach, or acceleration decisions.",
    "P254": "Teachers and leaders require continued content-specific rehearsal, coaching, and feedback focused on conceptual understanding, reasoning, problem solving, and gradual release.",
    "P255": "PK-2 foundational numeracy requires sustained Project Acceleration, frequent progress monitoring, and vertical alignment to Grade 3 expectations.",
    "P324": "Campus Goal: The campus will increase student attendance, reduce chronic absenteeism, protect instructional time, and strengthen student/family engagement and support. Stakeholder feedback reinforces the importance of family communication, mentoring/community partnerships, student engagement, and supports that address barriers to regular attendance.",
    "P325": "District / Board Alignment: Beaumont ISD Board Outcome Goal 4: improve stakeholder perception by ensuring students are safe, supported, and able to develop self-management skills.",
    "P326": "Problem Statement: Attendance, chronic absenteeism, behavior, and inconsistent support can reduce instructional time and weaken student connection to school.",
    "P328": "Attendance outreach, intervention, and escalation are not yet implemented with sufficient consistency for all students requiring support.",
    "P329": "Behavior and operational routines do not always protect the learning environment and preserve instructional minutes consistently.",
    "P330": "Family communication is not always connected to attendance, academic progress, behavior expectations, and available supports.",
    "P331": "Campus leadership routines require consistent evidence review and rapid follow-through on identified barriers.",
    "P394": "Campus Goal: The campus will improve overall accountability performance by strengthening instructional quality, adult capacity, attendance, and disciplined implementation of the BISD improvement model.",
    "P395": "District / Board Alignment: Beaumont ISD Board Outcome Goal 5: increase the percentage of students attending A- or B-rated schools from 15% to 50% by August 2030.",
    "P396": "Problem Statement: The campus must improve overall accountability performance and sustain a trajectory toward C-or-better and ultimately A/B performance.",
    "P398": "Instructional implementation is not yet sufficiently consistent across classrooms and grade levels.",
    "P399": "Staffing stability, certification, adult effectiveness, and leadership density can constrain the speed and sustainability of improvement.",
    "P400": "Campus monitoring has not always integrated academics, instruction, attendance, staffing, and intervention milestones into one performance-management routine.",
    "P401": "Compliance requirements must reinforce rather than compete with daily instructional improvement.",
    "P463": "SCE resources will supplement the regular education program by providing allowable academic intervention, acceleration, attendance/dropout-prevention support, targeted staffing, tutoring, progress monitoring, and other services for students who are at risk of dropping out or who have not performed satisfactorily on required assessments. SCE-funded supports will be aligned to the campus CNA and the goals/strategies in this CIP. Finance/Federal Programs will validate final program coding, personnel allocations, and supplement-not-supplant requirements.",
    "P465": "District HR/Finance will pre-populate the final personnel roster in Plan4Learning. Campus leaders should validate that assigned SCE-funded personnel are accurately reflected.",
    "P476": "The campus comprehensive needs assessment (CNA) is developed through review of current and historical campus data, including student achievement and growth, attendance, discipline, demographics, staffing, special-program participation, implementation evidence, and stakeholder feedback. Campus leadership reviews multiple measures of data, identifies strengths and problem statements, determines root causes, and prioritizes needs aligned to Beaumont ISD Board Outcome Goals, Elevate Beaumont, and the BISD Instructional Playbook. The CNA informs the campus goals, strategies, resource alignment, and intervention priorities in this plan. Progress is reviewed during quarterly formative reviews and the CNA is refreshed annually using the most current available evidence.",
    "P478": "Evidence of campus planning and stakeholder engagement, including agendas, dates, notes/minutes, survey summaries, and sign-in or attendance documentation, will be maintained in the district-approved Title I documentation repository. Districtwide stakeholder evidence used to inform the 2026-27 plan includes Community Action Series Meeting #2 held September 15, 2026, with follow-up survey responses received through September 16, 2026.",
    "P480": "The campus plan is developed during the fall planning cycle using district-provided templates, current TEA/accountability data, local campus evidence, and district priorities. District and campus leaders validate campus-specific baselines and targets, review problem statements and root causes, confirm strategies and resources, and complete required stakeholder review before final approval. Quarterly formative reviews are used throughout the year to document implementation status, student progress, barriers, and required adjustments.",
    "P482": "Campus staff, families, community members, and other required stakeholders participate in the campus planning process through the campus-level planning and decision-making structure, public/stakeholder meetings, surveys, and districtwide engagement opportunities. For 2026-27 TIP/TAP documentation, Community Action Series Meeting #2 on September 15, 2026 will serve as the stakeholder-engagement event/date, with survey feedback submitted through September 16, 2026 retained as follow-up evidence. The plan reflects recurring themes rather than individual personnel complaints, student-specific information, or isolated campus concerns.",
    "P484": "The approved Campus Improvement Plan will be made available to staff, families, and the public through district/campus communication channels and the district website, as applicable. The campus will provide the plan or key information in an understandable and accessible format and will coordinate translation or language access when needed so families can meaningfully understand campus priorities and planned supports.",
    "P486": "The CIP coordinates campus improvement work with applicable federal, state, and local programs and resources, including Title I, State Compensatory Education, Title II, Title III, IDEA, school-improvement funds, student-support services, attendance interventions, and other district initiatives. Where the campus is identified for LIP, TIP, or TAP requirements, those requirements are integrated into the same campus improvement architecture so that compliance activities reinforce rather than compete with daily instructional improvement.",
    "P488": "The strategies in this CIP address the required Title I schoolwide elements through standards-aligned instruction, student progress monitoring, targeted academic intervention and acceleration, teacher/principal quality and development, parent/family engagement, transition supports, services for special populations, discipline monitoring, and coordination of federal/state/local resources. Plan4Learning strategy-level statutory descriptors should be selected to align each strategy with the applicable Title I requirement.",
    "P490": "Program effectiveness will be evaluated through quarterly formative reviews and an annual summative review. Campus leadership will examine student achievement and growth, attendance, discipline, implementation evidence, subgroup outcomes, staffing, stakeholder perception, and other measures aligned to the goals in this plan. Review notes, progress ratings, and assigned follow-up actions will be maintained in Plan4Learning and/or the campus evidence repository. Findings will inform adjustments during the year and the next annual CNA cycle.",
    "P492": "District Federal Programs/HR will pre-populate the final Title I-funded personnel roster in Plan4Learning. Campus leaders should validate assigned personnel, program, position, and FTE.",
    "P504": "This campus will use the same goals, root causes, strategies, and evidence in this CIP to satisfy applicable local or state/federal intervention requirements. Separate compliance fields should not create a different improvement strategy. The campus and district will maintain a single coherent improvement architecture aligned to Board goals, Elevate Beaumont, and the BISD Instructional Playbook.",
    "P515": "The campus will implement intensive curriculum and instruction improvements through the BISD instructional model, including district-provided curriculum, AIEF, structured PLC preparation, Demo Day rehearsal, DOL-driven differentiation, same-day second teach/acceleration, frequent classroom observation and coaching, attendance/student-support routines, and recurring campus performance reviews. These evidence-based interventions are expected to improve identified academic and accountability indicators by strengthening the quality and consistency of Tier 1 instruction, accelerating response to student evidence, and ensuring leaders intervene when implementation or outcomes are off trajectory.",
    "P517": "Progress will be monitored through quarterly formative reviews in Plan4Learning and through more frequent campus operational routines, including weekly PLCs, DOL/common-assessment reviews, classroom observations, attendance/intervention reviews, and campus leadership huddles. Campus and district leaders will review student outcomes, implementation evidence, staffing/attendance indicators, and intervention milestones, document assigned actions, and escalate differentiated support when the campus is off trajectory.",
    "P518": "TIP/TAP-specific assurances, public meeting/hearing documentation, stakeholder evidence, cost/funding information, and final TEA identification indicators will be entered in the dedicated Plan4Learning TIP/TAP module where applicable. Community Action Series Meeting #2 on September 15, 2026 will be used as the 2026-27 stakeholder-engagement date, with follow-up survey responses received September 16, 2026 retained as supporting feedback evidence.",
    "P521": "The following Plan4Learning areas are completed directly in the application and do not require separate narrative in this Word draft: Plan Checklist, Committees page, and read-only Policies page. The campus should use this document as the copy/paste source for narrative sections and goals, then complete application-only fields and checklists directly in Plan4Learning.",
    "P522": "Metric fields to validate before final entry: ",
    "P523": "Enrollment and student-group percentages",
    "P524": "Attendance / chronic absenteeism",
    "P525": "2026 accountability rating and domain scores",
    "P526": "Campus academic baselines and 2026-27 targets",
    "P527": "Survey/perception baseline and target",
    "P528": "SCE allocation and funded personnel",
    "P529": "Title I-funded personnel",
    "P530": "Campus intervention status and TEA identification",
    "P531": "Board approval date / required compliance dates",
    "P050_fixed": "These data will be reviewed alongside student achievement and implementation evidence to identify groups requiring differentiated academic, attendance, behavioral, or family supports.",
    "P090_fixed": "PK-2 literacy and mathematics growth will be monitored from BOY to EOY to ensure students are on trajectory for Grade 3 readiness.",
    "P143_fixed": "The campus will monitor student, family, and staff perception data together with attendance, chronic absenteeism, and out-of-school suspension (OSS) trends.",
    "stakeholder-context": "Districtwide stakeholder input collected through the Superintendent Meet & Greet in June 2026, the Community Action Series beginning July 21, 2026, and Community Action Series Meeting #2 on September 15, 2026 identified recurring priorities related to family and community partnership, attendance barriers and supports, student belonging and engagement, behavior and student support, clear communication, staffing/support capacity, and access to enriching learning experiences. Individual personnel complaints, student-specific comments, and isolated campus concerns are not carried forward as plan findings unless they reflect a broader recurring theme.",
    "stakeholder-implications": "Elementary planning implications include strengthening family communication and attendance outreach; expanding mentoring, volunteer, and community-partnership opportunities; protecting positive and respectful student-adult interactions; supporting student wellness and behavior; and maintaining engaging academic, fine arts, enrichment, and early-learning experiences that strengthen student connection to school.",
    "stakeholder-problem": "Stakeholder feedback indicates a need for stronger, more consistent family/community partnerships and communication tied to attendance, student support, behavior expectations, and student success.",
    "stakeholder-cause": "Families and community partners do not always experience clear, consistent pathways to understand district changes, support attendance and learning, volunteer or mentor, and connect students to available supports."
  },
  "tables": {
    "T02": [
      [
        "Campus",
        {
          "field": "campus_name"
        }
      ],
      [
        "Principal",
        {
          "field": "personnel_note"
        }
      ],
      [
        "Campus ID",
        {
          "field": "campus_id"
        }
      ],
      [
        "2026 Accountability Rating",
        {
          "field": "accountability_baseline_display"
        }
      ]
    ],
    "T06": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Enrollment",
        {
          "field": "enrollment_baseline"
        },
        {
          "field": "enrollment_target"
        }
      ],
      [
        "% Economically Disadvantaged",
        {
          "field": "economically_disadvantaged_pct"
        },
        "N/A"
      ],
      [
        "% Emergent Bilingual",
        {
          "field": "emergent_bilingual_pct"
        },
        "N/A"
      ],
      [
        "% Special Education",
        {
          "field": "special_education_pct"
        },
        "N/A"
      ],
      [
        "Attendance / ADA",
        {
          "field": "attendance_ada_baseline_pct"
        },
        {
          "field": "attendance_ada_target_pct"
        }
      ],
      [
        "Mobility Rate",
        {
          "field": "mobility_baseline_pct"
        },
        "N/A"
      ],
      [
        "2026 Accountability Rating / Score",
        {
          "field": "accountability_baseline_display"
        },
        {
          "field": "accountability_target_display"
        }
      ]
    ],
    "T10": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Grade 3 Reading Meets+",
        {
          "field": "reading"
        },
        {
          "field": "reading_target"
        }
      ],
      [
        "Grade 3 Mathematics Meets+",
        {
          "field": "math"
        },
        {
          "field": "math_target"
        }
      ],
      [
        "PK-2 Literacy Growth",
        {
          "field": "pk2_literacy_boy_baseline"
        },
        {
          "field": "pk2_literacy_eoy_target"
        }
      ],
      [
        "PK-2 Mathematics Growth",
        {
          "field": "pk2_math_boy_baseline"
        },
        {
          "field": "pk2_math_eoy_target"
        }
      ],
      [
        "Domain 1 / Student Achievement",
        {
          "field": "domain1_baseline_score"
        },
        {
          "field": "domain1_target_score"
        }
      ]
    ],
    "T17": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Student / Family / Staff Survey Baseline",
        {
          "field": "priority_survey_baseline"
        },
        {
          "field": "priority_survey_target"
        }
      ],
      [
        "Chronic Absenteeism",
        {
          "field": "chronic_absenteeism_baseline_pct"
        },
        {
          "field": "chronic_absenteeism_target_pct"
        }
      ],
      [
        "2025-26 Out-of-School Suspension (OSS) rate",
        {
          "field": "oss_baseline_pct"
        },
        {
          "field": "oss_target"
        }
      ]
    ],
    "T20": [
      [
        "Priority Problem Statement",
        "Draft Root Cause",
        "Goal Alignment"
      ],
      [
        "Academic achievement is below the trajectory required to meet district and campus performance expectations.",
        "Inconsistent fidelity to the district instructional model creates variability in Tier 1 instruction and student response.",
        "Goals 1-2"
      ],
      [
        "Attendance and chronic absenteeism reduce learning time and contribute to academic and enrollment challenges.",
        "Campus attendance ownership, intervention, communication, and follow-up are not yet consistently embedded in daily campus systems.",
        "Goal 3"
      ],
      [
        "The campus must improve overall accountability performance and reduce performance gaps among student groups.",
        "Instructional implementation, staffing, leadership routines, attendance, and performance monitoring require greater consistency and intensity.",
        "Goal 4"
      ]
    ],
    "T22": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Grade 3 Reading Meets+",
        {
          "field": "reading"
        },
        {
          "field": "reading_target"
        }
      ],
      [
        "PK-2 Literacy Growth",
        {
          "field": "pk2_literacy_boy_baseline"
        },
        {
          "field": "pk2_literacy_eoy_target"
        }
      ],
      [
        "RLA Instructional Fidelity",
        {
          "field": "rla_fidelity_baseline_pct"
        },
        "90%+ monitored classrooms"
      ]
    ],
    "T23": [
      [
        "#",
        "Action Step",
        "Owner(s)",
        "Timeline",
        "Evidence / Measure",
        "Review"
      ],
      [
        "1.1",
        "Implement AIEF in RLA using district-provided curriculum, common learning objectives, gradual release, intentional engagement, and a daily DOL.",
        "Principal / RLA Team",
        "2026-27",
        "Curriculum evidence; DOL artifacts; spot observations",
        "Quarterly"
      ],
      [
        "1.2",
        "Implement Project Acceleration in PK-2 literacy through increased rigor, Science of Reading practice, aligned scope/sequence, and frequent progress monitoring.",
        "Principal / PK-2 Team",
        "2026-27",
        "Progress-monitoring data; student work; implementation evidence",
        "Quarterly"
      ],
      [
        "1.3",
        "Use weekly PLCs to internalize upcoming lessons, anticipate misconceptions, strengthen engagement, review DOLs, and determine re-teach/extension before first delivery.",
        "Principal / Teachers",
        "Weekly",
        "PLC agendas; lesson artifacts; DOL calibration",
        "Quarterly"
      ],
      [
        "1.4",
        "Conduct weekly Demo Day rehearsal to practice direct instruction, pacing, modeling, transitions, and engagement and provide immediate feedback before lesson delivery.",
        "Principal / Leadership Team",
        "Weekly",
        "Demo Day agendas; rehearsal evidence",
        "Quarterly"
      ],
      [
        "1.5",
        "Use DOL results to drive purposeful differentiation, including same-day second teach for students still learning and acceleration/extension for students demonstrating mastery.",
        "Teachers / Campus Leaders",
        "Daily",
        "DOL results; intervention/acceleration rosters",
        "Quarterly"
      ],
      [
        "1.6",
        "Implement Coaching in the Moment and scored spot observations as complementary systems, with differentiated follow-up based on teacher need.",
        "Principal / APs",
        "2026-27",
        "Observation tracker; coaching evidence",
        "Quarterly"
      ],
      [
        "1.7",
        "Review Reading, PK-2 growth, subgroup outcomes, and implementation evidence through recurring campus performance reviews and assign corrective actions when off trajectory.",
        "Principal / Campus Team",
        "Monthly / Quarterly",
        "Campus scorecard; action tracker",
        "Quarterly"
      ]
    ],
    "T25": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Grade 3 Mathematics Meets+",
        {
          "field": "math"
        },
        {
          "field": "math_target"
        }
      ],
      [
        "PK-2 Mathematics Growth",
        {
          "field": "pk2_math_boy_baseline"
        },
        {
          "field": "pk2_math_eoy_target"
        }
      ],
      [
        "Mathematics Instructional Fidelity",
        {
          "field": "math_fidelity_baseline_pct"
        },
        "90%+ monitored classrooms"
      ]
    ],
    "T26": [
      [
        "#",
        "Action Step",
        "Owner(s)",
        "Timeline",
        "Evidence / Measure",
        "Review"
      ],
      [
        "2.1",
        "Implement AIEF in mathematics using district-provided curriculum, common learning objectives, gradual release, intentional engagement, and a daily DOL.",
        "Principal / Math Team",
        "2026-27",
        "Curriculum evidence; DOL artifacts; spot observations",
        "Quarterly"
      ],
      [
        "2.2",
        "Implement Project Acceleration in PK-2 mathematics through increased rigor, aligned scope/sequence, foundational numeracy, and frequent progress monitoring.",
        "Principal / PK-2 Team",
        "2026-27",
        "Progress-monitoring data; student work",
        "Quarterly"
      ],
      [
        "2.3",
        "Use weekly mathematics PLCs to internalize lessons, anticipate misconceptions, plan representations and micro at-bats, review DOLs, and determine re-teach/extension.",
        "Principal / Teachers",
        "Weekly",
        "PLC agendas; lesson artifacts; DOL calibration",
        "Quarterly"
      ],
      [
        "2.4",
        "Conduct weekly Demo Day rehearsal to practice direct instruction, mathematical explanations, modeling, pacing, and student engagement.",
        "Principal / Leadership Team",
        "Weekly",
        "Demo Day agendas; feedback evidence",
        "Quarterly"
      ],
      [
        "2.5",
        "Use DOL results to drive same-day differentiation, including second teach for students still learning and acceleration/extension for students demonstrating mastery.",
        "Teachers / Campus Leaders",
        "Daily",
        "DOL results; second-teach rosters",
        "Quarterly"
      ],
      [
        "2.6",
        "Implement Coaching in the Moment and scored spot observations with content-specific feedback focused on curriculum fidelity, student thinking, engagement, and mastery evidence.",
        "Principal / APs",
        "2026-27",
        "Observation tracker; coaching evidence",
        "Quarterly"
      ],
      [
        "2.7",
        "Review Grade 3 Mathematics, PK-2 growth, subgroup outcomes, and implementation evidence through recurring campus performance reviews and assign corrective actions when off trajectory.",
        "Principal / Campus Team",
        "Monthly / Quarterly",
        "Campus scorecard; action tracker",
        "Quarterly"
      ]
    ],
    "T28": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Average Daily Attendance",
        {
          "field": "attendance_ada_baseline_pct"
        },
        {
          "field": "attendance_ada_target_pct"
        }
      ],
      [
        "Chronic Absenteeism",
        {
          "field": "chronic_absenteeism_baseline_pct"
        },
        {
          "field": "chronic_absenteeism_target_pct"
        }
      ],
      [
        "Priority Survey Indicator",
        {
          "field": "priority_survey_baseline"
        },
        {
          "field": "priority_survey_target"
        }
      ]
    ],
    "T29": [
      [
        "#",
        "Action Step",
        "Owner(s)",
        "Timeline",
        "Evidence / Measure",
        "Review"
      ],
      [
        "3.1",
        "Implement the district attendance/truancy workflow with campus ownership for threshold identification, outreach, notices, intervention, and follow-through.",
        "Principal / Attendance Team",
        "2026-27",
        "Attendance reports; outreach/notice logs",
        "Quarterly"
      ],
      [
        "3.2",
        "Use weekly attendance reviews to identify students requiring escalating support and connect attendance interventions to academic, behavior, and family-support needs.",
        "Attendance Team / Counselor",
        "Weekly",
        "Intervention roster; contact notes",
        "Quarterly"
      ],
      [
        "3.3",
        "Implement BISD student behavior expectations consistently and protect instructional time through classroom-management, operational routines, and prompt support for disruption.",
        "Principal / Staff",
        "2026-27",
        "Discipline trends; walkthrough evidence",
        "Quarterly"
      ],
      [
        "3.4",
        "Implement morning/end-of-day administrative huddles to align priorities, review evidence, identify gaps, and assign immediate follow-up actions.",
        "Campus Leadership Team",
        "Daily",
        "Huddle notes; assigned actions",
        "Quarterly"
      ],
      [
        "3.5",
        "Coordinate clear family communication around attendance, academic progress, behavior expectations, student support, and intervention options.",
        "Principal / Staff",
        "Ongoing",
        "ParentSquare/outreach evidence",
        "Quarterly"
      ],
      [
        "3.6",
        "Monitor attendance, chronic absenteeism, discipline, student support, and perception data during recurring campus performance reviews and adjust supports based on evidence.",
        "Principal / Campus Team",
        "Monthly / Quarterly",
        "Campus performance materials",
        "Quarterly"
      ]
    ],
    "T31": [
      [
        "Campus Metric",
        "Current / Baseline",
        "2026-27 Target"
      ],
      [
        "Overall Accountability Rating / Score",
        {
          "field": "accountability_baseline_display"
        },
        {
          "field": "accountability_target_display"
        }
      ],
      [
        "Domain 1 / Student Achievement",
        {
          "field": "domain1_baseline_score"
        },
        {
          "field": "domain1_target_score"
        }
      ],
      [
        "Closing the Gaps",
        {
          "field": "closing_gaps_baseline_score"
        },
        {
          "field": "closing_gaps_target_score"
        }
      ],
      [
        "Improvement Milestones On Track",
        {
          "field": "improvement_milestones_baseline_pct"
        },
        "90%+ each review cycle"
      ]
    ],
    "T32": [
      [
        "#",
        "Action Step",
        "Owner(s)",
        "Timeline",
        "Evidence / Measure",
        "Review"
      ],
      [
        "4.1",
        "Implement district instructional systems with fidelity, including curriculum, DOL/LEAD, second teach, AIS/acceleration, protected instructional time, and aligned schedules.",
        "Principal / Campus Team",
        "2026-27",
        "Walkthroughs; DOL/AIS evidence",
        "Quarterly"
      ],
      [
        "4.2",
        "Use differentiated observation, Coaching in the Moment, spot observations, and job-embedded support to strengthen teacher practice.",
        "Principal / APs",
        "2026-27",
        "Observation/coaching evidence",
        "Quarterly"
      ],
      [
        "4.3",
        "Monitor staffing stability, certification, vacancies, and support assignments and escalate gaps that threaten instructional continuity.",
        "Principal / Schools / HR",
        "Monthly",
        "Staffing dashboard; support plan",
        "Quarterly"
      ],
      [
        "4.4",
        "Conduct differentiated campus performance reviews using academics, implementation, attendance, staffing, leadership, and intervention-plan milestones.",
        "Principal / EDSO",
        "Monthly / Quarterly",
        "Campus scorecard; assigned actions",
        "Quarterly"
      ],
      [
        "4.5",
        "Integrate CIP/LIP/TIP/TAP requirements into one campus improvement architecture and maintain required evidence in Plan4Learning.",
        "Principal / District Support",
        "Per required timeline",
        "Completed entries; milestone evidence",
        "Quarterly"
      ]
    ],
    "T38": [
      [
        "Campus intervention status",
        {
          "field": "campus_intervention_status"
        }
      ],
      [
        "TEA identification / accountability indicator(s)",
        {
          "field": "tea_identification_indicators"
        }
      ],
      [
        "Board approval date (if required)",
        {
          "field": "board_approval_date"
        }
      ],
      [
        "Submission / local maintenance status",
        {
          "field": "intervention_submission_status"
        }
      ]
    ]
  },
  "narratives": {
    "P050": "The campus serves [XX] students. [XX%] of students are economically disadvantaged, [XX%] are emergent bilingual, and [XX%] receive special education services. The campus attendance/ADA rate is [XX%], the mobility rate is [XX%], and the 2026 accountability rating/score is [XX]. These data will be reviewed alongside student achievement and implementation evidence to identify groups requiring differentiated academic, attendance, behavioral, or family supports.",
    "P090": "In 2026, the campus earned [XX%] Meets Grade Level or Above in Grade 3 Reading and [XX%] Meets Grade Level or Above in Grade 3 Mathematics. The campus Domain 1 / Student Achievement score was [XX]. For 2026-27, the campus will increase Grade 3 Reading to [XX%], Grade 3 Mathematics to [XX%], and Domain 1 / Student Achievement to [XX]. PK-2 literacy and mathematics growth will be monitored from BOY to EOY to ensure students are on trajectory for Grade 3 readiness.",
    "P143": "The campus will monitor student, family, and staff perception data together with attendance, chronic absenteeism, out-of-school suspension (OSS) trends. The current priority survey baseline is [XX], chronic absenteeism is [XX%], and the campus will target [XX] on the priority survey indicator and [XX%] chronic absenteeism by spring 2027.",
    "P194": "The campus earned [XX%] Meets Grade Level or Above in Grade 3 Reading in 2026 and will increase performance to [XX%] by spring 2027. The campus will also increase PK-2 literacy growth from [XX BOY] to [XX EOY] while reaching at least 90% fidelity to monitored RLA instructional expectations.",
    "P270": "The campus earned [XX%] Meets Grade Level or Above in Grade 3 Mathematics in 2026 and will increase performance to [XX%] by spring 2027. The campus will also increase PK-2 mathematics growth from [XX BOY] to [XX EOY] while reaching at least 90% fidelity to monitored mathematics instructional expectations.",
    "P346": "The campus ADA baseline is [XX%] and chronic absenteeism is [XX%]. By spring 2027, the campus will increase ADA to [XX%], reduce chronic absenteeism to [XX%], and improve the identified priority survey indicator from [XX] to [XX].",
    "P419": "The campus earned an overall 2026 accountability rating/score of [XX] with a Domain 1 / Student Achievement score of [XX] and a Closing the Gaps score of [XX]. For 2026-27, the campus will improve these measures to [XX], [XX], and [XX], respectively, while maintaining at least 90% of required improvement milestones on track at each review cycle."
  }
};

  const MARKER = "District confirmation needed";
  const PERSONNEL_NOTE = "Personnel information is completed directly in Plan4Learning / district systems.";
  const BAD_TOKEN = /\b(?:XX(?: TARGET)?|undefined|null|NaN)\b/i;

  // Pure generation only: no DOM, network calls, storage, printing, or clipboard.
  function build(state, config) {
    const district = config.DISTRICT_CONFIG;
    const selected = district.campuses.find(item => item.campus_name === state.campus_name);
    if (!selected) throw new Error("Select a configured campus.");
    const values = Object.create(null);
    const questionValues = Object.create(null);
    const targetValues = Object.create(null);
    const pending = new Map();
    const addPending = (key, label, category) => pending.set(key, { key, label, category });
    const isPending = entry => entry === undefined || entry === null || String(entry).trim() === "" ||
      String(entry).trim().toLowerCase() === String(district.pending_value).toLowerCase() ||
      String(entry).trim().toLowerCase() === MARKER.toLowerCase() ||
      (typeof entry === "number" && !Number.isFinite(entry)) || BAD_TOKEN.test(String(entry));
    const currency = amount => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    const validDate = raw => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
      const date = new Date(raw + "T00:00:00Z");
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === raw;
    };
    const campus = selected.campus_name;
    if (BAD_TOKEN.test(campus)) throw new Error("The configured campus name contains a template token.");
    values.campus_name = campus;
    questionValues.campus_name = campus;

    config.CAMPUS_FIELDS.filter(field => field.enabled === true).forEach(field => {
      const raw = field.stateKey ? state[field.stateKey] : state.optional && state.optional[field.id];
      const absent = raw === undefined || raw === null || String(raw).trim() === "";
      if (absent && field.required) throw new Error("Missing required campus value: " + field.label);
      if (absent) {
        values[field.id] = MARKER;
        questionValues[field.id] = MARKER;
        addPending(field.id, field.label, "Campus value");
        return;
      }
      if (BAD_TOKEN.test(String(raw))) throw new Error("Replace template text in: " + field.label);
      let formatted;
      if (field.type === "number" || field.type === "percentage") {
        if (typeof raw !== "number" || !Number.isFinite(raw)) throw new Error("Invalid numeric baseline: " + field.label);
        if (field.type === "percentage" && (raw < 0 || raw > 100)) throw new Error("Percentage outside 0–100: " + field.label);
        if (field.min !== undefined && raw < field.min) throw new Error("Value below minimum: " + field.label);
        if (field.max !== undefined && raw > field.max) throw new Error("Value above maximum: " + field.label);
        if (field.step === 1 && !Number.isInteger(raw)) throw new Error("Whole number required: " + field.label);
        formatted = field.format === "currency" ? currency(raw) : String(raw) + (field.type === "percentage" ? "%" : "");
      } else if (field.type === "approval") {
        if (!["Not Required", "Not Yet Approved"].includes(raw) && !validDate(String(raw))) throw new Error("Invalid Board approval date/status.");
        formatted = String(raw);
        if (raw === "Not Yet Approved") addPending(field.id, "Board approval is not yet recorded", "District field");
      } else if (field.type === "select") {
        const option = field.options.find(item => item.value === raw);
        if (!option) throw new Error("Invalid configured status: " + field.label);
        formatted = isPending(raw) ? MARKER : option.label;
      } else {
        if (typeof raw !== "string" || raw.trim().length > field.maxLength) throw new Error("Invalid text value: " + field.label);
        if (!field.allowNA && /^(?:n\/a|not applicable)$/i.test(raw.trim())) throw new Error("N/A is not available for: " + field.label);
        formatted = isPending(raw) ? MARKER : raw.trim();
      }
      if (formatted === MARKER) addPending(field.id, field.label, "Campus/district field");
      values[field.id] = formatted;
      questionValues[field.id] = formatted;
      if (field.stateKey) values[field.stateKey] = formatted;
    });
    values.campus_id = isPending(selected.campus_id) ? MARKER : String(selected.campus_id);
    if (values.campus_id === MARKER) addPending("campus_id", "Campus ID", "District field");
    // Resolve intervention/compliance information exclusively from district
    // campus configuration. Ignore any stale or forged questionnaire properties.
    const districtValues = Object.create(null);
    ["campus_intervention_status", "tea_identification_indicators", "board_approval_status", "submission_local_maintenance_status"]
      .forEach(key => {
        const raw = selected[key];
        const display = isPending(raw) ? MARKER : String(raw).trim();
        values[key] = display;
        districtValues[key] = display;
        if (display === MARKER || /^Pending Board Approval/i.test(display)) {
          addPending(key, key.replaceAll("_", " "), "District field");
        }
      });
    // Preserve the original source table and its source-mapping aliases.
    values.board_approval_date = values.board_approval_status;
    values.intervention_submission_status = values.submission_local_maintenance_status;
    // Survey definition and baseline are district-owned, never campus-authored.
    ["perception_indicator_name", "perception_baseline"].forEach(key => {
      const raw = district[key];
      const display = isPending(raw) ? MARKER : String(raw).trim();
      values[key] = display;
      districtValues[key] = display;
      if (display === MARKER) addPending(key, key.replaceAll("_", " "), "District field");
    });
    values.priority_survey_measure = values.perception_indicator_name;
    values.priority_survey_baseline = values.perception_baseline;
    Object.entries(district.targets).forEach(([key, target]) => {
      const rawTarget = target.configKey ? district[target.configKey] : target.value;
      let formatted = MARKER;
      if (!isPending(rawTarget)) {
        formatted = String(rawTarget);
        if (target.format === "percentage" || target.format === "percentage-plus") {
          if (typeof rawTarget !== "number" || rawTarget < 0 || rawTarget > 100) throw new Error("Invalid configured percentage target: " + target.label);
          formatted += target.format === "percentage" ? "%" : "%+";
        }
        formatted += target.suffix || "";
      } else addPending(key, target.label, "District target");
      values[key] = formatted;
      targetValues[key] = formatted;
    });
    // Principal and all roster columns resolve to an external-completion marker.
    values.personnel_note = MARKER;
    addPending("personnel", "Principal identity and SCE/Title I personnel records — complete directly in district systems", "External completion");
    const value = field => {
      if (!Object.hasOwn(values, field)) throw new Error("Unmapped source field: " + field);
      return values[field];
    };
    const year = district.school_year;
    const baselineYear = String(district.baseline_year);
    const endYear = String(Number(year.slice(0, 4)) + 1);
    const known = key => value(key) !== MARKER;
    const minimum = key => {
      const target = district.targets[key];
      let text = value(key).replace("%+", "%");
      if (target.suffix && text.endsWith(target.suffix)) text = text.slice(0, -target.suffix.length);
      return text;
    };
    // Explicit references/sentence openings only. Role and district terminology
    // (campus leadership/team/improvement/performance/level) is not replaced.
    function personalize(text) {
      return text
        .replace(/(^|[.!?]\s+)The campus (?=will |is |must |earned |serves )/g, (_, start) => start + campus + " ")
        .replace(/^This campus (?=serves |will )/, () => campus + " ")
        .replace(/^Campus Goal: The campus /, () => "Campus Goal: " + campus + " ")
        .replace(/^(In \d{4}, )the campus /, (_, start) => start + campus + " ")
        .replace(/^(For [^,]+, )the campus /, (_, start) => start + campus + " ")
        .replace(/^(By spring \d{4}, )the campus /, (_, start) => start + campus + " ");
    }
    const editableOpenings = new Set(["P024","P053","P054","P055","P070","P093","P094","P095","P110","P112","P113","P114","P129","P146","P147","P148","P172","P248","P324","P394"]);
    const para = text => ({ type: "paragraph", text });
    const heading = text => ({ type: "heading", text });
    // Protected Board/root-cause/action/Title I/SCE/intervention text is verbatim.
    const fixed = id => para(editableOpenings.has(id) ? personalize(SOURCE.paragraphs[id]) : SOURCE.paragraphs[id]);
    const list = ids => ({ type: "list", items: ids.map(id => editableOpenings.has(id) ? personalize(SOURCE.paragraphs[id]) : SOURCE.paragraphs[id]) });
    const metricLine = (label, field) => para(label + ": " + value(field) + ".");
    function fill(text, keys) {
      let index = 0;
      const result = text.replace(/\[[^\]]+\]/g, () => value(keys[index++]));
      if (index !== keys.length) throw new Error("Narrative/source mapping mismatch.");
      return personalize(result);
    }
    const sentences = id => SOURCE.narratives[id].match(/[^.!?]+[.!?](?:\s|$)/g).map(text => text.trim());
    const targetOverrides = {
      T22: { "3:2": "rla_fidelity_target_pct" },
      T25: { "3:2": "math_fidelity_target_pct" },
      T31: { "4:2": "improvement_milestones_target_pct" }
    };
    function sourceTable(id, caption, hasHeader = true) {
      const rows = SOURCE.tables[id].map((row, r) => row.map((cell, c) => {
        const override = targetOverrides[id] && targetOverrides[id][r + ":" + c];
        return override ? value(override) : typeof cell === "string" ? cell : value(cell.field);
      }));
      const suspensionRows = [
        ["2025-26 Out-of-School Suspension (OSS) rate", value("oss_baseline_pct"), value("oss_target")]
      ];
      if (id === "T17") {
        rows[1][0] = "District Stakeholder Perception Survey / Indicator";
      }
      if (id === "T28") {
        rows[3][0] = "District Stakeholder Perception Survey / Indicator";
        rows.push(...suspensionRows);
      }
      if (id === "T02") {
        rows[0][0] = "Campus Name";
        rows[2][0] = "TEA Campus ID";
        rows.splice(3, 0, ["School Year", year]);
      }
      return { type: "table", caption, hasHeader, rows };
    }
    const section = (id, title, blocks = [], destination = "", children = []) => ({ id, title, blocks, destination, children });
    function problems(pairs) {
      return pairs.flatMap(([problem, cause]) => [
        heading("Problem Statement"), fixed(problem), heading("Root Cause"), fixed(cause)
      ]);
    }
    const demographics = [
      fixed("P024"), sourceTable("T06", "Demographics campus metrics"),
      para(fill(SOURCE.narratives.P050, [
        "enrollment_baseline","economically_disadvantaged_pct","emergent_bilingual_pct","special_education_pct",
        "attendance_ada_baseline_pct","mobility_baseline_pct","accountability_baseline_display"
      ]))
    ];
    const learningSentences = sentences("P090");
    let learningTargets;
    if (known("domain1_target_score")) {
      let template = learningSentences[2];
      if (state.reading >= district.targets.reading_target.value || state.math >= district.targets.math_target.value) {
        template = template.replace("will increase Grade 3 Reading to", "has a Grade 3 Reading target of").replace("Grade 3 Mathematics to", "a Grade 3 Mathematics target of").replace("and Domain 1 / Student Achievement to", "and a Domain 1 / Student Achievement target of");
      }
      learningTargets = [para(fill(template, ["reading_target","math_target","domain1_target_score"]))];
    } else {
      learningTargets = [
        para("For " + year + ", " + campus + " has a Grade 3 Reading target of " + value("reading_target") + " and a Grade 3 Mathematics target of " + value("math_target") + "."),
        metricLine("Domain 1 / Student Achievement target", "domain1_target_score")
      ];
    }
    const learning = [
      fixed("P070"), sourceTable("T10", "Student Learning campus metrics"),
      metricLine("PK-2 Literacy measure / assessment", "pk2_literacy_measure"),
      metricLine("PK-2 Mathematics measure / assessment", "pk2_math_measure"),
      para(fill(learningSentences[0], ["reading","math"])),
      para(fill(learningSentences[1], ["domain1_baseline_score"])),
      ...learningTargets, fixed("P090_fixed")
    ];
    const perceptionNarrative = [
      metricLine("District Stakeholder Perception Survey / Indicator", "perception_indicator_name"),
      metricLine("District stakeholder perception baseline", "perception_baseline"),
      metricLine("Spring " + endYear + " district stakeholder perception target", "priority_survey_target"),
      metricLine("Chronic absenteeism baseline", "chronic_absenteeism_baseline_pct"),
      metricLine("Spring " + endYear + " chronic absenteeism target", "chronic_absenteeism_target_pct"),
      para("The district stakeholder perception indicator and chronic absenteeism will be reviewed toward their spring " + endYear + " targets."),
      para("The 2025-26 Out-of-School Suspension (OSS) rate is " + value("oss_baseline_pct") +
        ". The " + year + " OSS target is: " + value("oss_target") + ".")
    ];
    const stakeholderEvidence = [
      heading("Stakeholder Engagement and Feedback"),
      para("Engagement: Community Action Series Meeting #2. Date: September 15, 2026. Follow-up survey feedback continued September 16, 2026."),
      fixed("stakeholder-context"),
      para("Recurring themes identified through stakeholder feedback include family and community partnership; clear and proactive communication; attendance and barriers to attendance; student belonging and engagement; mentoring and volunteer opportunities; behavior and student support; safe and supportive learning environments; staffing/support capacity where relevant; and access to enrichment and engaging learning opportunities."),
      fixed("stakeholder-implications")
    ];
    const publicReview = para("BISD may present the common Elementary goals, strategies, district resources, and implementation and action architecture together for public review as a shared Elementary improvement framework. Each applicable elementary campus must retain its own campus identity and campus-specific information in its final plan/submission, including campus name, TEA campus ID, accountability/identification status, baselines, campus-specific needs, required assurances, intervention/compliance fields, and Plan4Learning campus submission information, as applicable.");
    const perceptions = [
      ...stakeholderEvidence, fixed("P129"), sourceTable("T17", "Perceptions campus metrics"),
      fixed("P143_fixed"), ...perceptionNarrative
    ];
    function cnaGroup(id, title, summary, strengths, pairs) {
      const destination = "Comprehensive Needs Assessment > " + title + " > ";
      return section(id, title, [], "", [
        section(id + "-summary", "Summary", summary, destination + "Summary"),
        section(id + "-strengths", "Strengths", [list(strengths)], destination + "Strengths"),
        section(id + "-problems", "Problem Statements / Root Causes", problems(pairs), destination + "Problem Statements / Root Causes")
      ]);
    }
    const cna = section("cna", "Comprehensive Needs Assessment", [], "", [
      cnaGroup("demographics", "Demographics", demographics, ["P053","P054","P055"], [["P058","P060"],["P063","P065"]]),
      cnaGroup("student-learning", "Student Learning", learning, ["P093","P094","P095"], [["P098","P100"],["P103","P105"]]),
      cnaGroup("school-processes", "School Processes & Programs", [fixed("P110")], ["P112","P113","P114"], [["P117","P119"],["P122","P124"]]),
      cnaGroup("perceptions", "Perceptions", perceptions, ["P146","P147","P148"], [["P151","P153"],["stakeholder-problem","stakeholder-cause"]]),
      section("prioritized-problems", "Prioritized Problem Statements", [sourceTable("T20", "Prioritized problem statements, root causes, and goal alignment")], "Comprehensive Needs Assessment > Prioritized Problem Statements")
    ]);
    function goal(number, title, intro, causes, metrics, narrative, actions) {
      const id = "goal-" + number;
      // The Word source confirms the goal section, not these exact UI controls.
      // Keep distinct entry blocks while using the closest confirmed destination.
      const destination = "Goals > Goal " + number;
      return section(id, "Goal " + number + ": " + title, [], "", [
        section(id + "-statement", "Goal statement", [fixed(intro[0])], destination),
        section(id + "-alignment", "Board goal alignment", [fixed(intro[1])], destination),
        section(id + "-problem", "Problem statement", [fixed(intro[2])], destination),
        section(id + "-causes", "Standard root causes", [list(causes)], destination),
        section(id + "-objectives", "Performance objectives", [
          sourceTable(metrics, "Goal " + number + " performance objectives and campus metrics"), ...narrative
        ], destination),
        section(id + "-strategies", "Strategies and action steps", [
          sourceTable(actions, "Goal " + number + " action steps, owners, timelines, evidence, and review")
        ], destination)
      ]);
    }

    function earlyNarrative(id, subject, baselineKey, eoyKey, fidelityKey, expectations) {
      const parts = sentences(id);
      let first = parts[0];
      const baseline = subject === "Reading" ? state.reading : state.math;
      const targetKey = subject === "Reading" ? "reading_target" : "math_target";
      if (baseline >= district.targets[targetKey].value) first = first.replace("will increase performance to", "has a district performance target of");
      const blocks = [para(fill(first, [subject === "Reading" ? "reading" : "math", targetKey]))];
      if (known(eoyKey) && known(fidelityKey)) {
        blocks.push(para(fill(parts[1].replace("90%", minimum(fidelityKey)), [baselineKey, eoyKey])));
      } else {
        const area = subject === "Reading" ? "literacy" : "mathematics";
        const fidelity = known(fidelityKey)
          ? " while reaching at least " + minimum(fidelityKey) + " fidelity to monitored " + expectations + " instructional expectations."
          : " while strengthening fidelity to monitored " + expectations + " instructional expectations.";
        blocks.push(para(campus + " will also increase PK-2 " + area + " growth from " + value(baselineKey) + fidelity));
        blocks.push(metricLine("PK-2 " + area + " EOY target", eoyKey));
        if (!known(fidelityKey)) blocks.push(metricLine(expectations + " instructional fidelity target", fidelityKey));
      }
      blocks.push(metricLine(subject === "Reading" ? "PK-2 Literacy measure / assessment" : "PK-2 Mathematics measure / assessment", subject === "Reading" ? "pk2_literacy_measure" : "pk2_math_measure"));
      return blocks;
    }
    const readingNarrative = earlyNarrative("P194", "Reading", "pk2_literacy_boy_baseline", "pk2_literacy_eoy_target", "rla_fidelity_target_pct", "RLA");
    const mathNarrative = earlyNarrative("P270", "Mathematics", "pk2_math_boy_baseline", "pk2_math_eoy_target", "math_fidelity_target_pct", "mathematics");
    const attendanceParts = sentences("P346");
    const attendanceNarrative = [para(fill(attendanceParts[0], ["attendance_ada_baseline_pct","chronic_absenteeism_baseline_pct"]))];
    attendanceNarrative.push(
      para("By spring " + endYear + ", " + campus + " will target ADA of " + value("attendance_ada_target_pct") +
        ", reduce chronic absenteeism, and improve the district stakeholder perception indicator."),
      metricLine("Chronic absenteeism target", "chronic_absenteeism_target_pct"),
      metricLine("District Stakeholder Perception Survey / Indicator", "perception_indicator_name"),
      metricLine("District stakeholder perception baseline", "perception_baseline"),
      metricLine("District stakeholder perception target", "priority_survey_target"),
      para("The 2025-26 Out-of-School Suspension (OSS) rate is " + value("oss_baseline_pct") +
        ". The " + year + " OSS target is: " + value("oss_target") + ".")
    );
    const accountabilityParts = sentences("P419");
    const accountabilityNarrative = [para(fill(accountabilityParts[0], ["accountability_baseline_display","domain1_baseline_score","closing_gaps_baseline_score"]))];
    if (known("domain1_target_score") && known("closing_gaps_target_score") && known("improvement_milestones_target_pct")) {
      accountabilityNarrative.push(para(fill(accountabilityParts[1].replace("90%", minimum("improvement_milestones_target_pct")), ["accountability_target_display","domain1_target_score","closing_gaps_target_score"])));
    } else {
      const milestone = known("improvement_milestones_target_pct")
        ? " while maintaining at least " + minimum("improvement_milestones_target_pct") + " of required improvement milestones on track at each review cycle."
        : " while monitoring required improvement milestones at each review cycle.";
      accountabilityNarrative.push(
        para("For " + year + ", " + campus + " will improve these accountability measures" + milestone),
        metricLine("Overall accountability target", "accountability_target_display"),
        metricLine("Domain 1 / Student Achievement target", "domain1_target_score"),
        metricLine("Closing the Gaps target", "closing_gaps_target_score")
      );
      if (!known("improvement_milestones_target_pct")) accountabilityNarrative.push(metricLine("Improvement Milestones On Track target", "improvement_milestones_target_pct"));
    }
    const titleSections = [
      ["1.1 Description of CNA Process", "P476"],
      ["1.2 Location for Evidence of Multiple Meetings Held", "P478"],
      ["2.1 Timeline for Schoolwide Program / CIP Development", "P480"],
      ["2.2 Stakeholders", "P482"],
      ["2.3 Description of Plan Availability, Format, and Language", "P484"],
      ["2.4 Description of Plan Coordination (if applicable)", "P486"],
      ["2.5 Statutorily Required Descriptions", "P488"],
      ["3.1 Evaluation of Program Effectiveness", "P490"]
    ].map(([title, id]) => section("title1-" + id, title, [fixed(id)], "Title I > " + title));
    const sections = [
      section("identification", "Campus Identification", [
        para("BEAUMONT ISD — " + year + " Elementary Campus Improvement Plan"),
        sourceTable("T02", "Campus identification", false), para(PERSONNEL_NOTE)
      ]),
      section("public-review", "Shared Elementary Improvement Framework for Public Review", [publicReview], "Plan4Learning Entry Notes"),
      cna,
      goal(1, "Early Literacy", ["P172","P173","P174"], ["P176","P177","P178","P179"], "T22", readingNarrative, "T23"),
      goal(2, "Early Mathematics", ["P248","P249","P250"], ["P252","P253","P254","P255"], "T25", mathNarrative, "T26"),
      goal(3, "Safe, Supportive, and Engaging Schools", ["P324","P325","P326"], ["P328","P329","P330","P331"], "T28", attendanceNarrative, "T29"),
      goal(4, "Improve Overall Campus Performance", ["P394","P395","P396"], ["P398","P399","P400","P401"], "T31", accountabilityNarrative, "T32"),
      section("sce", "State Compensatory Education (SCE)", [
        metricLine("Total SCE Funds", "sce_allocation_amount"), fixed("P463")
      ], "State Compensatory Education", [
        section("sce-personnel", "State Compensatory Education Personnel", [fixed("P465"), para("Personnel roster completion: " + MARKER + ". " + PERSONNEL_NOTE)])
      ]),
      section("title1", "Title I / Schoolwide Program Requirements", [], "", [
        ...titleSections,
        section("title1-personnel", year + " Title I Personnel", [fixed("P492"), para("Personnel roster completion: " + MARKER + ". " + PERSONNEL_NOTE)])
      ]),
      section("intervention", "LIP / TIP / TAP Alignment (as applicable)", [
        fixed("P504"), publicReview, sourceTable("T38", "Intervention status and identification", false)
      ], "LIP / TIP / TAP Alignment", [
        section("intervention-strategy", "Standard Intervention Strategy Narrative", [fixed("P515")], "LIP / TIP / TAP Alignment"),
        section("intervention-monitoring", "Standard Progress-Monitoring Narrative", [fixed("P517"), fixed("P518")], "LIP / TIP / TAP Alignment")
      ]),
      section("entry-notes", "Plan4Learning Entry Notes", [
        fixed("P521"), heading(SOURCE.paragraphs.P522.trim()),
        list(["P523","P524","P525","P526","P527","P528","P529","P530","P531"]),
        heading("Purpose and source-template instructions"), fixed("P016"), fixed("P017"),
        para("References to blue-shaded fields describe the original Word template. This browser form supplies campus baselines; targets come from district configuration, and personnel information is completed in district systems."),
        para(PERSONNEL_NOTE)
      ])
    ];

    const blockText = block => {
      if (block.type === "list") return block.items.map(item => "- " + item).join("\n");
      if (block.type === "table") return block.caption + "\n" + block.rows.map(row => row.join("\t")).join("\n");
      return block.text;
    };
    const guide = [];
    function finalize(item) {
      item.text = item.blocks.map(blockText).join("\n\n");
      if (item.destination || item.id === "entry-notes") guide.push(item);
      item.children.forEach(finalize);
    }
    sections.forEach(finalize);
    const sectionText = item => item.title + "\n\n" + item.text + (item.children.length ? "\n\n" + item.children.map(sectionText).join("\n\n") : "");
    const fullText = sections.map(sectionText).join("\n\n");
    if (BAD_TOKEN.test(fullText) || /\[[^\]]*(?:XX|TARGET)[^\]]*\]/i.test(fullText)) throw new Error("Unresolved template token in generated content.");
    const sourceValues = Object.fromEntries(Object.entries(config.SOURCE_BINDINGS).map(([id, binding]) => {
      const display = binding.input ? value(binding.input)
        : binding.inputs ? binding.inputs.map(value).join(" / ")
        : binding.district ? value(binding.district)
        : binding.target ? value(binding.target)
        : binding.targets ? binding.targets.map(value).join(" / ")
        : binding.campusProperty ? value(binding.campusProperty)
        : MARKER;
      return [id, display];
    }));
    return {
      campus, campusId: value("campus_id"), schoolYear: year, sections, guide, fullText,
      questionValues, targetValues, districtValues, sourceValues,
      pendingItems: Array.from(pending.values()),
      unresolvedFields: Array.from(pending.keys()),
      counts: {
        mainSections: sections.length,
        guideSections: guide.length,
        questionnaireValues: Object.keys(questionValues).length,
        districtTargets: Object.keys(targetValues).length,
        derivedValues: 1,
        districtFields: Object.keys(districtValues).length,
        totalMappedValues: Object.keys(questionValues).length + Object.keys(targetValues).length + Object.keys(districtValues).length + 1,
        sourceDefinitions: Object.keys(sourceValues).length
      },
      status: pending.size
        ? "Working Draft — District confirmation needed for remaining district-controlled targets or fields."
        : "Working Draft — Review campus entries and district requirements before use.",
      marker: MARKER
    };
  }

  window.BISD_CIP_GENERATOR = Object.freeze({ build });
})();
