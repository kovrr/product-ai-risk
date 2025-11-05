# Assets Visibility - Aligned Data Model

**Date**: November 5, 2025  
**Purpose**: Align Assets Visibility with other modules (Risk Register, AI Assurance Plan, Compliance Readiness)

---

## 🔄 Terminology Alignment Across Modules

### Common Patterns Identified:

| Concept | Risk Register | AI Assurance Plan | Compliance | Assets (NEW) |
|---------|---------------|-------------------|------------|--------------|
| **Ownership** | `owner: FK User` | `owner: FK User` | `assessed_by: FK User` | `owner: FK User` |
| **Status** | `status: enum` | `status: enum` | N/A | `status: enum` |
| **Priority/Risk** | `priority: enum (Low, Medium, High, Critical)` | `priority_score: decimal (0-100)` | `readiness_score: decimal (0-100)` | `risk_score: decimal (0-100)` |
| **Description** | `description: text` | `gap_description: text` | `notes: text` | `description: text` |
| **Dates** | `created_at, updated_at` | `assessment_date, target_completion_date` | `assessment_date` | `created_at, updated_at, first_seen, last_seen` |
| **Tenant** | `tenant: FK` | `tenant: FK` | `tenant: FK` | `tenant: FK` |

### Aligned Terminology:

✅ **Use `owner` not `business_owner` / `technical_owner`** (keep separate fields but align naming)  
✅ **Use `status` enum** (consistent across modules)  
✅ **Use `priority` or `risk_score`** (0-100 scale like AI Assurance Plan)  
✅ **Use `description` not `business_purpose`**  
✅ **Use standard date fields**: `created_at`, `updated_at`, `first_seen`, `last_seen`  
✅ **Use `tenant: FK`** (multi-tenancy)  

---

## 📊 Aligned Assets Visibility Data Model

### Core Model: `AIAsset`

