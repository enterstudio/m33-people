import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  Link,
} from 'react-toolbox';
import inputStyle from './input.scss';
import List from './PeopleList';
import tabStyle from './tabs.scss';

class PeopleTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyId: props.companyId,
    };
  }


  handleTabChange = (index) => {
    this.setState({ companyId: this.props.companies[index].id });
  };

  renderTabs = () => {
    if (this.props.companies.length === 0) {
      return (<div className={inputStyle.noResults}>No results</div>);
    }

    const tabs = this.props.companies.map(company => (
      <Tab
        key={company.id}
        label={company.name.split('|')[0]}
        style={{ height: '100%', display: 'flex' }}
      >
        <Link href="https://trello.com/b/JLBMh7wp">Add someone</Link>
        <List
          people={company.people}
          companyEmails={this.props.companyEmails}
          companies={this.props.companies}
        />
      </Tab>
    ));

    const selectedCompanyIndex = this.props.companies
      .map(company => company.id)
      .indexOf(this.state.companyId);

    return (
      <Tabs index={selectedCompanyIndex} onChange={this.handleTabChange} inverse theme={tabStyle}>
        {tabs}
      </Tabs>
    );
  }

  render() {
    return (
      this.renderTabs()
    );
  }
}

PeopleTabs.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  companyId: PropTypes.string.isRequired,
  companyEmails: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PeopleTabs;
