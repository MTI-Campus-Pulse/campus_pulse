def send_email(to_email: str, subject: str, body: str):
    print(f"\n📧 [إشعار] إلى: {to_email}")
    print(f"الموضوع: {subject}")
    print(f"المحتوى: {body[:100]}...")
    return True