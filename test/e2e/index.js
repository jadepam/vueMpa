const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://www.baidu.com/");
        await driver
            .findElement(By.name("wd"))
            .sendKeys("hello world", Key.RETURN);
        await driver.wait(until.titleIs("hello world"), 1000);
    } finally {
        await driver.quit();
    }
})();
