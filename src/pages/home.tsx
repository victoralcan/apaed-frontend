import React from 'react';

import '../styles/pages/home.scss';
import {connect} from 'react-redux';

interface IHomeProps extends StateProps, DispatchProps {
}

class Home extends React.Component<IHomeProps> {
    render() {
        return (
            <div>
                Home
            </div>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
