from django.test import TestCase


class TestMain(TestCase):
    def test_index(self):
        response = self.client.get('')
        self.assertEqual(response.status_code, 200)

    def test_about(self):
        response = self.client.get('/about')
        self.assertEqual(response.status_code, 200)

    def test_contacts(self):
        response = self.client.get('/contacts')
        self.assertEqual(response.status_code, 200)

    def test_vacanciess(self):
        response = self.client.get('/vacancies')
        self.assertEqual(response.status_code, 200)

    def test_news(self):
        response = self.client.get('/news')
        self.assertEqual(response.status_code, 200)

    def test_reviews(self):
        response = self.client.get('/reviews')
        self.assertEqual(response.status_code, 200)

    def test_privacy(self):
        response = self.client.get('/privacy')
        self.assertEqual(response.status_code, 200)

    def test_api1(self):
        response = self.client.get('/api1')
        self.assertEqual(response.status_code, 200)

    def test_api2(self):
        response = self.client.get('/api2')
        self.assertEqual(response.status_code, 200)

    