from fastapi import APIRouter, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from ..services.user_service import authenticate_user, register_user, get_user_role
from ..database import fake_db
import os

router = APIRouter()

# قراءة ملفات HTML من مجلد templates
def read_template(filename: str) -> str:
    template_path = os.path.join(os.path.dirname(__file__), '..', 'templates', filename)
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

@router.get("/", response_class=HTMLResponse)
def login_page():
    return read_template("login.html")

@router.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    user = authenticate_user(email, password)
    if not user:
        return HTMLResponse("❌ Email not found", status_code=401)

    if user["password"] == "changeme" and password == "changeme":
        return RedirectResponse(f"/register?email={email}", status_code=302)

    if password == user["password"]:
        role = get_user_role(email)
        return RedirectResponse(f"/dashboards/{role}", status_code=302)

    return HTMLResponse("❌ Incorrect password", status_code=401)

@router.get("/register", response_class=HTMLResponse)
def register_page(email: str):
    user = fake_db.get(email, {})
    role = user.get("role", "student")
    is_student = role == "student"
    
    template = read_template("register.html")
    template = template.replace("{{email}}", email)
    template = template.replace("{{role}}", role)
    template = template.replace("{{is_student}}", str(is_student).lower())
    
    return template

@router.post("/register")
def register(
    email: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    interest_name: list = Form([]),
    interest_weight: list = Form([])
):
    if password != confirm_password:
        return HTMLResponse("❌ Passwords don't match", status_code=400)
    
    interests = []
    for name, weight in zip(interest_name, interest_weight):
        interests.append({"name": name, "weight": int(weight)})
    
    if not register_user(email, password, interests if interests else None):
        return HTMLResponse("❌ Email not found", status_code=404)
    role = get_user_role(email)
    return RedirectResponse(f"/dashboards/{role}", status_code=302)