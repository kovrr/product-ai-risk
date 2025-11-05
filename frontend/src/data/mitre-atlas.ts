/**
 * MITRE ATLAS (Adversarial Threat Landscape for AI Systems)
 * Framework for AI/ML security threats and techniques
 */

export interface MitreTactic {
  id: string;
  name: string;
  description: string;
  techniques: string[];
}

export interface MitreTechnique {
  id: string;
  name: string;
  description: string;
  tactic: string;
  examples?: string[];
}

// MITRE ATLAS Tactics
export const mitreTactics: MitreTactic[] = [
  {
    id: 'AML.TA0001',
    name: 'Reconnaissance',
    description: 'Gather information about the target ML system',
    techniques: ['AML.T0001', 'AML.T0002', 'AML.T0003'],
  },
  {
    id: 'AML.TA0002',
    name: 'Resource Development',
    description: 'Establish resources to support operations',
    techniques: ['AML.T0004', 'AML.T0005'],
  },
  {
    id: 'AML.TA0003',
    name: 'Initial Access',
    description: 'Gain initial access to the ML system',
    techniques: ['AML.T0006', 'AML.T0007', 'AML.T0008'],
  },
  {
    id: 'AML.TA0004',
    name: 'ML Model Access',
    description: 'Access the machine learning model',
    techniques: ['AML.T0009', 'AML.T0010', 'AML.T0011'],
  },
  {
    id: 'AML.TA0005',
    name: 'Execution',
    description: 'Execute adversarial code or commands',
    techniques: ['AML.T0012', 'AML.T0013'],
  },
  {
    id: 'AML.TA0006',
    name: 'Persistence',
    description: 'Maintain presence in the ML system',
    techniques: ['AML.T0014', 'AML.T0015'],
  },
  {
    id: 'AML.TA0007',
    name: 'Defense Evasion',
    description: 'Avoid detection and analysis',
    techniques: ['AML.T0016', 'AML.T0017', 'AML.T0018'],
  },
  {
    id: 'AML.TA0008',
    name: 'Discovery',
    description: 'Gain knowledge about the ML system',
    techniques: ['AML.T0019', 'AML.T0020'],
  },
  {
    id: 'AML.TA0009',
    name: 'Collection',
    description: 'Gather data from the target system',
    techniques: ['AML.T0021', 'AML.T0022'],
  },
  {
    id: 'AML.TA0010',
    name: 'ML Attack Staging',
    description: 'Prepare and stage ML-specific attacks',
    techniques: ['AML.T0023', 'AML.T0024', 'AML.T0025'],
  },
  {
    id: 'AML.TA0011',
    name: 'Exfiltration',
    description: 'Steal data or model information',
    techniques: ['AML.T0026', 'AML.T0027'],
  },
  {
    id: 'AML.TA0012',
    name: 'Impact',
    description: 'Manipulate, interrupt, or destroy ML systems',
    techniques: ['AML.T0028', 'AML.T0029', 'AML.T0030'],
  },
];

