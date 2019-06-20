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

  componentDidUpdate(prevProps) {
    // hack to force reload when some redux state change
    if (this.props.mandataireId !== prevProps.mandataireId) {
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
          this.props.onAdd(obj.id).catch(error => {
            alert("Impossible d'ajouter :/");
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            throw error;
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
          this.props.onRemove(obj.id).catch(error => {
            alert("Impossible de supprimer :/");
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            throw error;
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
