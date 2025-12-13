#!/usr/bin/env python3
"""
Unified AI Asset Detection Script
Combines detection of:
1. Standalone AI services (ChatGPT, Claude, etc.)
2. Embedded AI features (Copilot in Office, Teams AI, etc.)
3. Shadow AI risk assessment with clear rules
"""

import pandas as pd
import sys
from datetime import datetime

# ============================================================================
# UNIFIED AI ASSET CATALOG
# ============================================================================

AI_ASSET_CATALOG = {
    # ========================================================================
    # MAJOR LLM PROVIDERS & CHATBOTS (20+)
    # ========================================================================
    'ChatGPT': {
        'vendor': 'OpenAI',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['openai.com', 'chatgpt.com', 'chat.openai'],
        'dspm_patterns': ['chatgpt', 'openai', 'chat gpt'],
        'data_sovereignty_risk': False
    },
    'Anthropic Claude': {
        'vendor': 'Anthropic',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['anthropic.com', 'claude.ai'],
        'dspm_patterns': ['claude', 'anthropic'],
        'data_sovereignty_risk': False
    },
    'Google Gemini': {
        'vendor': 'Google',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['gemini.google.com', 'bard.google.com', 'ai.google.dev'],
        'dspm_patterns': ['gemini', 'bard', 'google ai'],
        'data_sovereignty_risk': False
    },
    'Perplexity AI': {
        'vendor': 'Perplexity',
        'category': 'Search AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['perplexity.ai'],
        'dspm_patterns': ['perplexity'],
        'data_sovereignty_risk': False
    },
    'Cohere': {
        'vendor': 'Cohere',
        'category': 'LLM API',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['cohere.ai', 'cohere.com', 'api.cohere'],
        'dspm_patterns': ['cohere'],
        'data_sovereignty_risk': False
    },
    'AI21 Labs': {
        'vendor': 'AI21 Labs',
        'category': 'LLM API',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['ai21.com', 'studio.ai21.com', 'api.ai21.com'],
        'dspm_patterns': ['ai21'],
        'data_sovereignty_risk': False
    },
    'Mistral AI': {
        'vendor': 'Mistral AI',
        'category': 'LLM Provider',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['mistral.ai', 'chat.mistral.ai', 'api.mistral.ai'],
        'dspm_patterns': ['mistral'],
        'data_sovereignty_risk': False
    },
    'Inflection Pi': {
        'vendor': 'Inflection AI',
        'category': 'Personal AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['pi.ai', 'inflection.ai'],
        'dspm_patterns': ['pi ai', 'inflection'],
        'data_sovereignty_risk': False
    },
    'Character.AI': {
        'vendor': 'Character.AI',
        'category': 'Conversational AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['character.ai', 'beta.character.ai'],
        'dspm_patterns': ['character ai'],
        'data_sovereignty_risk': False
    },
    'Poe': {
        'vendor': 'Quora',
        'category': 'AI Aggregator',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['poe.com'],
        'dspm_patterns': ['poe'],
        'data_sovereignty_risk': False
    },
    'You.com': {
        'vendor': 'You.com',
        'category': 'AI Search',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['you.com'],
        'dspm_patterns': ['you.com'],
        'data_sovereignty_risk': False
    },
    'Phind': {
        'vendor': 'Phind',
        'category': 'Developer AI Search',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['phind.com'],
        'dspm_patterns': ['phind'],
        'data_sovereignty_risk': False
    },
    'Andi': {
        'vendor': 'Andi',
        'category': 'AI Search',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['andisearch.com'],
        'dspm_patterns': ['andi'],
        'data_sovereignty_risk': False
    },
    'Doubao': {
        'vendor': 'ByteDance',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['doubao.com'],
        'dspm_patterns': ['doubao'],
        'data_sovereignty_risk': True
    },
    'Baidu Ernie': {
        'vendor': 'Baidu',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['yiyan.baidu.com', 'ernie.baidu.com'],
        'dspm_patterns': ['ernie', 'baidu ai'],
        'data_sovereignty_risk': True
    },
    'Alibaba Tongyi': {
        'vendor': 'Alibaba',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['tongyi.aliyun.com', 'qianwen.aliyun.com'],
        'dspm_patterns': ['tongyi', 'qianwen'],
        'data_sovereignty_risk': True
    },
    
    # ========================================================================
    # AI CODING ASSISTANTS (25+)
    # ========================================================================
    'GitHub Copilot': {
        'vendor': 'GitHub/Microsoft',
        'category': 'Code Generation AI',
        'asset_type': 'embedded',
        'parent_app': 'GitHub',
        'risk_level': 'HIGH',
        'approved': True,
        'url_patterns': [
            'githubcopilot.com',
            'copilot.github.com',
            'api.githubcopilot.com',
            'telemetry.githubcopilot.com',
            'api.business.githubcopilot.com',
            'telemetry.business.githubcopilot.com'
        ],
        'dspm_patterns': ['github copilot'],
        'data_sovereignty_risk': False
    },
    'Tabnine': {
        'vendor': 'Tabnine',
        'category': 'Code Completion AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['tabnine.com', 'api.tabnine.com'],
        'dspm_patterns': ['tabnine'],
        'data_sovereignty_risk': False
    },
    'Codeium': {
        'vendor': 'Codeium',
        'category': 'Code Completion AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['codeium.com', 'api.codeium.com'],
        'dspm_patterns': ['codeium'],
        'data_sovereignty_risk': False
    },
    'Amazon CodeWhisperer': {
        'vendor': 'Amazon',
        'category': 'Code Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['codewhisperer.aws', 'aws.amazon.com/codewhisperer'],
        'dspm_patterns': ['codewhisperer'],
        'data_sovereignty_risk': False
    },
    'Replit AI': {
        'vendor': 'Replit',
        'category': 'Code Generation AI',
        'asset_type': 'embedded',
        'parent_app': 'Replit',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['replit.com', 'api.replit.com'],
        'dspm_patterns': ['replit ai'],
        'data_sovereignty_risk': False
    },
    'Cursor': {
        'vendor': 'Cursor',
        'category': 'AI Code Editor',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['cursor.sh', 'cursor.com', 'api.cursor.sh'],
        'dspm_patterns': ['cursor'],
        'data_sovereignty_risk': False
    },
    'Sourcegraph Cody': {
        'vendor': 'Sourcegraph',
        'category': 'Code AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['sourcegraph.com/cody', 'cody.sourcegraph.com'],
        'dspm_patterns': ['cody', 'sourcegraph'],
        'data_sovereignty_risk': False
    },
    'Mutable AI': {
        'vendor': 'Mutable',
        'category': 'Code Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['mutable.ai'],
        'dspm_patterns': ['mutable'],
        'data_sovereignty_risk': False
    },
    'Codex': {
        'vendor': 'OpenAI',
        'category': 'Code Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['api.openai.com/v1/engines/code'],
        'dspm_patterns': ['codex'],
        'data_sovereignty_risk': False
    },
    'Lovable': {
        'vendor': 'Lovable',
        'category': 'Code Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['lovable.dev'],
        'dspm_patterns': ['lovable'],
        'data_sovereignty_risk': False
    },
    'v0.dev': {
        'vendor': 'Vercel',
        'category': 'UI Code Generation',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['v0.dev'],
        'dspm_patterns': ['v0'],
        'data_sovereignty_risk': False
    },
    'Bolt.new': {
        'vendor': 'StackBlitz',
        'category': 'Code Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['bolt.new'],
        'dspm_patterns': ['bolt'],
        'data_sovereignty_risk': False
    },
    'Windsurf': {
        'vendor': 'Codeium',
        'category': 'AI Code Editor',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['windsurf.ai', 'codeium.com/windsurf'],
        'dspm_patterns': ['windsurf'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # AI WRITING & CONTENT TOOLS (30+)
    # ========================================================================
    'Jasper AI': {
        'vendor': 'Jasper',
        'category': 'AI Writing',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['jasper.ai', 'app.jasper.ai'],
        'dspm_patterns': ['jasper'],
        'data_sovereignty_risk': False
    },
    'Copy.ai': {
        'vendor': 'Copy.ai',
        'category': 'AI Writing',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['copy.ai', 'app.copy.ai'],
        'dspm_patterns': ['copy.ai'],
        'data_sovereignty_risk': False
    },
    'Writesonic': {
        'vendor': 'Writesonic',
        'category': 'AI Writing',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['writesonic.com', 'app.writesonic.com'],
        'dspm_patterns': ['writesonic'],
        'data_sovereignty_risk': False
    },
    'Rytr': {
        'vendor': 'Rytr',
        'category': 'AI Writing',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['rytr.me'],
        'dspm_patterns': ['rytr'],
        'data_sovereignty_risk': False
    },
    'QuillBot': {
        'vendor': 'QuillBot',
        'category': 'AI Paraphrasing',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['quillbot.com'],
        'dspm_patterns': ['quillbot'],
        'data_sovereignty_risk': False
    },
    'Wordtune': {
        'vendor': 'AI21 Labs',
        'category': 'AI Writing Assistant',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['wordtune.com'],
        'dspm_patterns': ['wordtune'],
        'data_sovereignty_risk': False
    },
    'Sudowrite': {
        'vendor': 'Sudowrite',
        'category': 'AI Creative Writing',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['sudowrite.com'],
        'dspm_patterns': ['sudowrite'],
        'data_sovereignty_risk': False
    },
    'Shortly AI': {
        'vendor': 'Shortly',
        'category': 'AI Writing',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['shortlyai.com'],
        'dspm_patterns': ['shortly'],
        'data_sovereignty_risk': False
    },
    'Anyword': {
        'vendor': 'Anyword',
        'category': 'AI Copywriting',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['anyword.com'],
        'dspm_patterns': ['anyword'],
        'data_sovereignty_risk': False
    },
    'Hypotenuse AI': {
        'vendor': 'Hypotenuse',
        'category': 'AI Content',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['hypotenuse.ai'],
        'dspm_patterns': ['hypotenuse'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # AI IMAGE & VIDEO GENERATION (35+)
    # ========================================================================
    'DALL-E': {
        'vendor': 'OpenAI',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['labs.openai.com', 'openai.com/dall-e'],
        'dspm_patterns': ['dall-e', 'dalle'],
        'data_sovereignty_risk': False
    },
    'Midjourney': {
        'vendor': 'Midjourney',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['midjourney.com', 'discord.com/channels/midjourney'],
        'dspm_patterns': ['midjourney'],
        'data_sovereignty_risk': False
    },
    'Stable Diffusion': {
        'vendor': 'Stability AI',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['stability.ai', 'stablediffusionweb.com', 'dreamstudio.ai'],
        'dspm_patterns': ['stable diffusion', 'stability ai'],
        'data_sovereignty_risk': False
    },
    'Leonardo.ai': {
        'vendor': 'Leonardo',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['leonardo.ai', 'app.leonardo.ai'],
        'dspm_patterns': ['leonardo'],
        'data_sovereignty_risk': False
    },
    'Runway': {
        'vendor': 'Runway',
        'category': 'Video Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['runwayml.com', 'app.runwayml.com'],
        'dspm_patterns': ['runway'],
        'data_sovereignty_risk': False
    },
    'Synthesia': {
        'vendor': 'Synthesia',
        'category': 'AI Video',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['synthesia.io', 'app.synthesia.io'],
        'dspm_patterns': ['synthesia'],
        'data_sovereignty_risk': False
    },
    'D-ID': {
        'vendor': 'D-ID',
        'category': 'AI Video',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['d-id.com', 'studio.d-id.com'],
        'dspm_patterns': ['d-id'],
        'data_sovereignty_risk': False
    },
    'Pictory': {
        'vendor': 'Pictory',
        'category': 'AI Video',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['pictory.ai', 'app.pictory.ai'],
        'dspm_patterns': ['pictory'],
        'data_sovereignty_risk': False
    },
    'Descript': {
        'vendor': 'Descript',
        'category': 'AI Video/Audio Editing',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['descript.com', 'app.descript.com'],
        'dspm_patterns': ['descript'],
        'data_sovereignty_risk': False
    },
    'Canva AI': {
        'vendor': 'Canva',
        'category': 'Design AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['canva.com'],
        'dspm_patterns': ['canva'],
        'data_sovereignty_risk': False
    },
    'Craiyon': {
        'vendor': 'Craiyon',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['craiyon.com'],
        'dspm_patterns': ['craiyon'],
        'data_sovereignty_risk': False
    },
    'Artbreeder': {
        'vendor': 'Artbreeder',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['artbreeder.com'],
        'dspm_patterns': ['artbreeder'],
        'data_sovereignty_risk': False
    },
    'Playground AI': {
        'vendor': 'Playground',
        'category': 'Image Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['playgroundai.com'],
        'dspm_patterns': ['playground'],
        'data_sovereignty_risk': False
    },
    'Pika Labs': {
        'vendor': 'Pika',
        'category': 'Video Generation AI',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['pika.art'],
        'dspm_patterns': ['pika'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # AI VOICE & AUDIO (15+)
    # ========================================================================
    'ElevenLabs': {
        'vendor': 'ElevenLabs',
        'category': 'AI Voice',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['elevenlabs.io', 'api.elevenlabs.io'],
        'dspm_patterns': ['elevenlabs'],
        'data_sovereignty_risk': False
    },
    'Murf AI': {
        'vendor': 'Murf',
        'category': 'AI Voice',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['murf.ai', 'app.murf.ai'],
        'dspm_patterns': ['murf'],
        'data_sovereignty_risk': False
    },
    'Resemble AI': {
        'vendor': 'Resemble',
        'category': 'AI Voice Cloning',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['resemble.ai', 'app.resemble.ai'],
        'dspm_patterns': ['resemble'],
        'data_sovereignty_risk': False
    },
    'Play.ht': {
        'vendor': 'Play.ht',
        'category': 'AI Voice',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['play.ht'],
        'dspm_patterns': ['play.ht'],
        'data_sovereignty_risk': False
    },
    'Otter.ai': {
        'vendor': 'Otter.ai',
        'category': 'AI Transcription',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['otter.ai'],
        'dspm_patterns': ['otter'],
        'data_sovereignty_risk': False
    },
    'Assembly AI': {
        'vendor': 'AssemblyAI',
        'category': 'AI Transcription',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['assemblyai.com', 'api.assemblyai.com'],
        'dspm_patterns': ['assemblyai'],
        'data_sovereignty_risk': False
    },
    'Speechify': {
        'vendor': 'Speechify',
        'category': 'Text-to-Speech AI',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['speechify.com'],
        'dspm_patterns': ['speechify'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # AI PRODUCTIVITY & COLLABORATION (25+)
    # ========================================================================
    'Notion AI': {
        'vendor': 'Notion',
        'category': 'Productivity AI',
        'asset_type': 'embedded',
        'parent_app': 'Notion',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['notion.so/api/ai', 'api.notion.com/ai', 'notion.ai'],
        'dspm_patterns': ['notion ai'],
        'data_sovereignty_risk': False
    },
    'Mem': {
        'vendor': 'Mem',
        'category': 'AI Note-taking',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['mem.ai', 'get.mem.ai'],
        'dspm_patterns': ['mem'],
        'data_sovereignty_risk': False
    },
    'Reflect': {
        'vendor': 'Reflect',
        'category': 'AI Note-taking',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['reflect.app'],
        'dspm_patterns': ['reflect'],
        'data_sovereignty_risk': False
    },
    'Taskade': {
        'vendor': 'Taskade',
        'category': 'AI Productivity',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['taskade.com'],
        'dspm_patterns': ['taskade'],
        'data_sovereignty_risk': False
    },
    'Motion': {
        'vendor': 'Motion',
        'category': 'AI Calendar',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['usemotion.com'],
        'dspm_patterns': ['motion'],
        'data_sovereignty_risk': False
    },
    'Reclaim AI': {
        'vendor': 'Reclaim',
        'category': 'AI Calendar',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['reclaim.ai', 'app.reclaim.ai'],
        'dspm_patterns': ['reclaim'],
        'data_sovereignty_risk': False
    },
    'Fireflies.ai': {
        'vendor': 'Fireflies',
        'category': 'AI Meeting Assistant',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['fireflies.ai', 'app.fireflies.ai'],
        'dspm_patterns': ['fireflies'],
        'data_sovereignty_risk': False
    },
    'Fathom': {
        'vendor': 'Fathom',
        'category': 'AI Meeting Assistant',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['fathom.video'],
        'dspm_patterns': ['fathom'],
        'data_sovereignty_risk': False
    },
    'Krisp': {
        'vendor': 'Krisp',
        'category': 'AI Noise Cancellation',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['krisp.ai'],
        'dspm_patterns': ['krisp'],
        'data_sovereignty_risk': False
    },
    'Beautiful.ai': {
        'vendor': 'Beautiful.ai',
        'category': 'AI Presentations',
        'asset_type': 'standalone',
        'risk_level': 'LOW',
        'approved': False,
        'url_patterns': ['beautiful.ai'],
        'dspm_patterns': ['beautiful'],
        'data_sovereignty_risk': False
    },
    'Gamma': {
        'vendor': 'Gamma',
        'category': 'AI Presentations',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['gamma.app'],
        'dspm_patterns': ['gamma'],
        'data_sovereignty_risk': False
    },
    'Tome': {
        'vendor': 'Tome',
        'category': 'AI Presentations',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['tome.app'],
        'dspm_patterns': ['tome'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # ENTERPRISE & EMBEDDED AI (20+)
    # ========================================================================
    'Microsoft 365 Copilot': {
        'vendor': 'Microsoft',
        'category': 'Enterprise AI',
        'asset_type': 'embedded',
        'parent_app': 'Microsoft 365',
        'risk_level': 'MEDIUM',
        'approved': True,
        'url_patterns': [
            'copilot.microsoft.com',
            'api.copilot.microsoft.com',
            'substrate.office.com/copilot',
            'copilot.cloud.microsoft'
        ],
        'dspm_patterns': ['microsoft 365 copilot', 'm365 copilot', 'copilot chat'],
        'data_sovereignty_risk': False
    },
    'Microsoft Teams Copilot': {
        'vendor': 'Microsoft',
        'category': 'Meeting AI',
        'asset_type': 'embedded',
        'parent_app': 'Microsoft Teams',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'teams.microsoft.com/api/copilot',
            'teams.microsoft.com/ai',
            'api.teams.microsoft.com/copilot'
        ],
        'dspm_patterns': ['teams copilot', 'microsoft teams ai'],
        'data_sovereignty_risk': False
    },
    'Google Duet AI': {
        'vendor': 'Google',
        'category': 'Workspace AI',
        'asset_type': 'embedded',
        'parent_app': 'Google Workspace',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'duet.google.com',
            'workspace.google.com/duet',
            'mail.google.com/mail/duet'
        ],
        'dspm_patterns': ['duet ai', 'google duet'],
        'data_sovereignty_risk': False
    },
    'Microsoft 365 Copilot': {
        'vendor': 'Microsoft',
        'category': 'Enterprise AI',
        'asset_type': 'embedded',
        'parent_app': 'Microsoft 365',
        'risk_level': 'MEDIUM',
        'approved': True,
        'url_patterns': [
            'copilot.microsoft.com',
            'api.copilot.microsoft.com',
            'substrate.office.com/copilot',
            'copilot.cloud.microsoft'
        ],
        'dspm_patterns': ['microsoft 365 copilot', 'm365 copilot', 'copilot chat'],
        'data_sovereignty_risk': False
    },
    'Microsoft Teams Copilot': {
        'vendor': 'Microsoft',
        'category': 'Meeting AI',
        'asset_type': 'embedded',
        'parent_app': 'Microsoft Teams',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'teams.microsoft.com/api/copilot',
            'teams.microsoft.com/ai',
            'api.teams.microsoft.com/copilot'
        ],
        'dspm_patterns': ['teams copilot', 'microsoft teams ai'],
        'data_sovereignty_risk': False
    },
    'GitHub Copilot': {
        'vendor': 'GitHub/Microsoft',
        'category': 'Code Generation AI',
        'asset_type': 'embedded',
        'parent_app': 'GitHub',
        'risk_level': 'HIGH',
        'approved': True,
        'url_patterns': [
            'githubcopilot.com',
            'copilot.github.com',
            'api.githubcopilot.com',
            'telemetry.githubcopilot.com',
            'api.business.githubcopilot.com',
            'telemetry.business.githubcopilot.com'
        ],
        'dspm_patterns': ['github copilot'],
        'data_sovereignty_risk': False
    },
    'Google Duet AI': {
        'vendor': 'Google',
        'category': 'Workspace AI',
        'asset_type': 'embedded',
        'parent_app': 'Google Workspace',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'duet.google.com',
            'workspace.google.com/duet',
            'mail.google.com/mail/duet'
        ],
        'dspm_patterns': ['duet ai', 'google duet'],
        'data_sovereignty_risk': False
    },
    'Google Gemini': {
        'vendor': 'Google',
        'category': 'Generative AI',
        'asset_type': 'standalone',
        'risk_level': 'CRITICAL',
        'approved': False,
        'url_patterns': ['gemini.google.com', 'bard.google.com', 'ai.google.dev'],
        'dspm_patterns': ['gemini', 'bard', 'google ai'],
        'data_sovereignty_risk': False
    },
    'Adobe Firefly': {
        'vendor': 'Adobe',
        'category': 'Image Generation AI',
        'asset_type': 'embedded',
        'parent_app': 'Adobe Creative Cloud',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'firefly.adobe.com',
            'firefly-api.adobe.io',
            'cc-api.adobe.io/firefly'
        ],
        'dspm_patterns': ['adobe firefly'],
        'data_sovereignty_risk': False
    },
    'Salesforce Einstein': {
        'vendor': 'Salesforce',
        'category': 'CRM AI',
        'asset_type': 'embedded',
        'parent_app': 'Salesforce',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'einstein.salesforce.com',
            'api.salesforce.com/einstein'
        ],
        'dspm_patterns': ['einstein ai', 'salesforce einstein'],
        'data_sovereignty_risk': False
    },
    'Zoom AI Companion': {
        'vendor': 'Zoom',
        'category': 'Meeting AI',
        'asset_type': 'embedded',
        'parent_app': 'Zoom',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['zoom.us/ai', 'api.zoom.us/v2/ai', 'zoom.us/companion'],
        'dspm_patterns': ['zoom ai', 'ai companion'],
        'data_sovereignty_risk': False
    },
    'Slack AI': {
        'vendor': 'Slack',
        'category': 'Collaboration AI',
        'asset_type': 'embedded',
        'parent_app': 'Slack',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['slack.com/api/ai', 'edgeapi.slack.com/ai'],
        'dspm_patterns': ['slack ai'],
        'data_sovereignty_risk': False
    },
    'Notion AI': {
        'vendor': 'Notion',
        'category': 'Productivity AI',
        'asset_type': 'embedded',
        'parent_app': 'Notion',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['notion.so/api/ai', 'api.notion.com/ai', 'notion.ai'],
        'dspm_patterns': ['notion ai'],
        'data_sovereignty_risk': False
    },
    'Grammarly AI': {
        'vendor': 'Grammarly',
        'category': 'Writing AI',
        'asset_type': 'embedded',
        'parent_app': 'Grammarly',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['grammarly.com', 'api.grammarly.com'],
        'dspm_patterns': ['grammarly'],
        'data_sovereignty_risk': False
    },
    'Salesforce Einstein': {
        'vendor': 'Salesforce',
        'category': 'CRM AI',
        'asset_type': 'embedded',
        'parent_app': 'Salesforce',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'einstein.salesforce.com',
            'api.salesforce.com/einstein'
        ],
        'dspm_patterns': ['einstein ai', 'salesforce einstein'],
        'data_sovereignty_risk': False
    },
    'Zoom AI Companion': {
        'vendor': 'Zoom',
        'category': 'Meeting AI',
        'asset_type': 'embedded',
        'parent_app': 'Zoom',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['zoom.us/ai', 'api.zoom.us/v2/ai', 'zoom.us/companion'],
        'dspm_patterns': ['zoom ai', 'ai companion'],
        'data_sovereignty_risk': False
    },
    'Slack AI': {
        'vendor': 'Slack',
        'category': 'Collaboration AI',
        'asset_type': 'embedded',
        'parent_app': 'Slack',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['slack.com/api/ai', 'edgeapi.slack.com/ai'],
        'dspm_patterns': ['slack ai'],
        'data_sovereignty_risk': False
    },
    'Adobe Firefly': {
        'vendor': 'Adobe',
        'category': 'Image Generation AI',
        'asset_type': 'embedded',
        'parent_app': 'Adobe Creative Cloud',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': [
            'firefly.adobe.com',
            'firefly-api.adobe.io',
            'cc-api.adobe.io/firefly'
        ],
        'dspm_patterns': ['adobe firefly'],
        'data_sovereignty_risk': False
    },
    'ServiceNow AI': {
        'vendor': 'ServiceNow',
        'category': 'Enterprise AI',
        'asset_type': 'embedded',
        'parent_app': 'ServiceNow',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['servicenow.com/ai'],
        'dspm_patterns': ['servicenow ai'],
        'data_sovereignty_risk': False
    },
    'SAP Joule': {
        'vendor': 'SAP',
        'category': 'Enterprise AI',
        'asset_type': 'embedded',
        'parent_app': 'SAP',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['sap.com/joule'],
        'dspm_patterns': ['sap joule'],
        'data_sovereignty_risk': False
    },
    'Oracle AI': {
        'vendor': 'Oracle',
        'category': 'Enterprise AI',
        'asset_type': 'embedded',
        'parent_app': 'Oracle Cloud',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['oracle.com/ai'],
        'dspm_patterns': ['oracle ai'],
        'data_sovereignty_risk': False
    },
    'Workday AI': {
        'vendor': 'Workday',
        'category': 'HR AI',
        'asset_type': 'embedded',
        'parent_app': 'Workday',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['workday.com/ai'],
        'dspm_patterns': ['workday ai'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # OPEN SOURCE & DEVELOPER PLATFORMS (15+)
    # ========================================================================
    'Hugging Face': {
        'vendor': 'Hugging Face',
        'category': 'ML Platform',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['huggingface.co', 'api-inference.huggingface.co'],
        'dspm_patterns': ['hugging face', 'huggingface'],
        'data_sovereignty_risk': False
    },
    'Replicate': {
        'vendor': 'Replicate',
        'category': 'ML API',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['replicate.com', 'api.replicate.com'],
        'dspm_patterns': ['replicate'],
        'data_sovereignty_risk': False
    },
    'Together.ai': {
        'vendor': 'Together AI',
        'category': 'LLM API',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['together.ai', 'api.together.xyz'],
        'dspm_patterns': ['together'],
        'data_sovereignty_risk': False
    },
    'Fireworks.ai': {
        'vendor': 'Fireworks',
        'category': 'LLM API',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['fireworks.ai', 'api.fireworks.ai'],
        'dspm_patterns': ['fireworks'],
        'data_sovereignty_risk': False
    },
    'Anyscale': {
        'vendor': 'Anyscale',
        'category': 'ML Platform',
        'asset_type': 'standalone',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['anyscale.com', 'api.anyscale.com'],
        'dspm_patterns': ['anyscale'],
        'data_sovereignty_risk': False
    },
    'Modal': {
        'vendor': 'Modal',
        'category': 'ML Infrastructure',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['modal.com'],
        'dspm_patterns': ['modal'],
        'data_sovereignty_risk': False
    },
    'Banana': {
        'vendor': 'Banana',
        'category': 'ML API',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['banana.dev'],
        'dspm_patterns': ['banana'],
        'data_sovereignty_risk': False
    },
    'Baseten': {
        'vendor': 'Baseten',
        'category': 'ML Platform',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['baseten.co', 'app.baseten.co'],
        'dspm_patterns': ['baseten'],
        'data_sovereignty_risk': False
    },
    
    # ========================================================================
    # SPECIALIZED AI TOOLS (20+)
    # ========================================================================
    'Uizard': {
        'vendor': 'Uizard',
        'category': 'AI Design',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['uizard.io', 'app.uizard.io'],
        'dspm_patterns': ['uizard'],
        'data_sovereignty_risk': False
    },
    'Galileo AI': {
        'vendor': 'Galileo',
        'category': 'AI Design',
        'asset_type': 'standalone',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['usegalileo.ai'],
        'dspm_patterns': ['galileo'],
        'data_sovereignty_risk': False
    },
    'Framer AI': {
        'vendor': 'Framer',
        'category': 'AI Design',
        'asset_type': 'embedded',
        'parent_app': 'Framer',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['framer.com/ai'],
        'dspm_patterns': ['framer ai'],
        'data_sovereignty_risk': False
    },
    'Figma AI': {
        'vendor': 'Figma',
        'category': 'AI Design',
        'asset_type': 'embedded',
        'parent_app': 'Figma',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['figma.com/ai'],
        'dspm_patterns': ['figma ai'],
        'data_sovereignty_risk': False
    },
    'Miro AI': {
        'vendor': 'Miro',
        'category': 'AI Whiteboard',
        'asset_type': 'embedded',
        'parent_app': 'Miro',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['miro.com/ai'],
        'dspm_patterns': ['miro ai'],
        'data_sovereignty_risk': False
    },
    'Zapier AI': {
        'vendor': 'Zapier',
        'category': 'AI Automation',
        'asset_type': 'embedded',
        'parent_app': 'Zapier',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['zapier.com/ai'],
        'dspm_patterns': ['zapier ai'],
        'data_sovereignty_risk': False
    },
    'Make AI': {
        'vendor': 'Make',
        'category': 'AI Automation',
        'asset_type': 'embedded',
        'parent_app': 'Make',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['make.com/ai'],
        'dspm_patterns': ['make ai'],
        'data_sovereignty_risk': False
    },
    'Airtable AI': {
        'vendor': 'Airtable',
        'category': 'Database AI',
        'asset_type': 'embedded',
        'parent_app': 'Airtable',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['airtable.com/ai'],
        'dspm_patterns': ['airtable ai'],
        'data_sovereignty_risk': False
    },
    'Intercom Fin': {
        'vendor': 'Intercom',
        'category': 'Customer Support AI',
        'asset_type': 'embedded',
        'parent_app': 'Intercom',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['intercom.com/fin'],
        'dspm_patterns': ['intercom fin'],
        'data_sovereignty_risk': False
    },
    'Zendesk AI': {
        'vendor': 'Zendesk',
        'category': 'Customer Support AI',
        'asset_type': 'embedded',
        'parent_app': 'Zendesk',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['zendesk.com/ai'],
        'dspm_patterns': ['zendesk ai'],
        'data_sovereignty_risk': False
    },
    'HubSpot AI': {
        'vendor': 'HubSpot',
        'category': 'Marketing AI',
        'asset_type': 'embedded',
        'parent_app': 'HubSpot',
        'risk_level': 'HIGH',
        'approved': False,
        'url_patterns': ['hubspot.com/ai'],
        'dspm_patterns': ['hubspot ai'],
        'data_sovereignty_risk': False
    },
    'Mailchimp AI': {
        'vendor': 'Mailchimp',
        'category': 'Marketing AI',
        'asset_type': 'embedded',
        'parent_app': 'Mailchimp',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['mailchimp.com/ai'],
        'dspm_patterns': ['mailchimp ai'],
        'data_sovereignty_risk': False
    },
    'Shopify AI': {
        'vendor': 'Shopify',
        'category': 'E-commerce AI',
        'asset_type': 'embedded',
        'parent_app': 'Shopify',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['shopify.com/ai'],
        'dspm_patterns': ['shopify ai'],
        'data_sovereignty_risk': False
    },
    'Webflow AI': {
        'vendor': 'Webflow',
        'category': 'Web Design AI',
        'asset_type': 'embedded',
        'parent_app': 'Webflow',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['webflow.com/ai'],
        'dspm_patterns': ['webflow ai'],
        'data_sovereignty_risk': False
    },
    'Wix AI': {
        'vendor': 'Wix',
        'category': 'Web Design AI',
        'asset_type': 'embedded',
        'parent_app': 'Wix',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['wix.com/ai'],
        'dspm_patterns': ['wix ai'],
        'data_sovereignty_risk': False
    },
    'Squarespace AI': {
        'vendor': 'Squarespace',
        'category': 'Web Design AI',
        'asset_type': 'embedded',
        'parent_app': 'Squarespace',
        'risk_level': 'MEDIUM',
        'approved': False,
        'url_patterns': ['squarespace.com/ai'],
        'dspm_patterns': ['squarespace ai'],
        'data_sovereignty_risk': False
    }
}

# ============================================================================
# SHADOW AI DETECTION RULES
# ============================================================================

SHADOW_AI_RULES = {
    'RULE_1_BLOCKED_BUT_BYPASSED': {
        'name': 'Blocked AI Being Bypassed',
        'severity': 'CRITICAL',
        'description': 'AI blocked by Zscaler policy but detected in DSPM (users bypassing controls via browser extensions, mobile apps, or VPN)',
        'check': lambda asset: asset.get('zscaler_policy_status') == 'BLOCKED' and asset.get('detected_in_dspm', False)
    },
    'RULE_2_UNAPPROVED_APP': {
        'name': 'Unapproved AI Application',
        'severity': 'CRITICAL',
        'description': 'AI asset detected but not approved by Zscaler policy (not explicitly allowed)',
        'check': lambda asset: asset.get('zscaler_policy_status') not in ['APPROVED', 'ALLOWED'] and not asset.get('approved_by_vendor', False)
    },
    'RULE_3_HIGH_USAGE': {
        'name': 'High Usage Shadow AI',
        'severity': 'CRITICAL',
        'description': 'Shadow AI with more than 10 detections (indicates widespread unauthorized usage)',
        'check': lambda asset: asset.get('zscaler_policy_status') != 'APPROVED' and asset.get('total_detections', 0) > 10
    },
    'RULE_4_MULTI_USER': {
        'name': 'Multi-User Shadow AI',
        'severity': 'HIGH',
        'description': 'Shadow AI used by more than 3 users (indicates organizational adoption of unapproved tool)',
        'check': lambda asset: asset.get('zscaler_policy_status') != 'APPROVED' and asset.get('total_unique_users', 0) > 3
    },
    'RULE_5_DATA_EXPOSURE': {
        'name': 'Shadow AI with Data Exposure',
        'severity': 'CRITICAL',
        'description': 'Shadow AI processing sensitive data (PII, PHI, financial, source code) without proper controls',
        'check': lambda asset: asset.get('zscaler_policy_status') != 'APPROVED' and asset.get('sensitive_data_count', 0) > 0
    },
    'RULE_6_FOREIGN_AI': {
        'name': 'Foreign AI Service',
        'severity': 'CRITICAL',
        'description': 'AI service with data sovereignty risk (data processed in foreign jurisdiction, GDPR/compliance violation)',
        'check': lambda asset: asset.get('zscaler_policy_status') != 'APPROVED' and asset.get('data_sovereignty_risk', False)
    },
    'RULE_7_CROSS_VALIDATED': {
        'name': 'Cross-Validated Shadow AI',
        'severity': 'CRITICAL',
        'description': 'Shadow AI detected in both Zscaler and DSPM (high confidence detection, confirmed usage)',
        'check': lambda asset: asset.get('zscaler_policy_status') != 'APPROVED' and asset.get('detected_in_zscaler', False) and asset.get('detected_in_dspm', False)
    },
    'RULE_8_EMBEDDED_UNAPPROVED': {
        'name': 'Unapproved Embedded AI',
        'severity': 'HIGH',
        'description': 'Embedded AI feature in approved app but not explicitly approved (hidden AI capabilities)',
        'check': lambda asset: asset.get('asset_type') == 'embedded' and asset.get('zscaler_policy_status') != 'APPROVED' and not asset.get('approved_by_vendor', False)
    },
    'RULE_9_DSPM_ONLY_DETECTION': {
        'name': 'DSPM-Only Detection (Potential Bypass)',
        'severity': 'HIGH',
        'description': 'AI detected only in DSPM, not in Zscaler (suggests network filtering bypass via extensions, mobile, or VPN)',
        'check': lambda asset: asset.get('detected_in_dspm', False) and not asset.get('detected_in_zscaler', False) and asset.get('zscaler_policy_status') != 'APPROVED'
    }
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def normalize_asset_name(name):
    """Normalize asset names for matching"""
    if not name or pd.isna(name):
        return None
    
    name = str(name).lower().strip()
    
    # Normalize common variations
    if 'chatgpt' in name or 'chat gpt' in name or 'openai' in name:
        return 'ChatGPT'
    elif 'claude' in name or 'anthropic' in name:
        return 'Anthropic Claude'
    elif 'microsoft 365 copilot' in name or 'm365 copilot' in name or 'copilot chat' in name:
        return 'Microsoft 365 Copilot'
    elif 'github copilot' in name:
        return 'GitHub Copilot'
    elif 'teams copilot' in name:
        return 'Microsoft Teams Copilot'
    elif 'perplexity' in name:
        return 'Perplexity AI'
    elif 'doubao' in name:
        return 'Doubao'
    elif 'canva' in name:
        return 'Canva AI'
    elif 'lovable' in name:
        return 'Lovable'
    elif 'duet' in name:
        return 'Google Duet AI'
    elif 'gemini' in name or 'bard' in name:
        return 'Google Gemini'
    elif 'firefly' in name:
        return 'Adobe Firefly'
    elif 'einstein' in name:
        return 'Salesforce Einstein'
    elif 'zoom ai' in name or 'ai companion' in name:
        return 'Zoom AI Companion'
    elif 'slack ai' in name:
        return 'Slack AI'
    elif 'notion ai' in name:
        return 'Notion AI'
    elif 'grammarly' in name:
        return 'Grammarly AI'
    
    return None

# ============================================================================
# ZSCALER PROCESSING
# ============================================================================

def process_zscaler_data(zscaler_file):
    """Process Zscaler logs and detect AI assets"""
    print(f"📂 Reading Zscaler logs: {zscaler_file}")
    
    df = pd.read_csv(zscaler_file, low_memory=False)
    print(f"✅ Loaded {len(df):,} Zscaler log entries")
    
    # Analyze ALL traffic (allowed + blocked)
    print(f"🔍 Analyzing all traffic (allowed + blocked)")
    
    raw_records = []
    detected_assets = {}
    policy_status = {}  # Track policy status per asset
    
    for idx, row in df.iterrows():
        url = str(row.get('URL', '')).lower()
        policy_action = str(row.get('Policy Action', ''))
        
        # Check against all AI assets
        for asset_name, asset_info in AI_ASSET_CATALOG.items():
            matched = False
            
            for pattern in asset_info['url_patterns']:
                if pattern.lower() in url:
                    matched = True
                    break
            
            if matched:
                record = {
                    'source': 'Zscaler',
                    'asset_name': asset_name,
                    'url': url,
                    'user': row.get('Unique_ID', ''),
                    'department': row.get('Department', ''),
                    'location': row.get('Location', ''),
                    'cloud_app': row.get('Cloud Application', ''),
                    'policy_action': policy_action
                }
                raw_records.append(record)
                
                if asset_name not in detected_assets:
                    detected_assets[asset_name] = []
                detected_assets[asset_name].append(record)
                
                # Track policy status
                if asset_name not in policy_status:
                    policy_status[asset_name] = {'allowed': 0, 'blocked': 0}
                
                if policy_action == 'Allowed':
                    policy_status[asset_name]['allowed'] += 1
                elif 'Blocked' in policy_action or 'Not allowed' in policy_action:
                    policy_status[asset_name]['blocked'] += 1
    
    # Aggregate by asset
    aggregated = {}
    for asset_name, records in detected_assets.items():
        asset_info = AI_ASSET_CATALOG.get(asset_name, {})
        
        # Determine policy status
        status = policy_status.get(asset_name, {'allowed': 0, 'blocked': 0})
        if status['allowed'] > 0 and status['blocked'] == 0:
            zscaler_policy = 'APPROVED'
        elif status['blocked'] > 0 and status['allowed'] == 0:
            zscaler_policy = 'BLOCKED'
        elif status['allowed'] > 0 and status['blocked'] > 0:
            zscaler_policy = 'PARTIAL'
        else:
            zscaler_policy = 'UNKNOWN'
        
        aggregated[asset_name] = {
            'asset_name': asset_name,
            'source': 'Zscaler',
            'zscaler_count': len(records),
            'zscaler_allowed': status['allowed'],
            'zscaler_blocked': status['blocked'],
            'zscaler_policy_status': zscaler_policy,
            'zscaler_users': len(set(r['user'] for r in records if r['user'])),
            'zscaler_departments': len(set(r['department'] for r in records if r['department'])),
            'zscaler_records': records,
            **asset_info
        }
    
    print(f"🔍 Zscaler: Detected {len(aggregated)} unique AI assets")
    print(f"   - Approved: {len([a for a in aggregated.values() if a['zscaler_policy_status'] == 'APPROVED'])}")
    print(f"   - Blocked: {len([a for a in aggregated.values() if a['zscaler_policy_status'] == 'BLOCKED'])}")
    print(f"   - Partial: {len([a for a in aggregated.values() if a['zscaler_policy_status'] == 'PARTIAL'])}")
    return aggregated, raw_records

# ============================================================================
# DSPM PROCESSING
# ============================================================================

def process_dspm_data(dspm_file):
    """Process DSPM logs and detect AI assets"""
    print(f"📂 Reading DSPM logs: {dspm_file}")
    
    df = pd.read_csv(dspm_file, low_memory=False)
    print(f"✅ Loaded {len(df):,} DSPM log entries")
    
    raw_records = []
    detected_assets = {}
    
    for idx, row in df.iterrows():
        # Try both 'App' and 'App accessed in' columns
        app_name = str(row.get('App accessed in', row.get('App', ''))).lower()
        
        # Normalize asset name
        normalized_name = normalize_asset_name(app_name)
        
        if normalized_name:
            # Parse sensitive data
            sensitive_data = []
            sensitive_str = str(row.get('Sensitive info type', ''))
            if sensitive_str and sensitive_str != 'nan':
                sensitive_data = [s.strip() for s in sensitive_str.split(',') if s.strip()]
            
            record = {
                'source': 'DSPM',
                'asset_name': normalized_name,
                'app_name': row.get('App accessed in', row.get('App', '')),
                'user': row.get('Agent name', ''),
                'activity_type': row.get('Activity type', ''),
                'ai_category': row.get('AI app category', ''),
                'sensitive_data': sensitive_data
            }
            raw_records.append(record)
            
            if normalized_name not in detected_assets:
                detected_assets[normalized_name] = []
            detected_assets[normalized_name].append(record)
    
    # Aggregate by asset
    aggregated = {}
    for asset_name, records in detected_assets.items():
        asset_info = AI_ASSET_CATALOG.get(asset_name, {
            'vendor': 'Unknown',
            'category': 'Unknown',
            'asset_type': 'unknown',
            'risk_level': 'HIGH',
            'approved': False
        })
        
        # Collect all sensitive data
        all_sensitive = set()
        for r in records:
            all_sensitive.update(r['sensitive_data'])
        
        aggregated[asset_name] = {
            'asset_name': asset_name,
            'source': 'DSPM',
            'dspm_count': len(records),
            'dspm_users': len(set(r['user'] for r in records if r['user'])),
            'sensitive_data_types': list(all_sensitive),
            'sensitive_data_count': len(all_sensitive),
            'dspm_records': records,
            **asset_info
        }
    
    print(f"🔍 DSPM: Detected {len(aggregated)} unique AI assets")
    return aggregated, raw_records

# ============================================================================
# CONSOLIDATION
# ============================================================================

def consolidate_assets(zscaler_assets, dspm_assets):
    """Consolidate AI assets from both sources"""
    print(f"🔬 Consolidating AI assets from both sources...")
    
    all_asset_names = set(list(zscaler_assets.keys()) + list(dspm_assets.keys()))
    
    consolidated = []
    
    for asset_name in all_asset_names:
        z_data = zscaler_assets.get(asset_name, {})
        d_data = dspm_assets.get(asset_name, {})
        
        # Get asset info from catalog
        asset_info = AI_ASSET_CATALOG.get(asset_name, {
            'vendor': 'Unknown',
            'category': 'Unknown',
            'asset_type': 'unknown',
            'risk_level': 'HIGH',
            'approved': False,
            'data_sovereignty_risk': False
        })
        
        # Determine final approval status
        zscaler_policy = z_data.get('zscaler_policy_status', 'NOT_DETECTED')
        approved_by_vendor = (asset_info.get('vendor') == 'Microsoft' and bool(d_data))  # Microsoft AI in DSPM = approved
        
        if zscaler_policy == 'APPROVED':
            final_approval = 'APPROVED'
        elif zscaler_policy == 'BLOCKED':
            final_approval = 'BLOCKED'
        elif approved_by_vendor:
            final_approval = 'APPROVED'
        else:
            final_approval = 'NEEDS_REVIEW'
        
        asset_record = {
            # Basic info
            'asset_name': asset_name,
            'vendor': asset_info.get('vendor', 'Unknown'),
            'category': asset_info.get('category', 'Unknown'),
            'asset_type': asset_info.get('asset_type', 'unknown'),
            'parent_app': asset_info.get('parent_app', ''),
            'risk_level': asset_info.get('risk_level', 'HIGH'),
            'data_sovereignty_risk': asset_info.get('data_sovereignty_risk', False),
            
            # Approval status
            'zscaler_policy_status': zscaler_policy,
            'approved_by_vendor': approved_by_vendor,
            'final_approval_status': final_approval,
            
            # Detection sources
            'detected_in_zscaler': bool(z_data),
            'detected_in_dspm': bool(d_data),
            'detection_confidence': 'CONFIRMED' if (z_data and d_data) else 'VERY HIGH' if d_data else 'HIGH',
            
            # Zscaler data
            'zscaler_detections': z_data.get('zscaler_count', 0),
            'zscaler_allowed': z_data.get('zscaler_allowed', 0),
            'zscaler_blocked': z_data.get('zscaler_blocked', 0),
            'zscaler_users': z_data.get('zscaler_users', 0),
            'zscaler_departments': z_data.get('zscaler_departments', 0),
            
            # DSPM data
            'dspm_detections': d_data.get('dspm_count', 0),
            'dspm_users': d_data.get('dspm_users', 0),
            'sensitive_data_types': d_data.get('sensitive_data_types', []),
            'sensitive_data_count': d_data.get('sensitive_data_count', 0),
            
            # Totals
            'total_detections': z_data.get('zscaler_count', 0) + d_data.get('dspm_count', 0),
            'total_unique_users': max(z_data.get('zscaler_users', 0), d_data.get('dspm_users', 0)),
            
            # Raw records
            'zscaler_records': z_data.get('zscaler_records', []),
            'dspm_records': d_data.get('dspm_records', [])
        }
        
        consolidated.append(asset_record)
    
    print(f"✅ Consolidated {len(consolidated)} unique AI assets")
    return consolidated

# ============================================================================
# SHADOW AI DETECTION
# ============================================================================

def detect_shadow_ai(consolidated_assets):
    """Detect shadow AI based on rules"""
    print(f"🚨 Detecting Shadow AI assets...")
    
    shadow_ai_list = []
    
    for asset in consolidated_assets:
        matched_rules = []
        
        # Check each rule
        for rule_id, rule_info in SHADOW_AI_RULES.items():
            if rule_info['check'](asset):
                matched_rules.append({
                    'rule_id': rule_id,
                    'rule_name': rule_info['name'],
                    'severity': rule_info['severity'],
                    'description': rule_info['description']
                })
        
        # If any rules matched, it's shadow AI
        if matched_rules:
            asset_copy = asset.copy()
            asset_copy['matched_rules'] = matched_rules
            asset_copy['matched_rules_count'] = len(matched_rules)
            
            # Determine highest severity
            severities = [r['severity'] for r in matched_rules]
            if 'CRITICAL' in severities:
                asset_copy['highest_severity'] = 'CRITICAL'
            elif 'HIGH' in severities:
                asset_copy['highest_severity'] = 'HIGH'
            else:
                asset_copy['highest_severity'] = 'MEDIUM'
            
            shadow_ai_list.append(asset_copy)
    
    print(f"🚨 Detected {len(shadow_ai_list)} Shadow AI assets")
    return shadow_ai_list

# ============================================================================
# REPORT GENERATION
# ============================================================================

def generate_report(consolidated_assets, shadow_ai_list, zscaler_raw, dspm_raw, output_file):
    """Generate comprehensive Excel report"""
    
    print(f"📊 Generating report: {output_file}")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        
        # Sheet 1: Executive Summary
        summary_data = {
            'Metric': [
                'Total AI Assets Detected',
                'Standalone AI Services',
                'Embedded AI Features',
                'Approved AI Assets (Zscaler/Vendor)',
                'Blocked AI Assets (Zscaler)',
                'Needs Review',
                'Shadow AI Assets (Rule Violations)',
                'Blocked but Bypassed (CRITICAL)',
                'Detected in Zscaler Only',
                'Detected in DSPM Only',
                'Cross-Validated (Both Sources)',
                'CRITICAL Risk',
                'HIGH Risk',
                'MEDIUM Risk',
                'Assets with Sensitive Data',
                'Data Sovereignty Risks'
            ],
            'Value': [
                len(consolidated_assets),
                len([a for a in consolidated_assets if a.get('asset_type') == 'standalone']),
                len([a for a in consolidated_assets if a.get('asset_type') == 'embedded']),
                len([a for a in consolidated_assets if a.get('final_approval_status') == 'APPROVED']),
                len([a for a in consolidated_assets if a.get('zscaler_policy_status') == 'BLOCKED']),
                len([a for a in consolidated_assets if a.get('final_approval_status') == 'NEEDS_REVIEW']),
                len(shadow_ai_list),
                len([a for a in consolidated_assets if a.get('zscaler_policy_status') == 'BLOCKED' and a.get('detected_in_dspm')]),
                len([a for a in consolidated_assets if a.get('detected_in_zscaler') and not a.get('detected_in_dspm')]),
                len([a for a in consolidated_assets if a.get('detected_in_dspm') and not a.get('detected_in_zscaler')]),
                len([a for a in consolidated_assets if a.get('detected_in_zscaler') and a.get('detected_in_dspm')]),
                len([a for a in consolidated_assets if a.get('risk_level') == 'CRITICAL']),
                len([a for a in consolidated_assets if a.get('risk_level') == 'HIGH']),
                len([a for a in consolidated_assets if a.get('risk_level') == 'MEDIUM']),
                len([a for a in consolidated_assets if a.get('sensitive_data_count', 0) > 0]),
                len([a for a in consolidated_assets if a.get('data_sovereignty_risk')])
            ]
        }
        summary_df = pd.DataFrame(summary_data)
        summary_df.to_excel(writer, sheet_name='Executive Summary', index=False)
        
        # Sheet 2: All AI Assets (Unified)
        assets_df = pd.DataFrame(consolidated_assets)
        column_order = [
            'asset_name', 'vendor', 'category', 'asset_type', 'parent_app',
            'risk_level', 'final_approval_status', 'zscaler_policy_status', 'approved_by_vendor',
            'detection_confidence', 'detected_in_zscaler', 'detected_in_dspm',
            'total_detections', 'total_unique_users',
            'zscaler_detections', 'zscaler_allowed', 'zscaler_blocked',
            'zscaler_users', 'zscaler_departments',
            'dspm_detections', 'dspm_users', 'sensitive_data_count',
            'data_sovereignty_risk'
        ]
        assets_df = assets_df[[col for col in column_order if col in assets_df.columns]]
        assets_df = assets_df.sort_values('total_detections', ascending=False)
        assets_df.to_excel(writer, sheet_name='All AI Assets', index=False)
        
        # Sheet 3: Shadow AI with Rules
        if shadow_ai_list:
            shadow_records = []
            for asset in shadow_ai_list:
                base_record = {k: v for k, v in asset.items() if k not in ['matched_rules', 'zscaler_records', 'dspm_records']}
                base_record['matched_rules_list'] = ' | '.join([r['rule_name'] for r in asset['matched_rules']])
                base_record['sensitive_data_types'] = ', '.join(asset.get('sensitive_data_types', []))
                shadow_records.append(base_record)
            
            shadow_df = pd.DataFrame(shadow_records)
            column_order = [
                'asset_name', 'vendor', 'category', 'asset_type', 'parent_app',
                'risk_level', 'final_approval_status', 'zscaler_policy_status',
                'highest_severity', 'matched_rules_count', 'matched_rules_list',
                'total_detections', 'total_unique_users',
                'zscaler_detections', 'zscaler_allowed', 'zscaler_blocked',
                'dspm_detections', 'sensitive_data_count', 'sensitive_data_types',
                'detection_confidence', 'data_sovereignty_risk'
            ]
            shadow_df = shadow_df[[col for col in column_order if col in shadow_df.columns]]
            shadow_df = shadow_df.sort_values(['highest_severity', 'total_detections'], ascending=[True, False])
            shadow_df.to_excel(writer, sheet_name='Shadow AI with Rules', index=False)
        
        # Sheet 4: Shadow AI Rules Reference
        rules_data = []
        for rule_id, rule_info in SHADOW_AI_RULES.items():
            rules_data.append({
                'Rule ID': rule_id,
                'Rule Name': rule_info['name'],
                'Severity': rule_info['severity'],
                'Description': rule_info['description']
            })
        rules_df = pd.DataFrame(rules_data)
        rules_df.to_excel(writer, sheet_name='Shadow AI Rules', index=False)
        
        # Sheet 5: Zscaler Raw Data
        if zscaler_raw:
            zscaler_df = pd.DataFrame(zscaler_raw)
            zscaler_df.to_excel(writer, sheet_name='Zscaler Raw Data', index=False)
        
        # Sheet 6: DSPM Raw Data
        if dspm_raw:
            dspm_df = pd.DataFrame(dspm_raw)
            # Flatten sensitive_data list
            dspm_df['sensitive_data_types'] = dspm_df['sensitive_data'].apply(lambda x: ', '.join(x) if x else '')
            dspm_df = dspm_df.drop('sensitive_data', axis=1)
            dspm_df.to_excel(writer, sheet_name='DSPM Raw Data', index=False)
        
        # Sheet 7: Sensitive Data Exposure
        sensitive_records = []
        for asset in consolidated_assets:
            if asset.get('sensitive_data_count', 0) > 0:
                for data_type in asset.get('sensitive_data_types', []):
                    sensitive_records.append({
                        'asset_name': asset['asset_name'],
                        'vendor': asset['vendor'],
                        'risk_level': asset['risk_level'],
                        'final_approval_status': asset['final_approval_status'],
                        'zscaler_policy_status': asset['zscaler_policy_status'],
                        'sensitive_data_type': data_type,
                        'total_detections': asset['dspm_detections']
                    })
        
        if sensitive_records:
            sensitive_df = pd.DataFrame(sensitive_records)
            sensitive_df.to_excel(writer, sheet_name='Sensitive Data Exposure', index=False)
    
    print(f"✅ Report generated successfully!")

# ============================================================================
# CONSOLE SUMMARY
# ============================================================================

def print_summary(consolidated_assets, shadow_ai_list):
    """Print console summary"""
    
    print()
    print("=" * 80)
    print("📊 UNIFIED AI ASSET DETECTION SUMMARY")
    print("=" * 80)
    print()
    
    standalone = [a for a in consolidated_assets if a.get('asset_type') == 'standalone']
    embedded = [a for a in consolidated_assets if a.get('asset_type') == 'embedded']
    approved = [a for a in consolidated_assets if a.get('final_approval_status') == 'APPROVED']
    blocked = [a for a in consolidated_assets if a.get('zscaler_policy_status') == 'BLOCKED']
    needs_review = [a for a in consolidated_assets if a.get('final_approval_status') == 'NEEDS_REVIEW']
    
    print(f"Total AI Assets Detected: {len(consolidated_assets)}")
    print(f"  📱 Standalone AI Services: {len(standalone)}")
    print(f"  🔧 Embedded AI Features: {len(embedded)}")
    print()
    print("Approval Status:")
    print(f"  ✅ Approved (Zscaler/Vendor): {len(approved)}")
    print(f"  🚫 Blocked by Zscaler: {len(blocked)}")
    print(f"  ⚠️  Needs Review: {len(needs_review)}")
    print(f"  🚨 Shadow AI (Rule Violations): {len(shadow_ai_list)}")
    print()
    
    print("Detection Sources:")
    zscaler_only = [a for a in consolidated_assets if a.get('detected_in_zscaler') and not a.get('detected_in_dspm')]
    dspm_only = [a for a in consolidated_assets if a.get('detected_in_dspm') and not a.get('detected_in_zscaler')]
    both = [a for a in consolidated_assets if a.get('detected_in_zscaler') and a.get('detected_in_dspm')]
    
    print(f"  🎯 Cross-Validated (Both): {len(both)}")
    print(f"  📡 Zscaler Only: {len(zscaler_only)}")
    print(f"  🔍 DSPM Only: {len(dspm_only)}")
    print()
    
    # Shadow AI by severity
    if shadow_ai_list:
        critical = [s for s in shadow_ai_list if s.get('highest_severity') == 'CRITICAL']
        high = [s for s in shadow_ai_list if s.get('highest_severity') == 'HIGH']
        
        if critical:
            print(f"🚨 CRITICAL SHADOW AI ASSETS ({len(critical)}):")
            print("─" * 80)
            for asset in sorted(critical, key=lambda x: x['total_detections'], reverse=True)[:5]:
                print(f"  {asset['asset_name']:<30} Detections: {asset['total_detections']:>5}  Rules Matched: {asset['matched_rules_count']}")
            print()
        
        if high:
            print(f"⚠️  HIGH RISK SHADOW AI ({len(high)}):")
            print("─" * 80)
            for asset in sorted(high, key=lambda x: x['total_detections'], reverse=True)[:5]:
                print(f"  {asset['asset_name']:<30} Detections: {asset['total_detections']:>5}  Rules Matched: {asset['matched_rules_count']}")
            print()
    
    print("=" * 80)

# ============================================================================
# MAIN
# ============================================================================

def main():
    if len(sys.argv) != 4:
        print("Usage: python3 unified_ai_asset_detector.py <zscaler_csv> <dspm_csv> <output_xlsx>")
        sys.exit(1)
    
    zscaler_file = sys.argv[1]
    dspm_file = sys.argv[2]
    output_file = sys.argv[3]
    
    print("=" * 80)
    print("🔍 Unified AI Asset Detection (Standalone + Embedded)")
    print("=" * 80)
    print()
    
    # Process both sources
    zscaler_assets, zscaler_raw = process_zscaler_data(zscaler_file)
    dspm_assets, dspm_raw = process_dspm_data(dspm_file)
    
    # Consolidate
    consolidated_assets = consolidate_assets(zscaler_assets, dspm_assets)
    
    # Detect shadow AI
    shadow_ai_list = detect_shadow_ai(consolidated_assets)
    
    # Generate report
    generate_report(consolidated_assets, shadow_ai_list, zscaler_raw, dspm_raw, output_file)
    
    # Print summary
    print_summary(consolidated_assets, shadow_ai_list)
    
    print()
    print("=" * 80)
    print("✅ Analysis Complete!")
    print("=" * 80)
    print()
    print(f"📄 Report saved to: {output_file}")
    print()

if __name__ == '__main__':
    main()
