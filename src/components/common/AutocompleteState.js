import ReactAutocomplete from "react-autocomplete";

// just wrap react-autocomplete state and internal event for some props.component(default=ReactAutocomplete)
class AutocompleteState extends React.Component {
  state = {
    value: ""
  };
  onSelect = (value, obj) => {
    this.setState({ value }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(obj);
      }
    });
  };
  render() {
    const Component = this.props.component;
    const labelKey = this.props.labelKey;
    return (
      <Component
        menuStyle={{
          zIndex: 99999,
          position: "absolute"
        }}
        {...this.props}
        items={this.props.items}
        value={this.state.value}
        shouldItemRender={(item, value) =>
          item[labelKey].toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? "lightgray" : "white" }}>{item[labelKey]}</div>
        )}
        getItemValue={item => item[labelKey]}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={(...args) => {
          this.onSelect(...args);
          if (this.props.resetOnSelect) {
            this.setState({
              value: ""
            });
          }
        }}
      />
    );
  }
}
AutocompleteState.defaultProps = {
  component: ReactAutocomplete,
  labelKey: "nom",
  resetOnSelect: true
};

export default AutocompleteState;
