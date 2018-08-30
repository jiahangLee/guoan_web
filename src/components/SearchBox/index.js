/**
 * Created by liekkas on 2017/3/2.
 * 基础筛选框
 */
import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import Panel from '../Panel'
import ByRegion from './conditions/ByRegion'
import ConditionBox from './conditions/ConditionBox'
import ByPeriod from './conditions/ByPeriod'
import ByPeriodFlowTrend from './conditions/ByPeriodFlowTrend'
import ByInput from './conditions/ByInput'
import BySelectInput from './conditions/BySelectInput'
import BySection from "./conditions/BySection";
import ByDvbProgram from "./conditions/ByDvbProgram";
import ByPeriodDvbProgram from "./conditions/ByPeriodDvbProgram";
import BySectionProgram from "./conditions/BySectionProgram";
import BySectionProgramThree from "./conditions/BySectionProgramThree";
import {local} from "../../utils/storage"
import ByDoubleCascade  from "./conditions/ByDoubleCascade";
import ByDoubleCascadeApp  from "./conditions/ByDoubleCascadeApp";
import BySectionGameRoom  from "./conditions/BySectionGameRoom";
import ByTripleCascade  from "./conditions/ByTripleCascade";


const Container = styled.div`
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`
const dataAssetsPeriodTypes = [
  {cn: '日', en: 'day'},
  {cn: '周', en: 'week'},
  {cn: '月', en: 'month'},
  {cn: '年', en: 'year'}];

const periodTypes = [
  {cn: '周', en: 'week'},//默认日期放第一位 与defaultPeriodType一致
  {cn: '月', en: 'month'},
  {cn: '季度', en: 'quarter'},
  {cn: '年', en: 'year'}];

