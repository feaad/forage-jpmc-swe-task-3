import React, { Component } from 'react';
import { Table, TableData } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import { DataManipulator } from './DataManipulator';
import './Graph.css';
import Graph from './Graph';


export class AlertsDisplay{
    //Displaying the trading opportunities in HTML
    info: any
    time: any
    static showOpp(info: number, time: Date) {
        //Formatting the date output
        const date = new Date(time);
        var dateFormat = date.toDateString();
        let stamp: HTMLElement | null;
        stamp = document.getElementById("dateStamp");

        //Formatting the time output
        var timeFormat = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let times: HTMLElement | null;
        times = document.getElementById("timeStamp")

        //Formatting the trading opportunity alert
        var opp = info.toString();
        let opportunity: HTMLElement | null;
        opportunity = document.getElementById("opportunity");

        if (opportunity != null && stamp != null && times != null) { 
            const date_node = document.createElement('p');
            const date_text = document.createTextNode(dateFormat);
            date_node.appendChild(date_text);
            stamp.appendChild(date_node);

            const time_node = document.createElement('p');
            const time_text = document.createTextNode(timeFormat);
            time_node.appendChild(time_text);
            times.appendChild(time_node);

            const node = document.createElement('p');
            const text = document.createTextNode(opp);
            node.appendChild(text);
            opportunity.appendChild(node);

            
        }
    }
    
}