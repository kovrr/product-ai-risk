# AI Asset Manual Input Wizard - Generic Template

## Overview
This wizard guides users through a comprehensive AI asset registration process, capturing essential information for governance, risk assessment, and compliance tracking.

---

## Wizard Structure (6 Steps)

### **Step 1: Basic Information**
*Essential identification and classification*

#### Fields:
1. **Asset Name*** (text)
   - Placeholder: "e.g., ChatGPT Enterprise, GitHub Copilot"

2. **Asset Type*** (dropdown)
   - Options: 
     - SaaS Application
     - Open-Source Library
     - Custom-Built AI System
     - AI-Enabled Tool
     - Public Web Service
     - AI Model/Algorithm
     - Other

3. **Vendor/Provider*** (text)
   - Placeholder: "e.g., OpenAI, Microsoft, Internal Development"

4. **Version** (text)
   - Placeholder: "e.g., GPT-4, v2.1.0"

5. **Deployment Type*** (radio)
   - Cloud-Hosted
   - On-Premises
   - Hybrid
   - API-Based

6. **Asset Owner*** (user selector)
   - Business owner responsible for the asset

7. **Technical Owner** (user selector)
   - IT/Technical contact for the asset

8. **Date Deployed/Acquired*** (date picker)

9. **Business Unit/Department*** (dropdown)
   - Dynamic list based on organization structure

10. **Primary Use Case*** (textarea)
    - Placeholder: "Describe the main business purpose and how this AI system is used"
    - Max: 500 characters

---

### **Step 2: Risk Assessment**
*Evaluate the risk profile using a standardized matrix*

#### Risk Matrix (5x5 Assessment)

For each measure, select the appropriate level:

| Measure | Low | Moderate | High | Very High |
|---------|-----|----------|------|-----------|

#### 1. **Criticality*** (radio group)
- **Low**: Used only for information purposes, minimal impact on decisions
- **Moderate**: Relied upon within business as informative resource, impacts internal services
- **High**: Impacts high-risk decision making with potential downstream client impact
- **Very High**: Critical to high-risk decisions and/or directly influences client decision making

#### 2. **Audience Reach*** (radio group)
- **Low**: Localized, used by a team or department
- **Moderate**: Senior management, business partners, regional/global reach
- **High**: Executive leaders, could impact client decision making
- **Very High**: Board, global reach, significant client population, regulators, external stakeholders

#### 3. **Data Privacy Impact*** (radio group)
- **Low**: Non-sensitive, public data
- **Moderate**: Anonymized or pseudonymized data
- **High**: Proprietary information, financial data, PII (clients/employees)
- **Very High**: Sensitive PII (medical, religious, sexual orientation, biometric)

#### 4. **Data Classification*** (radio group)
- **Low**: Public/External
- **Moderate**: Internal
- **High**: Confidential
- **Very High**: Highly Confidential/Restricted

#### 5. **Ethical Risk*** (radio group)
- **Low**: No bias or discrimination risk
- **Moderate**: Potential bias but mitigated through diverse training data and testing
- **High**: Could create bias/ethical issues, requires oversight
- **Very High**: High risk of bias/discrimination, requires strict oversight and controls

#### 6. **Complexity & Interpretability*** (radio group)
- **Low**: Straightforward, understandable by non-experts
- **Moderate**: Moderately complex, requires skilled person or SME
- **High**: Multiple interdependencies, requires specialist AI knowledge
- **Very High**: Highly complex, requires specialist developer knowledge

#### 7. **Cybersecurity Posture*** (radio group)
- **Low**: Security assessment passed/achieved
- **Moderate**: Security assessment partially achieved
- **High**: Security assessment partially achieved with gaps
- **Very High**: Security assessment not achieved or not performed

#### 8. **Financial Impact of Failure*** (radio group)
- **Low**: Minor (<$50K)
- **Moderate**: Moderate ($50K-$500K)
- **High**: Major ($500K-$5M)
- **Very High**: Severe (>$5M)

