import org.example.flow.LogisTask;
import org.example.path.GeneralPath;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class Testcases {

    WebDriver driver;
    LogisTask logisTask;

    @BeforeMethod
    public void before() {
        driver = new ChromeDriver();
        logisTask = new LogisTask(driver);
        logisTask.ingresarWeb(GeneralPath.URL_LOGIN);

    }

    @Test
    public void testExitoso() {

        logisTask.ingresoLogin("moanca25@gmail.com", "1019037233");

    }

    @Test
    public void testFallido() {
        logisTask.ingresoLogin("moanca25@gmail.com", "23455");
    }

    @AfterMethod

    public void cierre() {
        driver.quit();
        try {
            Thread.sleep(8000);

        } catch (InterruptedException e) {

        }
    }


}
