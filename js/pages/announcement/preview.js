/**
 * @fileoverview  最新消息详情
 * @author 陈立英
 * @date 2018-05-09
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'

@inject('announcementStore')
@observer
class AnnouncePreview extends Component {
    
    componentDidMount() {
    	this.props.announcementStore.fetchInfo();
    }

    render() {
    	let detail = this.props.announcementStore.detail;

        return (
            <div className="announcement-preview">
            	<div className="announcement-preivew-header">
            		<span className="breadcrumb-text">
	            		<Link to="/announcement">
	                        { UPEX.lang.template('公告') }
	                    </Link>
                    </span>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-text">{ detail.title }</span>
            	</div>
            	<div className="announcement-preivew-article">
            		<div className="article-title">{ detail.title }</div>
            		<div className="article-time">{ detail.publishTime }</div>
            		<div className="article-content">
            			<div className="article-body" dangerouslySetInnerHTML={{__html:  detail.content }}></div>
            		</div>
            	</div>
            </div> 
        );
    }
}
export default AnnouncePreview;
