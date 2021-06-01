import React, { Component } from 'react';
import MaterialTable from 'material-table';

class ResultTable extends Component {
    constructor(props) {
        super(props);

        this.state = {data: this.props.responseToPost || []}
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data.responseToPost !== this.props.data.responseToPost) {
            this.setState({data: this.props.data.responseToPost});
        }
    }

    render() {
        const newData = this.state.data.map((value) => ({
            name: value.name,
            alpha2Code: value.alpha2Code,
            alpha3Code: value.alpha3Code,
            flag: value.flag,
            region: value.region,
            subregion: value.subregion,
            population: value.population,
            languages: value.languages.map(language => language.name).join(", ")
        }));
        let regionCount = newData.filter(x => x.region !== '').map(x => x.region).reduce((obj, item) => {obj[item] = (obj[item] || 0) + 1; return obj;}, {});
        let regionEntries = [];
        Object.entries(regionCount).forEach(([key, value]) => regionEntries.push(<p>{key}: {value}</p>));

        let subRegionCount = newData.filter(x => x.subregion !== '').map(x => x.subregion).reduce((obj, item) => {obj[item] = (obj[item] || 0) + 1; return obj;}, {});
        let subregionEntries = [];
        Object.entries(subRegionCount).forEach(([key, value]) => subregionEntries.push(<p>{key}: {value}</p>));

        
        return (
            <div style={{maxWidth: "100%", marginTop: "20px"}}>
                <MaterialTable
                    columns={[
                        {title: "Flag", field: "flag", render: item => <img src={item.flag} alt="" border="3" height="75" width="100" />},
                        {title: "Full Name", field: "name"},
                        {title: "Alpha Code 2", field: "alpha2Code"},
                        {title: "Alpha Code 3", field: "alpha3Code"},
                        {title: "Region", field: "region"},
                        {title: "Subregion", field: "subregion"},
                        {title: "Population", field: "population", defaultSort: "desc"},
                        {title: "Languages", field: "languages"},
                    ]}
                    data={newData}
                    title="Countries"/>
                    <h2>
                        Total Countries: {newData.length}
                    </h2>
                    <h3>
                    Regions: 
                    </h3>
                    <p>
                        {regionEntries}
                    </p>
                    <h3>
                    SubRegions:
                    </h3>
                    <p>
                        {subregionEntries}
                    </p>
            </div>
        );
    }
}

export default ResultTable;