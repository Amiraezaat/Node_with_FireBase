'use strict'

const firebase = require('../db')
const Student = require('../models/student')
const firestore = firebase.firestore()

const addStudent = async (req, res, next) => {
  try {
    const data = req.body
    await firestore
      .collection('students')
      .doc()
      .set(data)
    res.status(200).json({ message: 'Your data saved successfuly' })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'there is an error occur', Error: error.message })
  }
}

const getAllStudents = async (req, res, next) => {
  try {
    const students = await firestore.collection('students')
    const data = await students.get()
    const studentsArray = []
    if (data.empty) {
      res.status(404).json({ message: 'No student records found' })
    } else {
      data.forEach(doc => {
        const student = new Student(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().courseEnrolled,
          doc.data().age,
          doc.data().phoneNumber,
          doc.data().subject,
          doc.data().college
        )
        studentsArray.push(student)
      })
      res.status(200).json({ message: 'Done', Students: studentsArray })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'there is an error occur', Error: error.message })
  }
}

const getStudent = async (req, res, next) => {
  try {
    const id = req.params.id
    const student = await firestore.collection('students').doc(id)
    const data = await student.get()
    if (!data.exists) {
      res.status(404).json({ message: 'There is no student with this ID' })
    } else {
      res.status(200).json({ Student_Data: data.data() })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'there is an error occur', Error: error.message })
  }
}

const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const student = await firestore.collection('students').doc(id)
    await student.update(data)
    res.status(200).json({ message: 'Student data updated successfully' })
  } catch (error) {
    console.log({ error: error })
    res
      .status(400)
      .json({ message: 'there is an error occur', Error: error.message })
  }
}

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id
    await firestore
      .collection('students')
      .doc(id)
      .delete()
    res.status(200).json({ message: 'Studnet deleted successfuly' })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'there is an error occur', Error: error.message })
  }
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent
}
