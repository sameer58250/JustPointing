import React from 'react';
import './sizing-results.css';
import { getValuesWithCount } from '../../utils/utils';

const SizingResults = props => {
    return (
        <div className = "sizing-results" id = "sizing-results">
            <label>Sizing Results</label>
            <div className = "app-table">
                <div className = "app-table-header">
                    <div className = "app-table-cell">Size</div>
                    <div className = "app-table-cell">No. of votes</div>
                </div>
                {
                    getValuesWithCount(props.users, "StoryPoint")
                    .map((user, index) => {
                        return (
                            <div key = {index} className = "app-table-row">
                                <div className = "app-table-cell">{user.StoryPoint}</div>
                                <div className = "app-table-cell">{user.StoryPoint ? user.count: ""}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SizingResults;