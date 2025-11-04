from django.db import models
from core.models import Tenant, User


class Category(models.Model):
    """Risk category and subcategory."""
    
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategories')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'risk_category'
        managed = False
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name


class Framework(models.Model):
    """Compliance framework."""
    
    name = models.CharField(max_length=255)
    version = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'risk_framework'
        managed = False
    
    def __str__(self):
        return f"{self.name} {self.version}" if self.version else self.name


class Control(models.Model):
    """Framework control."""
    
    framework = models.ForeignKey(Framework, on_delete=models.CASCADE, related_name='controls')
    control_id = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    maturity_level = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'risk_control'
        managed = False
    
    def __str__(self):
        return f"{self.framework.name} - {self.control_id}"


class RiskScenario(models.Model):
    """AI risk scenario."""
    
    LIKELIHOOD_CHOICES = [
        ('Rare', 'Rare'),
        ('Unlikely', 'Unlikely'),
        ('Possible', 'Possible'),
        ('Likely', 'Likely'),
        ('Almost Certain', 'Almost Certain'),
    ]
    
    IMPACT_CHOICES = [
        ('Negligible', 'Negligible'),
        ('Minor', 'Minor'),
        ('Moderate', 'Moderate'),
        ('Major', 'Major'),
        ('Severe', 'Severe'),
    ]
    
    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
        ('Critical', 'Critical'),
    ]
    
    STATUS_CHOICES = [
        ('Identified', 'Identified'),
        ('Analyzing', 'Analyzing'),
        ('Mitigating', 'Mitigating'),
        ('Monitoring', 'Monitoring'),
        ('Closed', 'Closed'),
    ]
    
    RESPONSE_PLAN_CHOICES = [
        ('Mitigate', 'Mitigate'),
        ('Accept', 'Accept'),
        ('Avoid', 'Avoid'),
        ('Transfer', 'Transfer'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='risk_scenarios')
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='owned_scenarios')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    likelihood = models.CharField(max_length=50, choices=LIKELIHOOD_CHOICES, blank=True)
    impact = models.CharField(max_length=50, choices=IMPACT_CHOICES, blank=True)
    priority = models.CharField(max_length=50, choices=PRIORITY_CHOICES, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Identified')
    response_plan = models.CharField(max_length=50, choices=RESPONSE_PLAN_CHOICES, blank=True)
    annual_likelihood = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    peer_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    financial_loss_min = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    financial_loss_max = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    pii_exposure = models.IntegerField(default=0)
    pci_exposure = models.IntegerField(default=0)
    phi_exposure = models.IntegerField(default=0)
    review_date = models.DateField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    mitigation_cost = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    ticket_link = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'risk_scenario'
        managed = False
    
    def __str__(self):
        return self.name


class ScenarioCategory(models.Model):
    """Many-to-many relationship between scenarios and categories."""
    
    scenario = models.ForeignKey(RiskScenario, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'risk_scenario_categories'
        managed = False
        unique_together = ['scenario', 'category']


class ScenarioControl(models.Model):
    """Control mapping to risk scenarios."""
    
    COMPLIANCE_STATUS_CHOICES = [
        ('Compliant', 'Compliant'),
        ('Partial', 'Partial'),
        ('Non-Compliant', 'Non-Compliant'),
        ('Not Applicable', 'Not Applicable'),
    ]
    
    scenario = models.ForeignKey(RiskScenario, on_delete=models.CASCADE, related_name='scenario_controls')
    control = models.ForeignKey(Control, on_delete=models.CASCADE, related_name='scenario_controls')
    compliance_status = models.CharField(max_length=50, choices=COMPLIANCE_STATUS_CHOICES, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'risk_scenario_control'
        managed = False
        unique_together = ['scenario', 'control']
    
    def __str__(self):
        return f"{self.scenario.name} - {self.control.control_id}"


class Note(models.Model):
    """Notes/comments on risk scenarios."""
    
    scenario = models.ForeignKey(RiskScenario, on_delete=models.CASCADE, related_name='notes')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='risk_notes')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'risk_note'
        managed = False
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Note by {self.author.name} on {self.scenario.name}"
