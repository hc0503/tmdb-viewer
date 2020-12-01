import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
  },
});

function MainMenu({ location, history, items }) {
  const classes = useStyles();
  const itemsMap = new Map(items.map((item) => [item.path, item]));
  return (
    <Tabs
      className={classes.root}
      value={itemsMap.has(location.pathname) ? location.pathname : false}
      onChange={(event, value) => {
        history.push(value);
      }}
    >
      {Array.from(itemsMap.values()).map((item) => (
        <Tab
          value={item.path}
          label={item.label}
          icon={<item.iconComponent />}
          key={item.path}
        />
      ))}
    </Tabs>
  );
}

MainMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      iconComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object,
      ]),
    }).isRequired
  ).isRequired,
};

export default MainMenu;
