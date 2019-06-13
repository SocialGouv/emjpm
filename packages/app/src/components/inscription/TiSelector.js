import TiByRegion from "./TiByRegion";

const groupByRegion = arr =>
  arr.reduce(function(acc, obj) {
    const cle = obj.region;
    if (!acc[cle]) {
      acc[cle] = [];
    }
    acc[cle].push(obj);
    return acc;
  }, {});

class TiSelector extends React.Component {
  state = {
    selected: []
  };

  onTiSelected = (tiId, checked) => {
    this.setState(
      state => {
        if (checked && state.selected.indexOf(tiId) === -1) {
          return {
            selected: [...state.selected, tiId]
          };
        }
        if (!checked && state.selected.indexOf(tiId) > -1) {
          const ids = [...state.selected];
          ids.splice(ids.indexOf(tiId), 1);
          return {
            selected: ids
          };
        }
      },
      () => {
        this.props.onChange(this.state.selected);
      }
    );
  };

  render() {
    const tisByRegion = groupByRegion(this.props.tis);
    return (
      <div
        style={{
          listStyleType: "none",
          margin: 20,
          width: "100%",
          fontSize: "1.1em"
        }}
      >
        {this.props.tis &&
          Object.keys(tisByRegion).map(region => (
            <TiByRegion
              tis={tisByRegion[region]}
              nom={region}
              key={region}
              onTiSelected={this.onTiSelected}
            />
          ))}
      </div>
    );
  }
}

export default TiSelector;
