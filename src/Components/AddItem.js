import React, {Component} from 'react';
import './Styles.css';

class todoListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemVal: "",
      descVal: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://h8cv2o4moc.execute-api.us-east-1.amazonaws.com/dev/task');
    xhr.onreadystatechange = (event) => {
      document.getElementById("newItemForm").reset();
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      "item":document.getElementById("item").value,
      "description":document.getElementById("description").value,
      "done": false
    }));
  }

  render() {
    const { itemVal, descVal } = this.state;
    return (
      <div>
        <button className="backBttn" type="button" onClick={this.props.showMainView}>Main screen</button>
        <form id="newItemForm" className="showList" onSubmit={this.handleSubmit}>
          <div className="row">
            <label htmlFor="item" className="formItem">To Do Item:</label>
            <input type="text" id="item" name="item" />
          </div>
          <div className="row">
            <label htmlFor="description" className="formItem">Item's Description:</label>
            <input type="text" id="description" name="description" />
          </div>
          <button className="backBttn" type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default todoListView;
