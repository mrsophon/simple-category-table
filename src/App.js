import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterItems: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://api.publicapis.org/categories")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result,
          filterItems: result,
        });
      });
  }

  filterList = (e) => {
    const updatedList = this.state.items.filter((item) => {
      return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filterItems: updatedList });
  };

  render() {
    const { isLoaded, filterItems } = this.state;
    const searchBox = <input type="text" onChange={this.filterList} />;

    if (!isLoaded) {
      return <div>Loading ... </div>;
    } else {
      return (
        <div className="container">
          <h1>Category</h1>

          <div style={{ display: "flex", justifyContent: "center" }}>
            Filter Name: &nbsp;{searchBox}
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {filterItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
