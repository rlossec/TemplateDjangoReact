# python manage.py test accounts.tests.test_register
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework import status


class TestRegister(APITestCase):
    def setUp(self):
        self.url = reverse('user-list')
        self.valid_payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "Meyer75?",
            "re_password": "Meyer75?"
        }

    def test_registration_success(self):
        """Test avec toutes les données valides"""
        response = self.client.post(self.url, self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertIn('email', response.data)
        self.assertEqual(response.data['email'], self.valid_payload['email'])

    # Missing fields
    def test_registration_missing_username(self):
        """Test si le champ username est manquant"""
        payload = self.valid_payload.copy()
        payload.pop('username')
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data)

    def test_registration_missing_email(self):
        """Test si le champ email est manquant"""
        payload = self.valid_payload.copy()
        payload.pop('email')
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_registration_missing_password(self):
        """Test si le champ password est manquant"""
        payload = self.valid_payload.copy()
        payload.pop('password')
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_registration_missing_re_password(self):
        """Test si le champ password_confirm est manquant"""
        payload = self.valid_payload.copy()
        payload.pop('re_password')
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('re_password', response.data)

    # Validation
    ## Username
    def test_registration_username_invalid_characters(self):
        """Test si le nom d'utilisateur contient des caractères non autorisés"""
        payload = self.valid_payload.copy()
        payload["username"] = "invalid@username!"
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_registration_username_too_long(self):
        """Test si le nom d'utilisateur dépasse la longueur autorisée"""
        payload = self.valid_payload.copy()
        payload["username"] = "a" * 151  # Exceeding Django's default username max length of 150
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_registration_password_similar_to_username(self):
        invalid_payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testuser",
            "re_password": "testuser"
        }
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertIn("Le mot de passe est trop semblable au champ « nom d’utilisateur ».", response.data['password'])

    def test_registration_username_already_registered(self):
        """Test si le nom d'utilisateur est déjà utilisé par un autre utilisateur"""
        # Enregistrer un utilisateur avec le même nom d'utilisateur
        self.client.post(self.url, self.valid_payload)

        # Tentative d'inscription avec le même nom d'utilisateur
        payload_with_same_username = {
            "username": "testuser",
            "email": "testuser2@example.com",
            "password": "12345678",
            "re_password": "12345678"
        }
        response = self.client.post(self.url, payload_with_same_username)

        # Vérification de la réponse
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data)
        self.assertIn("Un utilisateur avec ce nom existe déjà.", response.data["username"])

    ## Email validation
    def test_registration_invalid_email(self):
        """Test pour des emails invalides"""
        invalid_emails = ["plainaddress", "missingatsign.com", "missingdomain@.com", "user@com", "user@domain..com", "user@domain.c", "user@.com"]
        for email in invalid_emails:
            payload = self.valid_payload.copy()
            payload['email'] = email
            response = self.client.post(self.url, payload)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertIn('email', response.data)

    def test_registration_email_already_registered(self):
        """Test si l'email est déjà utilisé par un autre utilisateur"""
        # Enregistrer un utilisateur avec le même email
        self.client.post(self.url, self.valid_payload)

        # Tentative d'inscription avec le même email
        payload_with_same_email = {
            "username": "testuser2",
            "email": "testuser@example.com",
            "password": "12345678",
            "re_password": "12345678"
        }
        response = self.client.post(self.url, payload_with_same_email)

        # Vérification de la réponse
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn("Un objet utilisateur avec ce champ email existe déjà.", response.data["email"])

    ## Password validation
    def test_registration_passwords_do_not_match(self):
        """Test lorsque les mots de passe ne correspondent pas"""
        payload = self.valid_payload.copy()
        payload['re_password'] = 'wrongpassword'
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)
        self.assertIn("The two password fields didn't match.", response.data['non_field_errors'])

    def test_registration_password_too_short(self):
        invalid_payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "short",
            "re_password": "short"
        }
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertIn("Ce mot de passe est trop court. Il doit contenir au minimum 8 caractères.", response.data["password"])

    def test_registration_password_common(self):
        common_passwords = [
            "password", "123456", "123456789", "12345678",
            "12345", "1234567", "qwerty", "abc123"
        ]
        for common_password in common_passwords:
            invalid_payload = {
                "username": "testuser",
                "email": "testuser@example.com",
                "password": common_password,
                "re_password": common_password
            }
            response = self.client.post(self.url, invalid_payload, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertIn("password", response.data)
            self.assertIn("Ce mot de passe est trop courant.", response.data["password"])

    def test_registration_password_numeric_only(self):
        invalid_payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "12345678",
            "re_password": "12345678"
        }
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertIn("Ce mot de passe est trop courant.", response.data["password"])

