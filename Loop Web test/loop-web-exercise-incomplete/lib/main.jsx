import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search.jsx!';
import SearchResults from './search-results.jsx!';
import Store from './store.js';


function render() {
    ReactDOM.render(
        <div>
            <Search />
            <SearchResults />
        </div>,

        document.querySelector('.root')
    );
}

Store.subscribe(render);
render();
