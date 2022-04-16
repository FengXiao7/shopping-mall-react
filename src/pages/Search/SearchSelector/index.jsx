import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'

const SearchSelector = ({ trademarkList, attrsList,clickTradeMark,clickAttr }) => {

    return (
        <div className={classnames(style.clearfix, style.selector)}>
            <div className={classnames(style['type-wrap'], style.logo)}>
                <div className={classnames(style.fl, style.key, style.brand)}>品牌</div>
                <div className={classnames(style.value, style.logos)}>
                    <ul className={style['logo-list']}>
                        {
                            trademarkList.map((trademark) => {
                                return <li key={trademark.tmId} onClick={clickTradeMark(trademark)} style={{'cursor': 'pointer'}}>{trademark.tmName}</li>
                            })
                        }
                    </ul>
                </div>
                <div className={style.ext}>
                    <a href="#" className={style['sui-btn']}>多选</a>
                    <a href="#">更多</a>
                </div>
            </div>
            <div className={style['type-wrap']}>
                {
                    attrsList.map(attr => {
                        return (
                            <div key={attr.attrId}>
                                <div className={classnames(style.fl, style.key)}>{attr.attrName}</div>
                                <div className={classnames(style.fl, style.value)}>
                                    <ul className={style['type-list']}>
                                        {
                                            attr.attrValueList.map((attrValue,index)=>{
                                                return(
                                                    <li key={index}>
                                                        <a style={{'cursor': 'pointer'}} onClick={clickAttr(attr.attrId,attrValue,attr.attrName)}>{attrValue}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className={classnames(style.fl, style.ext)}></div>
                            </div>
                        )
                    })
                }

                
            </div>
        </div>
    );
}

export default SearchSelector;
