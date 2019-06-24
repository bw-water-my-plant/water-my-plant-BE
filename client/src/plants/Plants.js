import React from 'react';
import axios from 'axios';

import '../auth/addInterceptors';
import requiresAuth from '../auth/requiresAuth';

class Plants extends React.Component {
  state = {
    plants: [],
  };

  render() {
    return (
      <>
        <h2>My Plants</h2>

        <ul>
          {this.state.plants.map(p => (
            <li key={p.id}>{p.plantname}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = 'https://water-my-plant.herokuapp.com/plants';

    axios
      .get(endpoint)
      .then(res => {
        console.log('plants', res.data);
        this.setState(() => ({ plants: res.data }));
      })
      .catch(({ response }) => {
        console.error('plants error', response);
      });
  }
}

export default requiresAuth(Plants);
