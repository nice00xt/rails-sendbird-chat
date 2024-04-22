import { Controller } from "@hotwired/stimulus"
import React from "react";
import ReactDOM from "react-dom";
import SendbirdChat from "../components/SendbirdChat";

export default class extends Controller {
  connect() {
    console.log('test ---')
    const data = JSON.parse(this.element.getAttribute('data-sendbird-data'));
    const e = React.createElement;
    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(e(SendbirdChat, { data }), root)
  }
}
