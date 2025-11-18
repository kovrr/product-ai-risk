// Mock Controls Data - 10 controls from PostgreSQL

export interface Control {
  id: number;
  control_id: string;
  name: string;
  description: string;
  category: string;
  framework: string;
  current_maturity?: number;
  target_maturity?: number;
  status?: string;
}

export const mockControls: Control[] = [
  {
    id: 1,
    control_id: "GOVERN-1.1",
    name: "Legal and regulatory requirements",
    description: "Establish processes to determine relevant AI legal and regulatory requirements",
    category: "Governance",
    framework: "NIST AI RMF",
    current_maturity: 2,
    target_maturity: 4,
    status: "In Progress",
  },
  {
    id: 2,
    control_id: "GOVERN-1.2",
    name: "Risk management processes",
    description: "Integrate AI risk management into organizational risk management",
    category: "Governance",
    framework: "NIST AI RMF",
    current_maturity: 3,
    target_maturity: 4,
    status: "In Progress",
  },
  {
    id: 3,
    control_id: "MAP-1.1",
    name: "Context establishment",
    description: "Document AI system context including purpose, scope, and stakeholders",
    category: "Map",
    framework: "NIST AI RMF",
    current_maturity: 2,
    target_maturity: 3,
    status: "Planned",
  },
  {
    id: 4,
    control_id: "MEASURE-2.1",
    name: "Human oversight mechanisms",
    description: "Implement appropriate human review and intervention capabilities",
    category: "Measure",
    framework: "NIST AI RMF",
    current_maturity: 3,
    target_maturity: 4,
    status: "In Progress",
  },
  {
    id: 5,
    control_id: "MEASURE-2.2",
    name: "Explainability and transparency",
    description: "Ensure AI decisions can be explained to relevant stakeholders",
    category: "Measure",
    framework: "NIST AI RMF",
    current_maturity: 2,
    target_maturity: 4,
    status: "Planned",
  },
  {
    id: 6,
    control_id: "MANAGE-1.1",
    name: "Incident response",
    description: "Establish AI-specific incident response procedures",
    category: "Manage",
    framework: "NIST AI RMF",
    current_maturity: 1,
    target_maturity: 3,
    status: "Planned",
  },
  {
    id: 7,
    control_id: "MANAGE-2.1",
    name: "Monitoring and logging",
    description: "Implement continuous monitoring of AI system performance",
    category: "Manage",
    framework: "NIST AI RMF",
    current_maturity: 2,
    target_maturity: 4,
    status: "In Progress",
  },
  {
    id: 8,
    control_id: "MANAGE-3.1",
    name: "Access controls",
    description: "Implement role-based access controls for AI systems",
    category: "Manage",
    framework: "NIST AI RMF",
    current_maturity: 3,
    target_maturity: 4,
    status: "Implemented",
  },
  {
    id: 9,
    control_id: "MANAGE-4.1",
    name: "Audit trails",
    description: "Maintain comprehensive audit logs of AI system activities",
    category: "Manage",
    framework: "NIST AI RMF",
    current_maturity: 3,
    target_maturity: 4,
    status: "Implemented",
  },
  {
    id: 10,
    control_id: "MANAGE-5.1",
    name: "Data governance",
    description: "Establish data quality and governance standards for AI",
    category: "Manage",
    framework: "NIST AI RMF",
    current_maturity: 2,
    target_maturity: 4,
    status: "In Progress",
  },
];

export const getControlById = (id: number): Control | undefined => {
  return mockControls.find(control => control.id === id);
};

export const getControlByControlId = (controlId: string): Control | undefined => {
  return mockControls.find(control => control.control_id === controlId);
};

export const getControlsByCategory = (category: string): Control[] => {
  return mockControls.filter(control => control.category === category);
};