#### 9. **Non-Financial Impact of Failure*** (radio group)
- **Low**: Minor (limited reputational impact)
- **Moderate**: Moderate (some reputational/regulatory concern)
- **High**: Major (significant reputational/regulatory impact)
- **Very High**: Severe (critical reputational/regulatory/client impact)

#### 10. **Sustainability Impact*** (radio group)
- **Low**: Provider adheres to sustainable and ethical practices
- **Moderate**: Provider adheres to some sustainable practices
- **High**: Provider does not detail sustainability approach
- **Very High**: Provider has no sustainability approach

#### 11. **Availability/Resilience*** (radio group)
- **Low**: Easily maintained by internal team, failures quickly detected and fixed
- **Moderate**: Requires specific skills, failures may not be immediately identifiable
- **High**: Requires specialized external/vendor support, thorough validation needed
- **Very High**: Requires niche specialist support, specialist validation required

#### 12. **Human Oversight Level*** (radio group)
- **Human in the Loop**: Human reviews and validates all AI outputs before action
- **Human on the Loop**: AI executes, human monitors and can intervene
- **Sampled Oversight**: AI executes autonomously, periodic human review
- **Fully Autonomous**: AI executes with minimal human oversight

**Auto-Calculated Risk Score**: [Low | Moderate | High | Very High]
- Display aggregate risk rating based on responses
- Show risk heat map visualization

---

### **Step 3: Data & Privacy**
*Data handling, privacy, and model training considerations*

#### Fields:

1. **Data Sources*** (multi-select)
   - Internal databases
   - Customer data
   - Employee data
   - Third-party data
   - Public data
   - Synthetic data
   - Other (specify)

2. **Data Types Processed*** (multi-select)
   - Personal Identifiable Information (PII)
   - Financial data
   - Health data
   - Biometric data
   - Behavioral data
   - Business/operational data
   - None of the above

3. **Data Segregation*** (radio)
   - Yes - Organization data is segregated from other tenants
   - No - Shared data environment
   - Unknown
   - Not Applicable

4. **Model Training Policy*** (radio)
   - Our data is NOT used to train or improve vendor models
   - Our data MAY be used for model training (with consent)
   - Our data IS used for model training
   - Unknown
   - Not Applicable (custom model)

5. **Data Residency Requirements*** (radio)
   - Yes - Data must remain in specific geographic location
   - No - No geographic restrictions
   - Unknown

6. **Data Residency Location** (text - conditional)
   - If Yes above, specify: _____________

7. **Data Retention Period*** (dropdown)
   - Real-time only (no storage)
   - < 30 days
   - 30-90 days
   - 90 days - 1 year
   - 1-3 years
   - 3-7 years
   - > 7 years
   - Indefinite

8. **Privacy Impact Assessment Completed?*** (radio)
   - Yes (attach document)
   - No
   - In Progress
   - Not Required

9. **GDPR/Privacy Compliance*** (radio)
   - Fully Compliant
   - Partially Compliant
   - Non-Compliant
   - Not Applicable
   - Under Review

---

### **Step 4: Compliance & Governance**
*Regulatory requirements and governance controls*

#### Fields:

1. **Regulatory Classification*** (multi-select)
   - High-Risk AI System (EU AI Act)
   - Limited Risk AI System
   - Minimal Risk AI System
   - Financial Services Regulated
   - Healthcare Regulated
   - Not Regulated
   - Unknown

2. **Applicable Regulations*** (multi-select)
   - EU AI Act
   - GDPR
   - CCPA/CPRA
   - HIPAA
   - SOX
   - PCI-DSS
   - ISO 27001
   - SOC 2
   - NIST AI RMF
   - Other (specify)
   - None

3. **Vendor Security Assessment*** (radio)
   - Completed - Passed
   - Completed - Passed with Conditions
   - Completed - Failed
   - In Progress
   - Not Started
   - Not Required

4. **Vendor Contract Includes AI Clauses?*** (radio)
   - Yes - Data usage, liability, and IP rights covered
   - Partially - Some AI clauses included
   - No - Standard contract only
   - No contract (internal system)

