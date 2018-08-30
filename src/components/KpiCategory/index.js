/**
 * Created by liekkas on 2017/3/24.
 */
import React from 'react'
import Panel from '../Panel'
import {Radio} from 'antd'

const RadioGroup = Radio.Group

const KpiCategory = ({data, onChange}) => {
  return (
    <Panel title={'指标分类'}>
      <RadioGroup defaultValue={data[0].label} onChange={v => onChange(v.target.value)}>
        {
          data.map(item =>item.value.length>0?
            <Radio key={item.label} value={item.label}>{item.label}</Radio>:null
          )
        }
      </RadioGroup>
    </Panel>
  )
}

KpiCategory.propTypes = {
  data: React.PropTypes.array,
  onChange: React.PropTypes.func
}

export default KpiCategory
