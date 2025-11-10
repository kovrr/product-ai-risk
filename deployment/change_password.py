import random
import string

# Generate random 10-digit password (mix of letters and numbers)
password = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

print(f"Generated password: {password}")
print(f"\nDjango command:")
print(f"from core.models import AppUser; user = AppUser.objects.get(username='Or'); user.set_password('{password}'); user.save(); print('Password updated for Or')")
