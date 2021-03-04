//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ListViewMF from './ListViewMF';

class GestionModule extends React.Component {
    
    
    render() {
        if (localStorage.getItem("id") == null) {
            return <p>TU VAS OU JEUNE HOMME</p>
          } else {
        return(
        <div>
            <ListViewMF/>
        </div>
        )
    }
}
}
export default GestionModule;