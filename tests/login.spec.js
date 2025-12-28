import { test , expect } from '@playwright/test'

import LoginPage from '../pages/loginPage';
import { log } from 'node:console';

test('Login to Orange HRMS', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await loginPage.gotoLoginPage()
    await loginPage.login('Admin', 'admin123');
    await loginPage.logout();

})

test('Forgot password', async( {page} )=>{
    const loginPage = new LoginPage(page)

    await loginPage.gotoLoginPage();
    await loginPage.forgotPassword();
})