import 'babel-polyfill'
import dva from 'dva'
import 'antd/dist/antd.less'
import './style.less'
import createLoading from 'dva-loading'
import echarts from 'echarts'
import {echarts as theme} from './theme.zxred'
echarts.registerTheme('infographic', theme)

// 1. Initialize
const app = dva()

app.use(createLoading())

app.model(require('./models/app'))


app.router(require('./router'))

app.start('#root')
