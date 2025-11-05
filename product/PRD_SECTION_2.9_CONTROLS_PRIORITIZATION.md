# Section 2.9: Controls (Gap) Prioritization

**Status**: 🔄 Ready for Review  
**Route**: `/controls-prioritization`  
**Owner**: Or Amir (Product)  
**Version**: v1.0  
**Last Updated**: November 5, 2025  
**User Personas**: Risk Managers, Compliance Officers, CISOs, CFOs, Legal Counsel, Ethics Officers

## Mission Statement
Empower organizations to transform AI governance self-assessments into defensible, stakeholder-aligned action plans by providing transparent prioritization, explainable scoring methodology, and quantifiable ROI analysis—enabling teams to confidently allocate resources, demonstrate compliance, and accelerate AI maturity.

## Problem Statement

Organizations completing AI governance self-assessments (NIST AI RMF, ISO/IEC 42001, EU AI Act) face critical challenges:

### Current Pain Points

1. **Lack of Actionable Prioritization**
   - Teams assess 15-50+ controls but struggle to decide which to tackle first
   - "Everything is important" leads to analysis paralysis
   - Gap scores alone don't account for business context, regulatory pressure, or implementation costs

2. **Inability to Justify Investment**
   - CFOs and boards demand ROI justification for security/governance spend
   - Teams can't quantify the business value of closing maturity gaps

3. **Siloed Stakeholder Perspectives**
   - CISO prioritizes security risks, Legal focuses on compliance, Ethics emphasizes fairness
   - No transparent mechanism to blend these perspectives into unified priorities
   - Decisions appear arbitrary without explainable methodology

4. **Lack of Traceability & Documentation**
   - Once priorities are set, remediation plans live in emails and meeting notes
   - No system of record for tracking status, ownership, or implementation progress
   - Auditors and executives can't easily understand "why this control ranked #1"

5. **Manual, Time-Intensive Process**
   - Spreadsheet-based scoring requires hours of manual calculation
   - Recalculating priorities after assumption changes is prohibitively slow
   - Teams avoid scenario planning ("what if we double Legal's influence?") due to effort

### Impact of These Problems
- **Delayed maturity improvement**: Teams spend 2-3 months debating priorities instead of implementing controls
- **Misallocated resources**: $500K+ invested in low-impact controls while critical gaps remain
- **Failed audits**: Unable to demonstrate systematic, defensible prioritization methodology
- **Stakeholder friction**: Legal, Security, and Ethics teams clash over "who gets priority"
- **Executive skepticism**: Boards reject governance budgets without clear ROI justification

## Jobs to Be Done (JTBD)

### Primary Jobs

| When... | I want to... | So I can... | Current Workaround | Success Metric |
|---------|-------------|-------------|-------------------|----------------|
| I complete a self-assessment | Rank all controls by priority using a transparent, explainable methodology | Focus my team's efforts on the highest-impact gaps | Manual spreadsheet scoring with subjective weighting | < 30 min to generate ranked list |
| Legal, CISO, and Ethics disagree on priorities | Blend stakeholder perspectives with transparent influence weighting | Achieve consensus without endless debate | Compromise in meetings or executive decision | All stakeholders approve methodology |
| I need to justify a $200K governance investment | Calculate ROSI showing costs, savings, and net benefit | Secure budget approval from CFO and board | Rough estimates in PowerPoint, no detailed analysis | CFO approves budget |
| I'm explaining to auditors why Control X is priority #1 | Show the complete scoring breakdown: gap, weights, criteria, stakeholders | Demonstrate systematic, defensible decision-making | Verbal explanation with no documentation | Auditor accepts rationale |
| Assumptions change (new regulation, budget cut) | Recalculate priorities in real-time by adjusting inputs | Quickly adapt plans without starting from scratch | Rebuild entire spreadsheet | < 5 min to recalculate |
| I want to track control implementation status | Update status (Draft → In Progress → Completed) and see it reflected in reporting | Maintain visibility into program progress | Separate project management tool or spreadsheet | Real-time status visibility |

### Secondary Jobs

| When... | I want to... | So I can... |
|---------|-------------|-------------|
| I'm implementing Control X | Get AI-powered remediation guidance tailored to my gap | Accelerate implementation with expert recommendations |
| I need to document the remediation plan | Save notes, attach documents, assign owners | Create audit trail and team accountability |
| I want to compare scenarios | Save multiple ROSI calculations with different cost/savings assumptions | Evaluate "build vs. buy" or "Phase 1 vs. Full Implementation" |

## See Full Requirements

The complete requirements document with detailed features, user flows, methodology, ROSI calculations, and technical specifications is available in:

**`/Users/liransorani/CascadeProjects/aikovrr/product/CONTROLS_PRIORITIZATION_FULL_SPEC.md`**

This includes:
- Detailed feature specifications (UI elements, interactions, data display)
- Complete prioritization methodology with formulas and examples
- ROSI calculation model with cost/benefit categories
- User flow diagrams
- Layout specifications (wireframes)
- Data requirements and database schema
- Scope (in scope vs. out of scope)
- Data sources

---

**Note**: This section has been added to the PRD. The full detailed specification is maintained in a separate document for easier maintenance and reference.
