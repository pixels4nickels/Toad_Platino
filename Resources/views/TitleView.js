function TitleView(screenScaleX, screenScaleY, selectCallback) {

	var _contentView = Ti.UI.createView({
		backgroundColor:'white',
		borderRadius: 15,
		width:330 ,
		height:350 ,
		layout:'vertical'
	});
	var _splashView = Ti.UI.createView({
		backgroundImage:'/graphics/ToadTitle.png',
		top:50,
		width:275,
		height:75
	});
	_contentView.add(_splashView);
	var content = require ('/content/content');
	for (var i = 0; i < content.length; i++)
	{
		var button = Ti.UI.createButton({
			title: content[i].label,
			top: 10,
			width: '100%',
			height: 50
		});
		button.data = content[i].value;  // this is the content bundle string id (and directory name)
		button.addEventListener ('click', selectCallback);
		_contentView.add(button);
	}

	return _contentView;
};

module.exports = TitleView;