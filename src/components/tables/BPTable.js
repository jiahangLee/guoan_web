/**
 * Created by liekkas on 2017/2/16.
 * 后端分页 Back Paginate
 */
import React, {PropTypes} from 'react'
import { Table, Pagination, Card } from 'antd'

const BPTable = (props) => {
  const { total, columns, data, page, pageSize, useFixedHeader, loading,
    rowKeyField, rowSelection, onPageChange, onPageSizeChange,
    showSizeChanger, showQuickJumper } = props

  return (
    <Card style={{padding: 0, marginBottom: '24px'}} bordered={false} bodyStyle={{padding: 0}}>
      <Table dataSource={data} onChange={(a, b, c) => this.onTableChange(a, b, c)}
        useFixedHeader={useFixedHeader} rowKey={item => item[rowKeyField]}
        rowSelection={rowSelection} bordered
        columns={columns} loading={loading}
        pagination={false} />
      <div style={{margin: '10px', float: 'right'}}>
        <Pagination showSizeChanger={showSizeChanger}
          showQuickJumper={showQuickJumper}
          showTotal={(total) => `共 ${total} 条`}
          current={page}
          onChange={(v) => onPageChange(v)} pageSizeOptions={['10', '20', '30', '40']}
          onShowSizeChange={(currentPage, size) => onPageSizeChange(currentPage, size)}
          pageSize={pageSize} total={total} />
      </div>
    </Card>
  )
}

BPTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rowSelection: PropTypes.object,
  rowKeyField: PropTypes.string,
  total: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  showSizeChanger: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  loading: PropTypes.bool
}

BPTable.defaultProps = {
  columns: [],
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  rowSelection: null,
  rowKeyField: 'id',
  useFixedHeader: false,
  showSizeChanger: true,
  showQuickJumper: true
}

export default BPTable
