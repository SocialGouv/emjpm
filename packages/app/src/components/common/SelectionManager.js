import React from "react";

//
// render prop
// handle selection, onAdd, onRemove
// triggers props.onAdd and props.onRemove http method
// assume given objects have an "id" property
//
class SelectionManager extends React.Component {
  state = {
    selection: []
  };

  componentDidUpdate(prevProps, prevState) {
    // hack to force reload when some redux state change
    if (this.state.selection !== this.props.getSelection()) {
      this.updateSelection();
    }
  }

  componentDidMount() {
    this.updateSelection();
  }
  updateSelection() {
    if (this.props.getSelection) {
      this.props.getSelection().then(selection => {
        this.setState({ selection });
      });
    }
  }
  onAdd = obj => {
    if (this.state.selection.find(i => i.id === obj.id)) {
      return;
    }
    this.setState(
      curState => ({
        selection: [...curState.selection, obj]
      }),
      () => {
        if (this.props.onAdd) {
          this.props.onAdd(obj.id).catch(e => {
            alert("Impossible d'ajouter :/");
            console.log(e);
            throw e;
          });
        }
      }
    );
  };
  onRemove = obj => {
    if (!this.state.selection.find(i => i.id === obj.id)) {
      return;
    }
    this.setState(
      curState => ({
        selection: curState.selection.filter(i => i.id !== obj.id)
      }),
      () => {
        if (this.props.onRemove) {
          this.props.onRemove(obj.id).catch(e => {
            alert("Impossible de supprimer :/");
            console.log(e);
            throw e;
          });
        }
      }
    );
  };
  render() {
    return this.props.render({
      onAdd: this.onAdd,
      onRemove: this.onRemove,
      selection: this.state.selection
    });
  }
}

export default SelectionManager;
