import {expect } from '@playwright/test'

class LoginPage {
    constructor(page) {
        this.page = page
        this.username = page.locator("//input[@name='username']")
        this.password = page.locator("//input[@name='password']")
        this.loginButton = page.locator("//button[@type='submit']")
        this.logoutDropdown = page.locator("//span[@class='oxd-userdropdown-tab']//i")
        this.logoutButton = page.locator("//ul[@class='oxd-dropdown-menu']//li//a[text()='Logout']")

    }

    async gotoLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        await expect(this.page.locator(`//div//img[@src='/web/images/ohrm_branding.png?v=1763650546848']`)).toBeVisible();
        await expect(this.page).toHaveTitle('OrangeHRM')
        console.log(`Orange HRMS launched.`)
    }

    async login(username, password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.page.locator(`//span[@class='oxd-topbar-header-breadcrumb']//h6[text()='Dashboard']`)).toBeVisible();
    }

    async logout(){
        await this.logoutDropdown.click()
        await this.logoutButton.click()
        await expect(this.page.locator(`//h5[text()='Login']`)).toBeVisible();
        await expect(this.page.url()).toContain('auth/login');
        //await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        // await expect(this.page).toHaveURL(/auth\/login/);
        // await expect(this.page).toHaveURL(/opensource-.*.orangehrmlive.com/);
        console.log('User logged out successfully.')
    }

}

module.exports = LoginPage;
