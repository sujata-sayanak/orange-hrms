import { test as setup, expect, chromium } from "@playwright/test"
import LoginPage from "../pages/loginPage"
import { ENV } from "../envfiles/env"

setup('Authentication', async ({ browser}) => {

//     const userCredentials = [{ "username": "Admin", "password": "admin123" }//,
//    // { "username": "TestUser1", "password": "password1" }
//     ];

        const userCredentials = [{ username: ENV.USERNAME, password: ENV.PASSWORD }
    ];
    console.log(process.env.APP_USERNAME, process.env.APP_PASSWORD);

    for (const user of userCredentials) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page)

        await loginPage.gotoLoginPage();
        await loginPage.login(user.username, user.password)
        await page.context().storageState({ path: `${user.username}.json` })
        await page.close()
        await context.close();

    }

})