```python
class AIAsset(models.Model):
    """
    AI Asset inventory with risk scoring and compliance tracking.
    Aligned with RiskScenario, ControlAssessment, and ComplianceReadiness models.
    """
    
    # ===== CORE IDENTITY =====
    id = models.AutoField(primary_key=True)
    tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)  # Display name (business-friendly)
    asset_type = models.CharField(max_length=50, choices=[
        ('model', 'AI Model'),
        ('app', 'AI Application'),
        ('agent', 'AI Agent'),
        ('dataset', 'Dataset'),
        ('service', 'AI Service')
    ])
    
    # ===== OWNERSHIP (aligned with RiskScenario.owner) =====
    owner = models.ForeignKey('User', related_name='owned_assets', 
                             on_delete=models.SET_NULL, null=True)  # Business owner
    technical_owner = models.ForeignKey('User', related_name='managed_assets',
                                       on_delete=models.SET_NULL, null=True)
    owning_org_unit = models.CharField(max_length=255, blank=True)
    
    # ===== VENDOR & SOURCE =====
    vendor_source = models.CharField(max_length=50, choices=[
        ('internal', 'Internal'),
        ('third_party', 'Third-Party Vendor'),
        ('open_source', 'Open Source')
    ])
    vendor_name = models.CharField(max_length=255, blank=True)  # Specific vendor/product
    
    # ===== STATUS (aligned with RiskScenario.status, ControlAssessment.status) =====
    status = models.CharField(max_length=50, choices=[
        ('sanctioned', 'Sanctioned'),      # Approved for use
        ('shadow', 'Shadow AI'),            # Discovered, not approved
        ('under_review', 'Under Review'),   # Being assessed
        ('blocked', 'Blocked'),             # Rejected
        ('retired', 'Retired')              # No longer in use
    ])
    
    # ===== BUSINESS CONTEXT =====
    use_case = models.CharField(max_length=255)  # What it's used for
    description = models.TextField()  # Business purpose (aligned with RiskScenario.description)
    intended_users = models.JSONField(default=list)  # ['employees', 'customers', 'public']
    projected_value = models.CharField(max_length=255, blank=True)  # KPI/ROI
    
    # ===== LIFECYCLE (aligned with ControlAssessment lifecycle concepts) =====
    lifecycle_stage = models.CharField(max_length=50, choices=[
        ('idea', 'Idea'),
        ('development', 'Development'),
        ('testing', 'Testing'),
        ('pilot', 'Pilot'),
        ('production', 'Production'),
        ('retired', 'Retired')
    ])
    deployment_platform = models.CharField(max_length=50, choices=[
        ('cloud', 'Cloud'),
        ('on_premises', 'On-Premises'),
        ('saas', 'SaaS'),
        ('hybrid', 'Hybrid')
    ])
    environment = models.JSONField(default=list)  # ['dev', 'test', 'prod']
    
    # ===== RISK SCORING (aligned with RiskScenario.priority, ControlAssessment.priority_score) =====
    risk_tier = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical')
    ])  # Aligned with RiskScenario.priority
    
    risk_score = models.DecimalField(max_digits=5, decimal_places=2, 
                                     null=True, blank=True)  # 0-100 (aligned with ControlAssessment.priority_score)
    inherent_risk_score = models.DecimalField(max_digits=5, decimal_places=2,
                                              null=True, blank=True)  # Before controls
    residual_risk_score = models.DecimalField(max_digits=5, decimal_places=2,
                                              null=True, blank=True)  # After controls
    
    # ===== DATA SENSITIVITY =====
    personal_data_used = models.BooleanField(default=False)
    sensitive_categories = models.JSONField(default=list, blank=True)  
    # ['special_category', 'children', 'biometrics', 'health', 'financial']
    
    # ===== COMPLIANCE (aligned with ComplianceReadiness) =====
    regulatory_applicability = models.JSONField(default=list, blank=True)
    # ['eu_ai_act_high_risk', 'gdpr', 'hipaa', 'ccpa', 'sox']
    
    control_coverage = models.JSONField(default=list, blank=True)
    # ['explainability', 'human_oversight', 'access_control', 'monitoring', 'audit_trail']
    
    # ===== MODEL SPECIFICS (for asset_type='model') =====
    model_provider = models.CharField(max_length=100, blank=True)  
    # 'OpenAI', 'Anthropic', 'Azure OpenAI', 'Internal'
    model_version = models.CharField(max_length=100, blank=True)
    
    # ===== INTEGRATION DATA (auto-populated) =====
    service_principal_id = models.CharField(max_length=255, blank=True)  # From AAD
    aad_permissions = models.JSONField(default=list, blank=True)  # From AAD
    user_assignments = models.JSONField(default=list, blank=True)  # From AAD
    network_destinations = models.JSONField(default=list, blank=True)  # From Zscaler
    
    # ===== DATES (aligned with all modules) =====
    first_seen = models.DateField(auto_now_add=True)  # Discovery date
    last_seen = models.DateField(auto_now=True)  # Last activity
    first_deployment_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # ===== RELATIONSHIPS =====
    # Link to Risk Register
    related_risks = models.ManyToManyField('RiskScenario', 
                                          related_name='affected_assets', 
                                          blank=True)
    
    # Link to AI Assurance Plan
    related_controls = models.ManyToManyField('Control',
                                             related_name='applicable_assets',
                                             blank=True)
    
    # Link to Compliance Readiness
    compliance_assessments = models.ManyToManyField('ComplianceReadiness',
                                                   related_name='assessed_assets',
                                                   blank=True)
    
    class Meta:
        db_table = 'visibility_aiasset'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['tenant', 'asset_type']),
            models.Index(fields=['tenant', 'status']),
            models.Index(fields=['tenant', 'risk_tier']),
            models.Index(fields=['tenant', 'lifecycle_stage']),
        ]
        verbose_name = 'AI Asset'
        verbose_name_plural = 'AI Assets'
    
    def __str__(self):
        return f"{self.name} ({self.asset_type})"
    
    def calculate_risk_score(self):
        """
        Calculate risk score (0-100) based on:
        - Data sensitivity (personal_data_used, sensitive_categories)
        - User impact (intended_users)
        - Lifecycle stage (production = higher risk)
        - Control coverage (reduces risk)
        
        Aligned with ControlAssessment.priority_score methodology
        """
        score = 0
        
        # Data sensitivity (0-30 points)
        if self.personal_data_used:
            score += 15
        score += min(len(self.sensitive_categories) * 5, 15)
        
        # User impact (0-30 points)
        if 'public' in self.intended_users:
            score += 20
        elif 'customers' in self.intended_users:
            score += 15
        elif 'employees' in self.intended_users:
            score += 10
        
        # Lifecycle stage (0-20 points)
        lifecycle_risk = {
            'production': 20,
            'pilot': 15,
            'testing': 10,
            'development': 5,
            'idea': 0,
            'retired': 0
        }
        score += lifecycle_risk.get(self.lifecycle_stage, 0)
        
        # Vendor risk (0-20 points)
        if self.vendor_source == 'third_party':
            score += 15
        elif self.vendor_source == 'open_source':
            score += 10
        elif self.vendor_source == 'internal':
            score += 5
        
        # Control coverage reduces risk (0-50 points reduction)
        control_reduction = len(self.control_coverage) * 10
        score = max(score - control_reduction, 0)
        
        return min(score, 100)
    
    def determine_risk_tier(self):
        """
        Determine risk tier based on risk score.
        Aligned with RiskScenario.priority levels.
        """
        score = self.risk_score or self.calculate_risk_score()
        
        if score >= 75:
            return 'critical'
        elif score >= 50:
            return 'high'
        elif score >= 25:
            return 'medium'
        else:
            return 'low'
    
    def save(self, *args, **kwargs):
        # Auto-calculate risk scores
        self.inherent_risk_score = self.calculate_risk_score()
        self.residual_risk_score = self.inherent_risk_score  # Can be adjusted with controls
        self.risk_score = self.residual_risk_score
        self.risk_tier = self.determine_risk_tier()
        
        super().save(*args, **kwargs)


# ===== SUPPORTING MODELS =====

class AssetEvidence(models.Model):
    """
    Evidence links for AI assets (DPIAs, assessments, approvals).
    Aligned with ControlAssessment evidence tracking.
    """
    asset = models.ForeignKey('AIAsset', related_name='evidence', on_delete=models.CASCADE)
    evidence_type = models.CharField(max_length=50, choices=[
        ('dpia', 'Data Protection Impact Assessment'),
        ('risk_assessment', 'Risk Assessment'),
        ('approval', 'Approval Document'),
        ('audit_report', 'Audit Report'),
        ('test_results', 'Test Results'),
        ('other', 'Other')
    ])
    title = models.CharField(max_length=255)
    file_url = models.URLField(blank=True)
    uploaded_file = models.FileField(upload_to='asset_evidence/', blank=True)
    uploaded_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'visibility_assetevidence'
        ordering = ['-uploaded_at']


class AssetNote(models.Model):
    """
    Notes and comments for AI assets.
    Aligned with ActionPlan.notes pattern.
    """
    asset = models.ForeignKey('AIAsset', related_name='notes', on_delete=models.CASCADE)
    note = models.TextField()
    created_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'visibility_assetnote'
        ordering = ['-created_at']


class AssetIntegration(models.Model):
    """
    Integration sync status for AI assets.
    Tracks AAD, Zscaler, EDR sync status.
    """
    asset = models.ForeignKey('AIAsset', related_name='integrations', on_delete=models.CASCADE)
    integration_type = models.CharField(max_length=50, choices=[
        ('aad', 'Azure Active Directory'),
        ('zscaler', 'Zscaler'),
        ('edr', 'EDR'),
        ('casb', 'CASB')
    ])
    last_sync = models.DateTimeField(null=True, blank=True)
    sync_status = models.CharField(max_length=20, choices=[
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('pending', 'Pending')
    ])
    sync_details = models.JSONField(default=dict, blank=True)
    
    class Meta:
        db_table = 'visibility_assetintegration'
        unique_together = ['asset', 'integration_type']
```

