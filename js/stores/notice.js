import { observable, autorun, computed, action} from 'mobx';


class NewsStore {
	@observable list

	@action
	fetch() {
		
	}
}

export default NewsStore;