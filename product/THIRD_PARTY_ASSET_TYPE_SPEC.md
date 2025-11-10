# Third-Party Asset Type - Product Specification
**Feature**: Add "3rd Party" asset type with vendor risk capabilities  
**Date**: November 9, 2025  
**Version**: 1.0  
**Priority**: High  
**Effort**: 2-3 weeks

---

## Executive Summary

Add "3rd Party" as a new asset type to distinguish vendor-provided AI tools, enabling basic TPRM capabilities without building a full separate module.

**Business Value**:
- Addresses TPRM marketing gap with minimal development
- Natural way to track vendor-provided AI tools
- Enables vendor risk filtering and reporting
- Foundation for future full TPRM if needed

---

## 1. Core Requirements

### 1.1 New Asset Type

Add to existing asset types:
```javascript
'3rd-party': '🏢 3rd Party / Vendor Provided'
```

### 1.2 Enhanced Vendor Fields (3rd Party Only)

When `assetType === '3rd-party'`, collect additional fields:

**Contact & Relationship**:
- Vendor Contact Email
- Vendor Contact Phone
- Account Manager

**Risk & Compliance**:
- Vendor Risk Level (Low/Moderate/High/Critical/Not Assessed)
- Vendor Certifications (SOC2, ISO27001, HIPAA, etc.)

**Contract Management**:
- Contract Status (Active/Expiring Soon/Expired/Under Negotiation/None)
- Contract Start Date
- Contract End Date
- Contract Value
- Auto-Renewal (Yes/No)
- Notice Period (days)

**SLA & Support**:
- SLA Uptime (e.g., "99.9%")
- Support Tier (Basic/Standard/Premium/Enterprise)
- Support Response Time

**Assessment & Monitoring**:
- Last Vendor Assessment Date
- Next Vendor Assessment Date
- Assessment Frequency (Quarterly/Semi-Annual/Annual)

**Incidents**:
- Vendor Incident Count
- Last Incident Date
- Last Incident Severity

---

## 2. UI Changes

### 2.1 Asset Creation Form

**Show conditional section** when user selects "3rd Party" asset type:

```
┌─────────────────────────────────────────────┐
│ Asset Type: [3rd Party / Vendor Provided ▼]│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🏢 Third-Party Vendor Details              │
│                                             │
│ Vendor Contact Email: [________________]    │
│ Account Manager:      [________________]    │
│                                             │
│ Vendor Certifications:                      │
│ ☑ SOC2 Type 2  ☑ ISO 27001  ☐ HIPAA       │
│                                             │
│ Contract Status: [Active ▼]                │
│ Contract End Date: [2025-12-31]            │
│ Auto-Renewal: [Yes ▼]                      │
│                                             │
│ Vendor Risk Level:                          │
│ ○ Low  ○ Moderate  ● High  ○ Critical      │
└─────────────────────────────────────────────┘
```

### 2.2 Asset List - Filtering

Add filter options:
- **Asset Type**: "3rd Party Only" checkbox
- **Vendor Risk**: Low/Moderate/High/Critical (when 3rd party filter active)
- **Contract Status**: Active/Expiring/Expired (when 3rd party filter active)
- **Certifications**: SOC2/ISO/HIPAA (when 3rd party filter active)

### 2.3 Asset Detail Page - New Tab

Add **"Vendor Risk"** tab (visible only for 3rd party assets):

**Tab Content**:
1. Vendor Overview Card (name, contact, risk level)
2. Certifications Card (badges for each certification)
3. Contract Card (dates, value, status, expiration warning)
4. SLA & Support Card (uptime, tier, response time)
5. Incidents Card (if any incidents exist)
6. Actions: "Run Vendor Assessment", "View Contract", "See All Assets from Vendor"

### 2.4 Dashboard

Add new card: **"3rd Party Assets"**
- Total 3rd party count
- High risk vendor count
- Expiring contracts count
- Not assessed count

---

## 3. Data Model

### 3.1 Asset Schema Enhancement

