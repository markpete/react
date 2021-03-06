import React from 'react'
import { Menu, ToolbarBehavior, Icon, ToolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'cloud',
    icon: {
      name: 'cloud',
      circular: true,
      xSpacing: 'both',
      size: 'small',
    },
    accessibility: ToolbarButtonBehavior,
    'aria-label': 'Cloud Tool',
  },
  {
    key: 'clock',
    icon: {
      name: 'clock',
      circular: true,
      xSpacing: 'both',
      size: 'small',
    },
    accessibility: ToolbarButtonBehavior,
    'aria-label': 'Clock Tool',
  },
  {
    key: 'book',
    icon: {
      name: 'book',
      circular: true,
      xSpacing: 'both',
      size: 'small',
    },
    accessibility: ToolbarButtonBehavior,
    'aria-label': 'Book Tool',
  },
]

class MenuExampleToolbarShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        iconOnly
        accessibility={ToolbarBehavior}
        aria-label="Compose Editor"
      />
    )
  }
}

export default MenuExampleToolbarShorthand
