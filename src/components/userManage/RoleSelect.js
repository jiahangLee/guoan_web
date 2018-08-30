/**
 * Created by zhangtao15 on 2017-06-29.
 */
import { connect } from 'dva'
import fetch from 'dva/fetch'
import REST_USER_API from '../../consts/userApi'
import { Select } from 'antd';
const Option = Select.Option;
import {local, session} from '../../utils/storage.js'

function fetchData( callback) {
  const operatorId = session.get("operatorId");
  const data = fetch(REST_USER_API.ROLELISTAUTH+"?operatorId="+operatorId, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
  }).then(function (response) {
      const result = response;
      const data = [];
      result.forEach((r) => {
        data.push({
          value: r.roleId,
          text: r.roleName,
        });
      });
      callback(data);
  }).catch(err => {
  });
}

class RoleSelect extends React.Component {
  getSelectData(){
    return this.state.value
  }
  state = {
    data: [],
    value: '',
  }
  componentWillMount () {
    fetchData(data => this.setState({ data }));
  }

  handleChange = (value) => {
    this.setState({ value });
    this.triggerChange({ value });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Select
        value={this.state.value}
        style={{ width: 284.67 }}
        onChange={this.handleChange}
        size="large"
      >
        {options}
      </Select>
    );
  }
}
export default RoleSelect;



