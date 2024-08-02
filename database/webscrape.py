import os
import shutil
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
import time

# Function to remove existing chromedriver
def remove_existing_chromedriver():
    chromedriver_dir = os.path.dirname(ChromeDriverManager().install())
    if os.path.exists(chromedriver_dir):
        shutil.rmtree(chromedriver_dir)
        print(f"Removed existing chromedriver directory: {chromedriver_dir}")



# Function to extract department content for a specific link number
def extract_department_content(link_no):
    # Remove existing chromedriver
    # remove_existing_chromedriver()

    # # Install and get the path to the new chromedriver
    chromedriver_path = ChromeDriverManager().install()
    # print(f"Installed new chromedriver at: {chromedriver_path}")

    # Set up Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run headless for no GUI
    chrome_options.add_argument("--disable-gpu")  # Disable GPU hardware acceleration
    chrome_options.add_argument("--no-sandbox")  # Bypass OS security model
    chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems

    # Initialize ChromeDriver using the path obtained from WebDriverManager
    service = ChromeService(executable_path=chromedriver_path)
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Open the main page
    url = "https://portal.iitb.ac.in/asc/Courses"
    driver.get(url)
    print("Successfully fetched the main page.")
    # Get the department links
    department_links = driver.find_elements(By.XPATH, "//a[@onclick]")
    
    if link_no >= len(department_links):
        print(f"Link number {link_no} exceeds available links.")
        return
    
    link = department_links[link_no]
    department_name = link.text
    print(f"Clicking on department: {department_name}")

    # Scroll into view and click the link
    ActionChains(driver).move_to_element(link).click(link).perform()
    time.sleep(2)  # Wait for the page to load

    # Switch to the first frame
    driver.switch_to.frame(driver.find_element(By.NAME, "header"))
    header_content = driver.page_source
    # print(f"Header HTML content for {department_name}:\n{header_content}\n")

    # Switch back to the default content before switching to the next frame
    driver.switch_to.default_content()

    # Switch to the nested frames
    driver.switch_to.frame(driver.find_element(By.NAME, "sidepanel"))
    sidepanel_content = driver.page_source
    # print(f"Side Panel HTML content for {department_name}:\n{sidepanel_content}\n")

    driver.switch_to.default_content()
    driver.switch_to.frame(driver.find_element(By.NAME, "content"))
    content_frame_content = driver.page_source
    # print(f"Content Frame HTML content for {department_name}:\n{content_frame_content}\n")

    with open("resources/course.txt", "w") as f:
        f.write(sidepanel_content)
    
    with open("resources/instructor.txt", "w") as f:
        f.write(content_frame_content)

    # Switch back to the main page
    driver.switch_to.default_content()
    driver.get(url)
    time.sleep(0.5)  # Wait for the main page to reload

    driver.quit()
    print(f"Successfully fetched content for department: {department_name}")

# Function to get department data for a specific link number
def get_department_data(link_no):
    try:
        extract_department_content(link_no)
    except Exception as e:
        print(f"Failed to get content for department: {e}")


if __name__ == "__main__":
    get_department_data(1)
    
# Close the browser



