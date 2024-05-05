# Generated by Django 5.0.4 on 2024-05-05 13:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='plan',
            name='features',
        ),
        migrations.AlterField(
            model_name='plan',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.CreateModel(
            name='BotResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('history_context', models.TextField()),
                ('content', models.TextField()),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.conversation')),
            ],
        ),
        migrations.CreateModel(
            name='Developer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=255)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.plan')),
            ],
        ),
        migrations.AddField(
            model_name='conversation',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.developer'),
        ),
        migrations.CreateModel(
            name='DeveloperPrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.conversation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.developer')),
            ],
        ),
        migrations.CreateModel(
            name='Enterprise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('system_ai', models.TextField()),
                ('admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.developer')),
            ],
        ),
        migrations.CreateModel(
            name='EnterpriseDeveloper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enterprise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.enterprise')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.developer')),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chatbot', models.BooleanField()),
                ('navigation', models.BooleanField()),
                ('ai_talk', models.BooleanField()),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.plan')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('path', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.developer')),
            ],
        ),
        migrations.AddField(
            model_name='conversation',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.project'),
        ),
    ]
