import pandas as pd

# Load the CSV files
course_info_df = pd.read_csv('data/formatted.csv')
prereq_df = pd.read_csv('data/pre_req.csv')

# Function to evaluate if a course is applicable based on department and discipline restrictions
def is_applicable(row, department, discipline):
    applicable_departments = row['Applicable for Department(s)']
    qualifying_discipline = row['Qualifyingdiscipline']
    
    # Handle cases where the fields are nil
    if pd.isna(applicable_departments) or pd.isna(qualifying_discipline):
        return True
    
    if department in applicable_departments and discipline in qualifying_discipline:
        return True
    return False

# Function to parse and format prerequisites
def parse_prerequisites(courses):
    if pd.isna(courses):
        return "No prerequisites"
    
    # Split by "and" first to handle groups of "OR"
    and_groups = courses.split('and')
    
    prerequisites = []
    for group in and_groups:
        # Split by "OR" and strip whitespace
        or_courses = [course.strip() for course in group.replace('(', '').replace(')', '').split('OR')]
        prerequisites.append(or_courses)
    
    return prerequisites

# Function to display prerequisites in a tree format
def display_prerequisites(course_code, department=None, discipline=None):
    course_row = prereq_df[prereq_df['CourseCode'] == course_code]
    
    if course_row.empty:
        return "This course has no prerequisites or does not exist in the prerequisites CSV."
    
    prerequisites = parse_prerequisites(course_row.iloc[0]['Courses'])
    
    # Consider department and discipline restrictions
    if department and discipline:
        applicable = is_applicable(course_row.iloc[0], department, discipline)
        if not applicable:
            return "The course has prerequisites, but they are not applicable for the specified department or discipline."
    
    print(f"Prerequisites for course {course_code} ({course_row.iloc[0]['CourseName']}):")
    for i, group in enumerate(prerequisites, 1):
        if len(group) > 1:
            print(f"  {i}. Any of these: {', '.join(group)}")
        else:
            print(f"  {i}. {group[0]}")

# Example usage
course_code = input("Enter the course code: ")
department = input("Enter the department (or leave blank): ")
discipline = input("Enter the discipline (or leave blank): ")

display_prerequisites(course_code, department if department else None, discipline if discipline else None)

