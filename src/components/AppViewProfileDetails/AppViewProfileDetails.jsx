import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import UserStore from '../../stores/UserStore';
import './AppViewProfileDetails.css';


var getAge = require('get-age');


class AppViewProfileDetails extends Component {

    state = {
        details: {
            languagesSpoken: [],
            climbingStyles: [],
            availableEquipment: []
        }
    }

    componentDidMount() {
        UserStore.getDetails(this.props.uid)
            .then((details) => {
                this.setState({
                    details: details
                });
            })
    }

    render() {
        return (
            <Paper className="margintop">
                <List>
                    <ListItem>
                        <Typography variant="h4">Details</Typography>
                    </ListItem>
                    {
                        this.state.details.birthday &&
                        <ListItem>
                            <TextField fullWidth
                                label="Age"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getAge(this.state.details.birthday)} />
                        </ListItem>
                    }
                    {
                        this.state.details.about &&
                        <ListItem>
                            <TextField
                                multiline
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                label="About"
                                placeholder="About"
                                value={this.state.details.about}
                                onChange={this.handleChangeAbout} />
                        </ListItem>
                    }
                    <ListItem>
                        <Typography variant="h5">Languages Spoken</Typography>
                    </ListItem>
                    {
                        this.state.details.languagesSpoken.length > 0 &&
                        <ListItem>
                            {
                                this.state.details.languagesSpoken.map((lang, index) => {
                                    return (
                                        <Chip key={index} label={lang} style={{ marginRight: 5 }} />
                                    );
                                })
                            }
                        </ListItem>
                    }
                    <ListItem>
                        <Typography variant="h5">Climbing Styles</Typography>
                    </ListItem>
                    {
                        this.state.details.climbingStyles.length > 0 &&

                        <ListItem>
                            {
                                this.state.details.climbingStyles.map((style, index) => {
                                    return (
                                        <Chip key={index} label={style} style={{ marginRight: 5 }} />
                                    );
                                })
                            }
                        </ListItem>
                    }
                    <ListItem>
                        <Typography variant="h5">Available Equipment</Typography>
                    </ListItem>
                    {
                        this.state.details.availableEquipment.length > 0 &&
                        <ListItem>
                            {
                                this.state.details.availableEquipment.map((equip, index) => {
                                    return (
                                        <Chip key={index} label={equip} style={{ marginRight: 5 }} />
                                    );
                                })
                            }
                        </ListItem>
                    }
                </List>
            </Paper>
        )
    }
}

export default AppViewProfileDetails;