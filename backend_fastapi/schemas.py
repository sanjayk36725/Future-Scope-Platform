from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
from datetime import date, datetime
from .models import AttendanceStatus

# ----------------------------------------
# ATTENDANCE SCHEMAS
# ----------------------------------------
class AttendanceBase(BaseModel):
    date: date
    status: AttendanceStatus
    remarks: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    student_id: int

class AttendanceUpdate(BaseModel):
    status: Optional[AttendanceStatus] = None
    remarks: Optional[str] = None

class AttendanceResponse(AttendanceBase):
    id: int
    student_id: int

    model_config = ConfigDict(from_attributes=True)


# ----------------------------------------
# SUBMISSION SCHEMAS
# ----------------------------------------
class SubmissionBase(BaseModel):
    assignment_id: int
    student_id: int
    score_obtained: Optional[float] = None
    teacher_feedback: Optional[str] = None
    status: Optional[str] = "Submitted"

class SubmissionCreate(SubmissionBase):
    pass

class SubmissionUpdate(BaseModel):
    score_obtained: Optional[float] = None
    teacher_feedback: Optional[str] = None
    status: Optional[str] = "Graded"

class SubmissionResponse(SubmissionBase):
    id: int
    submission_date: datetime

    model_config = ConfigDict(from_attributes=True)


# ----------------------------------------
# STUDENT SCHEMAS
# ----------------------------------------
class StudentBase(BaseModel):
    roll_number: str = Field(..., description="Unique university roll registration identifier")
    first_name: str
    last_name: str
    email: EmailStr
    class_name: str

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    class_name: Optional[str] = None

class StudentResponse(StudentBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Extended Student response showing nested attendance and submissions
class StudentDetailResponse(StudentResponse):
    attendance_records: List[AttendanceResponse] = []
    submissions: List[SubmissionResponse] = []

    model_config = ConfigDict(from_attributes=True)


# ----------------------------------------
# ASSIGNMENT SCHEMAS
# ----------------------------------------
class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    max_score: float = Field(default=100.0, ge=0)
    due_date: datetime

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    max_score: Optional[float] = None
    due_date: Optional[datetime] = None

class AssignmentResponse(AssignmentBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class AssignmentDetailResponse(AssignmentResponse):
    submissions: List[SubmissionResponse] = []

    model_config = ConfigDict(from_attributes=True)
