const { constants } = require("node:buffer");
const { addAbortListener } = require("node:events");
import { expect } from "@playwright/test"

class AdminPage {
    constructor(page) {
        this.page = page;

        this.addButton = page.getByRole('button', { name: ' Add' })
        this.userRole = page.locator(`(//label[text()='User Role']//following::div[text()='-- Select --'])[1]`)
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' })
        this.status = page.locator(`(//label[text()='Status']//following::div[text()='-- Select --'])[1]`)
        this.username = page.locator(`(//label[text()='Username']//following::input[@class='oxd-input oxd-input--active'])[1]`)
        this.password = page.locator(`(//label[text()='Password']//following::input[@type='password'])[1]`)
        this.confirmPassword = page.locator(`(//label[text()='Password']//following::input[@type='password'])[2]`)
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.searchButton = page.locator(`//button[text()=' Search ']`)
        this.searchUsername = page.locator(`(//label[text()='Username']//following::input[@class='oxd-input oxd-input--active'])[1]`);
    }

    async selectUserRole(role) {
        await this.userRole.click();
        await this.page.locator(`//div[@role='option']//span[text()='${role}']`).click();
        console.log(`${role} selected`)

    }

    async typeEmployeeName(empName) {
        await this.employeeName.click()
        await this.employeeName.fill(empName)
        await this.page.waitForTimeout(2000)
        await this.page.locator(`//div[@role='option'][1]`).click()
        const empNameValue = await this.page.locator("//input[@placeholder='Type for hints...']").inputValue();
        console.log(empNameValue);
        console.log(`Employee Name added`)
        return empNameValue;
    }

    async selectStatus(statusValue) {
        await this.status.click();
        await this.page.locator(`//div[@role='option']//span[text()='${statusValue}']`).click()
        console.log(`${statusValue} selected.`)
    }

    async enterUsername(name) {
        await this.username.fill(name)
        console.log(`${name} added.`)
    }

    async enterPassword(password) {
        await this.password.fill(password)
        console.log(`${password} added.`)
    }

    async enterConfirmPassword(confirmPassword) {
        await this.confirmPassword.fill(confirmPassword)
        console.log(`${confirmPassword} added.`)
    }

    async addUser(role, empName, statusValue, name, pass, confirmPass) {
        await this.addButton.click()
        await this.selectUserRole(role);
        const empNameVal = await this.typeEmployeeName(empName);
        await this.selectStatus(statusValue)
        await this.enterUsername(name)
        await this.enterPassword(pass)
        await this.enterConfirmPassword(confirmPass)
        await this.saveButton.click()
        console.log(`${name} successfully added.`);
        return empNameVal;

    }


    async searchUser(name) {
        await this.page.waitForTimeout(2000)
        await this.page.getByRole('textbox').nth(1).click();
        await this.page.getByRole('textbox').nth(1).fill(name);
        await this.page.getByRole('textbox').nth(1).press('Enter');
        await this.searchButton.click()
        await this.page.waitForTimeout(2000)
    }

    async validateSearchedUserDetails(user, role, empName, status) {
        const cellLocator = `//div[@class='oxd-table-body']//div[1]//div[@role='cell']`
        await expect(this.page.locator(`${cellLocator}//div[text()='${role}']`).first()).toBeVisible();
        await expect(this.page.locator(`${cellLocator}//div[text()='${status}']`).first()).toBeVisible();
        await expect(this.page.getByText(empName).first()).toBeVisible();
        await expect(this.page.getByText(user).first()).toBeVisible();
        console.log(`Validated ${user} user details.`)
    }
}

module.exports = AdminPage;