5. **Third-Party Audit/Certification*** (multi-select)
   - SOC 2 Type II
   - ISO 27001
   - ISO 42001 (AI Management)
   - FedRAMP
   - HITRUST
   - None
   - Other (specify)

6. **Documented AI Governance Controls?*** (radio)
   - Yes - Full documentation available
   - Partial - Some documentation exists
   - No - Not documented
   - In Development

7. **Model Documentation Available?*** (radio)
   - Yes - Model cards/datasheets available
   - Partial - Limited documentation
   - No - Not available
   - Not Applicable (black box system)

8. **Explainability/Transparency*** (radio)
   - High - Decisions can be fully explained
   - Moderate - Partial explainability
   - Low - Limited transparency
   - Black Box - No explainability

---

### **Step 5: Technical & Operational**
*Technical specifications and operational considerations*

#### Fields:

1. **Integration Points*** (multi-select)
   - Identity Provider (SSO/SAML)
   - CRM System
   - ERP System
   - Data Warehouse
   - Cloud Storage
   - APIs
   - Email System
   - Collaboration Tools
   - Other (specify)
   - Standalone (no integrations)

2. **Authentication Method*** (multi-select)
   - Single Sign-On (SSO)
   - Multi-Factor Authentication (MFA)
   - API Keys
   - OAuth 2.0
   - Username/Password
   - Certificate-based
   - Other (specify)

3. **Number of Users*** (dropdown)
   - 1-10
   - 11-50
   - 51-100
   - 101-500
   - 501-1000
   - 1000+

4. **User Access Level*** (radio)
   - Department-wide
   - Organization-wide
   - Restricted to specific roles
   - External users included
   - Public-facing

5. **Monitoring & Logging*** (radio)
   - Comprehensive - All activities logged and monitored
   - Moderate - Key activities logged
   - Minimal - Basic logging only
   - None - No logging/monitoring

6. **Incident Response Plan*** (radio)
   - Yes - Documented and tested
   - Yes - Documented but not tested
   - In Development
   - No

7. **Business Continuity Plan*** (radio)
   - Yes - Documented with backup/failover
   - Partial - Some continuity measures
   - No
   - Not Required

8. **Vendor SLA*** (text)
   - Uptime guarantee: _____% (e.g., 99.9%)

9. **Support Availability*** (radio)
   - 24/7 Support
   - Business Hours Only
   - Email Support Only
   - Community Support
   - No Formal Support

10. **Change Management Process*** (radio)
    - Formal change control process in place
    - Informal change management
    - No change management
    - Vendor-managed updates only

---

### **Step 6: Review & Submit**
*Final review and additional documentation*

#### Summary Display:
- Show all entered information in a review format
- Display calculated risk score with visual indicator
- Highlight any high-risk areas requiring attention

#### Additional Information:

1. **Mitigating Controls** (textarea)
   - Describe any controls in place to mitigate identified risks
   - Max: 1000 characters

2. **Known Issues/Limitations** (textarea)
   - Document any known issues, limitations, or concerns
   - Max: 1000 characters

3. **Exception Requests** (textarea)
   - If this asset requires policy exceptions, describe them here
   - Max: 1000 characters

4. **Review Frequency*** (dropdown)
   - Monthly
   - Quarterly
   - Semi-Annually
   - Annually
   - As Needed

5. **Next Review Date*** (date picker - auto-calculated based on review frequency)

6. **Supporting Documents** (file upload)
   - Vendor contracts
   - Security assessments
   - Privacy impact assessments
   - Model documentation
   - Risk assessments
   - Other supporting materials
   - Max: 10 files, 25MB each

7. **Additional Notes** (textarea)
   - Any other relevant information
   - Max: 1000 characters

#### Approval Workflow:

8. **Requires Executive Approval?*** (auto-calculated)
   - If aggregate risk = High or Very High → Yes
   - Otherwise → No

9. **Executive Sponsor** (user selector - conditional)
   - Required if executive approval needed

10. **Approval Justification** (textarea - conditional)
    - Required if executive approval needed
    - Max: 500 characters

