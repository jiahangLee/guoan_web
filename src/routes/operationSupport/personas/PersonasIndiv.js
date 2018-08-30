/**
 * Created by wanggy on 2017/10/16
 */
import React from 'react'
import PersonasTemplate from '../template/PersonasTemplate'



const BIZ_SUBTYPE = 'personasIndiv'
const personasIndiv = () => {
  return (
    <PersonasTemplate  bizSubtype={BIZ_SUBTYPE} />
  )
}

export default personasIndiv
