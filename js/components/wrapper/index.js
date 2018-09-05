import React from 'react';
import { Breadcrumb } from 'antd';
/*
TODO:
breadcrumbs 判断是字符串还是对象，如果是对象就是链接，label|path
*/
const Wrapper = props => {
    const { breadcrumbs, separator = '>' } = props;
    return (
        <div className={`exc-page-wrapper ${props.className}`}>
            {breadcrumbs ? (
                <Breadcrumb separator={separator}>
                    {breadcrumbs.map((item, i) => (
                        <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            ) : null}
            <div className="exc-page">{props.children}</div>
        </div>
    );
};
export default Wrapper;
