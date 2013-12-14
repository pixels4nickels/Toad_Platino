function RetryView(screenScaleX, screenScaleY, retryCallback, menuCallback) {

	var _contentView = Ti.UI.createView({
		backgroundColor:'white',
		borderRadius: 15,
		width:330 ,
		height:150 ,
		layout:'vertical'
	});

	var retryButton = Ti.UI.createButton({
		title: "Try Again",
		top: 10,bottom: 10,left: 10,right: 10,
		width: '50%',
		height: 50
	});
	retryButton.addEventListener ('click', retryCallback);
	_contentView.add(retryButton);

	var menuButton = Ti.UI.createButton({
		title: "Menu",
		top: 10,bottom: 10,left: 10,right: 10,
		width: '50%',
		height: 50
	});
	menuButton.addEventListener ('click', menuCallback);
	_contentView.add(menuButton);

	return _contentView;
};

module.exports = RetryView;