// MITRE ATLAS Techniques
export const mitreTechniques: MitreTechnique[] = [
  // Reconnaissance
  {
    id: 'AML.T0001',
    name: 'Discover ML Model Family',
    description: 'Identify the type and architecture of the ML model',
    tactic: 'AML.TA0001',
    examples: ['Model fingerprinting', 'API probing'],
  },
  {
    id: 'AML.T0002',
    name: 'Discover ML Artifacts',
    description: 'Find publicly available ML models, datasets, or research',
    tactic: 'AML.TA0001',
    examples: ['GitHub scanning', 'Model zoo exploration'],
  },
  {
    id: 'AML.T0003',
    name: 'Discover ML Model Ontology',
    description: 'Understand the model\'s input/output structure',
    tactic: 'AML.TA0001',
    examples: ['API documentation review', 'Input fuzzing'],
  },

  // Resource Development
  {
    id: 'AML.T0004',
    name: 'Develop Adversarial ML Model',
    description: 'Create a model to generate adversarial examples',
    tactic: 'AML.TA0002',
    examples: ['Substitute model training', 'GAN development'],
  },
  {
    id: 'AML.T0005',
    name: 'Acquire ML Artifacts',
    description: 'Obtain datasets, models, or tools for attacks',
    tactic: 'AML.TA0002',
    examples: ['Dataset scraping', 'Pre-trained model download'],
  },

  // Initial Access
  {
    id: 'AML.T0006',
    name: 'Phishing for ML Artifacts',
    description: 'Use social engineering to obtain ML resources',
    tactic: 'AML.TA0003',
    examples: ['Credential phishing', 'Malicious model sharing'],
  },
  {
    id: 'AML.T0007',
    name: 'Exploit Public-Facing Application',
    description: 'Compromise ML service through vulnerabilities',
    tactic: 'AML.TA0003',
    examples: ['API exploitation', 'Injection attacks'],
  },
  {
    id: 'AML.T0008',
    name: 'Supply Chain Compromise',
    description: 'Compromise ML pipeline or dependencies',
    tactic: 'AML.TA0003',
    examples: ['Poisoned packages', 'Backdoored models'],
  },

  // ML Model Access
  {
    id: 'AML.T0009',
    name: 'ML Model Inference API Access',
    description: 'Query the model through its API',
    tactic: 'AML.TA0004',
    examples: ['Public API access', 'Stolen credentials'],
  },
  {
    id: 'AML.T0010',
    name: 'Full ML Model Access',
    description: 'Obtain complete access to model weights',
    tactic: 'AML.TA0004',
    examples: ['Model theft', 'Insider access'],
  },
  {
    id: 'AML.T0011',
    name: 'Physical Environment Access',
    description: 'Access physical sensors or data sources',
    tactic: 'AML.TA0004',
    examples: ['Camera manipulation', 'Sensor spoofing'],
  },

  // Execution
  {
    id: 'AML.T0012',
    name: 'Prompt Injection',
    description: 'Inject malicious prompts into LLM systems',
    tactic: 'AML.TA0005',
    examples: ['Jailbreak prompts', 'Instruction override'],
  },
  {
    id: 'AML.T0013',
    name: 'Backdoor ML Model',
    description: 'Insert backdoors into ML models',
    tactic: 'AML.TA0005',
    examples: ['Training-time backdoors', 'Trojan triggers'],
  },

  // Persistence
  {
    id: 'AML.T0014',
    name: 'Poison Training Data',
    description: 'Inject malicious data into training pipeline',
    tactic: 'AML.TA0006',
    examples: ['Label flipping', 'Data poisoning'],
  },
  {
    id: 'AML.T0015',
    name: 'Backdoor Model Weights',
    description: 'Modify model weights to create persistent backdoors',
    tactic: 'AML.TA0006',
    examples: ['Weight poisoning', 'Trojan insertion'],
  },

  // Defense Evasion
  {
    id: 'AML.T0016',
    name: 'Evade ML Model',
    description: 'Craft inputs to evade detection',
    tactic: 'AML.TA0007',
    examples: ['Adversarial examples', 'Perturbation attacks'],
  },
  {
    id: 'AML.T0017',
    name: 'Obfuscate Adversarial Data',
    description: 'Hide malicious patterns in data',
    tactic: 'AML.TA0007',
    examples: ['Steganography', 'Encoding tricks'],
  },
  {
    id: 'AML.T0018',
    name: 'Exploit Model Uncertainty',
    description: 'Target model confidence boundaries',
    tactic: 'AML.TA0007',
    examples: ['Boundary attacks', 'Confidence manipulation'],
  },

  // Discovery
  {
    id: 'AML.T0019',
    name: 'Discover Model Hyperparameters',
    description: 'Extract model configuration details',
    tactic: 'AML.TA0008',
    examples: ['Hyperparameter extraction', 'Architecture probing'],
  },
  {
    id: 'AML.T0020',
    name: 'Discover Training Data',
    description: 'Identify or reconstruct training data',
    tactic: 'AML.TA0008',
    examples: ['Membership inference', 'Data reconstruction'],
  },

  // Collection
  {
    id: 'AML.T0021',
    name: 'Infer Training Data Membership',
    description: 'Determine if data was in training set',
    tactic: 'AML.TA0009',
    examples: ['Membership inference attacks'],
  },
  {
    id: 'AML.T0022',
    name: 'Extract Model Information',
    description: 'Steal model architecture or weights',
    tactic: 'AML.TA0009',
    examples: ['Model extraction', 'Knowledge distillation'],
  },

  // ML Attack Staging
  {
    id: 'AML.T0023',
    name: 'Craft Adversarial Examples',
    description: 'Generate inputs to fool the model',
    tactic: 'AML.TA0010',
    examples: ['FGSM', 'PGD attacks', 'C&W attacks'],
  },
  {
    id: 'AML.T0024',
    name: 'Develop Evasion Strategy',
    description: 'Plan methods to bypass ML defenses',
    tactic: 'AML.TA0010',
    examples: ['Adaptive attacks', 'Defense analysis'],
  },
  {
    id: 'AML.T0025',
    name: 'Prepare Poisoned Data',
    description: 'Create malicious training samples',
    tactic: 'AML.TA0010',
    examples: ['Backdoor triggers', 'Poisoned labels'],
  },

  // Exfiltration
  {
    id: 'AML.T0026',
    name: 'Exfiltrate ML Model',
    description: 'Steal the complete ML model',
    tactic: 'AML.TA0011',
    examples: ['Model theft', 'Weight extraction'],
  },
  {
    id: 'AML.T0027',
    name: 'Exfiltrate Training Data',
    description: 'Extract sensitive training data',
    tactic: 'AML.TA0011',
    examples: ['Data leakage', 'Privacy attacks'],
  },

  // Impact
  {
    id: 'AML.T0028',
    name: 'Erode ML Model Integrity',
    description: 'Degrade model performance or accuracy',
    tactic: 'AML.TA0012',
    examples: ['Poisoning attacks', 'Model corruption'],
  },
  {
    id: 'AML.T0029',
    name: 'Denial of ML Service',
    description: 'Make ML system unavailable',
    tactic: 'AML.TA0012',
    examples: ['Sponge examples', 'Resource exhaustion'],
  },
  {
    id: 'AML.T0030',
    name: 'Manipulate ML Model Output',
    description: 'Control or bias model predictions',
    tactic: 'AML.TA0012',
    examples: ['Targeted misclassification', 'Bias injection'],
  },
];

// Helper functions
export const getTacticById = (id: string): MitreTactic | undefined => {
  return mitreTactics.find(t => t.id === id);
};

export const getTechniqueById = (id: string): MitreTechnique | undefined => {
  return mitreTechniques.find(t => t.id === id);
};

export const getTechniquesByTactic = (tacticId: string): MitreTechnique[] => {
  return mitreTechniques.filter(t => t.tactic === tacticId);
};

export const getTacticByName = (name: string): MitreTactic | undefined => {
  return mitreTactics.find(t => t.name === name);
};

export const getAllTacticNames = (): string[] => {
  return mitreTactics.map(t => t.name);
};

export const getAllTechniqueNames = (): string[] => {
  return mitreTechniques.map(t => t.name);
};
