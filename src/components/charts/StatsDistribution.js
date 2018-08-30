/**
 * Created by liekkas on 2017/4/23.
 * 统计分布
 */
import React, { PropTypes } from 'react'
import Panel from '../Panel'
import {Row, Col, Table} from 'antd'
import ECharts from 're-echarts'
import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2px;
  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    min-width: 60px;
  }
`

const Item = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #bd1a23;
  text-align: center;
  line-height: 60px;
`

class StatsDistribution extends React.Component {

  renderPieChart(v) {
    return {
      // title: {
      //   text: v.name + '占比',
      //   left: 'center',
      // },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: v.name + '占比',
          type: 'pie',
          data: v.data
        }
      ]
    }
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        title: '统计区间',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '统计值',
        dataIndex: 'value',
        key: 'value'
      }
    ]
    return (
      <Panel title={'统计分布'}>
          {
            data.map((item, i) =>
              <Row gutter={25} type={'flex'}>
                <Col md={9}>
                  <div style={{width: '100%', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold', marginBottom: 0}}>{item.name}</div>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexWrap :'wrap'}}>
                    {
                      item.data.map((v, j) =>
                        <Box key={j}>
                          <label>{v.name.split("[")[0]+"档"}</label>
                          <Item>
                            {v.value+"户"}
                          </Item>
                        </Box>
                      )
                    }
                  </div>
                </Col>
                <Col md={13}>
                  <div style={{width: '100%', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold'}}>{item.name}占比</div>
                  <ECharts option={this.renderPieChart(item)} style={{height: 490,width:660}} config={{theme: 'infographic'}}/>
                </Col>
              </Row>
            )
          }
      </Panel>
    )
  }
}

StatsDistribution.propTypes = {
  data: PropTypes.array,
}
StatsDistribution.defaultProps = {
  data: []
}

export default StatsDistribution
