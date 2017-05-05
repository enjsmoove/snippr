import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, Image, List } from 'semantic-ui-react';
import GoogleMaps from '../components/GoogleMaps';

const URL = 'http://localhost:3000/nearbySnypprs';
const GMAPURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbySnypprs: [],
      clientAddress: this.props.profile.address,
      clientConverted: '',
    };
  }

  componentDidMount() {
    console.log('profile in dash', this.props.profile);
    this.fetchSnypprs(this.state.clientAddress);
  }

  fetchSnypprs(address) {
    axios.get(`${URL}/${address}`)
      .then((results) => {
        this.setState({ nearbySnypprs: results });
      })
      .then(() => {
        axios.get(`${GMAPURL}${this.state.clientAddress}`)
          .then((results) => {
            console.log('addresses', results);
            this.setState({ clientConverted: results.data.results[0].geometry.location });
          });
      })
      .catch((err) => {
        console.log('error fucked up ', err);
      });
  }
  render() {
    return (
      <div>
        {/* <Menu pointing secondary>
          <Menu.Item name="home" />
          <Menu.Item name="messages" />
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.props.logout} />
          </Menu.Menu>
        </Menu>*/}
        <nav className="snyp-menu">
          <Button onClick={this.props.logout}>Log Out</Button>
        </nav>
        ClientDashboard

        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}><code>
              <Image width="150" height="100" src="https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg" />
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>Home</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Profile</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Payment</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content onClick={this.props.logout}>
                    <List.Header>Log Out</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </code></Col>
            <Col xs={12} md={8}><code>
              <GoogleMaps
                clientAddress={this.state.clientConverted}
                snypprs={this.state.nearbySnypprs} google={window.google}
              />
            </code></Col>
          </Row>
        </Grid>
        <div className="snyp-footer" />
      </div>
    );
  }
}

ClientDashboard.propTypes = {
  profile: PropTypes.shape.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ClientDashboard;
