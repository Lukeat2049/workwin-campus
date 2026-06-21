import { SampleExperience } from "./types";

// Pre-filled examples so users can test the tool quickly. These map directly
// to the form fields in StudentInput.
export const SAMPLE_EXPERIENCES: SampleExperience[] = [
  {
    id: "internship",
    label: "Internship",
    input: {
      experienceType: "Internship",
      role: "Pricing Intern",
      major: "Management Information Systems",
      careerInterests: "Data analytics, pricing strategy, business technology",
      targetOpportunity: "Internship",
      strength: "I'm good at organizing information and explaining insights clearly",
      notes:
        "I compared competitor prices, updated a spreadsheet, found pricing gaps, and summarized findings for my manager.",
      goal: "Help the team better understand how our prices compared to competitors.",
      impact:
        "The team had a clearer view of pricing gaps and could decide what to review next.",
      tools: "Excel, research, communication, data analysis",
      desiredOutput: "Resume",
      tone: "Professional",
    },
  },
  {
    id: "class-project",
    label: "Class Project",
    input: {
      experienceType: "Class project",
      role: "Business Analytics Student",
      major: "Business Analytics",
      careerInterests: "Consulting, data analytics, operations",
      targetOpportunity: "Full-time job",
      strength: "I'm good at finding patterns and turning data into recommendations",
      notes:
        "My team analyzed sales data for a class project and created a presentation with recommendations.",
      goal: "Identify patterns in the data and recommend ways to improve performance.",
      impact:
        "We presented clear recommendations and practiced using data to support business decisions.",
      tools: "Excel, Tableau, teamwork, presentation skills",
      desiredOutput: "Interview prep",
      tone: "Confident",
    },
  },
  {
    id: "campus-job",
    label: "Campus Job",
    input: {
      experienceType: "Campus job",
      role: "Student Worker",
      major: "Marketing",
      careerInterests: "Communications, social media, student engagement",
      targetOpportunity: "Career fair",
      strength: "I'm good at communicating with people and staying organized",
      notes:
        "I helped answer student questions, organize office materials, and support campus events.",
      goal: "Help the office serve students more efficiently.",
      impact: "Students received faster help and events were better organized.",
      tools: "Customer service, communication, organization, teamwork",
      desiredOutput: "Career fair talking points",
      tone: "Warm and natural",
    },
  },
  {
    id: "volunteer",
    label: "Volunteer Work",
    input: {
      experienceType: "Volunteer work",
      role: "Volunteer",
      major: "Nursing",
      careerInterests: "Healthcare, patient care, community service",
      targetOpportunity: "Graduate school",
      strength: "I'm compassionate and dependable",
      notes:
        "I volunteered at a community health event, helped direct visitors, answered basic questions, and supported the event team.",
      goal: "Help community members access health resources.",
      impact:
        "Visitors had a smoother experience and the team was able to serve more people.",
      tools: "Communication, empathy, teamwork, service",
      desiredOutput: "LinkedIn",
      tone: "Warm and natural",
    },
  },
  {
    id: "leadership",
    label: "Student Leadership",
    input: {
      experienceType: "Leadership role",
      role: "Student Organization Officer",
      major: "Finance",
      careerInterests: "Leadership, financial services, consulting",
      targetOpportunity: "Speaking with a recruiter",
      strength: "I'm good at leading groups and solving problems",
      notes:
        "I helped plan meetings, communicate with members, coordinate events, and solve scheduling issues.",
      goal: "Keep members engaged and make events run smoothly.",
      impact:
        "The organization had stronger communication and better event participation.",
      tools: "Leadership, communication, planning, problem-solving",
      desiredOutput: "Elevator pitch",
      tone: "Confident",
    },
  },
];

export const EMPTY_INPUT = {
  experienceType: "",
  role: "",
  major: "",
  careerInterests: "",
  targetOpportunity: "",
  strength: "",
  notes: "",
  goal: "",
  impact: "",
  tools: "",
  desiredOutput: "",
  tone: "",
};
