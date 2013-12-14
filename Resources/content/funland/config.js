var funland_config =
{
    label: L('funland'),
    scenes:
    [
        {
            label: L('scene1'),
            id:'scene1',
            levels: [
                {
                    label: L('level1'),
                    data: 'content/funland/scenes/scene1/level_1_1.json',
	                complete:false
                },
                {
                    label: L('level2'),
                    data: 'content/funland/scenes/scene1/level_1_2.json',
	                complete:false
                },
                {
                    label: L('level3'),
                    data: 'content/funland/scenes/scene1/level_1_3.json',
	                complete:false
                },
                {
                    label: L('level4'),
                    data: 'content/funland/scenes/scene1/level_1_4.json',
	                complete:false
                }
            ]
        },
        {
            label: L('scene2'),
            id:'scene2',
            levels: [
                {
                    label: L('level1'),
                    data: 'content/funland/scenes/scene2/level_1_1.json',
	                complete:false
                },
                {
                    label: L('level2'),
                    data: 'content/funland/scenes/scene2/level_1_2.json',
	                complete:false
                },
                {
                    label: L('level3'),
                    data: 'content/funland/scenes/scene2/level_1_3.json',
	                complete:false
                },
                {
                    label: L('level4'),
                    data: 'content/funland/scenes/scene2/level_1_4.json',
	                complete:false
                }
            ]
        }
    ]
}

module.exports = funland_config
