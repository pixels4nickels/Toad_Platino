var TU = require ("/TitanUp/TitanUp");

function LevelSelectView(screenScaleX, screenScaleY, selectCallback, closeCallback) {
	var _selectCallback = selectCallback;
	var _closeCallback = closeCallback;
	var _currentScene = null;
	var _contentid = null;   // bundle id/name
	var _context = null;   // bundle id/name

	var margin = TU.UI.Sizer.getDimension (40);
	var rowh = TU.UI.Sizer.getDimension (40);
	var _tv_menu, content, _closeButton;

	var _view = Ti.UI.createView({
		backgroundColor:'white',
		borderRadius: margin/4,
		width:300,
		height:450,
		layout:'vertical'
	});
	var _title_text = Ti.UI.createLabel({
		color: '#0044ff',
		font: { fontSize:48 },
		shadowColor: '#aaa',
		shadowOffset: {x:2, y:2},
		shadowRadius: 5,
		text: 'A simple label',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 30,
		width: Ti.UI.SIZE, height: Ti.UI.SIZE
	});

	_tv_menu = Ti.UI.createTableView ({
		top:margin/2,
		left:margin/2,
		right:margin/2,
		height:240,
		borderRadius: margin/4,
		borderColor: TU.UI.Theme.textColor,
		backgroundColor: TU.UI.Theme.lightBackgroundColor
	});


	_closeButton = Ti.UI.createButton({
		title: 'Back',
		top: 10,
		width: '100%',
		height: 50
	});

	_view.closeView = function(e){
		if(_context == "scenes"){
			_closeCallback(e);
		}
		if(_context == "levels"){
			_context = "scenes";
			_view.showScenes();
		}

	}

	_closeButton.addEventListener('click', _view.closeView);

	_view.add(_title_text);
	_view.add(_tv_menu);
	_view.add(_closeButton);

	_view.buildView = function(contentid){   // context is going to be "scene" or "level"
		_contentid = contentid;
		// clean up
		_tv_menu.setData ([]);
		_view.showScenes();

	}


	_view.showScenes = function(){
		_context = "scenes";
		// clear rows
		var rows = [];
		_tv_menu.setData (rows);
		// set new content
		content = require ('/content/' + _contentid + '/config');
		_title_text.text = content.label;

		for (var i = 0; i < content.scenes.length; i++)
		{
			var r = Ti.UI.createTableViewRow ({
				title: content.scenes[i].label,
				height: rowh,
				color: TU.UI.Theme.textColor,
				backgroundColor: TU.UI.Theme.lightBackgroundColor,
				selectedBackgroundColor: TU.UI.Theme.highlightColor
			});
			r.data = content.scenes[i];

			rows.push (r);
		}
		_tv_menu.setData (rows);

	}

	_view.itemSelected = function(e){
		Ti.API.info("LevelSelectView.itemSelected->this " + this);
		Ti.API.info("LevelSelectView.itemSelected->context " + _context );
		if(_context == "scenes"){
			_view.showLevels(e.rowData.data);
		}else if(_context == "levels"){
			_selectCallback(e);
		}
	}
	_tv_menu.addEventListener ('click', _view.itemSelected);

	_view.showLevels = function(content){
		_context = "levels";
		var rows = [];
		_title_text.text = content.label;
		_currentScene = content;
		_tv_menu.setData (rows);
		Ti.API.info("LevelSelectView.showLevels->data " + content.levels);
		for (var i = 0; i < content.levels.length; i++)
		{
			var r = Ti.UI.createTableViewRow ({
				title: content.levels[i].label,
				height: rowh,
				color: TU.UI.Theme.textColor,
				backgroundColor: TU.UI.Theme.lightBackgroundColor,
				selectedBackgroundColor: TU.UI.Theme.highlightColor
			});
			r.data = content.levels[i];

			rows.push (r);
		}
		_tv_menu.setData (rows);
	}
	return _view;
};

module.exports = LevelSelectView;