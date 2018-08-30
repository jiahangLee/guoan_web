/**
 * Created by sunjl on 2017/10/18.
 */
import React from 'react'
import PersonasGroupTemplate from '../template/PersonasGroupTemplate'
import KPIS from '../../../consts/kpis'

const CATEGORY_ARR = [KPIS.personasGroupValue, KPIS.personasGroupViscosity,KPIS.personasGroupBusinessGroup]
const TITLE = '群体画像'
const BIZ = 'personas'
const BIZ_SUBTYPE = 'personasGroup'
const PersonasGroup = () => {
  return (
    <PersonasGroupTemplate title={TITLE} categoryArr={CATEGORY_ARR} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default PersonasGroup
