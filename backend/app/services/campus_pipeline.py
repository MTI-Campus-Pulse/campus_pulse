from backend.app.ai_modules import ai_pipeline

def process_text(text: str, interests=None):
    return ai_pipeline.process(text, interests)

