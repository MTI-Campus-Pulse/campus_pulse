import warnings
warnings.filterwarnings("ignore")

import torch
import torch.nn.functional as F
from transformers import (
    T5Tokenizer, T5ForConditionalGeneration,
    AutoTokenizer, AutoModelForSequenceClassification
)
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class CampusPulsePipeline:

    def __init__(self, user_interests=None):
        self.user_interests = user_interests or ["ذكاء اصطناعي", "امتحانات", "فعاليات"]
        model_path = r"C:\mt5_arabic_summarizer"
        self.summ_tokenizer = T5Tokenizer.from_pretrained(model_path)
        self.summ_model = T5ForConditionalGeneration.from_pretrained(model_path)
        self.labels = [
            "Academic Alert",
            "Job/Internship",
            "Event",
            "General News"
        ]
        self.cls_tokenizer = AutoTokenizer.from_pretrained(
            "aubmindlab/bert-base-arabertv2"
        )
        self.cls_model = AutoModelForSequenceClassification.from_pretrained(
            "aubmindlab/bert-base-arabertv2",
            num_labels=len(self.labels)
        )
        self.sbert = SentenceTransformer(
            "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
        )

    # ========================
    def summarize(self, text)->str:
        input_text = "summarize: " + text

        inputs = self.summ_tokenizer(
            input_text,
            return_tensors="pt",
            truncation=True,
            max_length=512
        )

        with torch.no_grad():
            output_ids = self.summ_model.generate(
                **inputs,
                max_length=150,
                min_length=40,
                num_beams=4,
                no_repeat_ngram_size=3,
                repetition_penalty=2.0,
                early_stopping=True
            )

        return self.summ_tokenizer.decode(
            output_ids[0],
            skip_special_tokens=True
        )

    # ========================
    def classify(self, text: str):
        inputs = self.cls_tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True
        )

        with torch.no_grad():
            outputs = self.cls_model(**inputs)

        probs = F.softmax(outputs.logits, dim=1)[0]

        scores = {
            self.labels[i]: round(float(probs[i]), 3)
            for i in range(len(self.labels))
        }

        category = max(scores, key=scores.get)
        confidence = max(scores.values())

        return category, confidence, scores

    # ========================
    def personalize(self, content: str, interests=None):

        interests = interests or self.user_interests
        interests_text = " ".join(interests)

        embeddings = self.sbert.encode(
            [interests_text, content],
            normalize_embeddings=True
        )

        score = cosine_similarity(
            [embeddings[0]], [embeddings[1]]
        )[0][0]

        return round(float(score * 100), 2)

    # ========================
    def process(self, text: str, interests=None):

        summary = self.summarize(text)
        category, confidence, scores = self.classify(summary)
        relevance = self.personalize(summary, interests)
        summary = summary.replace("<extra_id_0>", "")
        summary = summary.replace("<extra_id_1>", "")
        return {
            "summary": summary,
            "category": category,
            "confidence": confidence,
            "scores": scores,
            "relevance_score": relevance,
            "ai_models": ["mT5", "AraBERT", "SBERT"]
        }


# 🔥 Load once
ai_pipeline = CampusPulsePipeline()
