// Shared types for the student reflection tool and its generated output.

export interface StudentInput {
  experienceType: string;
  role: string;
  major: string;
  careerInterests: string;
  targetOpportunity: string;
  strength: string;
  notes: string;
  goal: string;
  impact: string;
  tools: string;
  desiredOutput: string;
  tone: string;
}

export interface StarStory {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface ElevatorPitch {
  thirtySecond: string;
  careerFair: string;
  conversational: string;
  recruiterFollowUp: string;
  confidenceTips: string[];
}

export interface Competency {
  name: string;
  explanation: string;
}

export interface PresentationSlide {
  title: string;
  points: string[];
}

export interface GeneratedStory {
  summary: string;
  resumeBullets: string[];
  star: StarStory;
  pitch: ElevatorPitch;
  linkedin: string;
  careerFairPoints: string[];
  skills: string[];
  competencies: Competency[];
  reflectionQuestions: string[];
  presentation: PresentationSlide[];
  improvements: string[];
}

export interface SampleExperience {
  id: string;
  label: string;
  input: StudentInput;
}
