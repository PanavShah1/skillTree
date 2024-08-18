from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from sudoku import Sudoku
from pydantic import BaseModel
from typing import List
import pandas as pd
from get_pre_req import get_course_tree

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('../database/data/formatted.csv') as f:
    df = pd.read_csv(f)

@app.get("/course/{course_code}")
async def get_course(course_code: str):
    print(course_code)
    course = df.loc[df['Course Code'] == course_code]
    course = course.fillna('N/A')
    if course.empty:
        print(course)
        return {"error": "Course not found"}
    index = course.index[0]

    course_dict = course.iloc[0].to_dict()
    course_dict["index"] = int(index)
    course_dict["children"] = get_course_tree(course_code)
    print(course_dict)
    return course_dict

    # course_dict = get_course_tree(course_code)
    # print(course_dict)
    # return course_dict
    


