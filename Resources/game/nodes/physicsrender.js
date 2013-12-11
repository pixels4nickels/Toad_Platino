var PhysicsRender = require('lib/ash/ash').Node.create({
    body : require('game/components/physicsbody'),
    moment : require('game/components/physicsmoment'),
    display : require('game/components/display')
});

module.exports = PhysicsRender;

