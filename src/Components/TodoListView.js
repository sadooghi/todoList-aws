import React, {Component} from 'react';
import './Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class todoListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: null,
      shouldRemoveItem: false
    };
    this.showRemove = this.showRemove.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getTodoList = this.getTodoList.bind(this);
    this.markDone = this.markDone.bind(this);
  }

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    console.log("getTodoList called")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://h8cv2o4moc.execute-api.us-east-1.amazonaws.com/dev/task/all');
    xhr.onreadystatechange = (event) => {
      if(event.target.response){
        this.setState({todoList: event.target.response})
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }

  showRemove = () => {
    this.setState({shouldRemoveItem: !this.state.shouldRemoveItem})
  }

  deleteItem(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://h8cv2o4moc.execute-api.us-east-1.amazonaws.com/dev/task?itemId=${id}`);
    xhr.onreadystatechange = (event) => {
      this.getTodoList();
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }


  markDone = (item) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://h8cv2o4moc.execute-api.us-east-1.amazonaws.com/dev/task');
    xhr.onreadystatechange = (event) => {
      this.getTodoList();
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      "id": item.id,
      "item": item.item,
      "description": item.description,
      "done": !item.done
    }));
  }

  render() {
    const { todoList, shouldRemoveItem } = this.state;
    const todoListArr = JSON.parse(todoList);
    return (
      <div className="showList">
        { todoListArr && (
          <div>
            <button className="backBttn" type="button" onClick={this.props.showMainView}>Main screen</button>
            <button className="backBttn" type="button" onClick={this.showRemove}>Remove</button>
            <ul className="row">
              {shouldRemoveItem && <ul className="deleteCell">delete</ul>}
              <ul className="tableCell">item</ul>
              <ul className="tableCell">description</ul>
              <ul className="tableCell">is done</ul>
            </ul>
            {
              todoListArr.map( (listItem, index) => {
                return (
                  <ul className="row" key={index}>
                    {shouldRemoveItem && (
                      <ul className="deleteCell">
                        <button onClick={()=>this.deleteItem(listItem.id)} type="button">
                          <FontAwesomeIcon icon={faTrash}/>
                        </button>
                      </ul>
                    )}
                    <ul className="tableCell">{listItem.item}</ul>
                    <ul className="tableCell">{listItem.description}</ul>
                    <ul className="tableCell">
                      <button onClick={()=>this.markDone(listItem)} type="button">
                        <FontAwesomeIcon icon={listItem.done ? faCheckCircle : faTimesCircle}/>
                      </button>
                    </ul>
                  </ul>
                )
              })
            }
          </div>
        )}
      </div>
    )
  }
}

export default todoListView;
