// Mock Risk Scenarios Data - 5 risks from PostgreSQL

export interface RiskScenario {
  id: number;
  name: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: string;
  impact: string;
  status: string;
  owner_name: string;
  owner_id: number;
}

export const mockRisks: RiskScenario[] = [
  {
    id: 1,
    name: "Sensitive data exposure via AI tools",
    description: "Employees may inadvertently share confidential information with AI assistants",
    priority: "High",
    likelihood: "Likely (60%)",
    impact: "Major",
    status: "Analyzing",
    owner_name: "Albert Tross",
    owner_id: 1,
  },
  {
    id: 2,
    name: "Code vulnerability from AI-generated code",
    description: "AI coding assistants may introduce security vulnerabilities",
    priority: "Medium",
    likelihood: "Possible (40%)",
    impact: "Moderate",
    status: "Mitigating",
    owner_name: "Owen Authora",
    owner_id: 2,
  },
  {
    id: 3,
    name: "Biased AI recommendations",
    description: "AI models may produce biased outputs affecting business decisions",
    priority: "Medium",
    likelihood: "Possible (40%)",
    impact: "Moderate",
    status: "Monitoring",
    owner_name: "Sarah Connor",
    owner_id: 6,
  },
  {
    id: 4,
    name: "Financial fraud via AI manipulation",
    description: "AI fraud detection systems may be manipulated or bypassed",
    priority: "Critical",
    likelihood: "Unlikely (20%)",
    impact: "Catastrophic",
    status: "Mitigating",
    owner_name: "John McClane",
    owner_id: 7,
  },
  {
    id: 5,
    name: "Privacy breach through HR AI",
    description: "HR AI systems may expose sensitive employee data",
    priority: "High",
    likelihood: "Possible (40%)",
    impact: "Major",
    status: "Analyzing",
    owner_name: "Leslie Knope",
    owner_id: 8,
  },
];

export const getRiskById = (id: number): RiskScenario | undefined => {
  return mockRisks.find(risk => risk.id === id);
};