#### Submit Actions:
- **Save as Draft** - Save progress and return later
- **Submit for Review** - Submit to AI Governance team
- **Submit for Approval** - Submit directly (if low risk)

---

## Post-Submission

### Automatic Actions:
1. **Asset ID Generated**: Unique identifier (e.g., AI-ASSET-2025-001)
2. **Risk Register Entry**: Automatically create risk entry if risk score ≥ Moderate
3. **Compliance Mapping**: Auto-map to relevant compliance frameworks
4. **Review Reminder**: Schedule review reminder based on frequency
5. **Notification**: Alert AI Governance team and asset owner
6. **Dashboard Update**: Asset appears in Assets Visibility dashboard

### Status Workflow:
- **Draft** → **Pending Review** → **Approved** / **Rejected** / **Requires Changes**
- If High/Very High Risk: **Pending Executive Approval** → **Approved** / **Rejected**

---

## Validation Rules

### Required Fields (marked with *):
- Cannot submit without completing all required fields
- Show inline validation errors

### Conditional Logic:
- Data residency location required if residency requirements = Yes
- Executive sponsor required if risk = High/Very High
- Privacy assessment required if PII/sensitive data processed
- Vendor assessment required if external vendor

### Risk Score Calculation:
```
Aggregate Risk = Average of all risk measure ratings
- Low: 0-25%
- Moderate: 26-50%
- High: 51-75%
- Very High: 76-100%
```

### Auto-Save:
- Save progress every 60 seconds
- Warn user before navigating away with unsaved changes

---

## UI/UX Considerations

### Progress Indicator:
- Show step progress (1 of 6, 2 of 6, etc.)
- Allow navigation between completed steps
- Highlight incomplete required fields

### Help Text:
- Provide contextual help for each field
- Include examples and definitions
- Link to relevant policies and standards

### Risk Visualization:
- Real-time risk score calculation
- Color-coded risk indicators (green/yellow/orange/red)
- Risk heat map showing distribution across measures

### Mobile Responsive:
- Optimize for tablet and mobile completion
- Save and resume capability

---

## Integration Points

### Backend API Endpoints:
```
POST   /api/assets/manual-intake/draft          # Save draft
POST   /api/assets/manual-intake/submit         # Submit for review
GET    /api/assets/manual-intake/draft/:id      # Retrieve draft
PUT    /api/assets/manual-intake/draft/:id      # Update draft
DELETE /api/assets/manual-intake/draft/:id      # Delete draft
POST   /api/assets/manual-intake/upload         # Upload documents
GET    /api/assets/manual-intake/risk-score     # Calculate risk score
```

### Data Model:
```json
{
  "assetId": "AI-ASSET-2025-001",
  "status": "pending_review",
  "basicInfo": { ... },
  "riskAssessment": { ... },
  "dataPrivacy": { ... },
  "compliance": { ... },
  "technical": { ... },
  "review": { ... },
  "riskScore": {
    "aggregate": "moderate",
    "breakdown": { ... }
  },
  "createdBy": "user@example.com",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T11:45:00Z",
  "submittedAt": null,
  "approvedAt": null,
  "approvedBy": null
}
```

---

## Benefits of This Wizard

1. **Comprehensive**: Captures all critical governance, risk, and compliance information
2. **Risk-Based**: Automatic risk scoring guides oversight requirements
3. **Flexible**: Adaptable to any organization's policies and frameworks
4. **User-Friendly**: Step-by-step guidance with contextual help
5. **Compliant**: Aligned with major regulations (EU AI Act, GDPR, etc.)
6. **Auditable**: Complete documentation trail for compliance and audits
7. **Automated**: Triggers workflows, notifications, and integrations
8. **Scalable**: Handles assets from low-risk tools to high-risk systems

---

## Next Steps for Implementation

1. **Design UI mockups** for each wizard step
2. **Define organization-specific** dropdown values and thresholds
3. **Configure approval workflows** based on risk levels
4. **Integrate with existing systems** (IAM, ITSM, GRC tools)
5. **Create help documentation** and training materials
6. **Pilot with select users** before full rollout
7. **Iterate based on feedback** and usage patterns