```javascript
{
  assetType: {
    type: String,
    enum: ['saas', 'open-source', 'custom', 'tool', 'web-service', 'model', '3rd-party', 'other']
  },
  
  vendorDetails: {
    vendorContactEmail: String,
    accountManager: String,
    vendorRiskLevel: {
      type: String,
      enum: ['Low', 'Moderate', 'High', 'Critical', 'Not Assessed'],
      default: 'Not Assessed'
    },
    vendorCertifications: [String],
    contractStatus: String,
    contractStartDate: Date,
    contractEndDate: Date,
    contractValue: Number,
    autoRenewal: Boolean,
    noticePeriodDays: Number,
    slaUptime: String,
    supportTier: String,
    lastVendorAssessment: Date,
    vendorIncidentCount: Number,
    lastIncidentDate: Date
  }
}
```

---

## 4. Business Logic

### 4.1 Automated Contract Status Updates

**Daily background job**:
- Check all 3rd party assets
- Update contract status based on end date:
  - Expired: End date < today
  - Expiring Soon: End date < 90 days
  - Active: End date >= 90 days

### 4.2 Contract Expiration Alerts

**Alert schedule**:
- 90 days before: Email to asset owner
- 60 days before: Email + in-app notification
- 30 days before: Email + in-app + dashboard alert
- 7 days before: Urgent email + dashboard alert

---

## 5. API Endpoints

```
GET  /api/assets?type=3rd-party
GET  /api/assets/3rd-party/stats
GET  /api/assets/3rd-party/expiring?days=90
GET  /api/vendors/summary
POST /api/assets/:id/vendor-assessment
PUT  /api/assets/:id/vendor-details
```

---

## 6. Migration Strategy

**Recommended**: Auto-detect with admin review

1. Identify assets likely to be 3rd party:
   - Has vendor name (not "Internal", "Custom", "Open Source")
   - Asset type is 'saas', 'tool', or 'web-service'

2. Flag these assets for review

3. Admin reviews and approves/rejects

4. Batch update approved assets to '3rd-party' type

---

## 7. Success Metrics

- % of assets classified as 3rd party
- % of 3rd party assets with complete vendor details
- Number of contracts tracked
- Number of expiration alerts sent
- Number of vendor assessments completed

---

## 8. Future Phases

**Phase 2 (Q2 2026)**:
- Vendor assessment questionnaire
- Contract document upload
- SLA monitoring

**Phase 3 (Q3 2026)**:
- Supply chain visualization
- Vendor performance tracking
- Vendor comparison tool

**Phase 4 (Q4 2026)**:
- Full TPRM module (if demand exists)
- Vendor portal
- Automated vendor discovery

---

## 9. Comparison: 3rd Party Type vs Full TPRM

| Feature | 3rd Party Type | Full TPRM |
|---------|---------------|-----------|
| **Effort** | 2-3 weeks | 3-4 months |
| **Vendor Tracking** | ✅ Basic | ✅ Advanced |
| **Contract Management** | ✅ Yes | ✅ Yes + Docs |
| **Risk Assessment** | ✅ Manual | ✅ Automated |
| **Supply Chain** | ❌ No | ✅ Yes |
| **Vendor Portal** | ❌ No | ✅ Yes |
| **Marketing Accuracy** | 🟡 Partial | ✅ Full |

---

## 10. Recommendation

✅ **STRONGLY RECOMMEND** implementing 3rd Party asset type

**Why**:
1. **Quick win**: 2-3 weeks vs 3-4 months for full TPRM
2. **Addresses gap**: Closes TPRM marketing gap partially
3. **Natural UX**: Fits within existing asset management flow
4. **Scalable**: Can evolve to full TPRM later if needed
5. **Low risk**: Doesn't require separate module or major refactor

**Marketing Update**:
- Before: "Full TPRM module"
- After: "Vendor risk visibility integrated into asset management"

---

**Document Owner**: Product Management  
**Reviewers**: Engineering, UX, Marketing  
**Status**: Ready for Review
