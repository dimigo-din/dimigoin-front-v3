import React from 'react'
import { Permission } from '../../constants/types'
import { useMyData } from '../../hooks/api'
import EducationlTeacherMain from './EducationalTeacher'

const TeacherMain = () => {
  const myData = useMyData()
  if(myData?.permissions.includes(Permission.meal))
    return <MealRegisterMain />
  return <EducationlTeacherMain />
}

export default TeacherMain