---

## 🔗 Cross-Module Relationships

### 1. **Assets → Risk Register**
```python
# Link assets to risks
asset.related_risks.add(risk_scenario)

# Query risks for an asset
risks = asset.related_risks.filter(status='Mitigating')

# Query assets affected by a risk
assets = risk_scenario.affected_assets.all()
```

### 2. **Assets → AI Assurance Plan**
```python
# Link assets to controls
asset.related_controls.add(control)

# Query controls for an asset
controls = asset.related_controls.filter(implementation_status='Partial')

# Query assets requiring a control
assets = control.applicable_assets.all()
```

### 3. **Assets → Compliance Readiness**
```python
# Link assets to compliance assessments
asset.compliance_assessments.add(compliance_readiness)

# Query compliance status for an asset
assessments = asset.compliance_assessments.filter(framework='NIST AI RMF')

# Query assets in a compliance assessment
assets = compliance_readiness.assessed_assets.all()
```

---

## 📋 Aligned Field Mapping

### List View (12 columns)

| Column | Field | Type | Aligned With |
|--------|-------|------|--------------|
| Asset Name | `name` | string | RiskScenario.name |
| Type | `asset_type` | enum | N/A (unique to assets) |
| Vendor | `vendor_name` | string | N/A |
| Status | `status` | enum | RiskScenario.status, ControlAssessment.status |
| Owner | `owner` | FK User | RiskScenario.owner, ControlAssessment.owner |
| Technical Owner | `technical_owner` | FK User | N/A |
| Risk Tier | `risk_tier` | enum | RiskScenario.priority |
| Risk Score | `risk_score` | decimal (0-100) | ControlAssessment.priority_score |
| Regulatory | `regulatory_applicability` | JSON | ComplianceReadiness.framework |
| Lifecycle | `lifecycle_stage` | enum | N/A |
| Personal Data | `personal_data_used` | boolean | N/A |
| Actions | N/A | N/A | N/A |

