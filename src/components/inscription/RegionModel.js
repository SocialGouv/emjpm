import React from "react";
import styled from "styled-components";

class RegionModule extends React.Component {
	render() {
		return (
			<li>
				<div>
					<label>
						<input
							type="checkBox"
							name="region_selector"
							value={this.props.region.id_region}
							onChange={}
						/>
						{this.props.region.nom_region}
					</label>
					<div style={{ display: "none" }}> Tribunals d'instances</div>
				</div>
			</li>
		);
	}
}
export default RegionModule;
