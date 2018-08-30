/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'
import { TreeSelect } from 'antd'
import ConditionBox from './ConditionBox'
import { flat2TreeSelect } from '../../../utils/ztool'
import _ from 'lodash'

// const conditions = [
//   {'parent_id': 0, 'name': '湖南省', 'remark': '5', 'id': 1, 'label': '2'},
//   {'parent_id': 1, 'name': '长沙市', 'remark': '7', 'id': 2, 'label': '3'},
//   {'parent_id': 2, 'name': '长沙项目1', 'remark': '8', 'id': 3, 'label': '4'}
// ]

class ByRegion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '-1',
      list: [],
      conditions: flat2TreeSelect(props.areas, 'id', 'parent_id', '-1', '请选择')
    }
  }

//   componentDidMount() {
//     const self = this
//     request(config.rest.AREA)
//       .then(result => {
//         self.setState({
//           list: result.data,
//           conditions: flat2TreeSelect(result.data, 'id', 'parent_id', '0', '全国')})
//       })
//   }

  getValue () {
    return _.find(this.props.areas, {id: this.state.value}) || {type: '', name: '', id: -1}
  }

  onChange = (value) => {
    if (value) {
      this.setState({value})
    }
    if (this.props.onRegionChange){
      this.props.onRegionChange(value)
    }
  }


  render () {
    const data = flat2TreeSelect(this.props.areas, 'id', 'parent_id', '-1', '请选择')
    return (
      <ConditionBox>
        <label>地区：</label>
        <TreeSelect style={{width: '150px'}}
          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
          treeData={data}
          defaultValue={'请选择'}
          value={this.state.value}
          treeDefaultExpandedKeys={['-1']}
          onChange={this.onChange} />
      </ConditionBox>

    )
  }
}


ByRegion.propTypes = {
  areas: React.PropTypes.array,
  onRegionChange:PropTypes.func
}

export default ByRegion
