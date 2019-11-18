import Fuse from "fuse.js";
import PropTypes from "prop-types";
import React from "react";
import ReactAutocomplete from "react-autocomplete";

const DEFAULT_FUSE_OPTIONS = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  includeMatches: true,
  //findAllMatches: true,
  includeScore: true,
  threshold: 0.5,
  //location: 0,
  //distance: 100,
  maxPatternLength: 16,
  minMatchCharLength: 2,
  keys: ["nom"]
};

// init a fuse instance
const getFuse = data => new Fuse(data, DEFAULT_FUSE_OPTIONS);

class FuseHighLighter extends React.Component {
  render() {
    const { suggestion, isHighlighted, onClick } = this.props;

    let html = suggestion.item.nom; // todo: handle different property
    let offset = 0;
    let newHtml;
    suggestion.matches.forEach(match => {
      match.indices.forEach(indice => {
        if (indice[1] - indice[0] > 1) {
          newHtml = html.slice(0, indice[0] + offset);
          newHtml += `<span class="fuse-highlighter">`;
          newHtml += html.slice(indice[0] + offset, indice[1] + offset + 1);
          newHtml += `</span>`;
          newHtml += html.slice(indice[1] + offset + 1);
          offset += newHtml.length - html.length;
          html = newHtml;
        }
      });
    });
    return (
      <div
        onClick={onClick}
        style={{ cursor: "pointer", background: isHighlighted ? "lightgray" : "white" }}
        key={html}
        dangerouslySetInnerHTML={{
          __html: newHtml || html
        }}
      />
    );
  }
}
// just wrap react-autocomplete state and internal event for some props.component(default=ReactAutocomplete)
class Autocomplete extends React.Component {
  state = {
    value: "",
    items: []
  };
  onSelect = (value, obj) => {
    if (this.props.onSelect) {
      this.props.onSelect(obj.item);
    }
    if (this.props.resetOnSelect) {
      this.setState({
        value: ""
      });
    } else {
      this.setState({
        value
      });
    }
  };
  onChange = e => {
    // update fuse results when user inputs
    const value = e.target.value;
    const items = this.fuse
      .search(value)
      .filter(q => q.matches.length)
      .slice(0, 25);
    this.setState({ value, items });
  };
  componentDidMount() {
    // instantiate fuse index
    this.fuse = getFuse(this.props.items);
  }
  render() {
    const Component = this.props.component;
    const { getLabel } = this.props;
    return (
      <Component
        menuStyle={{
          zIndex: 99999,
          position: "absolute",
          border: "1px solid silver",
          borderTop: 0,
          background: "white",
          padding: 5
        }}
        {...this.props}
        items={this.state.items}
        value={this.state.value}
        renderItem={(suggestion, isHighlighted) => (
          <FuseHighLighter
            isHighlighted={isHighlighted}
            query={this.state.value}
            key={getLabel(suggestion)}
            suggestion={suggestion}
          />
        )}
        getItemValue={getLabel}
        onChange={this.onChange}
        onSelect={this.onSelect}
      />
    );
  }
}
Autocomplete.propTypes = {
  onSelect: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  resetOnSelect: PropTypes.bool.isRequired
};
Autocomplete.defaultProps = {
  component: ReactAutocomplete,
  getLabel: suggestion => suggestion.item.nom,
  resetOnSelect: true
};

export default Autocomplete;
