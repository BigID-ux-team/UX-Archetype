import { LucideIcon } from 'lucide-react';

export interface Archetype {
  name: string;
  group: "Privacy Professionals" | "Compliance Professionals";
  coreIdentity: string;
  keyTraits: string;
  goals: string;
  challenges: string;
  uxNeeds: string;
  pmFocus: string;
  keyQuestionsForFeature: string[];
  icon: LucideIcon;
  decisionMapKeywords?: string[];
}

export interface DecisionQuestion {
  text: string;
  archetypes: Archetype[];
}