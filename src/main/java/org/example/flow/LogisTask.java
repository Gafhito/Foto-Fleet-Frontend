package org.example.flow;

import org.example.locator.LoginTarget;
import org.openqa.selenium.WebDriver;

public class LogisTask {

    WebDriver driver;

    public LogisTask (WebDriver driver){
        this.driver = driver;
    }

    public void ingresarWeb(String urlWeb){
        driver.get(urlWeb);
        driver.manage().window().maximize();
    }

    public void ingresoLogin (String user, String password){
        driver.findElements(LoginTarget.inputEmailPass).get(0).sendKeys(user);
        driver.findElements(LoginTarget.inputEmailPass).get(1).sendKeys(password);
        driver.findElement(LoginTarget.buttonIniciaSeccion).click();
    }

}
