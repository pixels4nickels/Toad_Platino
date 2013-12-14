function OptionsView(screenScaleX, screenScaleY, closeCallback) {

	var _contentView = Ti.UI.createView({
		backgroundColor:'white',
		borderRadius: 15,
		width:330 ,
		height:150 ,
		layout:'vertical'
	});

	var closeButton = Ti.UI.createButton({
		title: "Try Again",
		top: 10,bottom: 10,left: 10,right: 10,
		width: '50%',
		height: 50
	});
	closeButton.addEventListener ('click', closeButton);
	_contentView.add(closeButton);


	return _contentView;
};

module.exports = OptionsView;