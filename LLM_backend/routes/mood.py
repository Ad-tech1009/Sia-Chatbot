"""
http://localhost:8000/detect_mood
{
  "user_input": "..."
}
"""

from fastapi import APIRouter
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

router = APIRouter()

label_to_mood = { "joy": "happy", "optimism": "happy", "surprise": "thoughtful", "sadness": "sad", "anger": "angry", "fear": "anxious", "disgust": "angry" }
MOOD_CONFIDENCE_THRESHOLD = 0.45

# Load model and tokenizer
model_name = "cardiffnlp/twitter-roberta-base-emotion"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.eval()

class MoodRequest(BaseModel):
    user_input: str

@router.post("/detect_mood")
async def detect_mood(request: MoodRequest):
    """Detect the mood from user input text using a pretrained model."""
    text = request.user_input.strip()
    
    # Return neutral if input is empty
    if not text:
        return {"mood": "neutral", "confidence": 0.0}

    # Tokenize and get model predictions
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    
    with torch.no_grad():
        logits = model(**inputs).logits
        probs = F.softmax(logits, dim=1)[0]

    # Get predicted emotion
    predicted_idx = torch.argmax(probs).item()
    labels = model.config.id2label
    emotion_label = labels[predicted_idx]
    confidence = probs[predicted_idx].item()

    # Map to mood and apply confidence threshold
    mood = label_to_mood.get(emotion_label, "neutral")
    if confidence < MOOD_CONFIDENCE_THRESHOLD:
        mood = "neutral"

    return {"mood": mood, "confidence": round(confidence, 3)}