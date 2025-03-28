import puppeteer from "puppeteer";

Scrapper = async (username,password) =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
        await page.goto('https://mrei.icloudems.com/corecampus/index.php' , {waitUntil:"load"});
        await page.type("#useriid", username);
        await page.type("#actlpass",password);
        await page.click("#psslogin");
        await page.waitForNavigation();
        
        await page.goto('https://mrei.icloudems.com/corecampus/student/attendance/subwise_attendace_new.php');
        await page.waitForSelector("#acadyear");
        await page.evaluate((semester) => {
            let semDropdown = document.querySelector("#semNum");
            let option = [...semDropdown.options].find(opt => opt.value === semester);
            if (option) option.selected = true;
            semDropdown.dispatchEvent(new Event("change", { bubbles: true }));
        }, semester);
        await page.waitForTimeout(2000);

        // Select Class 
        await page.evaluate((classId) => {
            let classDropdown = document.querySelector("#classid");
            let option = [...classDropdown.options].find(opt => opt.value === classId);
            if (option) option.selected = true;
            classDropdown.dispatchEvent(new Event("change", { bubbles: true }));
        }, classId);
        await page.waitForTimeout(2000);
        
        await page.select("#getattendance");
        await page.waitForSelector("#attendanceTable");

        

    }
}

