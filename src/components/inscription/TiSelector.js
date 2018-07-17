import RegionModel from "./RegionModel";

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
    tiSelected: []
  };

  onTiSelected = (tiId, checked) => {
    this.setState(state => {
      if (checked && state.tiSelected.indexOf(tiId) === -1) {
        //  state.tiSelected.push(tiId);
        return {
          tiSelected: [...state.tiSelected, tiId]
        };
      }
      if (!checked && state.tiSelected.indexOf(tiId) > -1) {
        const ids = [...state.tiSelected];
        ids.splice(ids.indexOf(tiId), 1);
        return {
          tiSelected: ids
        };
      }
    });
  };

  render() {
    const tisByRegion = groupByRegion(this.props.tis);
    return (
      <div>
        <h2 style={{ margin: 20 }}>
          Choisissez les tribunaux d&apos;instances de votre activité profesionelle dans vos régions
          :
        </h2>
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
              <RegionModel
                tis={tisByRegion[region]}
                nom={region}
                key={region}
                onTiSelected={this.onTiSelected}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default TiSelector;
