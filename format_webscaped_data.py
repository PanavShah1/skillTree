import os
import re
from bs4 import BeautifulSoup
import pandas as pd

with open('output.txt') as html_file:
    soup = BeautifulSoup(html_file, 'html')
# print(soup.prettify())

course_names = []
course_instuctors = []
for tr_tag in soup.find_all('tr'):
    td_tags = tr_tag.find_all('td')

    course = []
    
    for td_tag in td_tags:
        td_text = td_tag.get_text()
        # print(td_text)
        course.append(td_text)
    # print(course)

    if len(course) == 2:
        course_names.append(course)

    if len(course) == 4:
        course_instuctors.append(course)

df1 = pd.DataFrame(course_names, columns=['Course Code', 'Course Name'])
# print(df1.head())

df2 = pd.DataFrame(course_instuctors, columns=['Sr No', 'Course Code', 'Course Name', 'Instructor Name'])
df2['Course Code'] = df2['Course Code'].str.replace(r'\n', '', regex=True)
# print(df2.head())


df = pd.merge(df1, df2, on='Course Code', how='left')
print(df.head())

df.drop(columns=['Course Name_y', 'Sr No'], inplace=True)
df.rename(columns={'Course Name_x': 'Course Name'}, inplace=True)
df = df[~df['Course Code'].isin(['\xa0', ''])]
df.reset_index(drop=True, inplace=True)

with open('courses.txt', 'w') as f:
    f.write(df.to_string(index=True))

