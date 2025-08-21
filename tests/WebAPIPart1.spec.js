// tests/api-login.spec.js
import { test, expect } from '@playwright/test';

test('API Login Test', async ({ request }) => {
  const loginPayload = {
    userEmail: 'katoeler@hotmail.com',
    userPassword: 'Testing123'
  };

  const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: loginPayload
  });

  // Controleer of de response succesvol is
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  console.log(responseBody);

  // Controleer of er een token aanwezig is
  expect(responseBody.token).toBeTruthy();
  expect(responseBody.message).toBe('Login Successfully');
});