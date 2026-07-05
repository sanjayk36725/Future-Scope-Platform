from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from .database import Base

class AttendanceStatus(str, enum.Enum):
    PRESENT = "Present"
    ABSENT = "Absent"
    LATE = "Late"
    EXCUSED = "Excused"

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    roll_number = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    class_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships with cascade deletes
    attendance_records = relationship("Attendance", back_populates="student", cascade="all, delete-orphan")
    submissions = relationship("AssignmentSubmission", back_populates="student", cascade="all, delete-orphan")


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    status = Column(SQLEnum(AttendanceStatus), nullable=False, default=AttendanceStatus.PRESENT)
    remarks = Column(String, nullable=True)

    # Back-populating relationship to access full student details
    student = relationship("Student", back_populates="attendance_records")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    max_score = Column(Float, nullable=False, default=100.0)
    due_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to track all student submissions of this assignment
    submissions = relationship("AssignmentSubmission", back_populates="assignment", cascade="all, delete-orphan")


class AssignmentSubmission(Base):
    __tablename__ = "assignment_submissions"

    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    submission_date = Column(DateTime, default=datetime.utcnow)
    score_obtained = Column(Float, nullable=True)
    teacher_feedback = Column(String, nullable=True)
    status = Column(String, default="Submitted")  # Submitted, Graded, Late

    # Relationships
    student = relationship("Student", back_populates="submissions")
    assignment = relationship("Assignment", back_populates="submissions")
