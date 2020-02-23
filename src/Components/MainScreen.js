import React, { Component } from 'react';
import './Styles.css';
import TodoListView from './TodoListView';
import AddItem from './AddItem';

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      addItem: false
    };
    this.handleShowList = this.handleShowList.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.showMainView = this.showMainView.bind(this);
  }

  handleShowList(event) {
    this.setState({ showList: true });
  }

  handleAddItem(event) {
    this.setState({addItem: true});
  }

  showMainView = () => {
    this.setState({
      showList: false,
      addItem: false
    })
  }

  render() {
    const { showList, addItem } = this.state;
    return (
      <div className="mainView">
        <header className="header">
        <p>
          TODO APP powered by React and AWS!
        </p>
        </header>
        <div className="bodyView">
          {
            !(showList || addItem) && (
              <div>
                <button className="button" onClick={this.handleAddItem} type="button">Add a Todo item to your list</button>
                <button className="button" onClick={this.handleShowList} type="button">View your Todo list</button>
              </div>
            )
          }
          {
            showList && <TodoListView showMainView={this.showMainView}/>
          }
          {
            addItem && <AddItem showMainView={this.showMainView}/>
          }
        </div>
      </div>
    );
  }
}

export default MainScreen;
