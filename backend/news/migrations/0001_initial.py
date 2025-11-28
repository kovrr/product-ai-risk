# Generated migration for news app

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NewsArticle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500)),
                ('summary', models.TextField(blank=True, null=True)),
                ('url', models.URLField(max_length=1000, unique=True)),
                ('source', models.CharField(max_length=100)),
                ('source_url', models.URLField(blank=True, max_length=500, null=True)),
                ('framework', models.CharField(blank=True, max_length=100, null=True)),
                ('article_type', models.CharField(blank=True, choices=[('regulation', 'Regulation'), ('framework', 'Framework'), ('standard', 'Standard'), ('guidance', 'Guidance')], max_length=50, null=True)),
                ('published_at', models.DateTimeField()),
                ('fetched_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['-published_at'],
                'indexes': [
                    models.Index(fields=['-published_at'], name='news_newsar_publish_idx'),
                    models.Index(fields=['is_active'], name='news_newsar_is_acti_idx'),
                ],
            },
        ),
    ]
