from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from .database import engine, Base, get_db
from . import models, schemas

# Automatically bind database metadata tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FSP Education Module Backend",
    description="FastAPI service configuring student registers, logs, and assignment submissions.",
    version="1.0.0"
)

# CORS Policy configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "module": "Education",
        "framework": "FastAPI + SQLAlchemy",
        "documentation": "/docs"
    }


# ----------------------------------------------------------------------
# 1. STUDENTS SERVICE ENDPOINTS
# ----------------------------------------------------------------------
@app.post("/students", response_model=schemas.StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.roll_number == student.roll_number).first()
    if db_student:
        raise HTTPException(status_code=400, detail="Roll number already registered.")
    
    db_email = db.query(models.Student).filter(models.Student.email == student.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered.")

    new_student = models.Student(**student.model_dump())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@app.get("/students", response_model=List[schemas.StudentResponse])
def get_all_students(
    skip: int = 0, 
    limit: int = 100, 
    class_name: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    query = db.query(models.Student)
    if class_name:
        query = query.filter(models.Student.class_name == class_name)
    return query.offset(skip).limit(limit).all()

@app.get("/students/{student_id}", response_model=schemas.StudentDetailResponse)
def get_student_by_id(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")
    return student

@app.put("/students/{student_id}", response_model=schemas.StudentResponse)
def update_student(student_id: int, student_data: schemas.StudentUpdate, db: Session = Depends(get_db)):
    student_query = db.query(models.Student).filter(models.Student.id == student_id)
    student = student_query.first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")
    
    update_dict = student_data.model_dump(exclude_unset=True)
    if not update_dict:
        return student

    student_query.update(update_dict, synchronize_session=False)
    db.commit()
    db.refresh(student)
    return student

@app.delete("/students/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student_query = db.query(models.Student).filter(models.Student.id == student_id)
    student = student_query.first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")
    
    student_query.delete(synchronize_session=False)
    db.commit()
    return None


# ----------------------------------------------------------------------
# 2. ATTENDANCE SERVICE ENDPOINTS
# ----------------------------------------------------------------------
@app.post("/attendance", response_model=schemas.AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == attendance.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student record not found.")
    
    # Avoid duplicate attendance records for the same student on the same date
    existing = db.query(models.Attendance).filter(
        models.Attendance.student_id == attendance.student_id,
        models.Attendance.date == attendance.date
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Attendance record already logs student parameters for this date.")

    new_attendance = models.Attendance(**attendance.model_dump())
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance

@app.get("/attendance", response_model=List[schemas.AttendanceResponse])
def get_attendance_records(
    student_id: Optional[int] = None,
    specific_date: Optional[date] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Attendance)
    if student_id:
        query = query.filter(models.Attendance.student_id == student_id)
    if specific_date:
        query = query.filter(models.Attendance.date == specific_date)
    return query.all()

@app.put("/attendance/{record_id}", response_model=schemas.AttendanceResponse)
def update_attendance_record(record_id: int, update_data: schemas.AttendanceUpdate, db: Session = Depends(get_db)):
    record_query = db.query(models.Attendance).filter(models.Attendance.id == record_id)
    record = record_query.first()
    if not record:
        raise HTTPException(status_code=404, detail="Attendance entry not found.")
    
    update_dict = update_data.model_dump(exclude_unset=True)
    if not update_dict:
        return record

    record_query.update(update_dict, synchronize_session=False)
    db.commit()
    db.refresh(record)
    return record


# ----------------------------------------------------------------------
# 3. ASSIGNMENTS & SUBMISSIONS ENDPOINTS
# ----------------------------------------------------------------------
@app.post("/assignments", response_model=schemas.AssignmentResponse, status_code=status.HTTP_201_CREATED)
def create_assignment(assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)):
    new_assignment = models.Assignment(**assignment.model_dump())
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment

@app.get("/assignments", response_model=List[schemas.AssignmentResponse])
def get_all_assignments(db: Session = Depends(get_db)):
    return db.query(models.Assignment).all()

@app.get("/assignments/{assignment_id}", response_model=schemas.AssignmentDetailResponse)
def get_assignment_by_id(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(models.Assignment).filter(models.Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment sheet not found.")
    return assignment

@app.post("/submissions", response_model=schemas.SubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_assignment(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    # Verify both Student and Assignment entities exist
    student = db.query(models.Student).filter(models.Student.id == submission.student_id).first()
    assignment = db.query(models.Assignment).filter(models.Assignment.id == submission.assignment_id).first()
    if not student:
        raise HTTPException(status_code=440, detail="Invalid Student reference.")
    if not assignment:
        raise HTTPException(status_code=441, detail="Invalid Assignment reference.")

    # Avoid duplicate submission records
    existing = db.query(models.AssignmentSubmission).filter(
        models.AssignmentSubmission.student_id == submission.student_id,
        models.AssignmentSubmission.assignment_id == submission.assignment_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Student has already uploaded a submission for this assignment.")

    new_submission = models.AssignmentSubmission(**submission.model_dump())
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

@app.put("/submissions/{submission_id}", response_model=schemas.SubmissionResponse)
def grade_submission(submission_id: int, update_data: schemas.SubmissionUpdate, db: Session = Depends(get_db)):
    submission_query = db.query(models.AssignmentSubmission).filter(models.AssignmentSubmission.id == submission_id)
    submission = submission_query.first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission entry not found.")

    update_dict = update_data.model_dump(exclude_unset=True)
    if not update_dict:
        return submission

    submission_query.update(update_dict, synchronize_session=False)
    db.commit()
    db.refresh(submission)
    return submission
