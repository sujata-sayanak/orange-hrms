import { expect } from "@playwright/test";
class HomePage {
    constructor (page){
        this.page = page;
    }

    async navigateToItems(item){
        await this.page.locator(`//li[@class='oxd-main-menu-item-wrapper']//span[text()='${item}']`).click();
        await expect(this.page.locator(`//span[@class='oxd-topbar-header-breadcrumb']//h6[text()='${item}']`)).toBeVisible();
        console.log(`Navigated to module ${item}`)
    }

    async validateItemNotVisible(item){
        await expect(this.page.locator(`//li[@class='oxd-main-menu-item-wrapper']//span[text()='${item}']`)).not.toBeVisible();
        console.log(`Validate ${item} not visible.`)
    }


}
module.exports = HomePage;