### Detail View (5 tabs, 47 fields)

**Tab 1: Overview** (18 fields)
- Identity: name, asset_type, vendor_source, vendor_name
- Ownership: owner, technical_owner, owning_org_unit, status
- Business: use_case, description, intended_users
- Risk: risk_tier, risk_score, inherent_risk_score, residual_risk_score
- Compliance: regulatory_applicability, control_coverage
- Lifecycle: lifecycle_stage, deployment_platform
- Data: personal_data_used, sensitive_categories

**Tab 2: Business & Lifecycle** (8 fields)
- projected_value, first_deployment_date, environment, related_risks, related_controls, service_principal_id, aad_permissions, user_assignments

**Tab 3: Data & Model** (5 fields)
- model_provider, model_version, inputs (future), outputs (future), safety evaluations (future)

**Tab 4: Access & Security** (4 fields)
- aad_permissions, user_assignments, network_destinations, integration sync status

**Tab 5: Compliance & Evidence** (2 fields)
- control_coverage, evidence (AssetEvidence model)

**Activity Timeline** (bottom)
- Audit log from `created_at`, `updated_at`, notes

---

## ✅ Alignment Summary

### Terminology Consistency:
✅ `owner` (not business_owner) - aligned with RiskScenario, ControlAssessment  
✅ `status` enum - aligned with RiskScenario, ControlAssessment  
✅ `risk_tier` (Low/Medium/High/Critical) - aligned with RiskScenario.priority  
✅ `risk_score` (0-100) - aligned with ControlAssessment.priority_score  
✅ `description` - aligned with RiskScenario.description  
✅ `tenant` FK - aligned with all modules  
✅ `created_at`, `updated_at` - aligned with all modules  

### Cross-Module Integration:
✅ `related_risks` → RiskScenario  
✅ `related_controls` → Control (AI Assurance Plan)  
✅ `compliance_assessments` → ComplianceReadiness  

### Risk Scoring Methodology:
✅ 0-100 scale (like ControlAssessment.priority_score)  
✅ Inherent + Residual scores (like AI Assurance Plan)  
✅ Auto-calculated on save  
✅ Control coverage reduces risk  

---

## 🎯 Benefits of Alignment

1. **Consistent User Experience**: Same terminology across all modules
2. **Easier Development**: Reuse patterns and components
3. **Better Integration**: Natural relationships between modules
4. **Simpler Training**: Users learn once, apply everywhere
5. **Unified Reporting**: Cross-module reports use same fields

---

**Next Step**: Update PRD.md with this aligned data model?
