'user strict';
import React from 'react';
import { Route } from 'react-router-dom';
import IndexRoute from './router/index';
import CompanyRoute from './router/company';
import IndustryRoute from './router/industry';
import BoardRoute from './router/board';
import BrandRoute from './router/brand';
import DataSource from './router/dataSource';
import OtherRoute from './router/other';
import PrimaryMarketRoute from './router/primaryMarket';
import SecondaryMarketRoute from './router/secondaryMarket';


let list = [];
list = list.concat(IndexRoute);
list = list.concat(CompanyRoute);
list = list.concat(IndustryRoute);
list = list.concat(BoardRoute);
list = list.concat(BrandRoute);
list = list.concat(DataSource);
list = list.concat(OtherRoute);
list = list.concat(PrimaryMarketRoute);
list = list.concat(SecondaryMarketRoute);


export default (props) => {
    return list.map((v, k) => {
        return <Route key={k} path={v.path} exact={_.get(v, 'isExact', true)} component={v.component} />;
    })
}