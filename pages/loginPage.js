import {expect } from '@playwright/test'

class LoginPage {
    constructor(page) {
        this.page = page
        this.username = page.getByPlaceholder("Username") //page.locator("//input[@name='username']")
        this.password = page.getByPlaceholder("Password") //page.locator("//input[@name='password']")
        this.loginButton =  page.getByRole('button', { name: ' Login ' })//page.locator("//button[@type='submit']")
        this.logoutDropdown = page.locator("//span[@class='oxd-userdropdown-tab']//i")
        this.logoutButton = page.locator("//ul[@class='oxd-dropdown-menu']//li//a[text()='Logout']")
        this.forgotPasswordLink = page.getByText("Forgot your password? ")
        this.resetPassword = page.getByRole('heading', { name: 'Reset Password' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel'})
    }

    async gotoLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        await expect(this.page.locator(`//div//img[@src='/web/images/ohrm_branding.png?v=1763650546848']`)).toBeVisible();
        await expect(this.page).toHaveTitle('OrangeHRM');
        await expect(this.page.getByAltText('company-branding')).toBeVisible();
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

    async forgotPassword(){
        await expect(this.page.getByText(/orangeHRM\s+[A-Z]+\s+\d+\.\d+/i)).toBeVisible();
        await expect(this.page.getByText('OrangeHRM OS 5.8')).toBeVisible();
        await this.forgotPasswordLink.click()
        await expect(this.resetPassword).toBeVisible();
        await this.cancelButton.click();
        await this.page.getByRole('link', {name: 'OrangeHRM, Inc'}).click();
    }

}

module.exports = LoginPage;
