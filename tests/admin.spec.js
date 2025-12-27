import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage'
import AdminPage from '../pages/adminPage';
import { describe } from 'node:test';

test.use({ storageState: 'Admin.json' });

    test.beforeEach(async({ page })=>{
         await page.goto("https://opensource-demo.orangehrmlive.com")
    })

describe('Admin - User Management', () => {
    test('Add New user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        const adminPage = new AdminPage(page);
        
        const username = `TestUser${Math.floor(1000 + (Math.random() *  9000))}`
        const password = 'admin123'

        console.log(username, password)
        await homePage.navigateToItems("Admin")
        const empName = await adminPage.addUser("ESS", "test", "Enabled", username, password, password)
        await adminPage.searchUser(username)
        await adminPage.validateSearchedUserDetails(username, "ESS", empName, "Enabled" )
        await loginPage.logout()
        await loginPage.login(username, password)
        await homePage.validateItemNotVisible("Admin")
       
    })


    // test('Edit user', async (page) => {

    // })

    // test('Delete user', async (page) => {

    // })



})
