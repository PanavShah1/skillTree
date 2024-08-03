from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from sudoku import Sudoku
from pydantic import BaseModel
from typing import List
import pandas as pd


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
    return {"code": course_code, "name": df[df['Course Code'] == course_code]['Course Name'].values[0]}
    


