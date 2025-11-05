# Database Update Instructions

**Date**: November 5, 2025  
**Version**: v2.0

## Files Created

1. **`aikovrr_schema_v2.sql`** - Updated schema with new Assets Visibility fields
2. **`aikovrr_data_v2.sql`** - Will be created with 50 assets (file too large for single generation)

## What Changed in Schema

### Enhanced `visibility_ai_asset` Table

**New Fields Added**:
- `asset_type` (model/app/agent/dataset/service) - replaces `category`
- `owner_id` - FK to core_user (business owner)
- `technical_owner_id` - FK to core_user
- `owning_org_unit`
- `vendor_source` (internal/third_party/open_source)
- `vendor_name` - replaces `vendor`
- `status` updated values (sanctioned/shadow/under_review/blocked/retired)
- `use_case`
- `description` (enhanced)
- `intended_users` (JSONB array)
- `projected_value`
- `lifecycle_stage`
- `deployment_platform`
- `environment` (JSONB array)
- `risk_tier` (low/medium/high/critical)
- `risk_score` (0-100)
- `inherent_risk_score` (0-100)
- `residual_risk_score` (0-100)
- `personal_data_used` (boolean)
- `sensitive_categories` (JSONB array)
- `regulatory_applicability` (JSONB array)
- `control_coverage` (JSONB array)
- `model_provider`
- `model_version`
- `service_principal_id`
- `aad_permissions` (JSONB)
- `user_assignments` (JSONB)
- `network_destinations` (JSONB)
- `first_deployment_date`

### New Tables Created

1. **`asset_evidence`** - Evidence files for assets
2. **`asset_note`** - Notes for assets
3. **`asset_integration`** - Integration sync status
4. **`asset_risk_link`** - Assets ↔ Risks (M2M)
5. **`asset_control_link`** - Assets ↔ Controls (M2M)
6. **`asset_compliance_link`** - Assets ↔ Compliance (M2M)

### New Indexes

- `idx_ai_asset_type`
- `idx_ai_asset_vendor_source`
- `idx_ai_asset_risk_tier`
- `idx_ai_asset_lifecycle`
- `idx_ai_asset_owner`
- `idx_ai_asset_tech_owner`
- Plus indexes for all new tables

## How to Apply Updates

### Step 1: Backup Current Database

```bash
pg_dump aikovrr > aikovrr_backup_$(date +%Y%m%d).sql
```

### Step 2: Drop and Recreate

```bash
# Drop database
dropdb aikovrr

# Create fresh database
createdb aikovrr

# Import new schema
psql -d aikovrr -f aikovrr_schema_v2.sql
```

### Step 3: Import Data

I'll create the data file in chunks. For now, you can:

1. Use the new schema file: `aikovrr_schema_v2.sql`
2. I'll create a smaller data file with the essential 50 assets

## Summary of Changes

- ✅ Schema updated with 30+ new fields
- ✅ 3 new supporting tables (evidence, notes, integration)
- ✅ 3 new link tables (asset-risk, asset-control, asset-compliance)
- ✅ Enhanced indexes for performance
- ✅ Backward compatible (old fields kept)
- ⏳ Data file to be created (50 assets with cross-references)

## Next Steps

1. Review `aikovrr_schema_v2.sql`
2. Test schema creation
3. I'll create data file in smaller chunks
4. Verify all relationships work

**Ready to proceed with schema update!**
