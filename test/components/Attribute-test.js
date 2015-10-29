// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/index/Attribute');

var GrommetTestUtils = require('grommet/utils/test/GrommetTestUtils');

describe('Grommet Index Attribute', function() {
  it('loads a basic Attribute component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        data: 'testing'
      },
      attribute: {
        attribute: 'data'
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'index-attribute', 'testing');
  });

  it('loads an IndexAttribute component where item has multiple attributes', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        attributes: {
          data: 'testing multiple'
        }
      },
      attribute: {
        attribute: 'data'
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'index-attribute', 'testing multiple');
  });

  it('loads a timestamp Attribute component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      locales: "en-US",
      item: {
        data: '05/11/2015'
      },
      attribute: {
        attribute: 'data',
        timestamp: true
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'index-attribute', 'Mon, May 11, 2015, 12:00:00 AM');
  });

  it('loads a secondary Attribute component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        data: 'testing'
      },
      attribute: {
        attribute: 'data',
        secondary: true
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'index-attribute--secondary', 'testing');
  });

  it('loads a status Attribute component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        status: 'ok'
      },
      attribute: {
        attribute: 'status'
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'status-icon');
  });

  it('loads a small Attribute component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        data: 'testing'
      },
      attribute: {
        attribute: 'data',
        size: 'small'
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'index-attribute--small', 'testing');
  });

  it('loads a custom class Attribute component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        data: 'testing'
      },
      attribute: {
        attribute: 'data'
      },
      className: 'custom'
    });

    GrommetTestUtils.componentShouldExist(Component, 'custom', 'testing');
  });

  it('loads an Attribute component with custom render function', function() {

    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      item: {
        data: 'testing'
      },
      attribute: {
        attribute: 'data',
        render: function () {
          return <div className="testing-render">Testing Render</div>;
        }
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'testing-render', 'Testing Render');
  });
});
