import React from 'react';
import { IDropdownProps, IDropdownStates } from '../interface/IDropdown';
import { Button, Div, List } from './Element';

export class Dropdown extends React.Component<IDropdownProps, IDropdownStates> {
  constructor(props: IDropdownProps) {
    super(props);
    this.state = {
      title: this.props.menuItems[0],
      currentState: this.props.currentState,
    }
    document.addEventListener('removeAllDropdown', () => {
      this.setState({
        currentState: false
      })
    })
  }

  toggleState() {
    document.dispatchEvent(new Event('removeAllDropdown'));
    this.setState({
      currentState: !this.state.currentState
    });
  }
  changeDropdown(dropdownItem: string) {
    this.setState({
      title: dropdownItem,
      currentState: false
    })
  }
  render() {
    return (
      <Div className={`dropdown ${this.state.currentState ? ' show' : ''}`}>
        <Button className="btn btn-secondary dropdown-toggle" onClick={() => this.toggleState()}>
          {this.state.title}
        </Button>
        <List className={`dropdown-menu-${this.props.menuAlignment} dropdown-menu${this.state.currentState ? ' show' : ''}`}>
          {this.props.menuItems.map((item, index) => (
            <Button className="dropdown-item" key={index} onClick={() => this.changeDropdown(item)}>{item}</Button>
          ))}
        </List>
      </Div>
    );
  }
}