import React from "react";
import ReactMarkdown from "react-markdown";

import { getDate, postEntry, deleteEntry } from "../common/api";
import { addDaysToDate, dateFromDate } from "../common/utils";

import "./Page.css";

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            entries: [],
            new_entry: "",
            /*
            currently_editing: -1,
            editing_text: ""
            */
        };
    };

    componentDidMount() {
        const startingPage = new Date();
        this.fetchPage(startingPage);
    };

    newEntryChange = (e) => {
        this.setState({
            ...this.state,
            new_entry: e.target.value
        })
    };

    /*
    oldEntryChange = (e) => {
        this.setState({
            ...this.state,
            editing_text: e.target.value
        })
    };
    */

    fetchPage = (date) => {
        getDate(dateFromDate(date))
            .then((response) => {
                console.log(response)

                this.setState({
                    ...this.state,
                    date: date,
                    entries: response
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    sendEntry = () => {
        const { date, new_entry } = this.state;
        if (new_entry.length > 0)
            postEntry(dateFromDate(date), new_entry)
                .then((response) => {
                    console.log(response.message);
                    const { message, date, timestamp } = response;

                    const entries = this.state.entries;
                    entries.push({
                        message,
                        date,
                        timestamp
                    });

                    this.setState({
                        ...this.state,
                        entries,
                        new_entry: ""
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
    };

    removeEntry = (id, key) => {
        deleteEntry(id)
            .then((response) => {
                console.log(response.message);

                const entries = this.state.entries;
                entries.splice(key, 1);

                this.setState({
                    ...this.state,
                    entries
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };
    /* TODO
        updateEntry = (id, key, message) => {
            deleteEntry(id)
                .then((response) => {
                    console.log(response.message);
    
                    const entries = this.state.entries;
                    entries.splice(key, 1);
    
                    this.setState({
                        ...this.state,
                        entries
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    */
    nextDay = () => this.fetchPage(addDaysToDate(this.state.date, 1));
    backDay = () => this.fetchPage(addDaysToDate(this.state.date, -1));

    render() {
        const { entries, date, new_entry/* , currently_editing */ } = this.state;

        return (
            <div className="Page">
                <div className="Navegation">
                    <button onClick={this.backDay}>
                        <img src="" alt="back" />
                    </button>
                    <div className="Date">
                        <input type="date" required={true} value={dateFromDate(date)} onChange={(e) => this.fetchPage(e.target.valueAsDate)} />
                    </div>
                    <button onClick={this.nextDay}>
                        <img src="" alt="next" />
                    </button>
                </div>
                <div className="Content">
                    <div className="Entries">
                        {
                            entries.length > 0 ?
                                entries.map((entry, index) => {
                                    return (
                                        <div className="Entry" key={index}>
                                            {
                                                /*
                                                currently_editing === index ?
                                                */
                                                <ReactMarkdown /* onClick={() => this.setState({ ...this.state, currently_editing: index })} */ children={entry.message} />
                                                /*    :
                                                    <textarea className="Text" type="text" value={new_entry} onChange={this.oldEntryChange} />
                                                */
                                            }
                                            <div className="Entry-Menu">
                                                <>
                                                    {entry.timestamp}
                                                </>
                                                <button onClick={() => this.removeEntry(entry.id, index)}>
                                                    <img alt="delete" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                "No entries..."
                        }
                    </div>
                    <div className="New">
                        <textarea className="Text" type="text" value={new_entry} onChange={this.newEntryChange} />
                        <button onClick={this.sendEntry}>
                            <img alt="send" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;