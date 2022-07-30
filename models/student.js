class Student {
    constructor(id, firstName, lastName, courseEnrolled,
        age, phoneNumber, education_status , university ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.phoneNumber = phoneNumber;
            this.education_status = education_status;
            this.courseEnrolled = courseEnrolled;
            this.university = university;
           
    }
}

module.exports = Student;