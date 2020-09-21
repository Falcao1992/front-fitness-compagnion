import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = ({history}) => {
    return (
        <div>
            {console.log(history.location.pathname)}
            <p>Pas de résultat pour {history.location.pathname}</p>
            <p><Link to="/">Go to Home </Link></p>
        </div>
    );
}

export default NotFoundPage
