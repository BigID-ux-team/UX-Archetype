import { ShieldCheck, Settings, BookOpen, Workflow, TrendingUp, RefreshCcw } from 'lucide-react';
import { Archetype, DecisionQuestion } from './types';

export const archetypesData: Archetype[] = [
  {
    name: "The Vigilant Guardian",
    group: "Privacy Professionals",
    coreIdentity: "Meticulous and highly risk-averse, prioritizing comprehensive data security and strict regulatory adherence.",
    keyTraits: "Meticulous, highly risk-averse, security-focused.",
    goals: "Reduce legal risk, enhance trust, ensure thorough compliance, minimize breaches.",
    challenges: "Overwhelmed by complexity, tools lack comprehensive risk assessment.",
    uxNeeds: "Granular controls, detailed audit trails, clear data flow visuals, customizable reporting.",
    pmFocus: "Reduces legal risk, enhances trust, ensures thorough compliance, minimizes data breaches.",
    keyQuestionsForFeature: [
      "Does this feature provide real-time risk alerts for policy violations?",
      "Can users customize data access policies with version control?",
      "Does it offer comprehensive, searchable audit logs with export options?",
      "How does this feature enhance the user's ability to monitor and control data security?"
    ],
    icon: ShieldCheck,
    decisionMapKeywords: ["data security", "access control", "auditing", "strict adherence", "regulations"]
  },
  {
    name: "The Pragmatic Implementer",
    group: "Privacy Professionals",
    coreIdentity: "Efficiency-driven, practical, seeks seamless integration with existing systems and automation of tasks.",
    keyTraits: "Efficiency-driven, practical, seeks integration and automation.",
    goals: "Improve operational efficiency, reduce manual effort, speed tasks, increase adoption.",
    challenges: "Legacy systems, integration issues, lack of user-friendly automation.",
    uxNeeds: "Intuitive workflows, seamless API integrations, automated routine processes, clear documentation.",
    pmFocus: "Improves operational efficiency, reduces manual effort, speeds up task completion, increases system adoption.",
    keyQuestionsForFeature: [
      "Does this feature offer intuitive workflow builders for privacy processes?",
      "Is there a dashboard for monitoring API integration health and data syncs?",
      "Does it include automated consent management flows with pre-built templates?",
      "How does this feature simplify and automate routine privacy tasks?"
    ],
    icon: Workflow,
    decisionMapKeywords: ["efficiency", "automation", "integration", "workflows"]
  },
  {
    name: "The Communicator & Educator",
    group: "Privacy Professionals",
    coreIdentity: "Focused on fostering privacy awareness, adept at explaining complex privacy concepts to diverse internal and external audiences.",
    keyTraits: "Fosters privacy awareness, adept at explaining complex concepts.",
    goals: "Drive internal policy adoption, build privacy-aware culture, empower transparent communication.",
    challenges: "Creating engaging materials, varying awareness levels, ensuring consistent messaging.",
    uxNeeds: "Tools for creating and managing engaging privacy training content, internal communication platforms, visual aids, progress tracking.",
    pmFocus: "Drives internal adoption of privacy policies, builds a strong privacy-aware culture, empowers transparent communication to consumers.",
    keyQuestionsForFeature: [
      "Does this feature offer customizable privacy policy templates with versioning?",
      "Does it include interactive training modules with quizzes and progress tracking?",
      "Is there an internal communication dashboard for privacy news and updates?",
      "How does this feature help users effectively convey privacy information to others?"
    ],
    icon: BookOpen,
    decisionMapKeywords: ["communication", "education", "awareness", "training"]
  },
  {
    name: "The Rule Master",
    group: "Compliance Professionals",
    coreIdentity: "Possesses an in-depth understanding of regulations, meticulous about accuracy and strict adherence to legal texts.",
    keyTraits: "In-depth regulatory understanding, meticulous about accuracy and adherence.",
    goals: "Ensure strict adherence, minimize audit failures, maintain legal standing, reduce penalties.",
    challenges: "Keeping up with regulations, consistent application, dealing with ambiguity.",
    uxNeeds: "Up-to-date, searchable regulatory libraries with cross-references, control mapping tools, robust audit management, comprehensive record-keeping.",
    pmFocus: "Ensures strict adherence, minimizes audit failures, maintains legal standing, reduces non-compliance penalties.",
    keyQuestionsForFeature: [
      "Does this feature provide dynamic regulatory change alerts with impact analysis?",
      "Does it include robust control-to-regulation mapping tools with visual linkages?",
      "Can users leverage automated compliance checklists based on specific regulations?",
      "How does this feature support the user's need for precision and thoroughness in compliance?"
    ],
    icon: Settings,
    decisionMapKeywords: ["regulations", "compliance", "auditing", "legal adherence", "accuracy"]
  },
  {
    name: "The Risk Navigator",
    group: "Compliance Professionals",
    coreIdentity: "Strategic thinker, proactive in identifying, assessing, and mitigating potential compliance risks across the organization.",
    keyTraits: "Strategic, proactive in identifying/mitigating risks.",
    goals: "Proactive risk reduction, strategic decision-making, long-term resilience, improved risk communication.",
    challenges: "Holistic risk view, prioritizing effectively, communicating assessments to leadership.",
    uxNeeds: "Interactive risk maps/dashboards, customizable risk scoring, predictive analytics, automated risk reporting.",
    pmFocus: "Proactive risk reduction, strategic decision-making, long-term organizational resilience, improved risk communication to leadership.",
    keyQuestionsForFeature: [
      "Does this feature offer tools for scenario planning for 'what-if' compliance situations?",
      "Are there cross-departmental risk dashboards with drill-down capabilities?",
      "Does it integrate with vulnerability scanning and threat intelligence feeds?",
      "How does this feature empower users to proactively identify and manage risks?"
    ],
    icon: TrendingUp,
    decisionMapKeywords: ["risk assessment", "mitigation", "strategic planning", "predictive analytics"]
  },
  {
    name: "The Process Optimizer",
    group: "Compliance Professionals",
    coreIdentity: "Focused on streamlining workflows, improving efficiency, and reducing friction in compliance processes.",
    keyTraits: "Focuses on streamlining workflows, improving efficiency.",
    goals: "Increase operational efficiency, reduce manual effort, improve user satisfaction, drive faster cycles.",
    challenges: "Balancing compliance with usability, integrating new processes, finding effective tech solutions.",
    uxNeeds: "Process mapping/optimization tools, workflow automation, user-friendly guided procedures, enterprise system integration.",
    pmFocus: "Increases operational efficiency, reduces manual effort, improves user satisfaction with compliance tasks, drives faster compliance cycles.",
    keyQuestionsForFeature: [
      "Does this feature offer customizable workflow templates for common compliance processes?",
      "Does it include automated task assignment and notification system?",
      "Does it provide performance analytics for compliance processes (e.g., time to complete, bottlenecks)?",
      "How does this feature help users streamline and improve their compliance workflows?"
    ],
    icon: RefreshCcw,
    decisionMapKeywords: ["process improvement", "workflow optimization", "efficiency", "automation"]
  },
];

const findArchetypeByName = (name: string): Archetype | undefined => {
  return archetypesData.find(a => a.name === name);
};

export const decisionMapQuestions: DecisionQuestion[] = [
  {
    text: "Is this feature primarily about data security, access control, auditing, or ensuring strict adherence to regulations?",
    archetypes: [
      findArchetypeByName("The Vigilant Guardian"),
      findArchetypeByName("The Rule Master")
    ].filter((a): a is Archetype => a !== undefined)
  },
  {
    text: "Does this feature involve automating a process, integrating with other systems, or streamlining a workflow for efficiency?",
    archetypes: [
      findArchetypeByName("The Pragmatic Implementer"),
      findArchetypeByName("The Process Optimizer")
    ].filter((a): a is Archetype => a !== undefined)
  },
  {
    text: "Is this feature focused on communication, transparency, or education?",
    archetypes: [
      findArchetypeByName("The Communicator & Educator")
    ].filter((a): a is Archetype => a !== undefined)
  },
  {
    text: "Is this feature about identifying, assessing, visualizing, or mitigating potential risks?",
    archetypes: [
      findArchetypeByName("The Risk Navigator")
    ].filter((a): a is Archetype => a !== undefined)
  }
];