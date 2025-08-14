import { Fragment, useState } from 'react';
import AddButton from '../components/AddButton';
import InputBlock from "../components/InputBlock";

import './Page.css';
import CategoryButton from '../components/CategoryButton';
import GotoButton from '../components/GotoButton';
import ResultButton from '../components/ResultButton';
import RateItems from '../components/RateItems';

export default function SetupAssetChangeRate({onPrev, onNext, assetList, setAssetList}){
    
    return(

        <div className="setup-page">
            <h1>각 자산의 자산 변동률을 <br/> 입력해주세요</h1>
            {assetList
            .map(bundle => (
                <RateItems
                    menuName={bundle.category}
                    unitName='%'
                />
            ))
            }
            <div className="nav-buttons">
                <div className = 'goto-container'>
                    <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                    <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
                </div>
            </div>
        </div>
    );
}