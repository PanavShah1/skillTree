import pandas as pd
import json

def parse_prerequisites(prereq_str): # Takes the prereq list and converts OR and AND
    prerequisites = prereq_str.split(' AND ')
    formatted_prerequisites = []
    for group in prerequisites:
        if ' OR ' in group:
            formatted_prerequisites.append(group.split(' OR '))
        else:
            formatted_prerequisites.append([group])
    return formatted_prerequisites

def build_tree_for_course(course_code, courses, prereqs, seen_courses):
    if course_code in seen_courses: # seen_courses is a list of courses it's encountered
        return None
    
    course = courses.get(course_code) # courses is a pd DataFrame our courses
    if not course:
        return None
    
    seen_courses.add(course_code)
    
    course_name = course['Course Name']
    course_id = len(seen_courses)  # Unique ID based on the number of seen courses

    
    # Find prerequisites for the current course
    prereq_str = prereqs.get(course_code, '')
    prereq_data = parse_prerequisites(prereq_str)
    
    # Build children for the current course
    children = []
    for prereq_group in prereq_data:
        group_children = []
        for prereq_code in prereq_group:
            if prereq_code in courses:
                child_tree = build_tree_for_course(prereq_code, courses, prereqs, seen_courses)
                if child_tree:
                    group_children.append(child_tree)
        if group_children:
            children.append(group_children)
    
    course_node = {
        'id': course_id,
        'code': course_code,
        'name': course_name,
        'course_offered': True,  # Assuming the course is offered
        'instructor': '',  # Placeholder for instructor
        'department': '',
        'applicable_program': '',
        'children': children
    }
    
    return course_node

def get_course_tree(course_code):
    # Read data
    df_courses = pd.read_csv('data/formatted.csv')
    df_prereq = pd.read_csv('data/pre_req.csv')
 #   df_dept = df_prereq
    
    # Ensure all values are strings
    df_prereq['Courses'] = df_prereq['Courses'].astype(str)
    
    # Check for duplicates
    if df_courses['Course Code'].duplicated().any(): # is this check useless?
        df_courses = df_courses.drop_duplicates(subset='Course Code', keep="first")
    if df_prereq['CourseCode'].duplicated().any():
        df_prereq = df_prereq.groupby('CourseCode')['Courses'].apply(lambda x: ' OR '.join(x)).reset_index()

#    if df_dept["Applicable forDepartment(s)"].duplicated().any():
#        df_dept = df_prereq.groupby('CourseCode')['Courses']    

    # Convert DataFrame to dictionary for quick lookup
    courses = df_courses.set_index('Course Code').to_dict(orient='index')
    prereqs = df_prereq.set_index('CourseCode')['Courses'].to_dict()

#    print("this is prereqs")
#    print(df_dept)
    
    # Set to track seen courses to avoid cycles
    seen_courses = set()
    
    # Build the tree for the specified course
    tree_data = build_tree_for_course(course_code, courses, prereqs, seen_courses)
    
    # Remove the root course if it exists in the tree
    if tree_data and tree_data['code'] == course_code:
        return tree_data['children']
    
    return tree_data

# Example usage

if __name__ == '__main__':
    tree = get_course_tree('AE 649')
    print(json.dumps(tree, indent=4))