const SearchBox = ({onSearch, initValue,bizSubtype,biz,onPeriodChange,onStartTimeChange,onRegionChange,onSectionChange}) => {
  let byRegion, byPeriod,bySectionOrProgram,byInputCano,byInputDeviceid, byDoubleCascade,byDoubleCascadeapp,byTripleCascade,bySectionBusinessType,bySectionBusinessTypeChildren
  //缓存中取得 作为的selectinput的option
  let canoArray =local.get("canoArray")==undefined?[]:local.get("canoArray")
  let deviceidArray =local.get("deviceidArray")==undefined?[]:local.get("deviceidArray")
  let cano,deviceid = ''
  const handleSearch = () => {

    const region =  _.isEmpty(byRegion)?new Object():byRegion.getValue()
    const period = byPeriod.getValue()
    if (region && period) {
      let param = {region, period}
      if (bySectionOrProgram) {
        const sectionOrProgram = bySectionOrProgram.getValue()
        let sectionOrProgramName ="";
        if (bizSubtype == "dvbProgram" || bizSubtype == "replayProgram_three" || bizSubtype == "dvbProgram_three" ||"channel_pie"==bizSubtype|| "channel"==bizSubtype|| "channel_three"==bizSubtype||"channelGroupRank"==bizSubtype||"apk_pie"==bizSubtype||"area_pie"==bizSubtype||"single_pie"==bizSubtype)
          sectionOrProgramName = bySectionOrProgram.getName()
        param = {...param, sectionOrProgram,sectionOrProgramName}
      }
      if(byTripleCascade) {
        const {valueFirst, valueSecond,valueThird} = byTripleCascade.getValue()
        param = {...param,valueFirst, valueSecond,valueThird}
      }
      if(byDoubleCascade) {
        const {valueFirst, valueSecond} = byDoubleCascade.getValue()
        param = {...param,valueFirst, valueSecond}
      }
      if(bySectionBusinessType){
        const businessType = bySectionBusinessType.getValue()
        param = {...param, businessType}
      }
      if(bySectionBusinessTypeChildren){
        const businessTypeChildren = bySectionBusinessTypeChildren.getValue()
        param = {...param, businessTypeChildren}
      }
      if(byDoubleCascadeapp) {
        const {valueFirst, valueSecond} = byDoubleCascadeapp.getValue()
        param = {...param,valueFirst, valueSecond}
      }
      if(byInputCano){
        cano = byInputCano.getValue()
        param = {...param,cano}
        let option = {key:cano,value:cano}
        if(JSON.stringify(canoArray).indexOf(JSON.stringify(option)) == -1){
          canoArray.push({key:cano,value:cano})
          local.set("canoArray",canoArray)
        }
      }
      if(byInputDeviceid){
        deviceid = byInputDeviceid.getValue()
        param = {...param,deviceid}
        let option = {key:deviceid,value:deviceid}
        if(JSON.stringify(deviceidArray).indexOf(JSON.stringify(option)) == -1){
          deviceidArray.push({key:deviceid,value:deviceid})
          local.set("deviceidArray",deviceidArray)
        }
      }
      onSearch(param)
    }
  }
  const rangeMode =bizSubtype != "adBusinessRank" && bizSubtype != "channel_pie" && bizSubtype != "common_pie" && bizSubtype != "programRank" && bizSubtype != "channelGroupRank" && bizSubtype != "personasIndiv"
    && bizSubtype != "threeRank" && bizSubtype != "apk_pie" && bizSubtype != "area_pie"  && bizSubtype != "single_pie" && bizSubtype != "personasGroup" && bizSubtype != "tagerPersonas"
    && bizSubtype != "sectionRank"
  const isSection = bizSubtype == "section" || bizSubtype == "section2" || bizSubtype == "program" || bizSubtype == "programRank" ||bizSubtype == ""? true : false;
  const isChannelGroup =  'channelGroupRank';
  const isChannel = 'channel';
  const isChannelThree = 'channel_three';
  const isPersonasIndiv = 'personasIndiv';
  const isPersonasGroup = 'personasGroup';
  const isTagerPersonas = 'tagerPersonas'
  const isProgramTypeName = 'programTypeName';
  const isAdBusiness = 'adBusiness';
  const isFlowTrend = 'flowTrend';
  const isDvbChannel = 'dvbProgram';
  const isDvbChannelThree = 'dvbProgram_three';
  const isReplayChannelThree = 'replayProgram_three';
  const isProgram = bizSubtype == "program"
  const isProgramThree = bizSubtype == "program_three" || bizSubtype ==  "series_three"
  const isAppstore = bizSubtype == "appname" || bizSubtype == "app" || bizSubtype == "type1" || bizSubtype == "type2" ||  bizSubtype == "single_game"
  const iSdataAssets = 'dataAssets'

  if("scan"== bizSubtype && biz =="ecom"){//电商平台
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <ByTripleCascade labelNameFirst="商城名称" labelNameSecond="商品类型" labelNameThird="商品名称"
                              propNameFirst='shop_name' propNameSecond='type_name' propNameThird='goods_name'
                              biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {byTripleCascade = self}}
          />
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if("appname"== bizSubtype && biz =="appstore"){//应用使用次数分析
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <ByDoubleCascadeApp labelNameFirst="应用类型" labelNameSecond="应用"
                           propNameFirst='type1' propNameSecond='programtypename' biz={biz} bizSubtype={bizSubtype}
                           section={initValue.section} ref={self => {byDoubleCascadeapp = self}}
          />
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if("use_common"== bizSubtype && biz =="game_room"){//游戏使用分析
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <BySectionGameRoom biz={biz} bizSubtype={bizSubtype} ref={self => {byDoubleCascadeapp = self}}
          />
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isAppstore) {
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <BySection biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isProgram) {
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <BySectionProgram biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isProgramThree) {
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <BySectionProgramThree biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isSection) {
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <BySection biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if(iSdataAssets == bizSubtype){//数据资产
    if(biz == "productUse"){
      return (
        <Panel title='筛选条件'>
          <Container>
            <ByPeriod defaultPeriodType="day" periodTypes={dataAssetsPeriodTypes} ref={self => {
              byPeriod = self
            }} rangeMode={rangeMode}/>
            <ByRegion areas={initValue.areas} ref={self => {
              byRegion = self
            }}/>
            <BySection biz={biz} bizSubtype={bizSubtype} selectChange={onSectionChange}  labelName={"业务类型"}  section={initValue.section} ref={self => {
              bySectionBusinessType = self
            }}/>
            <BySection biz={biz} bizSubtype={bizSubtype}  labelName={"业务子功能"}  section={initValue.secondSection} ref={self => {
              bySectionBusinessTypeChildren = self
            }}/>
            <Button type='primary' icon='search' onClick={() => handleSearch()}>
              查询
            </Button>
          </Container>
        </Panel>
      )
    }else if(biz == "userUsedLog"){
      return (
        <Panel title='筛选条件'>
          <Container>
            <ByPeriod defaultPeriodType="day" periodTypes={dataAssetsPeriodTypes} ref={self => {
              byPeriod = self
            }} rangeMode={rangeMode}/>
            <BySection biz={biz} bizSubtype={bizSubtype} labelName={"用户"}  section={initValue.section} ref={self => {
              bySectionBusinessType = self
            }}/>
            <Button type='primary' icon='search' onClick={() => handleSearch()}>
              查询
            </Button>
          </Container>
        </Panel>
      )
    }else{
      return (
        <Panel title='筛选条件'>
          <Container>
            <ByPeriod defaultPeriodType="day" periodTypes={dataAssetsPeriodTypes} ref={self => {
              byPeriod = self
            }} rangeMode={rangeMode}/>
            <ByRegion areas={initValue.areas} ref={self => {
              byRegion = self
            }}/>
            <BySection biz={biz} bizSubtype={bizSubtype} labelName={"业务类型"}  section={initValue.section} ref={self => {
              bySectionBusinessType = self
            }}/>
            <Button type='primary' icon='search' onClick={() => handleSearch()}>
              查询
            </Button>
          </Container>
        </Panel>
      )
    }
  }else if(isPersonasIndiv == bizSubtype){//个人画像
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod defaultPeriodType="week" periodTypes={periodTypes} ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <BySelectInput defaultValue={cano} option={canoArray} ref={self =>{byInputCano = self}} title={'cano'}  />
          <BySelectInput defaultValue={deviceid} option={deviceidArray} ref={self =>{byInputDeviceid = self}} title={'机顶盒id'}  />
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  } else if(isPersonasGroup == bizSubtype){//群体画像
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod defaultPeriodType="week" periodTypes={periodTypes} ref={self => {
            byPeriod = self
          }} onPeriodChange={v => onPeriodChange(v)} rangeMode={rangeMode}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if(isTagerPersonas == bizSubtype){//标签库 用户画像
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod defaultPeriodType="week" periodTypes={periodTypes} ref={self => {
            byPeriod = self
          }} onPeriodChange={v => onPeriodChange(v)} rangeMode={rangeMode}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if(isProgramTypeName == bizSubtype){//媒资分析
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <ByDoubleCascade labelNameFirst="栏目" labelNameSecond="类目"
               propNameFirst='programtype' propNameSecond='programtypename' biz={biz} bizSubtype={bizSubtype}
               section={initValue.section} ref={self => {byDoubleCascade = self}}
          />
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if(isAdBusiness == bizSubtype){//广告业务分析
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <ByDoubleCascade labelNameFirst="广告位" labelNameSecond="广告类型"
                           propNameFirst='adplacename' propNameSecond='adtype' biz={biz} bizSubtype={bizSubtype}
                           section={initValue.section} ref={self => {byDoubleCascade = self}}
          />
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isChannelGroup==bizSubtype) {
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <BySection biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isChannel==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <BySection biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>

          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isChannelThree==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <BySection biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isFlowTrend==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriodFlowTrend ref={self => {
            byPeriod = self
          }} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isDvbChannel==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriodDvbProgram ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)} onStartTimeChange={v => onStartTimeChange(v)}/>
          <ByDvbProgram biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>

          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isDvbChannelThree==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriodDvbProgram ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)} onStartTimeChange={v => onStartTimeChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <ByDvbProgram biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>

          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if (isReplayChannelThree==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <ByDvbProgram biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>

          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if ("common_pie"==bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if ('channel_pie'==bizSubtype || 'area_pie' == bizSubtype || 'single_pie' == bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <BySection biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>

          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }else if ('apk_pie' == bizSubtype){
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <BySectionProgram biz={biz} bizSubtype={bizSubtype} section={initValue.section} ref={self => {
            bySectionOrProgram = self
          }}/>
          <ByRegion areas={initValue.areas} ref={self => {
            byRegion = self
          }}/>

          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  } else {
    return (
      <Panel title='筛选条件'>
        <Container>
          <ByPeriod ref={self => {
            byPeriod = self
          }} rangeMode={rangeMode} onPeriodChange={v => onPeriodChange(v)}/>
          <ByRegion areas={initValue.areas} onRegionChange={v => onRegionChange(v)} ref={self => {
            byRegion = self
          }}/>
          <Button type='primary' icon='search' onClick={() => handleSearch()}>
            查询
          </Button>
        </Container>
      </Panel>
    )
  }
}

SearchBox.propTypes = {
  onSearch: React.PropTypes.func.isRequired,
  initValue: React.PropTypes.object,
  bizSubtype:React.PropTypes.string,
  biz:React.PropTypes.string,
  onSectionChange:React.PropTypes.func,
  onPeriodChange:React.PropTypes.func,
  onRegionChange:React.PropTypes.func
}

SearchBox.defaultProps={
  bizSubtype:"common",
  onPeriodChange:p=>{}
}

export default SearchBox
