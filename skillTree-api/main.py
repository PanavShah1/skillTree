from webscrape import get_department_data, extract_department_content
from format_webscaped_data import format_webscraped_data

for i in range(34):
    get_department_data(i)
    format_webscraped_data(header=True if i == 0 else False)
