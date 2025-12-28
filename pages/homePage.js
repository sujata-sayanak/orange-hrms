import { expect } from "@playwright/test";
import { waitForDebugger } from "node:inspector";
class HomePage {
    constructor (page){
        this.page = page;
    }

    async navigateToItems(item){
        //await this.page.getByRole('listitem').getByText(item).click();
        await this.page.getByRole('listitem').filter({has: this.page.getByText(item)}).click();
        await expect(this.page.getByRole('heading', {name:item})).toBeVisible();
        //await this.page.locator(`//li[@class='oxd-main-menu-item-wrapper']//span[text()='${item}']`).click();
        //await expect(this.page.locator(`//span[@class='oxd-topbar-header-breadcrumb']//h6[text()='${item}']`)).toBeVisible();
        console.log(`Navigated to module ${item}`)
    }

    async validateItemNotVisible(item){
        await expect(this.page.getByRole('listitem').filter( {has: this.page.getByText(item)})).not.toBeVisible();
        //await expect(this.page.locator(`//li[@class='oxd-main-menu-item-wrapper']//span[text()='${item}']`)).not.toBeVisible();
        console.log(`Validate ${item} not visible.`)
    }


}
module.exports = HomePage;